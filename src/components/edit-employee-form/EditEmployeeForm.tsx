'use client';

import EmployeeI from "@/interfaces/EmployeeI";
import { EmployeeFormSchemaObjectType, USER_STORAGE_KEY, employeeFormDefaultValues } from "@/lib";
import { EmployeeS } from "@/services";
import { useAppStoreActions } from "@/stores";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { EmployeeForm } from "../employee-form";
import { EditEmployeeFormProps } from "./types";

const EditEmployeeForm = ({ isDialog = false, employeeId }: EditEmployeeFormProps) => {

    const [loaded, setLoaded] = useState(false);
    const [employee, setEmployee] = useState<EmployeeI | undefined>(undefined);
    const [defaultValues, setDefaultVlues] = useState<EmployeeFormSchemaObjectType | undefined>(undefined);

    const { setIsLoadingEnd } = useAppStoreActions();

    useEffect(() => {
        setIsLoadingEnd();
    }, [setIsLoadingEnd]);

    const fetchEmployee = useCallback(async () => {
        const employeeService = new EmployeeS(USER_STORAGE_KEY);
        const employeeData = await employeeService.getEmployeeById(employeeId);
        setLoaded(true);
        setEmployee(employeeData);
    }, [employeeId, setLoaded, setEmployee]);

    useEffect(() => {
        fetchEmployee();
    }, [employeeId, fetchEmployee]);

    useEffect(() => {
        if (employee) {
            let generatedDefaultValues = {} as EmployeeFormSchemaObjectType;
            const defaultValueFieldKeys = Object.keys(employeeFormDefaultValues);
            for (let i = 0; i < defaultValueFieldKeys?.length; i++) {
                const item = defaultValueFieldKeys[i];
                if (employee && employee.hasOwnProperty(item)) {
                    generatedDefaultValues[item as keyof EmployeeFormSchemaObjectType] = employee[item as keyof EmployeeI];
                }
            }
            setDefaultVlues(generatedDefaultValues);
        }
    }, [employee]);

    if (loaded && !employee) {
        notFound();
    }

    return (
        <>
            <EmployeeForm isDialog={isDialog} formType="edit" formDefaultValues={defaultValues} employeeId={employeeId} callServiceMethod={(service, values) => {
                return service.editEmployee({ ...values, id: employeeId }) as Promise<any>;
            }} />
        </>
    );
};

export default EditEmployeeForm;