import { UserInfo } from "@/lib/user/user";
import { TabPage } from "../sidebar/tabs/tabs";
import { HorizontalRuler } from "./horizontal-ruler";
import { PageSwitch } from "./page-switch";
import { ReactState } from "@/lib/react-state";

function MainView({
    user,
    userData,
    tabState,
}: {
    user: any,
    userData: UserInfo,
    tabState: ReactState<TabPage>
}) {
    return (
        <div className="flex flex-col h-screen">
            <h1 className="font-serif font-bold text-4xl py-2 px-4">{tabState.value}</h1>
            <HorizontalRuler className="bg-stone-400"/>
            <div className="flex-1 p-4 overflow-auto relative">
                <PageSwitch
                    user={user}
                    userData={userData}
                    tabState={tabState}
                />
            </div>
        </div>
    );
}

export {
    MainView,
}