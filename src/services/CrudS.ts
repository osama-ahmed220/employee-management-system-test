import { uuid } from "@/lib";
import StorageS from "./StorageS";

abstract class CrudS extends StorageS {

    protected getAll<T>() {
        return this.getItemFromStorage<T[]>();
    }

    protected async getById<T extends { id: string }>(id: string) {
        const allData = await this.getAll<T>();
        return allData.find(({ id: dataId }) => dataId === id);
    }

    protected async getAllByField<T>(field: keyof T, value: string) {
        const allData = await this.getAll<T>();
        return allData.filter((d) => d[field] === value);
    }

    protected async getByField<T>(field: keyof T, value: string) {
        const allData = await this.getAll<T>();
        return allData.find((d) => {
            if (d && d.hasOwnProperty(field) && d[field]) {
                return d[field] === value;
            }
            return false;
        });
    }

    async hasDataById(id: string) {
        if (!(await this.getById(id))) {
            return false;
        }
        return true;
    }

    protected async create<T>(data: T) {
        const id = uuid();
        await this.setItemInStorage({ ...data, id });
        if (await this.hasDataById(id)) {
            return true;
        }
        return false;
    }

    protected async update<T>(id: string, updatedData: T) {
        const d = await this.getById(id);
        if (!d) {
            return false;
        }
        let localUpdatedData: any = {};
        const dbFields = Object.keys(d);
        for (let i = 0; i < dbFields.length; i++) {
            const item: keyof T = dbFields[i] as keyof T;
            if (item !== 'id') {
                localUpdatedData[item] = (updatedData as any).hasOwnProperty(item) ? updatedData[item] : (d as T)[item];
            }
        }
        if (localUpdatedData && Object.keys(localUpdatedData).length > 0) {
            const finalUpdatedData = {
                ...localUpdatedData,
                id
            } as T & { id: string };
            await this.setItemInStorage(finalUpdatedData);
            return true;
        }
        return false;
    }

    protected async delete(id: string) {
        if (await this.hasDataById(id)) {
            await this.setItemInStorage({ id }, true);
            return true;
        }
        return false;
    }
}

export default CrudS;