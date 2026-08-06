import { ProfileIcon } from "./profile-icon";
import { LogoutButton } from "./logout-button";
import { Info } from "@/lib/user/user";

function Profile({user, userData}: {user: any, userData: Info}) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <ProfileIcon username={userData.username}/>
                <p className="text-sm font-bold">
                    {userData.username}
                </p>
            </div>
            <LogoutButton/>
        </div>
    )
}

export {
    Profile,
}