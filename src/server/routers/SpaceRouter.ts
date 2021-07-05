import SpaceMaintainController from '../controllers/SpaceMaintainControlle';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export const SpaceRouterActions = {
    listSpaces: () => `/api/spaces`,
    getSpace: (id: string) => `/api/spaces/${id}`,
    getSpaceTopology: (id: string) => `/api/spaces/${id}/topology`,
};

export default class SpaceRouter {
    static getApiRouter() {
        const options: KoaRouterFactoryOptions = {
            listSpaces: {
                name: 'list-spaces',
                action: '/spaces',
                method: 'GET',
                controller: SpaceMaintainController.listSpaces,
            },
            getSpace: {
                name: 'get-space',
                action: '/spaces/:id',
                method: 'GET',
                controller: SpaceMaintainController.getSpace,
            },
            getSpaceTopology: {
                name: 'get-space-topology',
                action: '/spaces/:id/topology',
                method: 'GET',
                controller: SpaceMaintainController.getSpaceTopology,
            },
        };

        return KoaRouterFactory.create('/api', options);
    }
}
