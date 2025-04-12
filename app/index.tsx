import React, { useEffect, useState } from "react";
import { Redirect } from 'expo-router';
import GetStarted from "./(auth)/get-started";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const Page = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("user", user);
            setUser(user);
        });
    }, []);

    if (user) return <Redirect href="/(auth)/login" />;

    return (
        <GetStarted />
    );
};

export default Page;