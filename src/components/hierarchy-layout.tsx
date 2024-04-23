'use client';

import ProfileI from "@/interfaces/ProfileI";
import { USER_STORAGE_KEY } from "@/lib";
import { EmployeeS } from "@/services";
import { useCallback, useEffect, useState } from "react";
import { ProfileCard } from "./profile-card";

const HierarchyLayout = () => {
    const [profiles, setProfiles] = useState<ProfileI[]>([]);

    const fetchProfile = useCallback(async () => {
        const employeeService = new EmployeeS(USER_STORAGE_KEY);
        const allProfiles = await employeeService.getAllProfiles();
        setProfiles(allProfiles);
    }, [setProfiles]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="container mx-auto text-center pt-32">
                    <div className="items-center justify-center flex">
                        {profiles && profiles.map((profile, idX) => {
                            return (
                                <ProfileCard key={idX} {...profile} name={`${profile.firstName} ${profile.lastName}`} designation={profile.designation!} id={idX} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HierarchyLayout;