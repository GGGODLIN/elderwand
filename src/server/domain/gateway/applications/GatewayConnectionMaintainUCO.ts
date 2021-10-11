import PaginationVM from '../../../models/PaginationVM';
import GatewayConnectionRepository from '../infra/GatewayConnectionRepository';
import GatewayConnectionDTO from '../models/GatewayConnectionDTO';
import GatewayConnectVO from '../models/GatewayConnectVO';

export default class GatewayConnectionMaintainUCO {
    constructor(repository: GatewayConnectionRepository) {
        this.repository = repository;
    }

    private repository: GatewayConnectionRepository;

    listGatewayConnections(ip): Promise<PaginationVM<GatewayConnectionDTO>> {
        return this.repository.listGatewayConnections(ip);
    }

    connect(vo: GatewayConnectVO): Promise<GatewayConnectionDTO> {
        return this.repository.saveGatewayConnection(vo);
    }
}
