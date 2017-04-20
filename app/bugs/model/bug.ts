export class Bug {
    constructor(public id: string,
                public title: string,
                public status: number,
                public severity: number,
                public description: string,
                public createdBy: string,
                public createdDate: number,
                public updateBy?: string,
                public updatedDate?: number) {
    }
}