import { Dispatch } from 'react';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import FetchSlice from 'src/client/slices/FetchSlice';

import { SpaceTemplateVM } from './DataMigrationVM';

interface ImportSpaceTemplateOptions {}

class DataMigrationAPIs {
    static importSpaceTemplates = (
        dispatch: Dispatch<any>,
        options: ImportSpaceTemplateOptions,
        callback?: Function
    ) => {
        const url = `/api/migration/space/templates`;
        const params = {
            // projectId: project.id,
        };
        const body = {
            ...options,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .post<SpaceTemplateVM>(url, body, { params: params })
            .then((res) => {
                if (callback) {
                    callback();
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };
}

export default DataMigrationAPIs;
