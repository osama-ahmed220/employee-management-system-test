import { cn } from "@/lib";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


const EmployeeAvatar = ({ photoDisplayUrl, firstName, lastName, className }: EmployeeAvatarProps) => {

    const avatarFallback = useMemo(() => {
        const tempAvatarFallback = `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
        return tempAvatarFallback ? tempAvatarFallback : 'EN'
    }, [firstName, lastName]);

    return (
        <>
            <Avatar className={cn("w-24 h-24", className)}>
                <AvatarImage src={photoDisplayUrl} />
                <AvatarFallback className="bg-muted-10">{avatarFallback}</AvatarFallback>
            </Avatar>
        </>
    );
};

export default EmployeeAvatar;