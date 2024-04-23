'use client';

import { useAppStoreActions } from '@/stores';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';

const Navigate = forwardRef<HTMLAnchorElement, INavigateProps>((props, ref) => {
    const { href, children, className, activeClassName, withloading = false } = props;
    const { setIsLoadingStart } = useAppStoreActions();
    const pathname = usePathname();
    function isActive() {
        return pathname.startsWith(`/${href}`);
    }

    return (
        <Link
            ref={ref}
            {...props}
            scroll={false}
            className={`${className} ${isActive() ? activeClassName : ''}`}
            href={href ?? '/'}
            onClick={(e) => {
                if (withloading) {
                    setIsLoadingStart();
                }
                if (props?.onClick) {
                    props.onClick(e);
                }
            }}
        >
            {children}
        </Link>
    );
})
Navigate.displayName = 'Navigate';

export default Navigate;