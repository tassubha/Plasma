"use client";

import { 
    Card,
    CardFooter,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/browser-as-client";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import * as React from "react";

function CreatePost({user}: {user: any}) {
    const supabase = createClient();
    const [donationDateLimit, setDonationDateLimit] = React.useState<Date>();

    async function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        const message = (new FormData(e.currentTarget)).get("message") as (string | null);
        const { error: dbError } = await supabase
            .from("user_posts")
            .insert({ 
                id: user.id,
                message: message,
                donationDateLimit: donationDateLimit
            })
            .single();
        if (dbError) console.log(dbError);
    }

    return (
        <form onSubmit={onSubmit}>
            <Card className="w-96 relative left-1/2 -translate-x-1/2">
                <CardContent className="flex flex-col gap-4 items-start">
                    <CardDescription>
                        By submitting a post, you will become a recipient. And will stay
                        as a recipient until your post is deleted or marked as complete.
                        <br/><br/>
                        Please provide a message and donation duration as a date to create
                        a post. All the other necessary information are taken from your
                        account.
                    </CardDescription>
                    <Textarea name="message" rows={7}
                        placeholder={`*this textarea can optionally be blank*`}/>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-between">
                                {donationDateLimit ? format(donationDateLimit, "PPP") :
                                    "Pick donation date limit"}
                                <ChevronDown/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start">
                            <Calendar mode="single" selected={donationDateLimit}
                                onSelect={setDonationDateLimit}
                                defaultMonth={donationDateLimit}/>
                        </PopoverContent>
                    </Popover>
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
