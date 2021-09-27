import AssetsMaintainController from '../controllers/AssetsMaintainController';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export default class AssetsRouter {
    static getApiRouter() {
        const options: KoaRouterFactoryOptions = {
            listIcons: {
                name: 'list-icons',
                action: '/icons',
                method: 'GET',
                controller: AssetsMaintainController.listIcons,
            },
        };
        return KoaRouterFactory.create('/api/assets', options);
    }
}
