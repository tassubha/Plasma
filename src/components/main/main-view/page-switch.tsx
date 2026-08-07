import { Info } from "@/lib/user/user";
import { CreatePost } from "../create-post/create-post";
import { Home } from "../home/home";
import { TabPage } from "../sidebar/tabs/tabs";

function PageSwitch({user, userData, page}: {user: any, userData: Info, page: TabPage}) {
    if (page === "Home") return <Home userData={userData}/>;
    if (page === "Create Post") return <CreatePost user={user}/>;
    return <></>;
}

export {
    PageSwitch,
}