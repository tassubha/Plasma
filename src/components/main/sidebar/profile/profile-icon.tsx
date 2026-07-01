import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar";

function getIconText(firstName: string): string {
    return `${firstName[0].toUpperCase()}.`;
}

function ProfileIcon({firstName, className=""}: {firstName: string, className?: string}) {
    return (
        <Avatar className={className}>
            <AvatarFallback className="font-serif font-bold text-black border-2
                border-olive-400">
                {getIconText(firstName)}
            </AvatarFallback>
        </Avatar>
    );
}

export {
    ProfileIcon,
};