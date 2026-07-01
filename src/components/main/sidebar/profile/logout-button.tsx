"use client";

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/browser-as-client"
import { useRouter } from "next/navigation";
import * as React from "react";

function LogoutButton() {
    const supabase = createClient();
    const router = useRouter();
    async function logout() {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
    }

    React.useEffect(() => {
        const { data: authStateData } =
            supabase.auth.onAuthStateChange((event, session) => {
                if (session) return;
                router.refresh();
            });

        return () => {
            authStateData.subscription.unsubscribe();
        }
    }, []);

    return (
        <Button onClick={logout}>Logout</Button>
    );
}

export {
    LogoutButton,
}