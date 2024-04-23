import EmployeeI from "@/interfaces/EmployeeI";
import ProfileI from "@/interfaces/ProfileI";
import { DesignationEnum, EmployeeFormSchemaObjectType, blobToBase64 } from "@/lib";
import UserS from "./UserS";

interface AddEmployeeInput extends Omit<EmployeeI, "id" | "photo" | "createdAt" | "updatedAt"> {
    photo?: EmployeeFormSchemaObjectType['photo']
}

class EmployeeS extends UserS implements EmployeeI {
    supervisor: string = '';
    designation?: string = '';
    summary?: string = '';

    async getCeo() {
        return this.getByField<EmployeeI>('designation', DesignationEnum.Ceo);
    }

    async getAllDevelopers() {
        return this.getAllByField<EmployeeI>('designation', DesignationEnum.Developer);
    }

    async getAllTeamLeads() {
        return this.getAllByField<EmployeeI>('designation', DesignationEnum.TeamLead);
    }

    async getAllProjectManagers() {
        return this.getAllByField<EmployeeI>('designation', DesignationEnum.ProjectManager);
    }

    async getAllManagementHeads() {
        return this.getAllByField<EmployeeI>('designation', DesignationEnum.ManagementHead);
    }

    async getAllEmployees() {
        return this.getAll<EmployeeI>();
    }

    async getAllProfiles() {
        // get ceo
        const ceo = await this.getCeo();
        if (!ceo) {
            return [];
        }
        // get all management heads of this ceo
        const allManagementHeads = await this.getAllManagementHeads();
        const managementHeads: ProfileI[] = await Promise.all(allManagementHeads.filter((managementHead) => managementHead.supervisor === ceo.id)
            .map(async (managementHead) => {
                // get all project managers of each management head
                const managementHeadId = managementHead.id;
                const allProjectManagers = await this.getAllProjectManagers();
                const projectManagers: ProfileI[] = await Promise.all(allProjectManagers.filter((projectManager) => {
                    return projectManager.supervisor === managementHeadId;
                }).map(async (projectManager) => {
                    // get all team leads of each project manager
                    const projectManagerId = projectManager.id;
                    const allTeamLeads = await this.getAllTeamLeads();
                    const teamLeads: ProfileI[] = await Promise.all(allTeamLeads
                        .filter((teamLead) => teamLead.supervisor === projectManagerId)
                        .map(async (teamLead) => {
                            // get all developers of each team lead
                            const teamLeadId = teamLead.id;
                            const allDevelopers = await this.getAllDevelopers();
                            const developers = allDevelopers.filter((developer) => developer.supervisor === teamLeadId)
                            return {
                                ...teamLead,
                                profiles: developers
                            }
                        }));
                    return {
                        ...projectManager,
                        profiles: teamLeads.length > 0 ? teamLeads : undefined
                    }
                }))
                return {
                    ...managementHead,
                    profiles: projectManagers.length > 0 ? projectManagers : undefined
                }
            }));

        const allProfiles: ProfileI[] = [{ ...ceo, profiles: managementHeads.length > 0 ? managementHeads : undefined }];

        return allProfiles;

    }

    async getAllMyEmployees(id: string) {
        const allEmployees = await this.getAllEmployees();
        return allEmployees.filter((employee) => {
            return employee.supervisor === id
        });
    }

    private async _filterSupervisors(employee: EmployeeI, excludingEmployeeId?: string): Promise<boolean> {
        return employee.designation !== 'employee' && employee.id !== excludingEmployeeId && employee.supervisor !== excludingEmployeeId
    }

    async getAllAvailableSupervisors(excludingEmployeeId?: string) {
        const allEmployees = await this.getAllEmployees();
        const boolArray = await Promise.all(allEmployees.map(async (e) => {
            return await this._filterSupervisors(e, excludingEmployeeId);
        }));
        return allEmployees.filter((_, index) => boolArray[index]);
    }

    async getMySupervisor(id: string) {
        const currentEmployee = await this.getById<EmployeeI>(id);
        if (!currentEmployee || (currentEmployee && !currentEmployee.supervisor)) {
            return undefined;
        }
        return this.getById<EmployeeI>(currentEmployee.supervisor);
    }

    async getEmployeeById(id: string) {
        return this.getById<EmployeeI>(id);
    }

    private async _compatiblePhoto(pictureList?: FileList | string) {
        let base64Image: string = '';
        if (pictureList) {
            if (typeof pictureList !== 'string' && pictureList?.length > 0) {
                const picture = pictureList[0];
                base64Image = await blobToBase64(picture) as string;
            }
        }
        return base64Image;
    }

    async addEmployee(data: AddEmployeeInput) {
        data['photo'] = await this._compatiblePhoto(data?.photo);
        const employee = await this.getUserByEmail(data.email);
        if (employee) {
            return {
                variant: "destructive",
                title: 'Employee already exists with the same email address',
            };
        }
        if (data.designation === DesignationEnum.Ceo) {
            const ceo = await this.getCeo();
            if (ceo) {
                return {
                    variant: "destructive",
                    title: 'CEO already exists, please change your designation',
                };
            }
        }
        const now = new Date();
        const dataToInsert = {
            ...data,
            createdAt: now,
            updatedAt: now,
        }
        await this.create(dataToInsert);
        return {
            variant: "success",
            title: 'Employee Added Successfully',
        };
    }

    async editEmployee({ id, createdAt: _, email: __, ...data }: Partial<EmployeeI> & { id: EmployeeI['id'] }) {
        data['photo'] = await this._compatiblePhoto(data?.photo);
        const now = new Date();
        const dataToUpdate = {
            ...data,
            updatedAt: now,
        }
        await this.update(id, dataToUpdate);
        return {
            variant: "success",
            title: 'Employee Updated Successfully',
        };
    }

    async deleteEmployee(id: string) {
        const isDeleted = await this.delete(id);
        if (!isDeleted) {
            return false;
        }
        const myEmployees = await this.getAllMyEmployees(id);
        for (let i = 0; i < myEmployees.length; i++) {
            const item = myEmployees[i];
            await this.editEmployee({ ...item, supervisor: '' });
        }
        return true;
    }
}

export default EmployeeS;