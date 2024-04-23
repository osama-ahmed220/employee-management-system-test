import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { memo } from "react";
import MoonIcon from '../../public/icons/moon-02.svg';
import SunIcon from '../../public/icons/sun.svg';
import { Button } from "./ui/button";

const ToggleTheme = () => {
    const { setTheme, theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    return (
        <>
            <div className='flex w-full items-center gap-1 rounded-lg bg-muted-5'>
                <Button
                    key='dark'
                    data-active={isDarkTheme}
                    color="muted10"
                    className={cn('w-full text-sm data-[active=true]:bg-muted-20 hover:bg-muted-10')}
                    onClick={() => setTheme('dark')}
                >
                    <MoonIcon className="w-4 h-4" />
                    <span className='ml-2'>Dark</span>
                </Button>
                <Button
                    key='light'
                    data-active={!isDarkTheme}
                    color="muted10"
                    className={cn('w-full text-sm data-[active=true]:bg-muted-20 hover:bg-muted-10')}
                    onClick={() => setTheme('light')}
                >
                    <SunIcon className="w-4 h-4 fill-white" />
                    <span className='ml-2'>Light</span>
                </Button>
            </div>
        </>
    );
};

export default memo(ToggleTheme);