import { EditEmployeeForm } from "@/components";

const EditEmployee = ({ params: { employeeId } }: EditEmployeeProps) => {

    return (
        <>
            <EditEmployeeForm employeeId={employeeId} />
        </>
    );
};

export default EditEmployee;