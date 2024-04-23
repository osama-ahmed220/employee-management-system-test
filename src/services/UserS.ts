import UserI from "@/interfaces/UserI";
import CrudS from "./CrudS";

abstract class UserS extends CrudS implements UserI {
    id: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phoneNumber: string = '';
    photo?: string | undefined = undefined;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    protected async getUserByEmail(email: string) {
        const userData = await this.getByField<UserI>('email', email);
        return userData;
    }
}

export default UserS;