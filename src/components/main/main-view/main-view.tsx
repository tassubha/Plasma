import { tabInfoData, TabPage } from "../sidebar/tabs/tabs";
import { HorizontalRuler } from "./horizontal-ruler";
import { PageSwitch } from "./page-switch";

function MainView({user, userData, page}: {user: any, userData: any, page: TabPage}) {
    const headline = tabInfoData.find(e => e.page === page)!.name;
    return (
        <>
            <h1 className="font-serif font-bold text-4xl py-2 px-4">{headline}</h1>
            <HorizontalRuler className="bg-stone-400"/>
            <div className="w-full h-90/100 p-4 overflow-auto">
                <PageSwitch user={user} userData={userData} page={page}/>
            </div>
        </>
    );
}

export {
    MainView,
}