import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import GatewayConnectionDTO from '../models/GatewayConnectionDTO';
import GatewayConnectVO from '../models/GatewayConnectVO';

export interface GatewayConnectionRepositoryCtor {
    host: string;
    platformId: number;
    token?: string;
    version?: number;
}

export default class GatewayConnectionRepository {
    constructor(ctor: GatewayConnectionRepositoryCtor) {
        this.origin = ctor.host;
        this.platformId = ctor.platformId;
        this.token = ctor.token;
    }
    private readonly origin: string;
    private readonly platformId: number;
    private readonly token: string;

    /**
     * @param ip clientIP
     */
    async listGatewayConnections(
        ip: string
    ): Promise<PaginationDTO<GatewayConnectionDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/device/gateway/connections';
        const params = {
            platformId: this.platformId,
            clientIP: ip,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<GatewayConnectionDTO[]>(pathname, { params: params, headers: { Authorization: `Bearer ${this.token}` } })
            .then((res) => {
                const result: PaginationDTO<GatewayConnectionDTO> = {
                    offset: 0,
                    limit: 0,
                    total: 0,
                    results: [],
                };

                if (res.data) {
                    result.total = res.data.length;
                    result.results = res.data;
                }

                return result;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    async saveGatewayConnection(vo: GatewayConnectVO) {
        const baseURL = this.origin;
        const pathname = '/api/device/gateway/connections';
        const params = {
            platformId: this.platformId,
            clientIP: vo.publicIP,
        };

        const body: GatewayConnectVO = {
            ...vo,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .put<GatewayConnectionDTO>(pathname, body, { params: params, headers: { Authorization: `Bearer ${this.token}` } })
            .then((res) => {
                const dto: GatewayConnectionDTO = res.data;

                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }
}
