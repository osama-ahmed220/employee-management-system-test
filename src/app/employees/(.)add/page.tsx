'use client';

import { AddEmployeeForm } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const AddEmployeePage = () => {

    const router = useRouter();

    return (
        <>
            <Dialog open={true} onOpenChange={(open) => {
                if (!open) {
                    router.back();
                }
            }}>
                <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen h-95">
                    <AddEmployeeForm isDialog />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddEmployeePage;