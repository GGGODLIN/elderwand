export interface DatePointTypeSuffix {
    createdRT: string;
    suffixes: Suffix[];
}
export interface Suffix {
    name: string;
    value: string;
}
export const DataPointTypeSuffixMap: {
    [key: string]: DatePointTypeSuffix;
} = {
    'bh.r.airFlow.level': {
        createdRT: 'bh.r.airFlow.level',
        suffixes: [],
    },
    'bh.r.alarm': {
        createdRT: 'bh.r.alarm',
        suffixes: [
            {
                name: 'gas',
                value: 'gas',
            },

            {
                name: 'occupancy',
                value: 'occupancy',
            },
        ],
    },
    'bh.r.airQualities': {
        createdRT: 'bh.r.airQualities',
        suffixes: [
            {
                name: 'co',
                value: 'co',
            },

            {
                name: 'co2',
                value: 'co2',
            },

            {
                name: 'pm2p5',
                value: 'pm2p5',
            },

            {
                name: 'pollution',
                value: 'pollution',
            },

            {
                name: 'tvoc',
                value: 'tvoc',
            },
        ],
    },
    'bh.r.fheat.opMode': {
        createdRT: 'bh.r.fheat.opMode',
        suffixes: [],
    },
    'bh.r.hvac.ctrlMode': {
        createdRT: 'bh.r.hvac.ctrlMode',
        suffixes: [],
    },
    'bh.r.humidity': {
        createdRT: 'bh.r.humidity',
        suffixes: [
            {
                name: 'current',
                value: 'current',
            },

            {
                name: 'outdoor',
                value: 'outdoor',
            },

            {
                name: 'setpoint',
                value: 'setpoint',
            },
        ],
    },
    'bh.r.movement': {
        createdRT: 'bh.r.movement',
        suffixes: [
            {
                name: 'UpDown',
                value: 'UpDown',
            },

            {
                name: 'StartStop',
                value: 'StartStop',
            },

            {
                name: 'LeftRight',
                value: 'LeftRight',
            },

            {
                name: 'ForwardBackward',
                value: 'ForwardBackward',
            },
        ],
    },
    'bh.r.open': {
        createdRT: 'bh.r.open',
        suffixes: [
            {
                name: 'door',
                value: 'door',
            },

            {
                name: 'window',
                value: 'window',
            },
        ],
    },
    'bh.r.temperature': {
        createdRT: 'bh.r.temperature',
        suffixes: [
            {
                name: 'current',
                value: 'current',
            },

            {
                name: 'dewpoint',
                value: 'dewpoint',
            },

            {
                name: 'outdoor',
                value: 'outdoor',
            },

            {
                name: 'setpoint',
                value: 'setpoint',
            },
        ],
    },
    'bh.r.time.period': {
        createdRT: 'bh.r.time.period',
        suffixes: [
            {
                name: 'upload',
                value: 'upload',
            },
        ],
    },
    'bh.r.volume': {
        createdRT: 'bh.r.volume',
        suffixes: [
            {
                name: 'gasConsumption',
                value: 'gasConsumption',
            },

            {
                name: 'waterConsumption',
                value: 'waterConsumption',
            },
        ],
    },
};
