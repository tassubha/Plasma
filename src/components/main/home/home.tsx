import * as React from "react";
import { Tile } from "./tile"
import { createClient } from "@/lib/supabase/browser-as-client";

function Home({userData}: {userData: any}) {
    const [recipientData, setRecipientData] = React.useState<any[]>();

    React.useEffect(() => {
        const supabase = createClient();
        (async function getData() {
            const { data: posts } = await supabase
                .from("user_posts")
                .select("*");
            if (!posts) return;
            const data = await Promise.all(posts.map(async (e) => {
                const { data: biometric } = await supabase
                    .from("user_biometrics")
                    .select()
                    .eq("id", e.id)
                    .single();
                if (!biometric) return;
                return { ...e, ...biometric };
            }));
            setRecipientData(data);
        })();
    }, []);
    return (
        <div className="flex flex-col gap-4">
        {
            recipientData?.map((e, i) => {
                return (
                    <Tile key={i} userData={e} message={e.message as (string | null)}
                        donationDate={new Date(e.donationDateLimit as string)}/>
                );
            })
        }
        </div>
    );
}

export {
    Home,
}
