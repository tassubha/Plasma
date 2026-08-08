import { UserInfo } from "@/lib/user/user";
import { CreatePost } from "../create-post/create-post";
import { Home } from "../home/home";
import { TabPage } from "../sidebar/tabs/tabs";
import { ReactState } from "@/lib/react-state";

function PageSwitch({
    user,
    userData,
    tabState,
}: {
    user: any,
    userData: UserInfo,
    tabState: ReactState<TabPage>,
}) {
    if (tabState.value === "Home") return <Home/>;
    if (tabState.value === "Create Post")
        return <CreatePost user={user} tabState={tabState}/>;
    return <></>;
}

export {
    PageSwitch,
}