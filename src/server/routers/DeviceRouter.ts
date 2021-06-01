import DeviceMaintainController from '../controllers/DeviceMaintainController';
import DeviceMaintainControllerVersion2 from '../controllers/v2/DeviceMaintainController';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export const DeviceRouterActions = {
    listDevices: () => `/api/devices`,
    getDevice: (id: string) => `/api/devices/${id}`,
    bindGatewayConnection: (id: string) => `/api/devices/${id}/gateway`,
    getRepository: (id: string) => `/api/devices/${id}/repository`,
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
            bindGateway: {
                name: 'bind-gateway',
                action: '/devices/:id/gateway',
                method: 'PUT',
                controller: DeviceMaintainController.bindGateway,
            },
            getRepository: {
                name: 'get-repository',
                action: '/devices/:id/repository',
                method: 'GET',
                controller: DeviceMaintainController.getRepository,
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
