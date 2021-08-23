describe('test', function () {
    it('should s', function () {
        console.log('test');
    });
});

export interface Project {
    id: string;
    name: string;
    code: string;
    typeId: number;
    type: Type;
    cloudCodeId: number;
    cloudCode: CloudCode;
    statusId: number;
    status: Status;
    expireDate: number;
    ownerId: string;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export interface Type {
    id: number;
    name: string;
}

export interface CloudCode {
    id: number;
    code: string;
    name: string;
}

export interface Status {
    id: number;
    code: string;
    name: string;
}
