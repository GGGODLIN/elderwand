import React from 'react';

export interface DevicePageProps {
    title: string;
}

export const DevicePage: React.FC<DevicePageProps> = () => {
    const name = 'device';
    const classname = `${name} page`;

    return (
        <React.Fragment>
            <div className={classname}>
                {/* <div className="name">
          {"Device Page"}
        </div> */}
                <div className="topology-toolbox">{'Tool Box'}</div>
                <div>{'Display Box'}</div>
            </div>
        </React.Fragment>
    );
};

export default DevicePage;
