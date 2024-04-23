import { EmployeeAvatar } from "../employee-avatar";
import { ProfileList } from "../profile-list";

const ProfileCard = ({ id, name, designation, profiles = [], photo, firstName, lastName }: ProfileCardProps) => {
    return (
        <div className="text-center">
            <div className="flex flex-col justify-center items-center">
                <EmployeeAvatar photoDisplayUrl={photo} firstName={firstName} lastName={lastName} className="w-16 h-16" />
                <div className="text-gray-600">
                    <p>{name}</p>
                    <p>{designation}</p>
                </div>
            </div>
            {profiles.length > 0 && <ProfileList profiles={profiles} />}
        </div>
    );
};

export default ProfileCard;
