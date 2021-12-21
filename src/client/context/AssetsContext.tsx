import React, { createContext, useState, useEffect } from 'react';
import AxiosFactory from 'src/client/helper/AxiosFactory';

export const AssetsContext = createContext({
    cloudCodes: null,
    setCloudCodes: () => { },
});

export const AssetsProvider = ({ children }) => {

    const [cloudCodes, setCloudCodes] = useState(null);


    const getCloudCodes = () => {
        const url = `/api/clouds`;
        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                //dispatch(FetchSlice.start());
            })
            .getInstance()
            .get<any>(url)
            .then((res) => {
                setCloudCodes(res?.data?.results)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                //dispatch(FetchSlice.end());
            });
    }

    useEffect(() => {
        (async () => {
            getCloudCodes()
        })();
    }, []);

    return (
        <AssetsContext.Provider
            value={{
                cloudCodes: cloudCodes,
                setCloudCodes: setCloudCodes,
            }}>
            {children}
        </AssetsContext.Provider>
    );
};