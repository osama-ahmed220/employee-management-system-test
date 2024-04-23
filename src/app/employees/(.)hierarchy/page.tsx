'use client';

import { HierarchyLayout } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const EmployeeHierarchyPage = () => {

    const router = useRouter();

    return (
        <>
            <Dialog open={true} onOpenChange={(open) => {
                if (!open) {
                    router.back();
                }
            }}>
                <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen h-95">
                    <HierarchyLayout />
                </DialogContent>
            </Dialog>
            <HierarchyLayout />
        </>
    );
};

export default EmployeeHierarchyPage;