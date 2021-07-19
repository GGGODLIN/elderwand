import PaginationVM from '../../../../client/models/PaginationVM';
import DeviceRepository from '../../device/infra/DeviceRepository';
import DeviceTemplateDTO from '../../migration/models/DeviceTemplateDTO';
import DeviceDTO from '../models/DeviceDTO';

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
