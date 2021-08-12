import PaginationVM from '../../../../client/models/PaginationVM';
import DeviceRepository from '../../device/infra/DeviceRepository';
import DeviceTemplateDTO from '../../migration/models/DeviceTemplateDTO';
import SpaceDTO from '../../space/models/SpaceDTO';
import DeviceDTO from '../models/DeviceDTO';
import { EditDeviceOptions, PlaceDeviceOptions } from '../models/DeviceVOs';

export default class DeviceMaintainUCO {
    private repository: DeviceRepository;

    constructor(repository: DeviceRepository) {
        this.repository = repository;
    }

    /**
     * @param pid Project ID or Code
     */
    listDevices(pid: string): Promise<PaginationVM<DeviceDTO>> {
        return this.repository.listDevices(pid);
    }

    /**
     * @param id Device ID or DvID
     * @param pid ProjectID
     */
    getDevice(id: string, pid: string): Promise<DeviceDTO> {
        return this.repository.getDevice(id, pid);
    }

    /**
     * @param id Device ID or DvID
     * @param pid ProjectID
     * @param options Edit Device Options
     */
    editDevice(
        id: string,
        pid: string,
        options: EditDeviceOptions
    ): Promise<DeviceDTO> {
        return this.repository.editDevice(id, pid, options);
    }

    /**
     * @param id Device ID or DvID
     * @param pid ProjectID
     */
    unlinkParentDevice(id: string, pid: string): Promise<DeviceDTO> {
        return this.repository.unlinkParentDevice(id, pid);
    }

    /**
     * @param id Device ID or DvID
     * @param pid ProjectID
     */
    removeDevice(id: string, pid: string): Promise<DeviceDTO> {
        return this.repository.removeDevice(id, pid);
    }

    /**
     * @param id Device ID or DvID
     * @param pid ProjectID
     */
    getDeviceTopologyResource(
        id: string,
        pid: string
    ): Promise<{
        spaces: PaginationVM<SpaceDTO>;
        devices: PaginationVM<DeviceDTO>;
    }> {
        return Promise.all([
            this.repository.listSpaces(pid),
            this.repository.listDevices(pid),
        ])
            .then((results) => {
                return {
                    spaces: results[0],
                    devices: results[1],
                };
            })
            .catch((err) => {
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    /**
     * @param pid ProjectID
     * @param options Place Device Options
     */
    placeDevice(pid: string, options: PlaceDeviceOptions): Promise<DeviceDTO> {
        return this.repository.placeDevice(pid, options);
    }

    /**
     *
     * @param id Device ID or DvID
     * @param pid ProjectID
     * @param cid Gateway Connection ID
     */
    bindGatewayConnection(
        id: string,
        pid: string,
        cid: string
    ): Promise<DeviceDTO> {
        return this.repository.bindGatewayConnection(id, pid, cid);
    }

    /**
     *
     * @param id Device ID or DvID
     * @param pid ProjectID
     */
    unbindGatewayConnection(id: string, pid: string): Promise<DeviceDTO> {
        return this.repository.unbindGatewayConnection(id, pid);
    }

    /**
     *
     */
    listDeviceTemplates(): Promise<PaginationVM<DeviceTemplateDTO>> {
        return this.repository.listDeviceTemplates();
    }
}
