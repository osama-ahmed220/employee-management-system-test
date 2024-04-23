class StorageS {

    private _storageKey: string = '';

    constructor(storageKey: string) {
        this._storageKey = storageKey;
    }

    protected async setItemInStorage<T extends { id: string }>(value: T, isDelete: boolean = false) {
        let getAllData = await this.getItemFromStorage<T[]>();
        if (Array.isArray(getAllData)) {
            getAllData = getAllData.filter(({ id }) => id !== value.id) as T[];
            if (!isDelete) {
                getAllData.push(value);
            }
        }
        localStorage.setItem(this._storageKey, JSON.stringify(getAllData));
    }

    protected async getItemFromStorage<T>(defaultValue: string = '[]'): Promise<T> {
        return JSON.parse(localStorage.getItem(this._storageKey) || defaultValue) as T;
    }
}

export default StorageS;