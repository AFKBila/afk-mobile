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
            <Stack.Screen name="menu/privacy/blocked-profiles" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/privacy/mentions" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/privacy/online-status" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/privacy/birthday" options={{
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
            <Stack.Screen name="menu/activity" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/language" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/interests" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/archive" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/invite-friends" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/more" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/more/about" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/account/change-password" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="menu/switch-accounts" options={{
                headerShown: false,
                animation: 'slide_from_right'
            }} />
        </Stack>
    );
}
