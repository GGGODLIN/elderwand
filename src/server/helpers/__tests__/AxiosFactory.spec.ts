import { AxiosError } from 'axios';
import TestEnvVar from '../../../test/config/TestEnvVar';
import ErrorInfoDTO from '../../domain/shared/models/ErrorInfoDTO';
import ServiceInfoDTO from '../../domain/shared/models/ServiceInfoDTO';
import AxiosFactory from '../AxiosFactory';

describe('Axios status code', function () {
    beforeAll(() => {});

    it('should be 200', async function () {
        const origin = TestEnvVar.SkymapApiHost;
        const axios = new AxiosFactory({ baseURL: origin }).getInstance();

        const pathname = '/api/status/200';
        const params = {};

        const actual = await axios
            .get<ServiceInfoDTO>(pathname, { params: params })
            .then((res) => {
                expect(res.status).toEqual(200);
                return res.data;
            })
            .catch((err: AxiosError) => {
                expect(err).toBeNull();
            });

        expect(actual).not.toBeNull();
    });

    it('should be 400', async function () {
        const origin = TestEnvVar.SkymapApiHost;
        const axios = new AxiosFactory({ baseURL: origin }).getInstance();

        const pathname = '/api/status/400';
        const params = {};

        const actual = await axios
            .get<ServiceInfoDTO>(pathname, { params: params })
            .then((res) => {
                expect(res).toBeNull();
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (!err.isAxiosError) {
                    expect(err.isAxiosError).toBeFalsy();
                    return;
                }
                expect(err.isAxiosError).toBeTruthy();
                expect(err.response.status).toEqual(400);
                console.log(err.response.data);
            });

        expect(actual).not.toBeNull();
    });
});

export {};
