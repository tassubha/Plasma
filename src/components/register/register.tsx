"use client"

import * as React from 'react';
import * as User from "@/lib/user/user";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoveUpRight, Sparkles, Slash } from "lucide-react";
import { createClient } from "@/lib/supabase/browser-as-client"
import { Welcome } from "@/components/register/welcome"

function Register() {
    const [messageState, setMessageState] =
        React.useState<UserAuthChecks.AuthMessage>({state: "idle", message: ""});
    const [welcomeUser, setWelcomeUser] = React.useState<boolean>(false);
    let userCredentials = {} as User.Info;
    const supabase = createClient();

    async function sendUserDataToSupabase(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessageState({...messageState, state: "idle"});
        const form = new FormData(event.currentTarget);
        userCredentials = User.getUserInfo(form);
        const password = form.get("password") as string;
        const confirmPassword = form.get("confirmPassword") as string;
        const termsAndConditions: any = form.get("termsAndConditions");

        if (
            UserAuthChecks.validateNames(
                userCredentials.firstName,
                userCredentials.lastName,
                setMessageState
            ) ||
            UserAuthChecks.validateDateOfBirthFields(form, setMessageState) ||
            UserAuthChecks.validateDateOfBirth(
                userCredentials.dateOfBirth,
                setMessageState
            ) ||
            UserAuthChecks.validateDistrict(userCredentials.district, setMessageState) ||
            UserAuthChecks.validateBloodGroup(
                userCredentials.bloodGroup,
                setMessageState
            ) ||
            UserAuthChecks.validatePhoneNumber(
                userCredentials.phoneNumber,
                setMessageState
            ) ||
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
            email: userCredentials.email,
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
            supabase.auth.onAuthStateChange(async (event, session) => {
            if (!session) return;
            const { error: dbError } = await supabase
                .from("user_biometrics")
                .insert({
                    id: session.user.id,
                    firstName: userCredentials.firstName,
                    lastName: userCredentials.lastName,
                    dateOfBirth: userCredentials.dateOfBirth,
                    district: userCredentials.district,
                    bloodGroup: userCredentials.bloodGroup,
                    phoneNumber: Number(userCredentials.phoneNumber),
                })
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
                bg-(--background) p-4 rounded-lg border-2">
                <form onSubmit={sendUserDataToSupabase}>
                    <FieldSet>
                        <FieldLegend>Register</FieldLegend>
                        <FieldGroup className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel>First Name</FieldLabel>
                                <Input name="firstName" placeholder="Robin"/>
                            </Field>
                            <Field>
                                <FieldLabel>Last Name</FieldLabel>
                                <Input name="lastName" placeholder="Ahmed"/>
                            </Field>
                        </FieldGroup>
                        <FieldDescription>
                            First &amp; last names must have their first letter
                            capitalized and all other letters lowercased.
                        </FieldDescription>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Date of Birth</FieldLabel>
                                <div className="flex gap-2">
                                <Input name="day" type="number" placeholder="DD"/>
                                /
                                <Input name="month" type="number" placeholder="MM"/>
                                /
                                <Input name="year" type="number" placeholder="YYYY"/>
                                </div>
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
                                            User.districts.map((e, i) => {
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
                            <Field>
                                <FieldLabel>Blood Group</FieldLabel>
                                <Select name="bloodGroup">
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder="select blood group"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        {
                                            User.bloodGroups.map((e, i) => {
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
                        </FieldGroup>
                        <Field>
                            <FieldLabel>Phone Number</FieldLabel>
                            <Input type="number" name="phoneNumber"
                                placeholder="017XXXXXXX"/>
                        </Field>
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