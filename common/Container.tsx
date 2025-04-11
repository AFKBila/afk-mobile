import { Platform, ScrollView, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";



interface MainContainerProps {
    children: ReactNode;
}
const Container: React.FC<MainContainerProps> = ({ children }) => {
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Colors.light, }]}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        marginTop: Platform.OS === "android" ? 10 : 0,
    },
});

export default Container;