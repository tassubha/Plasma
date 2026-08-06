import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar";

function getIconText(username: string): string {
    return `${username[0].toUpperCase()}.`;
}

function ProfileIcon({username, className=""}: {username: string, className?: string}) {
    return (
        <Avatar className={className}>
            <AvatarFallback className="font-serif font-bold text-black border-2
                border-olive-400">
                {getIconText(username)}
            </AvatarFallback>
        </Avatar>
    );
}

export {
    ProfileIcon,
};