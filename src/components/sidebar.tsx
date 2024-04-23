import { useAppStoreIsDesktop } from '@/stores';
import { ComponentClass } from 'react';
import AddUserIcon from '../../public/icons/add-user.svg';
import EmployeeListIcon from '../../public/icons/employee-list.svg';
import EmployeesIcon from '../../public/icons/employees.svg';
import Logo from './logo';
import { Navigate } from './navigate';
import ToggleTheme from './toggle-theme';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface EmployeesMenuI {
    id: number;
    title: string;
    icon: ComponentClass<{ className: string }>;
    link: string;
}

const employeesMenus: EmployeesMenuI[] = [
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
                <Button asChild color="muted10" className='w-full bg-transparent flex font-medium text-md justify-start px-3'>
                    <Navigate href="/">
                        Dashboard
                    </Navigate>
                </Button>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger className='rounded-md hover:bg-muted-20 p-3 hover:no-underline data-[state=open]:bg-muted-20 data-[state=open]:rounded-t-md data-[state=open]:rounded-b-none'>
                            <span className='flex items-center'>
                                <EmployeesIcon className="w-4 h-4 fill-gray-400 mr-4" />
                                Employees
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className='flex flex-col pt-3 bg-muted-20 rounded-b-md'>
                            {employeesMenus.map(({ title, id, icon: MenuIcon, link }, i) => (
                                <Button key={`${id}-${i}`} asChild color="muted10" className="w-full bg-transparent text-left justify-start px-5">
                                    <Navigate href={link}>
                                        <div className='flex items-center'>
                                            <MenuIcon className="w-4 h-4 !fill-gray-400 mr-2" />
                                            {title}
                                        </div>
                                    </Navigate>
                                </Button>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Separator className='my-3 bg-muted-5' />
                <ToggleTheme />
            </aside>
        </>
    );
};

export default CustomSidebar;