import DeviceRepository from '../../device/infra/DeviceRepository';
import DeviceTemplateDTO from '../../migration/models/DeviceTemplateDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import SpaceDTO from '../../space/models/SpaceDTO';
import DeviceDTO from '../models/DeviceDTO';
import {
    EditDeviceProfileOptions,
    EditDeviceProtocolsOptions,
    PlaceDeviceOptions,
} from '../models/DeviceVOs';
import FunctionPointTypeDTO from '../models/FunctionPointTypeDTO';

export default class DeviceMaintainUCO {
    private repository: DeviceRepository;

    constructor(repository: DeviceRepository) {
        this.repository = repository;
    }

    /**
     * @param pid Project ID or Code
     */
    listDevices(pid: string): Promise<PaginationDTO<DeviceDTO>> {
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
    editDeviceProfile(
        id: string,
        pid: string,
        options: EditDeviceProfileOptions
    ): Promise<DeviceDTO> {
        return this.repository.editDeviceProfile(id, pid, options);
    }

    /**
     * @param id Device ID or DvID
     * @param pid ProjectID
     * @param options Edit Device Options
     */
    editDeviceProtocols(
        id: string,
        pid: string,
        options: EditDeviceProtocolsOptions
    ): Promise<DeviceDTO> {
        return this.repository.editDeviceProtocols(id, pid, options);
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
        spaces: PaginationDTO<SpaceDTO>;
        devices: PaginationDTO<DeviceDTO>;
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
    listDeviceTemplates(): Promise<PaginationDTO<DeviceTemplateDTO>> {
        return this.repository.listDeviceTemplates();
    }

    /**
     *
     */
    listDeviceFunctionPointsTopology(): Promise<
        PaginationDTO<FunctionPointTypeDTO>
    > {
        return this.repository.listDeviceFunctionPointTopology();
    }
}
