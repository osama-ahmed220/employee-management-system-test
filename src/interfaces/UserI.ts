
interface UserI {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    photo?: string;
    createdAt: Date;
    updatedAt: Date;
}

export default UserI;