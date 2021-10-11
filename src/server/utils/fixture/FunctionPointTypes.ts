export interface FunctionPointType {
    name: string;
    value: string;
    dpts: string[];
    unit: string | null;
}
export const FunctionPointTypeMap: {
    [key: string]: FunctionPointType;
} = {
    AirFlow: {
        name: 'AirFlow',
        value: 'AirFlow',
        dpts: ['1.003', '5.010', '14.007', '203.104'],
        unit: null,
    },
    AirQuality: {
        name: 'AirQuality',
        value: 'AirQuality',
        dpts: ['9.008'],
        unit: 'PPM',
    },
    Color: {
        name: 'Color',
        value: 'Color',
        dpts: ['5.010'],
        unit: null,
    },
    ColorRGB: {
        name: 'ColorRGB',
        value: 'ColorRGB',
        dpts: ['232.600'],
        unit: null,
    },
    Command: {
        name: 'Command',
        value: 'Command',
        dpts: ['1.003'],
        unit: null,
    },
    Curtain: {
        name: 'Curtain',
        value: 'Curtain',
        dpts: ['1.008', '1.010', '5.001'],
        unit: null,
    },
    Dimming: {
        name: 'Dimming',
        value: 'Dimming',
        dpts: ['3.007', '5.001'],
        unit: null,
    },
    Energy: {
        name: 'Energy',
        value: 'Energy',
        dpts: ['13.010', '13.013'],
        unit: null,
    },
    FHeating: {
        name: 'FHeating',
        value: 'FHeating',
        dpts: ['5.010'],
        unit: null,
    },
    Heartbeat: {
        name: 'Heartbeat',
        value: 'Heartbeat',
        dpts: ['1.006'],
        unit: null,
    },
    Humidity: {
        name: 'Humidity',
        value: 'Humidity',
        dpts: ['9.007'],
        unit: '%',
    },
    HVAC: {
        name: 'HVAC',
        value: 'HVAC',
        dpts: ['1.100', '5.100', '20.102', '20.105'],
        unit: null,
    },
    Moving: {
        name: 'Moving',
        value: 'Moving',
        dpts: ['1.008', '1.010', '1.018'],
        unit: null,
    },
    Percentage: {
        name: 'Percentage',
        value: 'Percentage',
        dpts: ['5.001', '5.003', '5.004'],
        unit: '%',
    },
    Switch: {
        name: 'Switch',
        value: 'Switch',
        dpts: ['1.001', '1.002', '1.003'],
        unit: null,
    },
    Temperature: {
        name: 'Temperature',
        value: 'Temperature',
        dpts: ['9.001'],
        unit: 'C',
    },
    Value: {
        name: 'Value',
        value: 'Value',
        dpts: [
            '1.002',
            '1.005',
            '1.009',
            '5.004',
            '6.010',
            '7.001',
            '8.001',
            '12.001',
            '13.001',
            '14.068',
            '14.076',
            '14.077',
        ],
        unit: null,
    },
};
