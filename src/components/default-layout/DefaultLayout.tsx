'use client';

import { useSetIsDesktop } from '@/hooks';
import Header from '../header';
import Sidebar from '../sidebar';
import Footer from '../footer';

const DefaultLayout = ({ children }: DefaultLayoutProps) => {

    useSetIsDesktop();

    return (
        <main className='size-full'>
            <Sidebar />
            <Header />
            <div className="transtion-[margin-right] pt-[var(--header-height)] transition-size ease-out will-change-contents desktop:ml-[var(--sidebar-width)] desktop:w-[calc(100%-(var(--sidebar-width)+var(--betslip-width)))]">
                <div className="flex w-full flex-col overflow-auto">
                    <div className="min-h-[calc(100dvh-(var(--header-height)+var(--bottom-navigation-height)))] lg:min-h-[calc(100svh-(var(--header-height)))]" id="root-container">
                        <div className="container space-y-6 pt-4">{children}</div>
                    </div>
                    <Footer />
                </div>
            </div>
        </main>
    );
};

export default DefaultLayout;