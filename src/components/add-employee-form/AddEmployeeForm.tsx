'use client';

import { EmployeeForm } from "../employee-form";

const AddEmployeeForm = ({ isDialog = false }: AddEmployeeFormProps) => {

    return (
        <>
            <EmployeeForm isDialog={isDialog} formType="create" callServiceMethod={(service, values) => {
                return service.addEmployee(values) as Promise<any>;
            }} />
        </>
    );
};

export default AddEmployeeForm;