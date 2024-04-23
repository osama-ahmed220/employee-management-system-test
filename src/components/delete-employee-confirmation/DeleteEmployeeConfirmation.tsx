'use client';

import { USER_STORAGE_KEY, cn } from "@/lib";
import { EmployeeS } from "@/services";
import { useAppStoreActions } from "@/stores";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { Navigate } from "../navigate";
import { Button } from "../ui/button";
import { DialogClose, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useToast } from "../ui/use-toast";

const heading = 'Click on confirm to delete an emplpyee.';

const DeleteEmployeeConfirmation = ({ isDialog = false, employeeId }: DeleteEmployeeConfirmationProps) => {

    const router = useRouter();

    const { toast } = useToast();

    const { setIsLoadingStart, setIsLoadingEnd } = useAppStoreActions();

    useEffect(() => {
        setIsLoadingEnd();
    }, [setIsLoadingEnd]);

    const deleteEmployee = useCallback(async () => {
        setIsLoadingStart();
        const employeeService = new EmployeeS(USER_STORAGE_KEY);
        const isDeleted = await employeeService.deleteEmployee(employeeId);
        if (isDeleted) {
            toast({
                variant: "success",
                title: 'Employee Deleted Successfully',
            });
        } else {
            toast({
                variant: "destructive",
                title: 'There\'s some error while deleting this employee, please try again.',
            });
        }
        setIsLoadingEnd();
        if (isDialog) {
            router.back();
        } else {
            router.push("/employees");
        }
    }, [employeeId, setIsLoadingStart, setIsLoadingEnd, isDialog, router, toast]);

    return (
        <>
            {isDialog ? <DialogHeader>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogDescription>
                    {heading}
                </DialogDescription>
            </DialogHeader> : <h3 className="mb-4 text-center">{heading}</h3>}
            <div className={cn("flex justify-center items-center space-x-3", {
                "justify-end": isDialog
            })}>
                {isDialog ?
                    <DialogClose asChild>
                        <Button color="muted10" size="lg">
                            Cancle
                        </Button>
                    </DialogClose> :
                    <Button asChild color="muted10" size="lg">
                        <Navigate href="/employees">
                            Cancle
                        </Navigate>
                    </Button>
                }
                <Button color="destructive" size="lg" onClick={deleteEmployee}>
                    Confirm
                </Button>
            </div>
        </>
    );
};

export default DeleteEmployeeConfirmation;