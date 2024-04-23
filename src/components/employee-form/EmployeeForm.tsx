'use client';

import { EmployeeFormSchemaObjectType, USER_STORAGE_KEY, cn, employeeFormDefaultValues, employeeFormFieldsArray, employeeFormSchema } from "@/lib";
import { EmployeeS } from "@/services";
import { useAppStoreActions } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormEmployeeCard } from "../form-employee-card";
import { FormInput } from "../form-input";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { Form } from "../ui/form";
import { useToast } from "../ui/use-toast";
import { EmployeeFormProps } from "./types";

const EmployeeForm = ({ isDialog, formType = 'create', formDefaultValues = employeeFormDefaultValues, callServiceMethod, employeeId }: EmployeeFormProps) => {

    const router = useRouter();

    const { toast } = useToast();

    const { setIsLoadingStart, setIsLoadingEnd } = useAppStoreActions();

    const isEdit = formType === 'edit';

    const heading = `${isEdit ? 'Edit' : 'Add'} Employee Form`;

    const form = useForm<EmployeeFormSchemaObjectType>({
        resolver: zodResolver(employeeFormSchema),
        defaultValues: employeeFormDefaultValues,
    });

    useEffect(() => {
        if (isEdit) {
            form.reset(formDefaultValues);
        }
    }, [isEdit, form, formDefaultValues]);

    const onSubmit = useCallback(async ({ photo, photoDisplayUrl: _, ...values }: EmployeeFormSchemaObjectType) => {
        setIsLoadingStart();
        const employeeService = new EmployeeS(USER_STORAGE_KEY);
        const toastData = await callServiceMethod(employeeService, { ...values, photo });
        toast(toastData);
        setIsLoadingEnd();
        if (toastData.variant === 'success') {
            if (!isEdit) {
                form.reset({ ...employeeFormDefaultValues });
            }
            if (isDialog) {
                router.back();
            }
        }
    }, [toast, setIsLoadingStart, setIsLoadingEnd, form, isDialog, router, isEdit, callServiceMethod]);

    return (
        <>
            {isDialog ? <DialogHeader>
                <DialogTitle>{heading}</DialogTitle>
            </DialogHeader> :
                <h3 className="mb-4">{heading}</h3>
            }
            <Form {...form}>
                <div className="grid grid-cols-3 gap-3">
                    <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid grid-cols-2 col-span-3 gap-8", {
                        "desktop:col-span-2": !isDialog
                    })}>
                        {employeeFormFieldsArray.map(({ name, label, isRequired, defaultValue: _, show = true, disabledOnEdit, ...fieldData }, i) => {
                            let disabled = false;
                            if (isEdit && disabledOnEdit) {
                                disabled = true
                            }
                            return (
                                <Fragment key={`${i + 1}-${name}`}>
                                    {show &&
                                        <FormInput<EmployeeFormSchemaObjectType> disabledOnEdit={disabled} name={name} label={`${label}${isRequired ? ' *' : ''}`} {...fieldData} employeeId={employeeId} />
                                    }
                                </Fragment>
                            );
                        })}
                        <Button type="submit" className="col-span-2 w-full">{isEdit ? 'Update' : 'Save'}</Button>
                    </form>
                    <div className={cn("col-span-3", {
                        "desktop:col-span-1": !isDialog
                    })}>
                        <FormEmployeeCard isEdit={isEdit} />
                    </div>
                </div>
            </Form>
        </>
    );
};

export default EmployeeForm;