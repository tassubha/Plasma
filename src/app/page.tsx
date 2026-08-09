import { Homepage } from "@/components/homepage/homepage";
import { App } from "@/components/main/app";
import { createClient } from "@/lib/supabase/server-as-client";
import { UserInfo } from "@/lib/user/user";

async function Page() {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    if (authData.user === null) return <Homepage/>;
    const { data: dbData, error: dbError } = await supabase
        .from("user_info")
        .select("*")
        .eq("id", authData.user.id)
        .single();
    if (dbError) return (<h1>A backend error has occurred. Please try again later.</h1>);
    return <App user={authData.user} userData={dbData as UserInfo}/>;
}

export default Page;
