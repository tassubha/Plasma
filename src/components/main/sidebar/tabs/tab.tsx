import { cn } from "@/lib/utils"
import * as React from "react";
import { LucideIcon } from "lucide-react";
import { TabPage } from "./tabs";

function TabList({children, className, ...props}: {children: any, className?: any}) {
    return (
        <div
            className={cn(
                "border-2 border-stone-400 rounded-xl flex flex-col gap-2 p-2",
                className
            )} {...props}>
            {children}
        </div>
    );
}

function TabItem({
    children,
    Icon,
    active=false,
    tabStateSetFn,
    value,
}: {
    children: any,
    Icon: LucideIcon,
    active?: boolean,
    tabStateSetFn: React.Dispatch<React.SetStateAction<TabPage>>,
    value: string
}) {
    return (
        <button className={`border-2 px-4 rounded-full flex justify-start items-center
            font-medium gap-2 ${!active && `hover:border-stone-500`}
            ${active && `bg-(--primary) border-(--accent) shadow-sm/40`}`}
            
            onClick={() => {
                tabStateSetFn(value as TabPage);
            }}>
            <Icon className="size-[1em]"/>{children}
        </button>
    );
}

export {
    TabList,
    TabItem,
}