import GatewayMaintainController from '../controllers/GatewayMaintainController';

import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export const GatewayRouterActions = {
    connect: () => `/api/gateway/connections`,
    listGateways: () => `/api/gateway/connections`,
};

export default class GatewayRouter {
    static getApiRouter() {
        const options: KoaRouterFactoryOptions = {
            listGatewayConnections: {
                name: 'list-gateway-connections',
                action: '/gateway/connections',
                method: 'GET',
                controller: GatewayMaintainController.listGatewayConnections,
            },
            connect: {
                name: 'gateway-connect',
                action: '/gateway/connections',
                method: 'PUT',
                controller: GatewayMaintainController.connect,
            },
        };

        return KoaRouterFactory.create('/api', options);
    }
}
