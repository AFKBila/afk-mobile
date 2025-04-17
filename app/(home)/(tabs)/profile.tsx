import React, { useEffect, useState } from 'react';
import { LogBox, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import MainContainer from '@/common/MainContainer';
import ProfileHeader from '@/components/home/ProfileHeader';
import { useUser } from '@clerk/clerk-expo';
import { useAuthStore } from '@/store/useAuthStore';
import { useSocialStore } from '@/store/useSocialStore';
import LoadingScreen from '@/components/common/LoadingIndicator';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import ProfileTabs from '@/components/profile/ProfileTabs';
import TextPosts from '@/components/profile/TextPosts';
import PhotoPosts from '@/components/profile/PhotoPosts';
import MusicPosts from '@/components/profile/MusicPosts';

type TabType = 'text' | 'photo' | 'music';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('text');
    const { user: clerkUser } = useUser();
    const { user: storeUser, updateUser } = useAuthStore();
    const { followersCount, followingCount, setCounts } = useSocialStore();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                if (clerkUser) {
                    // Get Firestore data first
                    const userDoc = await getDoc(doc(db, 'users', clerkUser.id));

                    if (userDoc.exists()) {
                        const firestoreData = userDoc.data();
                        console.log('=== FIRESTORE USER DATA ===', firestoreData);

                        // Update auth store with Firestore data
                        await updateUser(firestoreData);

                        // Update social counts
                        setCounts({
                            followers: firestoreData.followersCount || 0,
                            following: firestoreData.followingCount || 0
                        });
                    } else {
                        console.log('No Firestore data found, using Clerk data');
                        // Fallback to Clerk data if no Firestore data
                        const userData = {
                            ...storeUser,
                            firstName: clerkUser.firstName || '',
                            lastName: clerkUser.lastName || '',
                            profileImage: clerkUser.imageUrl,
                            location: clerkUser.publicMetadata?.location as string || 'Ghana',
                            bio: storeUser?.bio || "May we be guided by eternal grace ✨",
                        };
                        await updateUser(userData);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [clerkUser]);

    LogBox.ignoreAllLogs()

    const renderContent = () => {
        switch (activeTab) {
            case 'text':
                return <TextPosts />;
            case 'photo':
                return <PhotoPosts />;
            case 'music':
                return <MusicPosts />;
            default:
                return <TextPosts />;
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <MainContainer style={styles.container}>
            <ProfileHeader
                name={`${storeUser?.firstName} ${storeUser?.lastName}`}
                location={storeUser?.location || 'Ghana'}
                bio={storeUser?.bio || "May we be guided by eternal grace ✨"}
                avatar={storeUser?.profileImage || ''}
                followers={followersCount}
                following={followingCount}
            />
            <View style={styles.contentContainer}>
                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
                {renderContent()}
            </View>
        </MainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    contentContainer: {
        flex: 1,
    },
});

export default Profile;