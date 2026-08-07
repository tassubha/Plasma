import {
    House,
    Bell,
    Sparkles,
    BadgeAlert,
    Plus,
    Notebook,
    Settings,
    LucideIcon,
} from "lucide-react";
import { TabItem, TabList } from "./tab";
import * as React from "react";

type TabPage = "Home" | "Notifications" | "Experiences" | "Thalassemia" | "Create Post" |
    "Learn" | "Settings";
type TabPageState = {
    value: TabPage,
    setFn: React.Dispatch<React.SetStateAction<TabPage>>,
}
type TabInfo = {
    icon: LucideIcon,
    page: TabPage
}

const tabInfoData: TabInfo[] = [
    { icon: House, page: "Home" },
    { icon: Bell, page: "Notifications" },
    { icon: Sparkles, page: "Experiences" },
    { icon: BadgeAlert, page: "Thalassemia" },
    { icon: Plus, page: "Create Post" },
    { icon: Notebook, page: "Learn" },
    { icon: Settings, page: "Settings" },
];

function Tabs({tabState}: {tabState: TabPageState}) {
    return (
        <TabList>
        {
            tabInfoData.map((e, i) => {
                return (
                    <TabItem Icon={e.icon} active={tabState.value === e.page}
                        tabStateSetFn={tabState.setFn} value={e.page} key={i}>
                        {e.page}
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