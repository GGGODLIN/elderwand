import { Dispatch } from 'react';
import DeviceVM, {
    DeviceTemplateVM,
    ProjectVM,
    SpaceTemplateVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVMs';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import PaginationVM from 'src/client/models/PaginationVM';
import DeviceSlice from 'src/client/slices/DeviceSlice';
import FetchSlice from 'src/client/slices/FetchSlice';

export interface PlaceDeviceToSpaceOptions {
    templateId?: string;
    spaceId?: string;
    dvId?: string;
}

export interface PlaceDeviceToDeviceOptions {
    templateId?: string;
    spaceId?: string;
    parentId?: string;
    dvId?: string;
}

export interface AddSpaceOptions {
    templateId?: string;
    parentId?: string;
}

class DeviceMaintainAPIs {
    static fetchProjects = (dispatch: Dispatch<any>): void => {
        const url = '/api/projects';

        const params = {};

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .get<PaginationVM<ProjectVM>>(url, { params })
            .then((res) => {
                dispatch(DeviceSlice.fetchProjects(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static fetchSpaces = (dispatch: Dispatch<any>, project: ProjectVM) => {
        const url = `/api/spaces`;
        const params = {
            projectId: project.code,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .get<PaginationVM<SpaceVM>>(url, { params: params })
            .then((res) => {
                dispatch(DeviceSlice.fetchSpaces(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static fetchDevices = (
        dispatch: Dispatch<any>,
        project: ProjectVM,
        callback?: Function
    ) => {
        const url = `/api/devices`;
        const params = {
            projectId: project.code,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .get<PaginationVM<DeviceVM>>(url, { params: params })
            .then((res) => {
                dispatch(DeviceSlice.fetchDevices(res.data));
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static fetchDeviceTopologyResources = (
        dispatch: Dispatch<any>,
        project: ProjectVM,
        callback?: Function
    ) => {
        const url = `/api/device/topology/resource`;
        const params = {
            projectId: project.code,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .get<{
                spaces: PaginationVM<SpaceVM>;
                devices: PaginationVM<DeviceVM>;
            }>(url, { params: params })
            .then((res) => {
                dispatch(DeviceSlice.fetchDeviceTopologyResources(res.data));
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static fetchSpaceTemplates = (dispatch: Dispatch<any>) => {
        const url = `/api/space/templates`;
        const params = {};

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .get<PaginationVM<SpaceTemplateVM>>(url, { params: params })
            .then((res) => {
                dispatch(DeviceSlice.fetchSpaceTemplates(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static fetchDeviceTemplates = (dispatch: Dispatch<any>) => {
        const url = `/api/device/templates`;
        const params = {};

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .get<PaginationVM<DeviceTemplateVM>>(url, { params: params })
            .then((res) => {
                dispatch(DeviceSlice.fetchDeviceTemplates(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static placeDeviceToSpace = (
        dispatch: Dispatch<any>,
        project: ProjectVM,
        options: PlaceDeviceToSpaceOptions,
        callback?: Function
    ) => {
        const url = `/api/devices`;
        const params = {
            projectId: project.id,
        };
        const body = {
            ...options,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .post<DeviceVM>(url, body, { params: params })
            .then((res) => {
                // console.log(res.data);
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static placeDeviceToDevice = (
        dispatch: Dispatch<any>,
        project: ProjectVM,
        options: PlaceDeviceToDeviceOptions,
        callback?: Function
    ) => {
        const url = `/api/devices`;
        const params = {
            projectId: project.id,
        };
        const body = {
            ...options,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .post<DeviceVM>(url, body, { params: params })
            .then((res) => {
                // console.log(res.data);
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static editDevice = (
        dispatch: Dispatch<any>,
        project: ProjectVM,
        device: DeviceVM,
        callback?: Function
    ) => {
        const url = `/api/devices/${device.id}`;
        const params = {
            projectId: project.id,
        };
        const data = {
            spaceId: device.spaceId,
            parentId: device.parentId,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .put<DeviceVM>(url, data, { params: params })
            .then((res) => {
                // console.log(res.data);
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static unlinkParentDevice = (
        dispatch: Dispatch<any>,
        project: ProjectVM,
        device: DeviceVM,
        callback?: Function
    ) => {
        const url = `/api/devices/${device.id}/parent`;
        const params = {
            projectId: project.code,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .delete<DeviceVM>(url, { params: params })
            .then((res) => {
                // console.log(res.data);
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static removeDevice = (
        dispatch: Dispatch<any>,
        project: ProjectVM,
        device: DeviceVM,
        callback?: Function
    ) => {
        const url = `/api/devices/${device.id}`;
        const params = {
            projectId: project.code,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .delete<DeviceVM>(url, { params: params })
            .then((res) => {
                // console.log(res.data);
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static addSpace = (
        dispatch: Dispatch<any>,
        project: ProjectVM,
        options: AddSpaceOptions,
        callback?: Function
    ) => {
        const url = `/api/spaces`;
        const params = {
            projectId: project.id,
        };
        const body = {
            ...options,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .post<SpaceVM>(url, body, { params: params })
            .then((res) => {
                // console.log(res.data);
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    static editSpace(
        dispatch: Dispatch<any>,
        project: ProjectVM,
        space: SpaceVM,
        callback?: Function
    ) {
        const url = `/api/spaces/${space.id}`;
        const params = {
            projectId: project.id,
        };
        const data = {
            name: space.name,
            parentId: space.parentId,
            iconId: space.iconId,
            // todo photo
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .put<SpaceVM>(url, data, { params: params })
            .then((res) => {
                // console.log(res.data);
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    }

    static removeSpace(
        dispatch: Dispatch<any>,
        project: ProjectVM,
        space: SpaceVM,
        callback: () => void
    ) {
        const url = `/api/spaces/${space.id}`;
        const params = {
            projectId: project.id,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .delete<SpaceVM>(url, { params: params })
            .then((res) => {
                // console.log(res.data);
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    }
}

export default DeviceMaintainAPIs;
