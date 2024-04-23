'use client';

import { DeleteEmployeeConfirmation } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const DeleteEmployee = ({ params: { employeeId } }: DeleteEmployeeProps) => {

    const router = useRouter();

    return (
        <>
            <Dialog open={true} onOpenChange={(open) => {
                if (!open) {
                    router.back();
                }
            }}>
                <DialogContent>
                    <DeleteEmployeeConfirmation isDialog employeeId={employeeId} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DeleteEmployee;