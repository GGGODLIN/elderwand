import DeviceMaintainController from '../controllers/DeviceMaintainController';
import DeviceMaintainControllerVersion2 from '../controllers/v2/DeviceMaintainController';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export const DeviceRouterActions = {
    listDevices: () => `/api/devices`,
    getDevice: (id: string) => `/api/devices/${id}`,
    getDeviceTopologyResource: () => `/api/device/topology/resource`,
    bindGatewayConnection: (id: string) => `/api/devices/${id}/gateway`,
    unbindGatewayConnection: (id: string) => `/api/devices/${id}/gateway`,
    getRepository: (id: string) => `/api/devices/${id}/repository`,
    listDeviceTemplates: () => `/api/device/templates`,
};

export const DeviceVersion2RouterActions = {
    getRepository: (id: string) => `/api/v2/devices/${id}/repository`,
};

export default class DeviceRouter {
    static getApiRouter() {
        const options: KoaRouterFactoryOptions = {
            listDevices: {
                name: 'list-devices',
                action: '/devices',
                method: 'GET',
                controller: DeviceMaintainController.listDevices,
            },
            getDevice: {
                name: 'get-device',
                action: '/devices/:id',
                method: 'GET',
                controller: DeviceMaintainController.getDevice,
            },
            getDeviceTopologyResource: {
                name: 'get-device',
                action: '/device/topology/resource',
                method: 'GET',
                controller: DeviceMaintainController.getDeviceTopologyResource,
            },
            placeDevice: {
                name: 'get-device-resource',
                action: '/devices',
                method: 'POST',
                controller: DeviceMaintainController.placeDevice,
            },
            editDevice: {
                name: 'edit-device',
                action: '/devices/:id',
                method: 'PUT',
                controller: DeviceMaintainController.editDevice,
            },
            unlinkParentDevice: {
                name: 'unlink-parent-device',
                action: '/devices/:id/parent',
                method: 'DELETE',
                controller: DeviceMaintainController.unlinkParentDevice,
            },
            removeDevice: {
                name: 'remove-device',
                action: '/devices/:id',
                method: 'DELETE',
                controller: DeviceMaintainController.removeDevice,
            },
            bindGateway: {
                name: 'bind-gateway',
                action: '/devices/:id/gateway',
                method: 'PUT',
                controller: DeviceMaintainController.bindGateway,
            },
            unbindGateway: {
                name: 'unbind-gateway',
                action: '/devices/:id/gateway',
                method: 'DELETE',
                controller: DeviceMaintainController.unbindGateway,
            },
            getRepository: {
                name: 'get-repository',
                action: '/devices/:id/repository',
                method: 'GET',
                controller: DeviceMaintainController.getRepository,
            },
            listDeviceTemplates: {
                name: 'list-device-templates',
                action: '/device/templates',
                method: 'GET',
                controller: DeviceMaintainController.listDeviceTemplates,
            },
        };

        return KoaRouterFactory.create('/api', options);
    }

    static getApiRouterVersion2() {
        const options: KoaRouterFactoryOptions = {
            getRepository: {
                name: 'get-repository',
                action: '/devices/:id/repository',
                method: 'GET',
                controller: DeviceMaintainControllerVersion2.getRepository,
            },
        };

        return KoaRouterFactory.create('/api/v2', options);
    }
}
