import ProjectMaintainController from '../controllers/ProjectMaintainController';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export const ProjectRouterActions = {
    listProjects: () => `/api/projects`,
    getProject: (uid: string) => `/api/projects/${uid}`,
};

export default class ProjectRouter {
    static getApiRouter() {
        const options: KoaRouterFactoryOptions = {
            listProjects: {
                name: 'list-projects',
                action: '/projects',
                method: 'GET',
                controller: ProjectMaintainController.listProjects,
            },
            getProjects: {
                name: 'get-project',
                action: '/projects/:pid',
                method: 'GET',
                controller: ProjectMaintainController.getProject,
            },
            createProject: {
                name: 'create-project',
                action: '/projects',
                method: 'POST',
                controller: ProjectMaintainController.createProject,
            },
            updateProject: {
                name: 'update-project',
                action: '/projects/:pid',
                method: 'PUT',
                controller: ProjectMaintainController.updateProject,
            },
            removeProject: {
                name: 'remove-project',
                action: '/projects/:pid',
                method: 'DELETE',
                controller: ProjectMaintainController.removeProject,
            },
        };

        return KoaRouterFactory.create('/api', options);
    }
}

// export class ProjectRouter {
//     static getPageRouter = () => KoaRouterFactory.create("/project", {
//     })
//
//     static getApiRouter = () => KoaRouterFactory.create("/api", {
//         create: {
//             action: "/projects",
//             method: "POST",
//             controller: ProjectApiController.create() as any
//         },
//         get: {
//             action: "/projects/:pid",
//             method: "GET",
//             controller: ProjectApiController.get() as any
//         },
//         query: {
//             action: "/projects",
//             method: "GET",
//             controller: ProjectApiController.query() as any
//         },
//         generate: {
//             action: "/project/code/generate",
//             method: "GET",
//             controller: ProjectApiController.generateProjectCode() as any
//         },
//         assign: {
//             action: "/project/group/user",
//             method: "POST",
//             controller: ProjectApiController.assignUserToProjectGroup() as any
//         },
//     })
//
//     static getRouters = () => {
//         const pages = ProjectRouter.getPageRouter()
//         const apis = ProjectRouter.getApiRouter()
//         return compose([pages, apis])
//     }
//
// }
