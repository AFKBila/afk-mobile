import React, { useEffect } from "react";
import { Redirect } from 'expo-router';
import GetStarted from "./(auth)/get-started";
import { useAuth, useUser } from "@clerk/clerk-expo";
import LoadingScreen from "@/components/common/LoadingScreen";

const Page = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();

    if (!isLoaded) {
        return <LoadingScreen />;
    }

    if (isSignedIn && user) {
        return <Redirect href="/(home)/(tabs)/explore" />;
    }

    return <GetStarted />;
};

export default Page;