import EmployeeI from "./EmployeeI";

interface ProfileI extends EmployeeI {
    profiles?: ProfileI[]
}

export default ProfileI;