"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Welcome() {
    const router = useRouter();

    function GotoApp() {
        router.replace("/");
    }

    return (
        <div className="absolute left-1/2 top-1/2 -translate-1/2 w-96 min-w-64">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        Thank you for joining our growing community of donors and
                        recipients. Your participation helps us build a reliable platform
                        that connects people, facilitates, blood donations, and makes
                        life-saving support more accessible. We're glad to have you with
                        us.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={GotoApp}>Go to App</Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export {
    Welcome,
};
