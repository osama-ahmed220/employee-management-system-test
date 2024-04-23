import { useAppStoreIsDesktop } from '@/stores';
import { ComponentClass, Fragment } from 'react';
import AddUserIcon from '../../public/icons/add-user.svg';
import EmployeeListIcon from '../../public/icons/employee-list.svg';
import HierarcgyStructureIcon from '../../public/icons/hierarchical-structure.svg';
import Logo from './logo';
import { Navigate } from './navigate';
import ToggleTheme from './toggle-theme';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface EmployeesMenuI {
    id: number;
    title: string;
    icon: ComponentClass<{ className: string }>;
    link: string;
}

export const employeesMenus: EmployeesMenuI[] = [
    {
        id: 1,
        title: 'Add Emplyee',
        icon: AddUserIcon,
        link: '/employees/add'
    },
    {
        id: 2,
        title: 'Employee List',
        icon: EmployeeListIcon,
        link: '/employees'
    },
    {
        id: 3,
        title: 'Employee Hierarchy',
        icon: HierarcgyStructureIcon,
        link: '/employees/hierarchy'
    },
];

const CustomSidebar = () => {

    const isDesktop = useAppStoreIsDesktop();

    if (!isDesktop) {
        return null;
    }

    return (
        <>
            <aside className='z-50 desktop:fixed left-0 top-0 flex h-full shrink-0 flex-col overflow-auto bg-background px-4 pb-8 transition-[width] duration-200 ease-out will-change-auto w-sidebar-width desktop:bg-overlay desktop:shadow overflow-x-hidden'>
                <div className='hidden h-16 items-center desktop:flex mb-6'>
                    <Navigate href='/'>
                        <Logo />
                    </Navigate>
                </div>
                {employeesMenus.map(({ title, id, icon: MenuIcon, link }, i) => (
                    <Fragment key={`${id}-${i}`}>
                        <Button asChild color="muted10" className='w-full bg-transparent flex font-medium text-md justify-start px-3'>
                            <Navigate href={link}>
                                <div className='flex items-center'>
                                    <MenuIcon className="w-4 h-4 !fill-gray-400 mr-2" />
                                    {title}
                                </div>
                            </Navigate>
                        </Button>
                    </Fragment>
                ))}
                <Separator className='my-3 bg-muted-5' />
                <ToggleTheme />
            </aside>
        </>
    );
};

export default CustomSidebar;