import { EmployeesLayoutProps } from "../types";


const EmployeesEditLayout = ({ children, modal }: EmployeesLayoutProps) => {

    return (
        <>
            {modal}
            {children}
        </>
    );
};

export default EmployeesEditLayout;