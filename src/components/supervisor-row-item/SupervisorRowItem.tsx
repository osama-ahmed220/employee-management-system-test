'use client';

import EmployeeI from "@/interfaces/EmployeeI";
import { USER_STORAGE_KEY } from "@/lib";
import { EmployeeS } from "@/services";
import { useCallback, useEffect, useState } from "react";
import { EmployeeAvatar } from "../employee-avatar";

const SupervisorRowItem = ({ id }: SupervisorRowItemProps) => {
    const [supervisor, setSupervisor] = useState<EmployeeI | undefined>(undefined);

    const fetchSupervisor = useCallback(async () => {
        const employeeService = new EmployeeS(USER_STORAGE_KEY);
        const s = await employeeService.getMySupervisor(id);
        if (s) {
            setSupervisor(s);
        }
    }, [id]);

    useEffect(() => {
        fetchSupervisor();
    }, [id, fetchSupervisor]);

    if (!supervisor) {
        return (
            <>
                N/A
            </>
        );
    }

    return (
        <>
            <div className="flex items-center justify-start space-x-3">
                <EmployeeAvatar photoDisplayUrl={supervisor.photo} firstName={supervisor.firstName} lastName={supervisor.lastName} className="w-12 h-12" />
                <h4>{supervisor.firstName} {supervisor.lastName}</h4>
            </div>
        </>
    );
};

export default SupervisorRowItem;