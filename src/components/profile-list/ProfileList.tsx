import { cn } from "@/lib";
import { ProfileCard } from "../profile-card";
import { ProfileListProps } from "./types";

const ProfileList = ({ profiles = [] }: ProfileListProps) => {
    return (
        <ul className="flex flex-row mt-10 justify-center">
            <div className="-mt-10 border-l-2 absolute h-10 border-gray-400" />
            {profiles.map((profile, idX) => {
                const len = profiles.length;
                return (
                    <li key={idX} className="relative p-6">
                        <div
                            className={cn("border-t-2 absolute h-8 border-gray-400 top-0 left-0 right-0", {
                                "left-2/4": idX === 0,
                                "right-2/4": idX === len - 1
                            })}
                        />
                        <div className="relative flex justify-center">
                            <div className="-mt-6 border-l-2 absolute h-6 border-gray-400 top-0" />
                            <ProfileCard {...profile} id={idX} name={`${profile.firstName} ${profile.lastName}`} designation={profile.designation!} />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default ProfileList;
