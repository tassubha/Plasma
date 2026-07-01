import { Register } from "@/components/register/register"
import { SignedInWarning } from "@/components/register/signed-in-warning"
import { createClient } from "@/lib/supabase/server-as-client";

async function Page() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    return (data.user === null ? <Register/> : <SignedInWarning user={data.user}/>);
}

export default Page;
