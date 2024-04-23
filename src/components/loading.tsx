'use client';

import { cn } from "@/lib";
import { useAppStoreIsLoading } from "@/stores";

const Loading = () => {
    const isAppLoading = useAppStoreIsLoading();

    return (
        <>
            <div className={cn("w-full h-full fixed bg-black/80 top-0 z-50 transition-opacity ease-in-out delay-150 duration-300 flex items-center justify-center", {
                "opacity-0 -z-50": !isAppLoading,
                "opacity-100": isAppLoading
            })}>
                <div className="relative flex w-44 h-44">
                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/20 opacity-75" />
                    <div className="relative inline-flex w-44 h-44 flex-col items-center justify-center animate-pulse bg-white/10 text-center rounded-full">
                        <h5 className="after:inline-block after:animate-dotty after:content-[''] text-white">Loading</h5>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Loading;