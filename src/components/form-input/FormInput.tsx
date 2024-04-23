'use client';

import { EmployeeFormSchemaObjectType } from "@/lib";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FieldPath, FieldValues, useFormContext, useWatch } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { FormInputProps, FormInputSelectDataType } from "./types";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
    const dataTransfer = new DataTransfer();

    Array.from(event.target.files!).forEach((image) =>
        dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
}

const FormInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, label, desc, className, placeholder, fieldType = 'input', type, selectData = [], onChange: onChangeProp, employeeId, disabledOnEdit }: FormInputProps<TFieldValues, TName>) => {

    const { control, setValue } = useFormContext<TFieldValues, TName>();

    return (
        <>
            <FormField<TFieldValues, TName>
                control={control}
                name={name}
                render={({ field: { onChange, value: formValue, ...field } }) => {
                    let value = type !== 'file' ? formValue : '';
                    if (type === 'file') {
                        const fileName = (formValue?.[0] as any)?.name;
                        if (fileName) {
                            value = `C:\\fakepath\\${fileName}`;
                        }
                    }
                    return (
                        <FormItem className={className}>
                            <FormLabel>{label}</FormLabel>
                            {fieldType !== 'select' &&
                                <FormControl>
                                    {fieldType === 'textarea' ?
                                        <Textarea placeholder={placeholder ? placeholder : label} value={value} {...field} onChange={onChange} /> :
                                        <Input placeholder={placeholder ? placeholder : label} {...field} type={type} onChange={type !== 'file' ? onChange : (event) => {
                                            const { files, displayUrl } = getImageData(event);
                                            if (onChangeProp) {
                                                onChangeProp(setValue, displayUrl);
                                            }
                                            onChange(files);
                                        }} value={value} disabled={disabledOnEdit} />
                                    }
                                </FormControl>
                            }
                            {fieldType === 'select' &&
                                <>
                                    <FormInputSelect selectData={selectData} placeholder={placeholder} value={value} onChange={onChange} employeeId={employeeId} disabledOnEdit={disabledOnEdit} />
                                </>
                            }
                            {desc &&
                                <FormDescription>
                                    {desc}
                                </FormDescription>
                            }
                            <FormMessage />
                        </FormItem>
                    );
                }}
            />
        </>
    );
};

const FormInputSelect = ({ selectData = [], onChange, value, placeholder, employeeId, disabledOnEdit }: Pick<FormInputProps, "selectData" | "placeholder" | "employeeId" | "disabledOnEdit"> & {
    onChange: any,
    value: string,
}) => {
    const [selectDataState, setSelectDataState] = useState<FormInputSelectDataType[]>([]);

    const { designation, supervisor } = useWatch<EmployeeFormSchemaObjectType>();

    const executeSelectData = useCallback(async () => {
        const data = await (selectData as any)(employeeId, designation);
        setSelectDataState(data);
    }, [selectData, employeeId, designation]);

    const checkAndExecute = useCallback(() => {
        if (Array.isArray(selectData)) {
            setSelectDataState(selectData);
        }
        if (typeof selectData === 'function') {
            executeSelectData();
        }
    }, [selectData, setSelectDataState, executeSelectData]);

    useEffect(() => {
        checkAndExecute();
    }, [checkAndExecute]);

    if (selectDataState.length <= 0) {
        return null;
    }

    return (
        <>
            <Select onValueChange={onChange} value={value} disabled={disabledOnEdit}>
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {selectDataState.map(({ label: selectLabel, value: selectValue }, i) => (
                        <SelectItem key={`${i + 1}-${selectValue}`} value={selectValue}>{selectLabel}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
};

export default FormInput;