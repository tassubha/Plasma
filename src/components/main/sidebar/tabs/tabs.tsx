import {
    House,
    Plus,
    Notebook,
    Settings,
    LucideIcon,
    Bell
} from "lucide-react";
import { TabItem, TabList } from "./tab";
import * as React from "react";

type TabPage = "home" | "notifications" |"createPost" | "learn" | "settings";
type TabPageState = {
    value: TabPage,
    setFn: React.Dispatch<React.SetStateAction<TabPage>>,
}
type TabInfo = {
    icon: LucideIcon,
    name: string,
    page: TabPage
}

const tabInfoData: TabInfo[] = [
    { icon: House, name: "Home", page: "home" },
    { icon: Bell, name: "Notifications", page: "notifications"},
    { icon: Plus, name: "Create Post", page: "createPost" },
    { icon: Notebook, name: "Learn", page: "learn" },
    { icon: Settings, name: "Settings", page: "settings" },
];

function Tabs({tabState}: {tabState: TabPageState}) {
    return (
        <TabList>
        {
            tabInfoData.map((e, i) => {
                return (
                    <TabItem Icon={e.icon} active={tabState.value === e.page}
                        tabStateSetFn={tabState.setFn} value={e.page} key={i}>
                        {e.name}
                    </TabItem>
                );
            })
        }
        </TabList>
    );
}

export type {
    TabPage,
    TabPageState,
    TabInfo,
}

export {
    Tabs,
    tabInfoData,
}