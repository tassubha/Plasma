import {
    TabPage,
    Tabs,
} from "./tabs/tabs";
import { UserInfo } from "@/lib/user/user";
import { Profile } from "./profile/profile";
import { ReactState } from "@/lib/react-state";

function Sidebar({
    user,
    userData,
    tabState
}: {
    user: any,
    userData: UserInfo,
    tabState: ReactState<TabPage>
}) {
    return (
        <>
            <Profile user={user} userData={userData}/>
            <Tabs tabState={tabState}/>
        </>
    );
}

export {
    Sidebar,
}
