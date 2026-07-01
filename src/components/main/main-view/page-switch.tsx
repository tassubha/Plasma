import { CreatePost } from "../create-post/create-post";
import { Home } from "../home/home";
import { TabPage } from "../sidebar/tabs/tabs";

function PageSwitch({user, userData, page}: {user: any, userData: any, page: TabPage}) {
    if (page === "home") return <Home userData={userData}/>;
    if (page === "createPost") return <CreatePost user={user}/>;
    return <></>;
}

export {
    PageSwitch,
}