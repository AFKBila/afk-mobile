import { Stack } from 'expo-router/stack';

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="notifications" options={{ headerShown: false }} />
            <Stack.Screen name="favourite" options={{ headerShown: false }} />
        </Stack>
    );
}
