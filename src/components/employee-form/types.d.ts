import { EmployeeFormSchemaObjectType } from '@/lib/employee-form-utils';
import { EmployeeS } from '@/services';
import { ToastFnProps } from '../ui/use-toast';

type EmployeeFormType = 'create' | 'edit';

type EmployeeFormProps = {
    isDialog?: boolean;
    formType?: EmployeeFormType;
    formDefaultValues?: EmployeeFormSchemaObjectType;
    callServiceMethod: (instance: EmployeeS, values: EmployeeFormSchemaObjectType) => Promise<ToastFnProps>;
    employeeId?: string;
};