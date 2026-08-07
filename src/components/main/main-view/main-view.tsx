import { UserInfo } from "@/lib/user/user";
import { TabPage } from "../sidebar/tabs/tabs";
import { HorizontalRuler } from "./horizontal-ruler";
import { PageSwitch } from "./page-switch";

function MainView({user, userData, page}: {user: any, userData: UserInfo, page: TabPage}) {
    const headline = page as string;
    return (
        <>
            <h1 className="font-serif font-bold text-4xl py-2 px-4">{headline}</h1>
            <HorizontalRuler className="bg-stone-400"/>
            <div className="w-full h-full p-4 overflow-auto relative">
                <PageSwitch user={user} userData={userData} page={page}/>
            </div>
        </>
    );
}

export {
    MainView,
}