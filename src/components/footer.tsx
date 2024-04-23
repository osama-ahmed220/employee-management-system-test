import { useAppStoreIsDesktop } from "@/stores";
import { Fragment } from "react";
import { Navigate } from "./navigate";
import { employeesMenus } from "./sidebar";
import { Button } from "./ui/button";

const Footer = () => {

    const isDesktop = useAppStoreIsDesktop();

    return (
        <>
            <footer className="mt-16 pt-6" id="footer">
                <div className="bg-background pb-20 pt-4 desktop:pb-4">
                    <div className="container flex flex-col justify-between desktop:flex-row">
                        © Emplyee Managemeng System
                    </div>
                </div>
            </footer>
            {!isDesktop &&
                <nav className="bottom-navigation fixed bottom-0 z-50 grid w-[100svw] grid-cols-3 items-center justify-center border-t border-t-muted-10 bg-overlay-50 text-xxs shadow transition-all">
                    {employeesMenus.map(({ title, id, icon: MenuIcon, link }, i) => (
                        <Fragment key={`${id}-${i}`}>
                            <Button asChild className='justify-center whitespace-nowrap select-none font-medium transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 min-h-10 text-xs disabled:text-white/50 [&>svg]:size-4 flex h-16 w-full flex-col items-center gap-1 p-0 text-xxs hover:bg-none rounded-none bg-transparent'>
                                <Navigate href={link}>
                                    <MenuIcon className="w-4 h-4 !fill-gray-400 mr-2" />
                                    {title}
                                </Navigate>
                            </Button>
                        </Fragment>
                    ))}
                </nav>
            }
        </>
    );
};

export default Footer;