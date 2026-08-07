"use client";

import * as React from "react";
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/browser-as-client"
import { useRouter } from "next/navigation";

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
        <Button className="border-2 border-green-950" onClick={logout}>Logout</Button>
    );
}

export {
    LogoutButton,
}