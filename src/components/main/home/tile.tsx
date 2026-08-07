"use client";

import {
    UserBloodGroups,
    UserDistricts,
} from "@/lib/user/user";
import {
    Phone,
    MapPin
} from "lucide-react";
import { PostInfo } from "@/lib/post";
import * as React from "react";
import { cn } from "@/lib/utils"; 
import { ProfileIcon } from "../sidebar/profile/profile-icon";

function hidePhoneNumber(phoneNumber: string) {
    let result = [...phoneNumber];
    result.fill('X', 3, result.length);
    return result.join('');
}

function Badge({children, className, ...props}: React.ComponentProps<"div">) {
    return (
        <div className={cn(
                "text-sm px-2 rounded-full flex gap-1 items-center",
                className
            )} {...props}>
            {children}
        </div>
    );
}

function Tile({ post }: { post: PostInfo }) {
    const phoneNumber = '0' + (post.phoneNumber as number).toString();
    const hiddenPhoneNumber = hidePhoneNumber(phoneNumber);
    const [isPhoneNumberHidden, setIsPhoneNumberHidden] = React.useState<boolean>(true);
    return (
        <div className="flex flex-col gap-2 bg-olive-300 border-2 border-olive-400
            rounded-xl p-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ProfileIcon username={post.name}/>
                    <p className="text-sm font-bold">
                        {post.name}
                    </p>
                </div>
                <Badge className="font-mono font-bold text-olive-300 bg-green-900 border-2
                    border-green-700 cursor-pointer"
                    onClick={() => { setIsPhoneNumberHidden(!isPhoneNumberHidden) }}>
                    <Phone className="size-[1em]"/>
                    { isPhoneNumberHidden ? hiddenPhoneNumber : phoneNumber }
                </Badge>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Badge className="text-olive-300 bg-red-950 border-2 border-red-800">
                        { UserBloodGroups[post.bloodGroup] }
                    </Badge>
                    <Badge className="text-black font-medium bg-olive-200 border-2
                        border-olive-400">
                        <MapPin className="size-[1em]"/>
                        { UserDistricts[post.district] }
                    </Badge>
                </div>
            </div>
            <div className="font-medium text-sm w-2/3">
            {
                post.additionalMessage &&
                (
                    <>
                        <span className="font-bold underline decoration-2">message</span>
                        <span>: {post.additionalMessage}</span>
                    </>
                )
            }
            </div>
        </div>
    );
}

export {
    Tile,
}