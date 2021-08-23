import SpaceMaintainController from '../controllers/SpaceMaintainControlle';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export const SpaceRouterActions = {
    listSpaces: () => `/api/spaces`,
    getSpace: (id: string) => `/api/spaces/${id}`,
    getSpaceTopology: (id: string) => `/api/spaces/${id}/topology`,
    listSpaceTemplates: () => `/api/space/templates`,
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
            addSpace: {
                name: 'add-space',
                action: '/spaces',
                method: 'POST',
                controller: SpaceMaintainController.addSpace,
            },
            editSpace: {
                name: 'edit-space',
                action: '/spaces/:id',
                method: 'PUT',
                controller: SpaceMaintainController.editSpace,
            },
            removeSpace: {
                name: 'remove-space',
                action: '/spaces/:id',
                method: 'DELETE',
                controller: SpaceMaintainController.removeSpace,
            },
            getSpaceTopology: {
                name: 'get-space-topology',
                action: '/spaces/:id/topology',
                method: 'GET',
                controller: SpaceMaintainController.getSpaceTopology,
            },
            listSpaceTemplates: {
                name: 'list-space-templates',
                action: '/space/templates',
                method: 'GET',
                controller: SpaceMaintainController.listSpaceTemplates,
            },
        };

        return KoaRouterFactory.create('/api', options);
    }
}
