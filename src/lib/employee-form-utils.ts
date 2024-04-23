import { FormInput } from "@/components";
import { ComponentProps } from "react";
import validator from "validator";
import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./constants";

export const employeeFormSchema = z.object({
    firstName: z.string().min(3, "First Name must contain at least 3 characters"),
    lastName: z.string().min(3, "Last Name must contain at least 3 characters"),
    email: z.string().email(),
    phoneNumber: z.string().refine(validator.isMobilePhone, "Invalid phone number"),
    designation: z.string().min(1, "Required"),
    summary: z.string().optional(),
    photo: z.any()
        .refine((file) => {
            if (!file) {
                return true;
            }
            return file[0]?.size <= MAX_FILE_SIZE
        }, `Max image size is 5MB.`)
        .refine(
            (file) => {
                if (!file) {
                    return true;
                }
                return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type);
            },
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
    photoDisplayUrl: z.string().optional(),
    supervisor: z.string()
})

type FormSchemaType = typeof employeeFormSchema;

type ZodFormSchemaObjectType = z.infer<FormSchemaType>;

export type EmployeeFormSchemaObjectType = Omit<ZodFormSchemaObjectType, "designation"> & {
    designation?: ZodFormSchemaObjectType['designation'];
};

export type EmployeeFormFieldArrayType = {
    name: keyof EmployeeFormSchemaObjectType;
    defaultValue?: EmployeeFormSchemaObjectType[EmployeeFormFieldArrayType['name']];
    isRequired?: boolean;
    show?: boolean;
} & Omit<ComponentProps<typeof FormInput<EmployeeFormSchemaObjectType>>, "name" | "employeeId">;