import { Platform, ScrollView, StyleSheet, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

interface MainContainerProps {
    children: ReactNode;
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
}

const MainContainer: React.FC<MainContainerProps> = ({
    children,
    style,
    contentContainerStyle
}) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <ScrollView
                contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        // marginTop: Platform.OS === "android" ? 10 : 0,
    },
    scrollContent: {
        flexGrow: 1,
        // justifyContent: 'space-between',
        paddingVertical: 20,
    },
});

export default MainContainer;
