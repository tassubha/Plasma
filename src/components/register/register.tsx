"use client"

import * as React from 'react';
import {
    UserInfo,
    UserDistricts,
    UserGetInfo,
} from "@/lib/user/user";
import * as UserAuthChecks from "@/lib/user/auth-checks";
import {
    Field,
    FieldSet,
    FieldGroup,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSeparator
} from "@/components/ui/field";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem
} from "@/components/ui/select";
import {
    MoveUpRight,
    Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/browser-as-client";
import { Welcome } from "@/components/register/welcome";
import { Session } from '@supabase/supabase-js';

function Register() {
    const [messageState, setMessageState] =
        React.useState<UserAuthChecks.AuthMessage>({state: "idle", message: ""});
    const [welcomeUser, setWelcomeUser] = React.useState<boolean>(false);
    let userCredentials = {} as UserInfo;
    const supabase = createClient();

    async function sendUserDataToSupabase(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessageState({...messageState, state: "idle"});
        const form = new FormData(event.currentTarget);
        userCredentials = UserGetInfo(form);
        const email = form.get("email") as string;
        const password = form.get("password") as string;
        const confirmPassword = form.get("confirmPassword") as string;
        const termsAndConditions: any = form.get("termsAndConditions");
        console.log(userCredentials.age);
        if (
            UserAuthChecks.validateAge(userCredentials.age, setMessageState) ||
            UserAuthChecks.validateDistrict(userCredentials.district, setMessageState) ||
            UserAuthChecks.validatePasswordEquality(
                password,
                confirmPassword,
                setMessageState
            ) ||
            UserAuthChecks.validateTermsAndConditions(
                termsAndConditions,
                setMessageState
            )
        ) return;
        const { data, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password
        });
        if (authError) {
            setMessageState({
                state: "error",
                message: ` backend: ${authError.message}.`
            });
            return;
        }
    }

    React.useEffect(() => {
        const { data: authStateData } =
            supabase.auth.onAuthStateChange(async (_: any, session: (Session | null)) => {
            if (!session) return;
            userCredentials.id = session.user.id;
            const { error: dbError } = await supabase
                .from("user_biometrics")
                .insert(userCredentials)
                .single();
            if (dbError) {
                setMessageState({ state: "error", message: ` backend: \
                    ${dbError.message}` });
                return;
            }
            setWelcomeUser(true);
        });
        return () => {
            authStateData.subscription.unsubscribe();
        }
    }, []);

    return (
        <>
            {
            welcomeUser ? <Welcome/> : (
            <div className="absolute left-1/2 top-16 -translate-x-1/2 w-96 min-w-64
                bg-background p-4 rounded-lg border-2">
                <form onSubmit={sendUserDataToSupabase}>
                    <FieldSet>
                        <FieldLegend>Register</FieldLegend>
                        <FieldSeparator/>
                        <FieldGroup className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>Your Name</FieldLabel>
                                <Input name="username" placeholder="Robin"/>
                            </Field>
                            <Field>
                                <FieldLabel>Age</FieldLabel>
                                <Input name="age" placeholder="22"/>
                            </Field>
                        </FieldGroup>
                        <FieldDescription>
                            Donor must be 18 years old to register.
                        </FieldDescription>
                        <FieldGroup className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>District</FieldLabel>
                                <Select name="district">
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder="select district"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        {
                                            UserDistricts.map((e, i) => {
                                                return (
                                                    <SelectItem key={i} value={e}>
                                                        {e}
                                                    </SelectItem>
                                                );
                                            })
                                        }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <FieldDescription>
                                The provided district will be used send relevant
                                notifications & let recipients view your approximate
                                location.
                            </FieldDescription>
                        </FieldGroup>
                        <FieldSeparator/>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input name="email" placeholder="you@example.com"/>
                            </Field>
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input name="password" type="password"/>
                                <FieldDescription>
                                    Passwords must be at least 8 characters long.
                                </FieldDescription>
                            </Field>
                            <Field>
                                <FieldLabel>Confirm Password</FieldLabel>
                                <Input name="confirmPassword" type="password"/>
                            </Field>
                        </FieldGroup>
                        <FieldSeparator/>
                        <Field orientation="horizontal">
                            <Checkbox name="termsAndConditions"/>
                            <FieldLabel>
                                I agree with<span className="font-serif italic font-bold">
                                    Plasma's
                                </span>
                                <a href="/register" className="text-black underline
                                    decoration-2">
                                    Terms &amp; Conditions<MoveUpRight
                                        className="inline size-[1.2em]"
                                        strokeWidth={3}/>
                                </a>
                            </FieldLabel>
                        </Field>
                        <FieldSeparator/>
                        <FieldGroup>
                            {
                                messageState.state == "error" &&
                                <p className="text-xs font-bold text-red-800">
                                    error: {messageState.message}
                                </p>
                            }
                            <Field>
                                <Button type="submit">Register<Sparkles/></Button>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </form>
            </div>)
            }
        </>
    );
}

export {
    Register,
}