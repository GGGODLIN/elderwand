import compose from 'koa-compose';
import { KoaRouterFactory } from 'g13-web-shared/server/utils/KoaRouterFactory';
import { ProjectApiController } from '../controllers/ProjectApiController';

export class ProjectRouter {
    static getPageRouter = () => KoaRouterFactory.create("/project", {
    })

    static getApiRouter = () => KoaRouterFactory.create("/api", {
        create: {
            action: "/projects",
            method: "POST",
            controller: ProjectApiController.create()
        },
        get: {
            action: "/projects/:pid",
            method: "GET",
            controller: ProjectApiController.get()
        },
        query: {
            action: "/projects",
            method: "GET",
            controller: ProjectApiController.query()
        },
        generate: {
            action: "/project/code/generate",
            method: "GET",
            controller: ProjectApiController.generateProjectCode()
        },
        assign: {
            action: "/project/group/user",
            method: "POST",
            controller: ProjectApiController.assignUserToProjectGroup()
        },
    })

    static getRouters = () => {
        const pages = ProjectRouter.getPageRouter()
        const apis = ProjectRouter.getApiRouter()
        return compose([pages, apis])
    }

}
