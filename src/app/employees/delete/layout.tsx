import { EmployeesLayoutProps } from "../types";


const EmployeesDeleteLayout = ({ children, modal }: EmployeesLayoutProps) => {

    return (
        <>
            {modal}
            {children}
        </>
    );
};

export default EmployeesDeleteLayout;