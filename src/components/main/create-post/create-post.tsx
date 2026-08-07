"use client";

import { 
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSeparator
} from "@/components/ui/field";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/browser-as-client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
    UserInfo,
    UserDistricts,
    UserBloodGroups,
} from "@/lib/user/user"

function CreatePost({user}: {user: any}) {
    const supabase = createClient();

    async function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get("name") as string;
        const phoneNumber = form.get("phoneNumber") as string;
        const district = form.get("district") as string;
        const bloodGroup = form.get("bloodGroup") as string;
        const additionalMessage = form.get("additionalMessage") as string;
        const { error: dbError } = await supabase
            .from("user_posts")
            .insert({ 
                id: user.id,
                name: name,
                phoneNumber: phoneNumber,
                district: UserDistricts.indexOf(district),
                bloodGroup: UserBloodGroups.indexOf(bloodGroup),
                additionalMessage: additionalMessage,
            })
            .single();
        if (dbError) console.log(dbError);
    }

    return (
        <form onSubmit={onSubmit}>
            <Card className="w-96 absolute top-2/5 left-1/2 -translate-1/2">
                <CardHeader>
                    <CardTitle>Post for a Recipient</CardTitle>
                </CardHeader>
                <FieldSeparator/>
                <CardContent className="flex flex-col gap-4 items-start">
                    <FieldGroup className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel>Name</FieldLabel>
                            <Input name="name" type="text" required={true} />
                        </Field>
                        <Field>
                            <FieldLabel>Phone Number</FieldLabel>
                            <Input name="phoneNumber" type="number"
                                placeholder="017XXXXXXXX" required={true} />
                        </Field>
                    </FieldGroup>
                    <FieldGroup className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel>District</FieldLabel>
                            <Select name="district" required={true}>
                                <SelectTrigger>
                                    <SelectValue placeholder="select district"/>
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
                        <Field>
                            <FieldLabel>Blood Group</FieldLabel>
                            <Select name="bloodGroup" required={true}>
                                <SelectTrigger>
                                    <SelectValue placeholder="select blood group"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    {
                                        UserBloodGroups.map((e, i) => {
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
                        <FieldLabel>Additional Message (optional)</FieldLabel>
                        <Textarea name="additionalMessage" />
                    </Field>
                </CardContent>
                <CardFooter className="flex justify-end p-4">
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export {
    CreatePost,
}
