"use client";

import { Sidebar } from "./sidebar/sidebar"
import { MainView } from "./main-view/main-view";
import { TabPage } from "./sidebar/tabs/tabs";
import * as React from "react";

function App({user, userData}: {user: any, userData: any}) {
    const [currentPage, setCurrentPage] = React.useState<TabPage>("home");
    return (
        <div className="flex w-full h-screen">
            <div className="w-96 h-screen bg-olive-200 border-r-2 border-olive-300 p-6
                flex flex-col gap-8">
                <Sidebar user={user} userData={userData} tabState={{
                    value: currentPage,
                    setFn: setCurrentPage,
                }}/>
            </div>
            <div className="flex w-full h-screen">
                <div className="w-2/3 h-screen bg-olive-200">
                    <MainView user={user} userData={userData} page={currentPage}/>
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