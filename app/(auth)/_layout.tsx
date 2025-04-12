import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name="login" />
            <Stack.Screen name="get-started" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="profile-setup" />
            <Stack.Screen name="photo" />
            <Stack.Screen name="country" />
            <Stack.Screen name="final-signup" />
        </Stack>
    );
};

export default Layout;