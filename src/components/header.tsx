import { useAppStoreIsDesktop } from '@/stores';
import Logo from './logo';
import { Navigate } from './navigate';
import ToggleTheme from './toggle-theme';

const Header = () => {

    const isDesktop = useAppStoreIsDesktop();

    return (
        <>
            <header className='h-header-height fixed right-0 top-0 z-40 w-full border-b  border-b-muted-5 bg-overlay pr-[var(--removed-body-scroll-bar-size,0px)] shadow transition-size desktop:pl-[var(--sidebar-width)] desktop:pr-[calc(var(--betslip-width)+var(--removed-body-scroll-bar-size,0px))]'>
                <div className="container flex items-center justify-between rounded-xl py-3  desktop:w-[calc(100vw-(var(--sidebar-width)+var(--betslip-width)))] desktop:justify-end">
                    {!isDesktop && (
                        <Navigate href='/'>
                            <Logo />
                        </Navigate>
                    )}
                    <div className="w-40">
                        <ToggleTheme onlyIcons />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;