import {
    FieldPath,
    FieldValues,
    UseFormSetValue,
} from "react-hook-form";

import { FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';

type FormInputSelectDataType = {
    label: string;
    value: string;
};

type FormInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<React.ComponentProps<typeof FormField<TFieldValues, TName>>, "name"> & {
    label: string;
    desc?: string;
    fieldType?: 'input' | 'textarea' | 'select';
    selectData?: FormInputSelectDataType[] | ((excludingEmployeeId?: string, designation?: string) => Promise<FormInputSelectDataType[]>);
    onChange?: (setValue: UseFormSetValue<TFieldValues>, fieldValue: string) => void;
    employeeId?: string;
    disabledOnEdit?: boolean;
} & Pick<React.ComponentProps<typeof FormItem>, "className"> & Pick<React.ComponentProps<typeof Input>, "placeholder" | "type">;