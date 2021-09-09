interface DptInfo {
    dpt: string;
    name: string;
    desc_zh_CN: string;
    createdRT?: string;
    rt?: string[];
    valueKey?: string;
    valueType?: string;
}

type ValueKey = 'value';
type ValueType = 'boolean';

interface FlagRule {
    fValue: number;
    type: string;
    readInit: number;
    read: number;
    write: number;
    update: number;
    trasmit: number;
    commumication: number;
    priority: number;
}

interface Fun2Dpts {
    funId: string;
    valueStyle: {
        style: string;
        unit?: string;
    };
}

// data from elder-wand 2.0, things schema, docTag: knxDataFormat;
const knxDataFormat = {
    dptInfo: [
        {
            dpt: '1.001',
            name: 'Switch',
            desc_zh_CN: '0=关; 1=开',
            createdRT: 'oic.r.switch.binary',
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
        },
        {
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.002',
            name: 'Bool',
            desc_zh_CN: '0=非; 1=是',
            createdRT: 'bh.r.value.bool',
        },
        {
            valueType: 'boolean',
            dpt: '1.003',
            name: 'Enable',
            desc_zh_CN: '0=禁用; 1=开启',
            createdRT: 'bh.r.value.bool',
            rt: [],
            valueKey: 'value',
        },
        {
            createdRT: 'bh.r.value.bool',
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.004',
            name: 'Ramp',
            desc_zh_CN: '0=不渐变;  1=渐变',
        },
        {
            dpt: '1.005',
            name: 'Alarm',
            desc_zh_CN: '0=不警报; 1=警报',
            createdRT: 'bh.r.alarm',
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
        },
        {
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.006',
            name: 'BinaryValue',
            desc_zh_CN: '0=低; 1=高',
            createdRT: 'bh.r.dvHeartbeat',
        },
        {
            dpt: '1.007',
            name: 'Step',
            desc_zh_CN: '0=降低; 1=升高',
            createdRT: 'bh.r.movement',
            rt: [],
            valueKey: 'value',
            valueType: 'string',
        },
        {
            valueKey: 'value',
            valueType: 'string',
            dpt: '1.008',
            name: 'UpDown',
            desc_zh_CN: '0=向上; 1=向下',
            createdRT: 'bh.r.movement',
            rt: [],
        },
        {
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.009',
            name: 'OpenClose',
            desc_zh_CN: '0=开启; 1=关闭',
            createdRT: 'bh.r.value.bool',
        },
        {
            name: 'Start',
            desc_zh_CN: '0=停止; 1=开始',
            createdRT: 'bh.r.movement',
            rt: [],
            valueKey: 'value',
            valueType: 'string',
            dpt: '1.010',
        },
        {
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.011',
            name: 'State',
            desc_zh_CN: '0=未激活; 1=激活',
            createdRT: 'bh.r.value.bool',
            rt: [],
        },
        {
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.012',
            name: 'Invert',
            desc_zh_CN: '0=不反转; 1=反转',
            createdRT: 'bh.r.value.bool',
        },
        {
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.013',
            name: 'DimSendStyle',
            desc_zh_CN: '0=开始/停止; 1=循环',
            createdRT: 'bh.r.value.bool',
            rt: [],
        },
        {
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.014',
            name: 'InputSource',
            desc_zh_CN: '0=不变; 1=计算',
            createdRT: 'bh.r.value.bool',
        },
        {
            name: 'Reset',
            desc_zh_CN: '0=无动作; 1=重置',
            createdRT: 'bh.r.value.bool',
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.015',
        },
        {
            name: 'Ack',
            desc_zh_CN: '0=无动作; 1=驱动',
            createdRT: 'bh.r.value.bool',
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.016',
        },
        {
            name: 'Trigger',
            desc_zh_CN: '0,1=触发',
            createdRT: 'bh.r.value.bool',
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.017',
        },
        {
            name: 'Occupancy',
            desc_zh_CN: '0=无人; 1=有人',
            createdRT: 'bh.r.occupancy',
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.018',
        },
        {
            desc_zh_CN: '0=关闭; 1=开启',
            createdRT: 'bh.r.open',
            rt: [],
            dpt: '1.019',
            name: 'WindowDoor',
        },
        {
            desc_zh_CN: '0=或; 1=与',
            createdRT: 'bh.r.value.bool',
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.021',
            name: 'LogicalFunction',
        },
        {
            valueType: 'boolean',
            dpt: '1.022',
            name: 'Scene AB',
            desc_zh_CN: '0=场景A; 1=场景B',
            createdRT: 'bh.r.value.bool',
            rt: [],
            valueKey: 'value',
        },
        {
            desc_zh_CN: '0=场景A; 1=场景B',
            createdRT: 'bh.r.value.bool',
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.100',
            name: 'Scene AB',
        },
        {
            name: 'Shutter Blinds Mode',
            desc_zh_CN: '0=仅移动; 1=移动+停止',
            createdRT: 'bh.r.value.bool',
            rt: [],
            valueKey: 'value',
            valueType: 'boolean',
            dpt: '1.023',
        },
        {
            dpt: '3.007',
            name: 'Control Dimming',
            desc_zh_CN: '调光',
            createdRT: 'bh.r.dimming',
            rt: [],
            valueKey: 'value',
            valueType: 'integer',
        },
        {
            dpt: '3.008',
            name: 'Control Blinds',
            desc_zh_CN: '窗帘控制',
        },
        {
            valueKey: 'value',
            valueType: 'integer',
            dpt: '5.001',
            name: 'Percentage',
            desc_zh_CN: '百分比',
            createdRT: 'bh.r.openLevel',
            rt: [],
        },
        {
            valueKey: 'value',
            valueType: 'integer',
            dpt: '5.003',
            name: 'Angle',
            desc_zh_CN: '',
            createdRT: 'bh.r.angle',
            rt: ['bh.r.angle'],
        },
        {
            name: 'Percent U8',
            desc_zh_CN: '数值(0~255)',
            createdRT: 'bh.r.value.UChar',
            rt: [],
            valueKey: 'value',
            valueType: 'integer',
            dpt: '5.004',
        },
        {
            valueType: 'integer',
            dpt: '5.010',
            name: 'Value 1 Count',
            desc_zh_CN: '',
            createdRT: 'bh.r.value.UChar',
            rt: [],
            valueKey: 'value',
        },
        {
            desc_zh_CN: '风速数值(0~255)',
            createdRT: 'bh.r.airFlow.level',
            rt: [],
            valueKey: 'value',
            valueType: 'integer',
            dpt: '5.100',
            name: 'fan stage',
        },
        {
            valueType: 'integer',
            dpt: '6.010',
            name: 'Value 1 Count',
            desc_zh_CN: '数值(-128~127)',
            createdRT: 'bh.r.value.char',
            rt: [],
            valueKey: 'value',
        },
        {
            valueType: 'integer',
            dpt: '7.001',
            name: 'pulses',
            desc_zh_CN: '数值(0~65535)',
            createdRT: 'bh.r.value.UShort',
            rt: [],
            valueKey: 'value',
        },
        {
            valueKey: 'value',
            valueType: 'integer',
            dpt: '8.001',
            name: 'pulses difference',
            desc_zh_CN: '数值(-32768~32767)',
            createdRT: 'bh.r.value.short',
            rt: [],
        },
        {
            dpt: '9.001',
            name: 'Value Temp',
            desc_zh_CN: '温度',
            createdRT: 'bh.r.temperature',
            rt: [],
            valueKey: 'value',
            valueType: 'number',
        },
        {
            rt: [],
            valueKey: 'value',
            valueType: 'number',
            dpt: '9.007',
            name: 'Value Humidity',
            desc_zh_CN: '湿度',
            createdRT: 'bh.r.humidity',
        },
        {
            dpt: '9.008',
            name: 'Value AirQuality',
            desc_zh_CN: '',
            createdRT: 'bh.r.airQualities',
            rt: [],
            valueKey: 'value',
            valueType: 'number',
        },
        {
            desc_zh_CN: '',
            createdRT: 'bh.r.airFlow',
            rt: [],
            valueKey: 'value',
            valueType: 'number',
            dpt: '9.009',
            name: 'Air Flow',
        },
        {
            createdRT: 'bh.r.value.int',
            rt: [],
            valueKey: 'value',
            valueType: 'integer',
            dpt: '13.001',
            name: 'Counter pulses (singed)',
            desc_zh_CN: '4字节数值(有符号数)',
        },
        {
            dpt: '12.001',
            name: 'Counter pulses (unsinged)',
            desc_zh_CN: '4字节数值(无符号数)',
            createdRT: 'bh.r.value.UInt',
            rt: [],
            valueKey: 'value',
            valueType: 'integer',
        },
        {
            valueKey: 'value',
            valueType: 'integer',
            dpt: '13.010',
            name: 'Active Energy (Wh)',
            desc_zh_CN: '实電能',
            createdRT: 'bh.r.energy',
            rt: [],
        },
        {
            dpt: '13.013',
            name: 'Active Energy (kWh)',
            desc_zh_CN: '实電能',
            createdRT: 'bh.r.energy',
            rt: [],
            valueKey: 'value',
            valueType: 'number',
        },
        {
            desc_zh_CN: '浮点',
            createdRT: 'bh.r.value.number',
            rt: [],
            valueKey: 'value',
            valueType: 'number',
            dpt: '14.068',
            name: 'Temperature',
        },
        {
            dpt: '14.007',
            name: 'Angle',
            desc_zh_CN: '角度',
            createdRT: 'bh.r.value.float',
            rt: [],
            valueKey: 'value',
            valueType: 'number',
        },
        {
            valueType: 'number',
            dpt: '14.076',
            name: 'Volume',
            desc_zh_CN: '体积',
            createdRT: 'bh.r.volume',
            rt: [],
            valueKey: 'value',
        },
        {
            valueKey: 'value',
            valueType: 'number',
            dpt: '14.077',
            name: 'Volume Flux',
            desc_zh_CN: '体积流量',
            createdRT: 'bh.r.volume.flux',
            rt: [],
        },
        {
            name: 'SCLOMode',
            desc_zh_CN: '',
            dpt: '20.001',
        },
        {
            dpt: '20.002',
            name: 'BuildingMode',
            desc_zh_CN: '',
        },
        {
            dpt: '20.003',
            name: 'OccMode',
            desc_zh_CN: '',
        },
        {
            dpt: '20.004',
            name: 'Priority',
            desc_zh_CN: '',
        },
        {
            dpt: '20.005',
            name: 'LightApplicationMode',
            desc_zh_CN: '',
        },
        {
            dpt: '20.006',
            name: 'ApplicationArea',
            desc_zh_CN: '',
        },
        {
            dpt: '20.007',
            name: 'AlarmClassType',
            desc_zh_CN: '',
        },
        {
            dpt: '20.008',
            name: 'PSUMode',
            desc_zh_CN: '',
        },
        {
            dpt: '20.011',
            name: 'ErrorClass System',
            desc_zh_CN: '',
        },
        {
            dpt: '20.012',
            name: 'ErrorClass HVAC',
            desc_zh_CN: '',
        },
        {
            dpt: '20.013',
            name: 'Time Delay',
            desc_zh_CN: '',
        },
        {
            dpt: '20.014',
            name: 'Beaufort Wind Force Scale',
            desc_zh_CN: '',
        },
        {
            name: 'SensorSelect',
            desc_zh_CN: '',
            dpt: '20.017',
        },
        {
            dpt: '20.020',
            name: 'ActuatorConnectType',
            desc_zh_CN: '',
        },
        {
            rt: [],
            valueKey: 'value',
            valueType: 'integer',
            dpt: '20.102',
            name: 'HVAC Mode',
            desc_zh_CN: 'HVAC模式',
            createdRT: 'bh.r.hvac.ctrlMode',
        },
        {
            valueKey: 'value',
            valueType: 'integer',
            dpt: '20.105',
            name: 'HVAC Control Mode',
            desc_zh_CN: '温控模式',
            createdRT: 'bh.r.hvac.ctrlMode',
            rt: [],
        },
        {
            name: '',
            desc_zh_CN: '气流量',
            createdRT: 'bh.r.value.float',
            rt: [],
            valueKey: 'value',
            valueType: 'number',
            dpt: '203.104',
        },
        {
            valueKey: 'value',
            valueType: 'integer',
            dpt: '232.600',
            name: 'Color RGB',
            desc_zh_CN: '',
            createdRT: 'bh.r.color.rgb',
            rt: [],
        },
    ],
    flagRules: [
        {
            write: 0,
            readInit: 0,
            fValue: 196,
            commumication: 1,
            read: 0,
            trasmit: 1,
            update: 1,
            type: 'bh.r.attr.sensor',
            priority: 0,
        },
        {
            fValue: 212,
            type: 'bh.r.attr.button',
            write: 1,
            read: 0,
            readInit: 0,
            trasmit: 1,
            update: 1,
            priority: 0,
            commumication: 1,
        },
        {
            type: 'bh.r.attr.actuator',
            write: 1,
            readInit: 0,
            update: 1,
            fValue: 148,
            priority: 0,
            commumication: 1,
            read: 0,
            trasmit: 0,
        },
        {
            priority: 0,
            read: 0,
            write: 0,
            readInit: 0,
            type: 'default',
            commumication: 1,
            trasmit: 0,
            update: 0,
            fValue: 4,
        },
    ],
    fun2dps: [
        {
            Name_zh_CN: '气流',
            valueStyle: {
                style: 'Label',
            },
            funId: 'AirFlow',
            dpts: ['1.003', '5.010', '14.007', '203.104'],
        },
        {
            funId: 'AirQuality',
            dpts: ['9.008'],
            Name_zh_CN: '空气质量',
            valueStyle: {
                style: 'Label',
                unit: 'PPM',
            },
        },
        {
            funId: 'Color',
            dpts: ['5.010'],
            Name_zh_CN: '颜色',
            valueStyle: {
                style: 'InputBox',
            },
        },
        {
            funId: 'ColorRGB',
            dpts: ['232.600'],
            Name_zh_CN: 'RGB颜色',
            valueStyle: {
                style: 'InputBox',
                default: '255,255,255',
            },
        },
        {
            Name_zh_CN: '指令',
            valueStyle: {
                style: 'DPT_DESC',
            },
            funId: 'Command',
            dpts: ['1.003'],
        },
        {
            dpts: ['1.008', '1.010', '5.001'],
            Name_zh_CN: '窗帘',
            valueStyle: {
                style: 'InputBox',
            },
            funId: 'Curtain',
        },
        {
            funId: 'Dimming',
            dpts: ['3.007', '5.001'],
            Name_zh_CN: '调光',
            valueStyle: {
                style: 'InputBox',
            },
        },
        {
            funId: 'Energy',
            dpts: ['13.010', '13.013'],
            Name_zh_CN: '能源',
            valueStyle: {
                style: 'DPT_DESC',
            },
        },
        {
            funId: 'FHeating',
            dpts: ['5.010'],
            Name_zh_CN: '地暖',
            valueStyle: {
                style: 'DPT_DESC',
            },
        },
        {
            funId: 'Heartbeat',
            dpts: ['1.006'],
            Name_zh_CN: '心跳',
            valueStyle: {
                style: 'DPT_DESC',
            },
        },
        {
            Name_zh_CN: '湿度',
            valueStyle: {
                style: 'DPT_DESC',
                unit: '%',
            },
            funId: 'Humidity',
            dpts: ['9.007'],
        },
        {
            funId: 'HVAC',
            dpts: ['1.100', '5.100', '20.102', '20.105'],
            Name_zh_CN: '空调',
            valueStyle: {
                style: 'DPT_DESC',
            },
        },
        {
            funId: 'Moving',
            dpts: ['1.008', '1.010', '1.018'],
            Name_zh_CN: '移动',
            valueStyle: {
                style: 'DPT_DESC',
            },
        },
        {
            funId: 'Percentage',
            dpts: ['5.001', '5.003', '5.004'],
            Name_zh_CN: '百分比',
            valueStyle: {
                style: 'InputBox',
                unit: '%',
            },
        },
        {
            funId: 'Switch',
            dpts: ['1.001', '1.002', '1.003'],
            Name_zh_CN: '开关',
            valueStyle: {
                style: 'DPT_DESC',
            },
        },
        {
            Name_zh_CN: '温度',
            valueStyle: {
                unit: 'C',
                style: 'Label',
            },
            funId: 'Temperature',
            dpts: ['9.001'],
        },
        {
            Name_zh_CN: '数值',
            valueStyle: {
                style: 'DPT_DESC',
            },
            funId: 'Value',
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
        },
    ],
    rtCodeDefs: [
        {
            codeDefs: [
                {
                    createdRT: 'bh.r.airFlow.level',
                    codes: [0, 25, 50, 75, 100],
                    codes_en_US: ['Quiet', 'Low', 'Medium', 'High', 'Highest'],
                    codes_zh_CN: ['安静', '低', '中', '高', '最强'],
                },
            ],
            createdRT: 'bh.r.airFlow.level',
        },
        {
            createdRT: 'bh.r.alarm',
            suffixes: ['gas', 'occupancy'],
            susffixes_en_US: ['Gas', 'Occupancy'],
            susffixes_zh_CN: ['煤气', '有人'],
        },
        {
            createdRT: 'bh.r.airQualities',
            suffixes: ['co', 'co2', 'pm2p5', 'pollution', 'tvoc'],
            susffixes_en_US: ['CO', 'CO2', 'PM2.5', 'Pollution', 'TVOC'],
            susffixes_zh_CN: [
                '一氧化碳',
                '二氧化碳',
                'PM2.5',
                '污染',
                '总挥发性有机物',
            ],
            codeDefs: [
                {
                    createdRT: 'bh.r.airQualities:pollution',
                    codes: [0, 1, 2, 3, 4, 5],
                    codes_en_US: [
                        'Clean',
                        'Slight',
                        'Low',
                        'Medium',
                        'High',
                        'Serious',
                    ],
                    codes_zh_CN: [
                        '干净',
                        '轻微污染',
                        '低污染',
                        '中污染',
                        '高污染',
                        '严重污染',
                    ],
                },
            ],
        },
        {
            createdRT: 'bh.r.fheat.opMode',
            codeDefs: [
                {
                    createdRT: 'bh.r.fheat.opMode',
                    codes_en_US: ['Auto', 'General', 'Day', 'Night', 'Away'],
                    codes: [0, 1, 2, 3, 4, 5],
                    codes_zh_CN: ['自动', '一般', '昼', '夜', '离家'],
                },
            ],
        },
        {
            createdRT: 'bh.r.hvac.ctrlMode',
            codeDefs: [
                {
                    createdRT: 'bh.r.hvac.ctrlMode',
                    codes: [
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        16, 17, 20,
                    ],
                    codes_en_US: [
                        'Auto',
                        'Heat',
                        'Morning Warmup',
                        'Cool',
                        'Night Purge',
                        'Precool',
                        'Off',
                        'Test',
                        'Emergency Heat',
                        'Fan only',
                        'Free Cool',
                        'Ice',
                        'Maximum Heating Mode',
                        'Economic Heat or Cool Mode',
                        'Dehumidification',
                        'Calibration Mode',
                        'Emergency Cool Mode',
                        'Emergency Steam Mode',
                        'NoDem',
                    ],
                    codes_zh_CN: [
                        '自动',
                        '制热',
                        '早晨预热',
                        '制冷',
                        '夜间净化',
                        '预冷',
                        '关机',
                        '测试',
                        '急热',
                        '仅风扇',
                        '自然冷却',
                        '冷冻',
                        '最大制热',
                        '节能制热或制冷',
                        '除湿',
                        '校正模式',
                        '节能制冷',
                        '节能暖气',
                        'NoDem',
                    ],
                },
            ],
        },
        {
            createdRT: 'bh.r.humidity',
            suffixes: ['current', 'outdoor', 'setpoint'],
            susffixes_en_US: ['Current', 'Outdoor', 'Setpoint'],
            susffixes_zh_CN: ['当前', '设定', '户外'],
        },
        {
            createdRT: 'bh.r.movement',
            suffixes: ['UpDown', 'StartStop', 'LeftRight', 'ForwardBackward'],
            susffixes_en_US: [
                'Up/Down',
                'Start/Stop',
                'Left/Right',
                'Forward/Backward',
            ],
            susffixes_zh_CN: ['上/下', '开始/停止', '左/右', '前进/后退'],
            codeDefs: [
                {
                    codes: [
                        'up',
                        'down',
                        'start',
                        'stop',
                        'left',
                        'right',
                        'forward',
                        'backward',
                        'rotate',
                    ],
                    codes_en_US: [
                        'Up',
                        'Down',
                        'Start',
                        'Stop',
                        'Left',
                        'Right',
                        'Forward',
                        'Backward',
                        'Rotate',
                    ],
                    codes_zh_CN: [
                        '上',
                        '下',
                        '开始',
                        '停止',
                        '左',
                        '右',
                        '前进',
                        '后退',
                        '旋转',
                    ],
                    createdRT: 'bh.r.movement',
                },
                {
                    codes: ['up', 'down'],
                    codes_en_US: ['Up', 'Down'],
                    codes_zh_CN: ['上', '下'],
                    createdRT: 'bh.r.movement:UpDown',
                },
                {
                    codes_zh_CN: ['开始', '停止'],
                    createdRT: 'bh.r.movement:StartStop',
                    codes: ['start', 'stop'],
                    codes_en_US: ['Start', 'Stop'],
                },
                {
                    createdRT: 'bh.r.movement:LeftRight',
                    codes: ['left', 'right'],
                    codes_en_US: ['Left', 'Right'],
                    codes_zh_CN: ['左', '右'],
                },
                {
                    createdRT: 'bh.r.movement:ForwardBackward',
                    codes: ['left', 'right'],
                    codes_en_US: ['Forward', 'Backward'],
                    codes_zh_CN: ['前进', '后退'],
                },
            ],
        },
        {
            susffixes_en_US: ['Door', 'Window'],
            susffixes_zh_CN: ['门', '窗'],
            createdRT: 'bh.r.open',
            suffixes: ['door', 'window'],
        },
        {
            createdRT: 'bh.r.temperature',
            suffixes: ['current', 'dewpoint', 'outdoor', 'setpoint'],
            susffixes_en_US: ['Current', 'Dew Point', 'Outdoor', 'Setpoint'],
            susffixes_zh_CN: ['当前', '露点', '户外', '设定'],
        },
        {
            createdRT: 'bh.r.time.period',
            suffixes: ['upload'],
            susffixes_en_US: ['Upload'],
            susffixes_zh_CN: ['上载'],
        },
        {
            createdRT: 'bh.r.volume',
            suffixes: ['gasConsumption', 'waterConsumption'],
            susffixes_en_US: ['Gas Sonsumption', 'Water Consumption'],
            susffixes_zh_CN: ['总燃气用量', '总用水量'],
        },
    ],
};

const DptDescriptionList: {
    value: string;
    en: string;
    'zh-cn': string;
    'zh-tw': string;
}[] = [
    {
        value: '0=关; 1=开',
        en: '0 = Off; 1 = Open',
        'zh-cn': '0=关; 1=开',
        'zh-tw': '0=關; 1=開',
    },
    {
        value: '0=非; 1=是',
        en: '0 = non; 1 = Yes',
        'zh-cn': '0=非; 1=是',
        'zh-tw': '0=非; 1=是',
    },
    {
        value: '0=禁用; 1=开启',
        en: '0 = disabled; 1 = open',
        'zh-cn': '0=禁用; 1=开启',
        'zh-tw': '0=禁用; 1=開啟',
    },
    {
        value: '0=不渐变;  1=渐变',
        en: '0 = no gradual change; 1 = gradient',
        'zh-cn': '0=不渐变;  1=渐变',
        'zh-tw': '0=不漸變;  1=漸變',
    },
    {
        value: '0=不警报; 1=警报',
        en: '0 = no alert; 1 = alarm',
        'zh-cn': '0=不警报; 1=警报',
        'zh-tw': '0=不警報; 1=警報',
    },
    {
        value: '0=低; 1=高',
        en: '0 = low; 1 = high',
        'zh-cn': '0=低; 1=高',
        'zh-tw': '0=低; 1=高',
    },
    {
        value: '0=降低; 1=升高',
        en: '0 = lowered; 1 = elevation',
        'zh-cn': '0=降低; 1=升高',
        'zh-tw': '0=降低; 1=升高',
    },
    {
        value: '0=向上; 1=向下',
        en: '0 = up; 1 = down',
        'zh-cn': '0=向上; 1=向下',
        'zh-tw': '0=向上; 1=向下',
    },
    {
        value: '0=开启; 1=关闭',
        en: '0 = Open; 1 = Close',
        'zh-cn': '0=开启; 1=关闭',
        'zh-tw': '0=開啟; 1=關閉',
    },
    {
        value: '0=停止; 1=开始',
        en: '0 = stop; 1 = start',
        'zh-cn': '0=停止; 1=开始',
        'zh-tw': '0=停止; 1=開始',
    },
    {
        value: '0=未激活; 1=激活',
        en: '0 = Not activated; 1 = activation',
        'zh-cn': '0=未激活; 1=激活',
        'zh-tw': '0=未激活; 1=激活',
    },
    {
        value: '0=不反转; 1=反转',
        en: '0 = does not reverse; 1 = reverse',
        'zh-cn': '0=不反转; 1=反转',
        'zh-tw': '0=不反轉; 1=反轉',
    },
    {
        value: '0=开始/停止; 1=循环',
        en: '0 = Start / stop; 1 = cycle',
        'zh-cn': '0=开始/停止; 1=循环',
        'zh-tw': '0=開始/停止; 1=循環',
    },
    {
        value: '0=不变; 1=计算',
        en: '0 = unchanged; 1 = calculation',
        'zh-cn': '0=不变; 1=计算',
        'zh-tw': '0=不變; 1=計算',
    },
    {
        value: '0=无动作; 1=重置',
        en: '0 = no action; 1 = reset',
        'zh-cn': '0=无动作; 1=重置',
        'zh-tw': '0=無動作; 1=重置',
    },
    {
        value: '0=无动作; 1=驱动',
        en: '0 = no action; 1 = drive',
        'zh-cn': '0=无动作; 1=驱动',
        'zh-tw': '0=無動作; 1=驅動',
    },
    {
        value: '0,1=触发',
        en: '0,1 = trigger',
        'zh-cn': '0,1=触发',
        'zh-tw': '0,1=觸發',
    },
    {
        value: '0=无人; 1=有人',
        en: '0 = no one; 1 = someone',
        'zh-cn': '0=无人; 1=有人',
        'zh-tw': '0=無人; 1=有人',
    },
    {
        value: '0=关闭; 1=开启',
        en: '0 = Off; 1 = Open',
        'zh-cn': '0=关闭; 1=开启',
        'zh-tw': '0=關閉; 1=開啟',
    },
    {
        value: '0=或; 1=与',
        en: '0 = or; 1 =',
        'zh-cn': '0=或; 1=与',
        'zh-tw': '0=或; 1=與',
    },
    {
        value: '0=场景A; 1=场景B',
        en: '0 = Scene A; 1 = Scene B',
        'zh-cn': '0=场景A; 1=场景B',
        'zh-tw': '0=場景A; 1=場景B',
    },
    {
        value: '0=场景A; 1=场景B',
        en: '0 = Scene A; 1 = Scene B',
        'zh-cn': '0=场景A; 1=场景B',
        'zh-tw': '0=場景A; 1=場景B',
    },
    {
        value: '0=仅移动; 1=移动+停止',
        en: '0 = only move; 1 = Move + stop',
        'zh-cn': '0=仅移动; 1=移动+停止',
        'zh-tw': '0=僅移動; 1=移動+停止',
    },
    {
        value: '调光',
        en: 'Diminum',
        'zh-cn': '调光',
        'zh-tw': '調光',
    },
    {
        value: '窗帘控制',
        en: 'Curtain control',
        'zh-cn': '窗帘控制',
        'zh-tw': '窗簾控制',
    },
    {
        value: '百分比',
        en: 'percentage',
        'zh-cn': '百分比',
        'zh-tw': '百分比',
    },
    {
        value: '数值(0~255)',
        en: 'Numerical value (0 ~ 255)',
        'zh-cn': '数值(0~255)',
        'zh-tw': '數值(0~255)',
    },
    {
        value: '风速数值(0~255)',
        en: 'Wind speed value (0 ~ 255)',
        'zh-cn': '风速数值(0~255)',
        'zh-tw': '風速數值(0~255)',
    },
    {
        value: '数值(-128~127)',
        en: 'Numerical (-128 ~ 127)',
        'zh-cn': '数值(-128~127)',
        'zh-tw': '數值(-128~127)',
    },
    {
        value: '数值(0~65535)',
        en: 'Numerical (0 ~ 65535)',
        'zh-cn': '数值(0~65535)',
        'zh-tw': '數值(0~65535)',
    },
    {
        value: '数值(-32768~32767)',
        en: 'Numerical (-32768 ~ 32767)',
        'zh-cn': '数值(-32768~32767)',
        'zh-tw': '數值(-32768~32767)',
    },
    {
        value: '温度',
        en: 'temperature',
        'zh-cn': '温度',
        'zh-tw': '溫度',
    },
    {
        value: '湿度',
        en: 'humidity',
        'zh-cn': '湿度',
        'zh-tw': '濕度',
    },
    {
        value: '4字节数值(有符号数)',
        en: '4-byte value (number of symbols)',
        'zh-cn': '4字节数值(有符号数)',
        'zh-tw': '4字節數值(有符號數)',
    },
    {
        value: '4字节数值(无符号数)',
        en: '4-byte value (no sign)',
        'zh-cn': '4字节数值(无符号数)',
        'zh-tw': '4字節數值(無符號數)',
    },
    {
        value: '实電能',
        en: 'Power energy',
        'zh-cn': '实电能',
        'zh-tw': '实電能',
    },
    {
        value: '实電能',
        en: 'Power energy',
        'zh-cn': '实电能',
        'zh-tw': '实電能',
    },
    {
        value: '浮点',
        en: 'floating point',
        'zh-cn': '浮点',
        'zh-tw': '浮點',
    },
    {
        value: '角度',
        en: 'angle',
        'zh-cn': '角度',
        'zh-tw': '角度',
    },
    {
        value: '体积',
        en: 'volume',
        'zh-cn': '体积',
        'zh-tw': '體積',
    },
    {
        value: '体积流量',
        en: 'Volume flow',
        'zh-cn': '体积流量',
        'zh-tw': '體積流量',
    },
    {
        value: 'HVAC模式',
        en: 'HVAC mode',
        'zh-cn': 'HVAC模式',
        'zh-tw': 'HVAC模式',
    },
    {
        value: '温控模式',
        en: 'Temperature control mode',
        'zh-cn': '温控模式',
        'zh-tw': '溫控模式',
    },
    {
        value: '气流量',
        en: 'air flow volume',
        'zh-cn': '气流量',
        'zh-tw': '氣流量',
    },
];

/**
 * @returns map
 * @summary map key is origin dpt info's desc_zh_CN
 */
export const getDptDescriptionMap = (): {
    [key: string]: {
        value: string;
        en: string;
        'zh-cn': string;
        'zh-tw': string;
    };
} => {
    let map: {
        [key: string]: {
            value: string;
            en: string;
            'zh-cn': string;
            'zh-tw': string;
        };
    } = {};

    for (const description of DptDescriptionList) {
        map[description.value] = description;
    }

    return map;
};

export const DptDescriptionMap = getDptDescriptionMap();

export default knxDataFormat;
