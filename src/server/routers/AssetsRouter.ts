import AssetsMaintainController from '../controllers/AssetsMaintainController';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export default class AssetsRouter {
    static getApiRouter() {
        const options: KoaRouterFactoryOptions = {
            listIcons: {
                name: 'list-icons',
                action: '/assets/icons',
                method: 'GET',
                controller: AssetsMaintainController.listIcons,
            },
            getCloudCodes: {
                name: 'get-cloud-codes',
                action: '/clouds',
                method: 'GET',
                controller: AssetsMaintainController.getCloudCodes,
            },
        };
        return KoaRouterFactory.create('/api', options);
    }
}
