import { cn } from "@/lib/utils";

function HorizontalRuler({className}: {className?: string}) {
    return (<div className={cn("w-full h-[2px]", className)}/>);
}

export {
    HorizontalRuler,
}