import { Navigate } from "@/components";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex items-center justify-between">
            <h2>Employee not found</h2>
            <Button size="lg">
                <Navigate href="/employees">
                    See all Employees
                </Navigate>
            </Button>
        </div>
    );
}