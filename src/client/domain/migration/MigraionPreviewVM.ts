
export interface ProjectPreviewVM {
  displayName: string;
  projectCode: string;
  projectName: string;
  expDate: number;
  cloudCode: number;
  owner: string;
}

export interface SpacePreviewVM {
  id: string;
  icon: string;
  name: string;
  parent_id: string;
  leaves?: SpacePreviewVM[]
}

export interface DevicePreviewVM {
  id: string;
  dv_id: string;
  device_type: number;
  name: string;
  topology_type: number;
  parent_id: string;
  space_id: string;
  space: SpacePreviewVM;
}
