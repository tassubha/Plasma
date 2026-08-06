import { Info } from "@/lib/user/user";
import { Profile } from "./profile/profile";
import { Tabs, TabPageState } from "./tabs/tabs";

function Sidebar({
    user,
    userData,
    tabState
}: {
    user: any,
    userData: Info,
    tabState: TabPageState
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
