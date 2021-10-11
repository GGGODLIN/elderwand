export default interface FunctionPointTypeVM {
    name: string;
    value: string;
    unit: string | null;
    dpts: DataPointType[];
}

export interface DataPointType {
    dpt: string;
    name: string;
    createdRT: string;
    rt: string[];
    valueType: string;
    valueKey: string;
    suffixes?: Suffix[];
}

export interface Suffix {
    name: string;
    value: string;
}
