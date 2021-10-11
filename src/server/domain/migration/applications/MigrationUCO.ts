import PaginationDTO from '../../shared/models/PaginationDTO';
import MigrationRepository from '../infra/MigrationRepository';
import DeviceDTO from '../models/DeviceDTO';
import DeviceTemplateDTO from '../models/DeviceTemplateDTO';
import {
    DevicePreviewDTO,
    DeviceTemplatePreviewDTO,
    ProjectPreviewDTO,
    SpacePreviewDTO,
} from '../models/MigrationPreviewDTO';
import ProjectDTO from '../models/ProjectDTO';
import SpaceDTO from '../models/SpaceDTO';
import SpaceTemplateDTO from '../models/SpaceTemplateDTO';

export default class MigrationUCO {
    private repository: MigrationRepository;

    constructor(option: { repository: MigrationRepository }) {
        this.repository = option.repository;
    }

    async listProjects(): Promise<PaginationDTO<ProjectPreviewDTO>> {
        return await this.repository.listProjects();
    }

    async getProject(code: string): Promise<ProjectPreviewDTO> {
        return await this.repository.getProject(code);
    }

    async listSpaces(code: string): Promise<PaginationDTO<SpacePreviewDTO>> {
        return await this.repository.listSpaces(code);
    }

    async listDevices(code: string): Promise<PaginationDTO<DevicePreviewDTO>> {
        return await this.repository.listDevices(code);
    }

    async listDeviceTemplates(): Promise<
        PaginationDTO<DeviceTemplatePreviewDTO>
    > {
        return await this.repository.listDeviceTemplates();
    }

    async importProject(
        code: string,
        vo: { code: string }
    ): Promise<ProjectDTO> {
        return await this.repository.importProject(code, vo);
    }

    async importSpaces(
        code: string,
        vo: { code: string }
    ): Promise<PaginationDTO<SpaceDTO>> {
        return await this.repository.importSpaces(code, vo);
    }

    async importSpaceTemplates(): Promise<PaginationDTO<SpaceTemplateDTO>> {
        return await this.repository.importSpaceTemplates();
    }

    async importDevices(
        code: string,
        vo: { code: string }
    ): Promise<PaginationDTO<DeviceDTO>> {
        return await this.repository.importDevices(code, vo);
    }

    async importDeviceTemplates(): Promise<PaginationDTO<DeviceTemplateDTO>> {
        return await this.repository.importDeviceTemplates();
    }
}
