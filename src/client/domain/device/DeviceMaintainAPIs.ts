import { Dispatch } from 'react';
import DeviceVM, {
    DeviceTemplateVM,
    ProjectVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVMs';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import PaginationVM from 'src/client/models/PaginationVM';
import DeviceSlice from 'src/client/slices/DeviceSlice';
import FetchSlice from 'src/client/slices/FetchSlice';

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

    static fetchDevices = (dispatch: Dispatch<any>, project: ProjectVM) => {
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
}

export default DeviceMaintainAPIs;
