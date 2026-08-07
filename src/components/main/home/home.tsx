import * as React from "react";
import { Tile } from "./tile";
import { createClient } from "@/lib/supabase/browser-as-client";
import { PostInfo } from "@/lib/post";

function Home() {
    const [recipientData, setRecipientData] = React.useState<PostInfo[]>();
    const supabase = createClient();

    React.useEffect(() => {
        (async function getTileData() {
            const { data: posts } = await supabase
                .from("user_posts")
                .select("*");
            if (!posts) return;
            setRecipientData(posts);
        })();
    }, []);

    return (
        <div className="flex flex-col gap-4">
        {
            recipientData?.map((e, i) => {
                return <Tile post={e} key={i} />;
            })
        }
        </div>
    );
}

export {
    Home,
}
