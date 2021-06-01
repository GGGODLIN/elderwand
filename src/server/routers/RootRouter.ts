import RootController from '../controllers/RootController';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export const RootRouterActions = {
    getServiceInfo: () => `/api/info`,
};

export default class RootRouter {
    static getApiRouter() {
        const options: KoaRouterFactoryOptions = {
            info: {
                name: 'service info',
                action: '/info',
                method: 'GET',
                controller: RootController.getServiceInfo,
            },
        };
        return KoaRouterFactory.create('/api', options);
    }
}
