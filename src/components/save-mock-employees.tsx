'use client';

import { USER_STORAGE_KEY, mockEmployeeData } from "@/lib";
import { useCallback, useEffect } from "react";

const SaveMockEmployees = () => {

    const addAllEmployees = useCallback(async () => {
        const isMocked = JSON.parse(localStorage.getItem('isMocked') || 'false');
        if (!isMocked) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockEmployeeData));
            localStorage.setItem('isMocked', JSON.stringify(true));
        }
    }, []);

    useEffect(() => {
        addAllEmployees();
    }, [addAllEmployees]);

    return null;
};

export default SaveMockEmployees;