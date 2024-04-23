'use client';

import { Navigate } from "@/components";
import { Button } from "@/components/ui/button";
import EmployeeI from "@/interfaces/EmployeeI";
import { USER_STORAGE_KEY } from "@/lib";
import { EmployeeS } from "@/services";
import { useAppStoreActions } from "@/stores";
import { useCallback, useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const EmployeesPage = () => {
    const [employeeData, setEmployeeData] = useState<EmployeeI[]>([]);

    const { setIsLoadingStart, setIsLoadingEnd } = useAppStoreActions();

    const fetchEmployees = useCallback(async () => {
        setIsLoadingStart();
        const employeeService = new EmployeeS(USER_STORAGE_KEY);
        const data: EmployeeI[] = await employeeService.getAllEmployees();
        data.sort((a, b) => {
            let dateA = new Date(a.createdAt) as never as number;
            let dateB = new Date(b.createdAt) as never as number;
            return dateB - dateA;
        })
        setEmployeeData(data);
        setIsLoadingEnd();
    }, [setIsLoadingStart, setEmployeeData, setIsLoadingEnd]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    return (
        <>
            <div className="flex items-center justify-between">
                <h3>All Employees</h3>
                <div className="flex items-center space-x-4">
                    <Button color="muted10" size="lg" asChild>
                        <Navigate href="/employees/hierarchy">
                            View Hierarchy
                        </Navigate>
                    </Button>
                    <Button color="muted10" size="lg" asChild>
                        <Navigate href="/employees/add">
                            Add an Employee
                        </Navigate>
                    </Button>
                </div>
            </div>
            <DataTable columns={columns} data={employeeData} />
        </>
    );
};

export default EmployeesPage;