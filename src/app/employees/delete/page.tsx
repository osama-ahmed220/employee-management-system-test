import { Navigate } from "@/components";
import { Button } from "@/components/ui/button";

const EmployeeDeletePage = () => {
    return (
        <>
            <Button asChild size="lg" color="muted10">
                <Navigate href={'/employees'}>
                    Go back to listing
                </Navigate>
            </Button>
        </>
    );
};

export default EmployeeDeletePage;