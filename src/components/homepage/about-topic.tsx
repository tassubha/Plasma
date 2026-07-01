import * as React from "react";
import Image from "next/image";

function AboutTopic({
    bg,
    imagePath,
    imageAlt,
    imageWidth,
    imageHeight,
    imageClassName,
    rtl = false,
    children
}: {
    bg: string,
    imagePath: string,
    imageAlt: string,
    imageWidth: number,
    imageHeight: number,
    imageClassName: string,
    rtl?: boolean,
    children: React.ReactNode
}) {
    let left = <div className="w-1/2 flex flex-col justify-center p-16">{children}</div>;
    let right = (
        <div className="w-1/2 flex justify-center items-center">
            <Image src={imagePath} alt={imageAlt} width={imageWidth}
                height={imageHeight} loading="eager" className={imageClassName}/>
        </div>
    );
    if (rtl) [left, right] = [right, left];
    return (<div className={`w-screen flex ${bg}`}>{left}{right}</div>);
}

export {
    AboutTopic,
};