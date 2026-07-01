"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/browser-as-client";
import { useRouter } from "next/navigation";
import * as React from "react";

function SignedInWarning({user}: {user: any}) {
    const supabase = createClient();
    const router = useRouter();

    function GotoApp() {
        router.replace("/");
    }

    async function GotoForm() {
        const { error } = await supabase.auth.signOut();
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
        <>
            <div className="absolute left-1/2 top-1/2 -translate-1/2 w-96 min-w-64">
                <Card>
                    <CardHeader>
                        <CardTitle>Account present!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            An account created with <b>{user.email}</b> is present. Please
                            logout and create a new account or go to App.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-4">
                        <Button variant="link" onClick={GotoApp}>Go back to App</Button>
                        <Button onClick={GotoForm}>Logout &amp; Register</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export {
    SignedInWarning,
};
