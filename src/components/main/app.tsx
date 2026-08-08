"use client";

import * as React from "react";
import { Sidebar } from "./sidebar/sidebar";
import { MainView } from "./main-view/main-view";
import { TabPage } from "./sidebar/tabs/tabs";
import { UserInfo } from "@/lib/user/user";
import { ReactState } from "@/lib/react-state";

function App({user, userData}: {user: any, userData: UserInfo}) {
    const [currentPage, setCurrentPage] = React.useState<TabPage>("Home");
    const tabState: ReactState<TabPage> = {
        value: currentPage,
        set: setCurrentPage
    }
    return (
        <div className="flex w-full h-screen">
            <div className="w-96 h-screen bg-olive-200 border-r-2 border-olive-300 p-6
                flex flex-col gap-8">
                <Sidebar user={user} userData={userData} tabState={tabState}/>
            </div>
            <div className="flex w-full h-screen">
                <div className="w-2/3 h-screen bg-olive-200">
                    <MainView
                        user={user}
                        userData={userData}
                        tabState={tabState}
                    />
                </div>
                <div className="w-1/3 min-w-64 h-screen bg-olive-200 border-l-2
                    border-olive-300">
                </div>
            </div>
        </div>
    );
}

export {
    App,
}