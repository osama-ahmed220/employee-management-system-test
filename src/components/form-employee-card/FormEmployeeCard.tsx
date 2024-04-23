import { EmployeeFormSchemaObjectType, designationData, getValueFromArray } from "@/lib";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { EmployeeAvatar } from "../employee-avatar";
import { Navigate } from "../navigate";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

const FormEmployeeCard = ({ isEdit }: FormEmployeeCardProps) => {

    const { firstName, lastName, designation, summary, email, phoneNumber, photoDisplayUrl, photo } = useWatch<EmployeeFormSchemaObjectType>();

    const displayPhoto = useMemo(() => {
        if (isEdit) {
            return photo;
        }
        return photoDisplayUrl;
    }, [photoDisplayUrl, photo, isEdit]);

    const emailFallback = useMemo(() => {
        return email ? email : 'employee_email@domain.com'
    }, [email]);

    const phoneNumberFallback = useMemo(() => {
        return phoneNumber ? phoneNumber : '(415) 555‑0132'
    }, [phoneNumber]);

    const designationValue = getValueFromArray(designationData, designation);

    return (
        <>
            <Card>
                <CardHeader className="flex-row items-center space-x-3">
                    <EmployeeAvatar photoDisplayUrl={displayPhoto} firstName={firstName} lastName={lastName} />
                    <div className="space-y-1.5 ">
                        <CardTitle>{!firstName ? 'Employee Name' : `${firstName} ${lastName}`}</CardTitle>
                        <CardDescription>{!designationValue ? 'Employee Designation' : designationValue}</CardDescription>
                    </div>
                </CardHeader>
                {summary &&
                    <CardContent className="space-y-1.5">
                        <h5>Summary</h5>
                        <CardDescription>{summary}</CardDescription>
                    </CardContent>
                }
                <CardFooter className="flex-col items-start">
                    <h5>Contact</h5>
                    <Navigate href={`mailto:${emailFallback}`}>
                        <CardDescription>{emailFallback}</CardDescription>
                    </Navigate>
                    <Navigate href={`tel:${phoneNumberFallback}`}>
                        <CardDescription>{phoneNumberFallback}</CardDescription>
                    </Navigate>
                </CardFooter>
            </Card>
        </>
    )
};

export default FormEmployeeCard;