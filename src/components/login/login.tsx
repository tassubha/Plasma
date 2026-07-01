"use client"

import * as React from "react";
import
{
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MoveRight, MoveUpRight } from "lucide-react";
import { createClient } from "@/lib/supabase/browser-as-client";
import { useRouter } from "next/navigation";
import { AuthMessage } from "@/lib/user/auth-checks";

function Login() {
    const supabase = createClient();
    const router = useRouter();
    const [messageState, setMessageState] =
        React.useState<AuthMessage>({state: "idle", message: ""});

    async function loginUser(event: any) {
        event.preventDefault();
        setMessageState({...messageState, state: "idle"});
        const inputData = new FormData(event.currentTarget);
        const email = inputData.get("email") as string;
        const password = inputData.get("password") as string;
        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (authError) {
            setMessageState({
                state: "error",
                message: ` backend: ${authError.message}`
            });
            return;
        }
    }

    React.useEffect(() => {
        const { data: authStateData } =
            supabase.auth.onAuthStateChange((event, session) => {
                if (!session) return;
                router.replace("/");
            });

        return () => {
            authStateData.subscription.unsubscribe();
        }
    }, []);

    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-1/2 w-96 min-w-64">
                <form onSubmit={loginUser}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign in</CardTitle>
                            <CardDescription>
                                Sign in to your already created account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label>Email</Label>
                                    <Input name="email" placeholder="you@example.com"
                                        type="email" required/>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Password</Label>
                                    <Input name="password" placeholder="••••••••••"
                                        type="password" required/>
                                </div>
                            </div>
                            {
                                messageState.state == "error" && 
                                    <p className="mt-4 text-xs font-bold text-red-800">
                                        error: {messageState.message}
                                    </p>
                            }
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <p className="text-xs font-bold text-(--muted-foreground)">
                                Do not have an account yet? <a href="/register"
                                    className="text-black underline decoration-2">
                                    Register<MoveUpRight className="inline size-[1.2em]"
                                        strokeWidth={3}/>
                                </a>
                            </p>
                            <Button type="submit">Login<MoveRight/></Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </>
    );
}

export {
    Login,
};