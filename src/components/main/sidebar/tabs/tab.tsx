import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react";
import { TabPage } from "./tabs";
import { ReactState } from "@/lib/react-state";

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
    active,
    tabState,
    currentTab,
}: {
    children: any,
    Icon: LucideIcon,
    active: boolean,
    tabState: ReactState<TabPage>
    currentTab: TabPage
}) {
    return (
        <button
            className={
                `border-2 px-4 rounded-full flex justify-start items-center
                font-medium gap-2 ${active ? `bg-primary border-accent` :
                `hover:border-stone-500`}`
            }
            onClick={() => tabState.set(currentTab)}
        >
            <Icon className="size-[1em]"/>{children}
        </button>
    );
}

export {
    TabList,
    TabItem,
}