"use client";

import { Phone, MapPin, CalendarClock  } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils"; 

import { ProfileIcon } from "../sidebar/profile/profile-icon";
import * as User from "@/lib/user/user";

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"
];

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

function Tile({
    userData,
    message,
    donationDate
}: {
    userData: any,
    message?: string | null,
    donationDate: Date
}) {
    const phoneNumber = '0' + (userData.phoneNumber as number).toString();
    const hiddenPhoneNumber = hidePhoneNumber(phoneNumber);
    const [isPhoneNumberHidden, setIsPhoneNumberHidden] = React.useState<boolean>(true);
    return (
        <div className="flex flex-col gap-2 bg-olive-300 border-2 border-olive-400
            rounded-xl p-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ProfileIcon firstName={userData.firstName}/>
                    <p className="text-sm font-bold">
                        {userData.firstName} {userData.lastName}
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
                        { User.bloodGroups[userData.bloodGroup] }
                    </Badge>
                    <Badge className="text-black font-medium bg-olive-200 border-2
                        border-olive-400">
                        <MapPin className="size-[1em]"/>
                        { User.districts[userData.district] }
                    </Badge>
                </div>
                <Badge className="text-black font-medium bg-yellow-500 border-2
                    border-yellow-700">
                    <CalendarClock className="size-[1em]"/>within{" "}
                    { monthNames[donationDate.getMonth()] } { donationDate.getDate() }
                </Badge>
            </div>
            <div className="font-medium text-sm w-2/3">
            {
                message &&
                (
                    <>
                        <span className="font-bold underline decoration-2">message</span>
                        <span>: {message}</span>
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