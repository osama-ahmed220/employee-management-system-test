import { FormInput, FormInputSelectDataType } from "@/components";
import EmployeeI from "@/interfaces/EmployeeI";
import { EmployeeS } from "@/services";
import { ComponentProps } from "react";
import { EmployeeFormFieldArrayType, EmployeeFormSchemaObjectType } from "./employee-form-utils";
import { generateDefaultValuesFromArray } from "./utils";

export const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const USER_STORAGE_KEY = 'all_employees';

export enum DesignationEnum {
    Ceo = 'ceo',
    ManagementHead = 'management-head',
    ProjectManager = 'project-manager',
    TeamLead = 'team-lead',
    Developer = 'developer',
}

function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const designationData: FormInputSelectDataType[] = [
    {
        value: DesignationEnum.Ceo,
        label: 'CEO'
    },
    {
        value: DesignationEnum.ManagementHead,
        label: 'Management Head'
    },
    {
        value: DesignationEnum.ProjectManager,
        label: 'Project Manager'
    },
    {
        value: DesignationEnum.TeamLead,
        label: 'Team Lead'
    },
    {
        value: DesignationEnum.Developer,
        label: 'Developer'
    },
];

const designationDataWithoutCEO = designationData.filter((d) => d.value !== DesignationEnum.Ceo);

const tempMockEmployeeData: EmployeeI[] = [
    {
        "id": "6b09596e-c2ff-4242-a53c-dae86505e9fb",
        "firstName": "Samson",
        "lastName": "Kris",
        "email": "Russel.Denesik89@hotmail.com",
        "phoneNumber": "1-642-957-0744 x63552",
        "designation": "ceo",
        "summary": "Blanditiis ut quas tempora est omnis et. Ipsam et quos et quae repellendus nesciunt et enim quas. Eum sapiente omnis iure quidem voluptas et sunt adipisci.",
        "photo": "https://cdn.fakercloud.com/avatars/we_social_128.jpg",
        "createdAt": new Date("2023-07-07T04:33:52.309Z"),
        "updatedAt": new Date("2024-04-21T21:46:55.192Z")
    },
    {
        "id": "e10cfb88-c6dc-43fe-aeac-5f78c269f908",
        "firstName": "Ayla",
        "lastName": "Schuster",
        "email": "Wade23@gmail.com",
        "phoneNumber": "334-430-8722",
        "designation": "Violette",
        "summary": "Et quisquam qui. Est neque itaque ipsum quod non est. Architecto nesciunt doloremque occaecati itaque ea impedit ut ipsam libero. Sed et facere. Dicta omnis est iure et perferendis ipsum dolorum sequi. Sed autem ab sit ut exercitationem voluptatibus ea.",
        "photo": "https://cdn.fakercloud.com/avatars/stephcoue_128.jpg",
        "createdAt": new Date("2023-07-02T13:32:17.068Z"),
        "updatedAt": new Date("2024-04-22T02:09:19.390Z")
    },
    {
        "id": "7a8c04c9-bdf1-4167-aa6f-02d764158f47",
        "firstName": "Newton",
        "lastName": "Robel",
        "email": "Gabriel11@hotmail.com",
        "phoneNumber": "1-687-276-4577",
        "designation": "Elmer",
        "summary": "Ipsum in voluptas illum et. Placeat doloribus voluptatem reiciendis fugiat nostrum. Nam voluptas assumenda veniam vero. Perspiciatis totam accusantium officiis ut quidem omnis.",
        "photo": "https://cdn.fakercloud.com/avatars/panchajanyag_128.jpg",
        "createdAt": new Date("2023-08-16T22:17:03.610Z"),
        "updatedAt": new Date("2024-04-22T05:38:20.213Z")
    },
    {
        "id": "2932f30e-cac4-4899-bde5-84f0518fbc02",
        "firstName": "Myra",
        "lastName": "Dooley",
        "email": "Leann.Hammes24@hotmail.com",
        "phoneNumber": "615 359 9631",
        "designation": "Tamara",
        "summary": "Architecto voluptas dolores omnis sit aliquam culpa voluptas aut. Voluptatem est dolores. Ut nulla qui occaecati facilis.",
        "photo": "https://cdn.fakercloud.com/avatars/mattlat_128.jpg",
        "createdAt": new Date("2024-01-25T19:45:16.934Z"),
        "updatedAt": new Date("2024-04-22T04:47:48.693Z")
    },
    {
        "id": "99eeba6d-a0b9-4e72-9a62-a3a2c27c702a",
        "firstName": "Madison",
        "lastName": "Kemmer",
        "email": "Ali.Wintheiser78@hotmail.com",
        "phoneNumber": "358-779-9315",
        "designation": "Sarah",
        "summary": "Quia facilis nihil debitis blanditiis reprehenderit. Soluta optio at consectetur excepturi sint exercitationem sed. Similique aperiam assumenda omnis. Fuga et asperiores voluptates labore aspernatur quo.",
        "photo": "https://cdn.fakercloud.com/avatars/oktayelipek_128.jpg",
        "createdAt": new Date("2024-04-05T19:32:29.179Z"),
        "updatedAt": new Date("2024-04-22T09:08:13.053Z")
    },
    {
        "id": "a8a9d75e-1e12-475b-9b40-e4e79ccf8c66",
        "firstName": "Mariane",
        "lastName": "Swift",
        "email": "Kiana_Kunze@gmail.com",
        "phoneNumber": "855-947-2404",
        "designation": "Eddie",
        "summary": "Fuga animi quis esse non minima aut incidunt. Autem eveniet tempora qui nihil et id qui sapiente. Deserunt aperiam placeat incidunt nam recusandae voluptatem qui aut. Perspiciatis odio reiciendis sint libero. Hic placeat nisi incidunt natus molestiae sit suscipit omnis voluptatibus.",
        "photo": "https://cdn.fakercloud.com/avatars/mylesb_128.jpg",
        "createdAt": new Date("2023-11-02T16:42:52.668Z"),
        "updatedAt": new Date("2024-04-22T01:02:27.180Z")
    },
    {
        "id": "6f12a8cb-6000-4758-af24-564a455a558e",
        "firstName": "Taryn",
        "lastName": "Veum",
        "email": "Margarett.Berge86@yahoo.com",
        "phoneNumber": "706 981 8829",
        "designation": "Mylene",
        "summary": "Laborum quam cum est dolor facere accusantium et harum quasi. Assumenda qui accusamus eligendi nihil consectetur iure totam veniam. Doloribus repellendus voluptas aut est rerum. Fuga autem iste autem expedita ipsum sit sed.",
        "photo": "https://cdn.fakercloud.com/avatars/vladimirdevic_128.jpg",
        "createdAt": new Date("2023-04-29T17:47:54.858Z"),
        "updatedAt": new Date("2024-04-22T00:06:37.902Z")
    },
    {
        "id": "54de05ac-baff-431b-bf2d-9eab466828b6",
        "firstName": "Andres",
        "lastName": "Howe",
        "email": "Dana_Denesik@hotmail.com",
        "phoneNumber": "913-222-0948",
        "designation": "Emelie",
        "summary": "Ipsam tempore rem nisi quis libero debitis aliquam. Sed consequatur et molestiae porro. Non voluptate hic quisquam repellat illum rerum. Architecto dolor unde sit. Natus aliquid dicta. Odit molestiae at voluptatum optio.",
        "photo": "https://cdn.fakercloud.com/avatars/themrdave_128.jpg",
        "createdAt": new Date("2024-04-21T21:18:00.045Z"),
        "updatedAt": new Date("2024-04-22T01:46:53.118Z")
    },
    {
        "id": "a813037b-c381-472a-a3ec-fc2e5ff30776",
        "firstName": "Deanna",
        "lastName": "White",
        "email": "Esther71@hotmail.com",
        "phoneNumber": "1-856-843-4299",
        "designation": "Dewayne",
        "summary": "Vel facere aspernatur corporis velit. Ut delectus nulla quo culpa ut qui cum enim molestiae. Ea maiores quia enim dolor. Ut atque aspernatur beatae veniam corrupti aut debitis dolorem laborum.",
        "photo": "https://cdn.fakercloud.com/avatars/joshuaraichur_128.jpg",
        "createdAt": new Date("2023-06-21T15:00:25.331Z"),
        "updatedAt": new Date("2024-04-21T21:35:36.101Z")
    }
].map((data) => {
    return {
        ...data,
        designation: data.designation === DesignationEnum.Ceo ? data.designation : designationDataWithoutCEO[randomInteger(0, designationDataWithoutCEO.length - 1)].value,
        supervisor: '',
        photo: `https://randomuser.me/api/portraits/men/${randomInteger(0, 99)}.jpg`,
    };
});

export const mockEmployeeData: EmployeeI[] = tempMockEmployeeData;

export const employeeFormFieldsArray: EmployeeFormFieldArrayType[] = [
    {
        label: 'First Name',
        name: 'firstName',
        defaultValue: "",
        isRequired: true
    },
    {
        label: 'Last Name',
        name: 'lastName',
        defaultValue: "",
        isRequired: true
    },
    {
        label: 'Email',
        name: 'email',
        defaultValue: "",
        isRequired: true,
        disabledOnEdit: true,
    },
    {
        label: 'Phone Number',
        name: 'phoneNumber',
        defaultValue: "",
        isRequired: true
    },
    {
        label: 'Profile Picture',
        name: 'photo',
        type: 'file',
        onChange: ((setValue, fieldValue) => {
            if (fieldValue) {
                setValue("photoDisplayUrl", fieldValue);
            }
        }) as EmployeeFormFieldArrayType['onChange']
    },
    {
        label: 'Profile Picture',
        name: 'photoDisplayUrl',
        show: false,
    },
    {
        label: 'Designation',
        name: "designation",
        fieldType: "select",
        placeholder: "Select a Designation",
        defaultValue: "",
        selectData: designationData,
        isRequired: true,
        disabledOnEdit: true,
    },
    {
        label: "Supervisor",
        name: "supervisor",
        fieldType: "select",
        placeholder: "Select a Supervisor",
        defaultValue: "",
        selectData: async (_?: string, designation?: string) => {
            const employeeService = new EmployeeS(USER_STORAGE_KEY);
            let allSupervisors: EmployeeI[] = []
            if (designation === DesignationEnum.Developer) {
                allSupervisors = await employeeService.getAllTeamLeads();
            }
            if (designation === DesignationEnum.TeamLead) {
                allSupervisors = await employeeService.getAllProjectManagers();
            }
            if (designation === DesignationEnum.ProjectManager) {
                allSupervisors = await employeeService.getAllManagementHeads();
            }
            if (designation === DesignationEnum.ManagementHead) {
                const ceo = await employeeService.getCeo();
                if (ceo) {
                    allSupervisors = [ceo];
                }
            }

            return allSupervisors.map((e) => {
                return {
                    value: e.id,
                    label: `${e.firstName} ${e.lastName}`
                };
            })
        },
    },
    {
        label: "Summary",
        name: "summary",
        fieldType: "textarea",
        className: "col-span-2"
    },
].map((item) => {
    return {
        ...item,
        name: item.name as keyof EmployeeFormSchemaObjectType,
        fieldType: item.fieldType as ComponentProps<typeof FormInput<EmployeeFormSchemaObjectType>>['fieldType'],
        isRequired: item?.isRequired === undefined ? false : item?.isRequired,
        show: item.show === undefined ? true : item.show
    }
});

export const employeeFormDefaultValues: EmployeeFormSchemaObjectType = generateDefaultValuesFromArray<EmployeeFormFieldArrayType, EmployeeFormSchemaObjectType>(employeeFormFieldsArray);