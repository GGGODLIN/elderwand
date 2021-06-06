import axios from 'axios';
import TestEnvVar from '../config/TestEnvVar';
import { PlatformEnum } from 'g13-web-shared/server/enums';
import { ServerEnvVar } from '../../server/config/ServerEnvVar';
import { UserDTO } from 'g13-web-shared/server/user/models';

const ApiHost = `http://${ServerEnvVar.SkymapApiHost}`;

export class TestUserUtils {
    static GetSkyMapAdmin = async (): Promise<UserDTO> => {
        const uid = TestEnvVar.SkymapAdminAccount;
        const url = `${ApiHost}/api/users/${uid}`;

        const query = {
            pid: PlatformEnum.SkyMap,
        };

        return await axios
            .get(url, { params: query })
            .then((result) => {
                return result.data;
            })
            .catch(() => {
                return null;
            });
    };

    static GenerateProjectCode = async (): Promise<{ code: string }> => {
        const url = `${ApiHost}/api/project/code/generate`;
        const query = {};

        return await axios
            .get(url, { params: query })
            .then((result) => {
                return result.data;
            })
            .catch(() => {
                return null;
            });
    };
}
