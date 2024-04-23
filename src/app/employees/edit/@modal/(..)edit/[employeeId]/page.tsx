'use client';

import { EditEmployeeForm } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const EditEmployee = ({ params: { employeeId } }: EditEmployeeProps) => {

    const router = useRouter();

    return (
        <>
            <Dialog open={true} onOpenChange={(open) => {
                if (!open) {
                    router.back();
                }
            }}>
                <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen h-95">
                    <EditEmployeeForm isDialog employeeId={employeeId} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditEmployee;