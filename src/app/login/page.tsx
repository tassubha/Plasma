import { Login } from "@/components/login/login";
import { SignedInWarning } from "@/components/login/signed-in-warning";
import { createClient } from "@/lib/supabase/server-as-client";

async function Page() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    return (data.user == null ? <Login/> : <SignedInWarning user={data.user}/>);
}

export default Page;
