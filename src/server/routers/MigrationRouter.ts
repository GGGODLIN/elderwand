import MigrationController from '../controllers/MigrationController';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export const MigrationRouterActions = {
    listProjects: () => `/api/migration/projects`,
    getProject: (code: string) => `/api/migration/projects/${code}`,
    listSpaces: (code: string) => `/api/migration/projects/${code}/spaces`,
    listDevices: (code: string) => `/api/migration/projects/${code}/devices`,
    listDeviceTemplates: () => `/api/migration/device/templates`,
    importProject: (code: string) => `/api/migration/projects/${code}`,
    importSpaces: (code: string) => `/api/migration/projects/${code}/spaces`,
    importSpaceTemplates: () => `/api/migration/space/templates`,
    importDevices: (code: string) => `/api/migration/projects/${code}/devices`,
    importDeviceTemplates: () => `/api/migration/device/templates`,
};

export default class MigrationRouter {
    static getApiRouter() {
        const options: KoaRouterFactoryOptions = {
            listProjects: {
                name: 'list-projects',
                action: '/projects',
                method: 'GET',
                controller: MigrationController.listSourceProjects,
            },
            getProject: {
                name: 'get-project',
                action: '/projects/:code',
                method: 'GET',
                controller: MigrationController.getSourceProject,
            },
            listSpaces: {
                name: 'list-spaces',
                action: '/projects/:code/spaces',
                method: 'GET',
                controller: MigrationController.listSourceSpaces,
            },
            listDevices: {
                name: 'list-devices',
                action: '/projects/:code/devices',
                method: 'GET',
                controller: MigrationController.listSourceDevices,
            },
            listDeviceTemplates: {
                name: 'list-device-templates',
                action: '/device/templates',
                method: 'GET',
                controller: MigrationController.listSourceDeviceTemplates,
            },
            importProject: {
                name: 'import-project',
                action: '/projects/:code',
                method: 'POST',
                controller: MigrationController.importProject,
            },
            importSpaces: {
                name: 'import-spaces',
                action: '/projects/:code/spaces',
                method: 'POST',
                controller: MigrationController.importSpaces,
            },
            importSpaceTemplates: {
                name: 'import-space-templates',
                action: '/space/templates',
                method: 'POST',
                controller: MigrationController.importSpaceTemplates,
            },
            importDevices: {
                name: 'import-devices',
                action: '/projects/:code/devices',
                method: 'POST',
                controller: MigrationController.importDevices,
            },
            importDeviceTemplates: {
                name: 'import-device-templates',
                action: '/device/templates',
                method: 'POST',
                controller: MigrationController.importDeviceTemplates,
            },
        };

        return KoaRouterFactory.create('/api/migration', options);
    }
}
