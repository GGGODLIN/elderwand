export interface DeviceCategory {
    value: string;
    en: string;
    'zh-cn': string;
    'zh-tw': string;
}

export const DeviceCategories = [
    {
        value: 'A',
        en: 'Actuator',
        'zh-cn': '执行器',
        'zh-tw': '執行器',
    },
    {
        value: 'CP',
        en: 'Contact Point',
        'zh-cn': '干接点',
        'zh-tw': '乾接點',
    },
    {
        value: 'CPB',
        en: 'Contact Point Bridge',
        'zh-cn': '干接点桥接器',
        'zh-tw': '乾接點連接器',
    },
    {
        value: 'GW',
        en: 'Gateway',
        'zh-cn': 'IoT网关',
        'zh-tw': 'IoT網關',
    },
    {
        value: 'IR',
        en: 'IR Remote Controller and emitter',
        'zh-cn': '红外线遥控/转发器',
        'zh-tw': '紅外線遙控/轉發器',
    },
    {
        value: 'S',
        en: 'Sensor and General Device',
        'zh-cn': '传感器与一般设备',
        'zh-tw': '感應器與一般設備',
    },
    {
        value: 'SD',
        en: 'Software Device',
        'zh-cn': '软件设备',
        'zh-tw': '軟體設備',
    },
    {
        value: 'SP',
        en: 'Switch Panel',
        'zh-cn': '开关面板',
        'zh-tw': '開關面板',
    },
];
