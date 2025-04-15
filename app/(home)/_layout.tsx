import { Stack } from 'expo-router/stack';

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
        }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="notifications" options={{ headerShown: false }} />
            <Stack.Screen name="favourite" options={{ headerShown: false }} />
            <Stack.Screen name="menu" options={{
                headerShown: false,
                animation: 'slide_from_right',
                presentation: 'modal'
            }} />
            <Stack.Screen name="menu/notifications" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/privacy" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/blocked-profiles" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/account" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/saved" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/liked" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/help" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
        </Stack>
    );
}
