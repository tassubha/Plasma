import { ProfileIcon } from "./profile-icon";
import { LogoutButton } from "./logout-button";

function Profile({user, userData}: {user: any, userData: any}) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <ProfileIcon firstName={userData.firstName}/>
                <p className="text-sm font-bold">
                    {userData.firstName} {userData.lastName}
                </p>
            </div>
            <LogoutButton/>
        </div>
    )
}

export {
    Profile,
}