import { ProfileIcon } from "./profile-icon";
import { LogoutButton } from "./logout-button";
import { UserInfo } from "@/lib/user/user";

function Profile({user, userData}: {user: any, userData: UserInfo}) {
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