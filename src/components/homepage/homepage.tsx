import { ChevronRight, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AboutTopic } from "@/components/homepage/about-topic"

function Homepage()
{
    return (
        <>
            <AboutTopic bg="bg-lime-950" imagePath="/blood_transfer.png"
                imageAlt="blood_transfer.jpg" imageWidth={1264} imageHeight={848}
                imageClassName="w-128">
                <h1 className="text-8xl text-yellow-50 font-serif italic">
                    Plasma
                </h1>
                <p className="text-xl text-olive-200 font-sans pt-8">
                    A community-driven <span className="underline decoration-2">
                        blood donation platform
                    in Bangladesh</span>, built to digitally connect blood donors with
                    those in urgent need — making blood donation faster, more
                    accessible, and helping save millions of lives across the
                    country. <span className="text-xl text-olive-200 font-sans
                        font-bold underline pt-8">
                        Plasma helps donors easily connect with recipients.
                    </span>
                </p>
                <div className="flex gap-4 mt-8">
                    <a href="/login">
                        <Button className="bg-amber-50">
                            Sign in<ChevronRight/>
                        </Button>
                    </a>
                    <p className="text-xl translate-y-1 text-yellow-50 font-bold">
                        or
                    </p>
                    <a href="/register">
                        <Button className="bg-amber-200">
                            Join Community Today<UserRoundPlus/>
                        </Button>
                    </a>
                </div>
            </AboutTopic>

            <AboutTopic bg="bg-olive-950" imagePath="/question_marks.png"
                imageAlt="question_marks.png" imageWidth={1200} imageHeight={1200}
                imageClassName="w-128" rtl>
                <h1 className="text-5xl text-yellow-50 font-serif">
                    <span className="italic">How</span> <span className="underline
                        decoration-2">
                        can it help?
                    </span>
                </h1>
                <p className="text-xl text-olive-200 font-sans pt-8">
                    With Plasma, you can quickly list individuals in need of blood,
                    filter by those you're eligible to donate to and connect with
                    loved ones who require your support. Stay on top of your health
                    with personalized analytics on optimal giving days and receive
                    guidance on a balanced diet after donation. Inspirational stories
                    of the impact of blood donation will motivate you to continue
                    making a difference.
                </p>
            </AboutTopic>

            <div className="w-screen relative flex bg-cyan-950">
                <div className="w-1/2 z-2 flex flex-col justify-center p-16">
                    <h1 className="text-5xl text-yellow-50 font-serif">
                        Every Contribution Creates Impact.
                    </h1>
                    <p className="text-xl text-olive-100 font-sans pt-8">
                        Every blood donation is a chance to save a life and strengthen
                        our community. Thousands of people urgently need blood every
                        day due to accidents, surgeries, and critical illnesses. A
                        single contribution can make a life-changing difference for
                        someone in need. With Plasma, getting connected with donors
                        and recipients is simple, fast, and secure — making safe blood
                        donation more accessible.
                    </p>
                </div>
                <Image src="/clouds.png" alt="clouds.png"
                    width={1920} height={540} loading="eager" className="w-2/3
                    absolute -translate-y-1/2 right-0 top-1/2"/>
            </div>

            <div className="bg-[url(/mountain.webp)] bg-no-repeat bg-position-[50%_60%]
                bg-cover w-screen flex flex-col items-center p-32">
                <h1 className="text-5xl text-yellow-50 text-shadow-sm/50 font-serif">
                    Join <span className="italic">Plasma</span> Today.
                </h1>
                <p className="text-xl text-center text-olive-50 text-shadow-md/70
                        font-sans pt-4">
                    Start your journey with Plasma. Donate blood in a simple, fast and
                    secure way.
                </p>
                <a href="/register">
                    <Button className="mt-4 bg-amber-100">
                        Register Now<ChevronRight/>
                    </Button>
                </a>
            </div>
        </>
    );
}

export {
    Homepage
};
