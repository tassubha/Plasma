import { MoveUpRight } from "lucide-react";

function Page() {
    return (
        <>
            <div className="w-64 sm:w-96 absolute top-1/3 left-1/2 -translate-1/2">
                <h1 className="font-serif text-olive-200 text-2xl sm:text-3xl">
                    An authentication error has occured.
                </h1>
                <p className="text-olive-300 pt-8">Please try again later or{" "}
                    <a href="http://localhost:3000" className="text-amber-50
                        underline">
                        return to home-page<MoveUpRight className="inline
                            size-[1.2em]"/>
                    </a>.
                </p>
            </div>
        </>
    );
}

export default Page;
