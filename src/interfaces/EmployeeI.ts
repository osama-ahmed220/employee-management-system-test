import UserI from "./UserI";

interface EmployeeI extends UserI {
    designation?: string;
    summary?: string;
    supervisor: string;
}

export default EmployeeI;