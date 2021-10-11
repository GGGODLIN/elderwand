import DeviceMaintainUCO from '../domain/device/applications/DeviceMaintainUCO';
import DeviceRepository from '../domain/device/infra/DeviceRepository';
import DeviceDTO from '../domain/device/models/DeviceDTO';
import { ProjectMaintainUCO } from '../domain/project/applications/ProjectMaintainUCO';
import ProjectRepository from '../domain/project/infra/ProjectRepository';
import ProjectDTO from '../domain/project/models/ProjectDTO';
import { Platform } from '../domain/shared/enums/Enums';
import SpaceMaintainUCO from '../domain/space/applications/SpaceMaintainUCO';
import SpaceRepository from '../domain/space/infra/SpaceRepository';
import SpaceDTO from '../domain/space/models/SpaceDTO';
import PaginationDTO from '../models/PaginationDTO';

export interface ApiRepositoryCtor {
    host: string;
    platformId: Platform.ElderWand;
}

export default class DeviceDataRepositoryHelper {
    static async getProject(
        ctor: ApiRepositoryCtor,
        pid: string
    ): Promise<ProjectDTO> {
        return await new ProjectMaintainUCO(new ProjectRepository(ctor))
            .getProject(pid)
            .then((res: ProjectDTO) => {
                return res;
            })
            .catch((err) => {
                throw err;
            });
    }

    static async getSpaces(
        ctor: ApiRepositoryCtor,
        sid: string,
        pid: string
    ): Promise<SpaceDTO[]> {
        return await new SpaceMaintainUCO(new SpaceRepository(ctor))
            .listSpaces(pid)
            .then((res: PaginationDTO<SpaceDTO>) => {
                let root = res.results.find((item) => {
                    if (item.id == sid) {
                        return item;
                    }
                });

                while (true) {
                    if (!root.parentId) {
                        break;
                    }

                    root = res.results.find((item) => {
                        if (root.parentId == item.id) {
                            return item;
                        }
                    });
                }

                let origin: SpaceDTO[] = res.results;
                let latest: SpaceDTO[] = [root];

                function appendChildren(items) {
                    if (items <= 0) {
                        return;
                    }

                    for (const item of items) {
                        const filtered = origin.filter((dto: SpaceDTO) => {
                            if (item.id == dto.parentId) {
                                return dto;
                            }
                        });

                        for (const space of filtered) {
                            latest.push(space);
                        }

                        appendChildren(filtered);
                    }
                }

                appendChildren([root]);

                return latest;
            })
            .catch((err) => {
                throw err;
            });
    }

    static async getDevice(
        ctor: ApiRepositoryCtor,
        id: string,
        pid: string
    ): Promise<DeviceDTO> {
        return await new DeviceMaintainUCO(new DeviceRepository(ctor))
            .getDevice(id, pid)
            .then((res: DeviceDTO) => {
                return res;
            })
            .catch((err) => {
                throw err;
            });
    }

    static async getDevices(
        ctor: ApiRepositoryCtor,
        root: DeviceDTO,
        pid: string
    ): Promise<DeviceDTO[]> {
        return await new DeviceMaintainUCO(new DeviceRepository(ctor))
            .listDevices(pid)
            .then((res: PaginationDTO<DeviceDTO>) => {
                let origin: DeviceDTO[] = res.results;
                let latest: DeviceDTO[] = [root];

                function appendChildren(items: DeviceDTO[]) {
                    if (items.length <= 0) {
                        return;
                    }

                    for (const item of items) {
                        const filtered = origin.filter((dto) => {
                            if (item.id == dto.parentId) {
                                return dto;
                            }
                        });

                        for (const dto of filtered) {
                            latest.push(dto);
                        }

                        appendChildren(filtered);
                    }
                }

                appendChildren([root]);

                return latest;
            })
            .catch((err) => {
                throw err;
            });
    }
}
