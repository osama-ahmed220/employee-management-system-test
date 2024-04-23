import { DeleteEmployeeConfirmation } from "@/components";

const DeleteEmployee = ({ params: { employeeId } }: DeleteEmployeeProps) => {

    return (
        <>
            <DeleteEmployeeConfirmation employeeId={employeeId} />
        </>
    );
};

export default DeleteEmployee;