interface DeviceTemplate {
    // _id: Id;
    docTag: string;
    deviceType: number;
    hwInfo: HwInfo;
    icon: string;
    image: string;
    name: string;
    protocolInfo: ProtocolInfo[];
    attrs: Attr[];
    heartbeat: number;
    KNX: KNX;
    commInfo: CommInfo;
}

interface CommInfo {
    protocol4GW: string;
}

interface KNX {
    maxCh: number;
    chCnt: number;
}

interface Attr {
    chId?: number;
    funId: string;
    valueKey: string;
    flags: number;
    dpt: string;
    createdRT: string;
    valueType: string;
    rt: string[];
    objId: number;
    // name: string;
    ack4Obj?: number;
    appHidden?: boolean;
}

interface ProtocolInfo {
    protocol: string;
}

interface HwInfo {
    model: string;
    class: string;
    brand: string;
}

export interface Device {
  deviceType: number;
  discarded: boolean;
  dispName: string;
  file: string;
  image: string;
  model: string;
  protocol: string[];
  brand: string;
}

export const ThingsSchema = [
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b71" },
        "deviceList": [
            {
                "deviceType": 4,
                "discarded": true,
                "dispName": "两键跷板场景面板/ADS-SWSR2",
                "file": "00004_AD_ADS-SWSR2.json",
                "image": "ADS-SWSR2.png",
                "model": "ADS-SWSR2",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices"
            },
            {
                "discarded": true,
                "dispName": "四键跷板场景面板/ADS-SWSR4",
                "file": "00004_AD_ADS-SWSR4.json",
                "image": "ADS-SWSR4.png",
                "model": "ADS-SWSR4",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 4
            },
            {
                "file": "00004_AD_ADS-SWSS1.json",
                "image": "ADS-SWSS1.png",
                "model": "ADS-SWSS1",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 4,
                "discarded": true,
                "dispName": "单键复位场景面板/ADS-SWSS1"
            },
            {
                "model": "ADS-SWSS2",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 4,
                "discarded": true,
                "dispName": "两键复位场景面板/ADS-SWSS2",
                "file": "00004_AD_ADS-SWSS2.json",
                "image": "ADS-SWSS2.png"
            },
            {
                "file": "00010_JT_Z-5N.json",
                "image": "JT_Z-5N.png",
                "model": "Z-5N",
                "protocol": ["EtN"],
                "brand": "JUSTTREE",
                "deviceType": 10,
                "discarded": false,
                "dispName": "Z-5N商用锁/Z-5N"
            },
            {
                "image": "RAYG_M1.png",
                "model": "M1",
                "protocol": ["MdB"],
                "brand": "RAYSGEM",
                "deviceType": 17,
                "discarded": false,
                "dispName": "智能魔镜M1/M1",
                "file": "00017_RAYG_M1.json"
            },
            {
                "file": "00256_Non_Non.json",
                "image": "Non_Non.png",
                "model": "Non",
                "protocol": ["MdB"],
                "brand": "Non",
                "deviceType": 256,
                "discarded": true,
                "dispName": "灯/Non"
            },
            {
                "discarded": true,
                "dispName": "两键跷板照明面板/ADS-SWLR2",
                "file": "00259_AD_ADS-SWLR2.json",
                "image": "ADS-SWLR2.png",
                "model": "ADS-SWLR2",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 259
            },
            {
                "dispName": "四键跷板照明面板/ADS-SWLR4",
                "file": "00259_AD_ADS-SWLR4.json",
                "image": "ADS-SWLR4.png",
                "model": "ADS-SWLR4",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 259,
                "discarded": true
            },
            {
                "image": "ADS-SWLS1.png",
                "model": "ADS-SWLS1",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 259,
                "discarded": true,
                "dispName": "单键复位照明面板/ADS-SWLS1",
                "file": "00259_AD_ADS-SWLS1.json"
            },
            {
                "file": "00259_AD_ADS-SWLS2.json",
                "image": "ADS-SWLS2.png",
                "model": "ADS-SWLS2",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 259,
                "discarded": true,
                "dispName": "两键复位照明面板/ADS-SWLS2"
            },
            {
                "discarded": false,
                "dispName": "吸顶式移动传感器/M/HS05.1-D",
                "file": "00263_HDL_M-HS05.1-D.json",
                "image": "HDL_M-HS05.1-D.png",
                "model": "M/HS05.1-D",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 263
            },
            {
                "dispName": "吸顶式红外传感器/M/IS05.1-D",
                "file": "00263_HDL_M-IS05.1-D.json",
                "image": "HDL_M-IS05.1-D.png",
                "model": "M/IS05.1-D",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 263,
                "discarded": false
            },
            {
                "deviceType": 263,
                "discarded": false,
                "dispName": "吸顶式超声波传感器/M/US05.1-D",
                "file": "00263_HDL_M-US05.1-D.json",
                "image": "HDL_M-US05.1-D.png",
                "model": "M/US05.1-D",
                "protocol": ["KNX"],
                "brand": "HDL"
            },
            {
                "image": "AD_ADP-SM-M-B8.png",
                "model": "ADP-SM-M-B8",
                "protocol": ["MdB"],
                "brand": "AdvancedDevices",
                "deviceType": 264,
                "discarded": false,
                "dispName": "Irene开关面板(八键)/ADP-SM-M-B8",
                "file": "00264_AD_ADP-SM-M-B8.json"
            },
            {
                "image": "ADS-SWLR2.png",
                "model": "ADS-SWLR2",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 264,
                "discarded": false,
                "dispName": "两键跷板照明面板/ADS-SWLR2",
                "file": "00264_AD_ADS-SWLR2.json"
            },
            {
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 264,
                "discarded": false,
                "dispName": "四键跷板照明面板/ADS-SWLR4",
                "file": "00264_AD_ADS-SWLR4.json",
                "image": "ADS-SWLR4.png",
                "model": "ADS-SWLR4"
            },
            {
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 264,
                "discarded": false,
                "dispName": "单键复位照明面板/ADS-SWLS1",
                "file": "00264_AD_ADS-SWLS1.json",
                "image": "ADS-SWLS1.png",
                "model": "ADS-SWLS1"
            },
            {
                "discarded": false,
                "dispName": "两键复位照明面板/ADS-SWLS2",
                "file": "00264_AD_ADS-SWLS2.json",
                "image": "ADS-SWLS2.png",
                "model": "ADS-SWLS2",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 264
            },
            {
                "discarded": false,
                "dispName": "RS485开关面板/SWB11RS0",
                "file": "00264_CJH_SWB11RS0.json",
                "image": "CJH_SWB11RS0.png",
                "model": "SWB11RS0",
                "protocol": ["MdB"],
                "brand": "中国金茂",
                "deviceType": 264
            },
            {
                "deviceType": 264,
                "discarded": false,
                "dispName": "KNX两键毅系列面板/M/P2R.1",
                "file": "00264_HDL_M-P2R.1.json",
                "image": "HDL_M-P2R.1.png",
                "model": "M/P2R.1",
                "protocol": ["KNX"],
                "brand": "HDL"
            },
            {
                "file": "00264_HDL_M-P3R.1.json",
                "image": "HDL_M-P3R.1.png",
                "model": "M/P3R.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 264,
                "discarded": false,
                "dispName": "KNX三键毅系列面板/M/P3R.1"
            },
            {
                "brand": "HDL",
                "deviceType": 264,
                "discarded": false,
                "dispName": "方悦/6键液晶面板/M/PT0L6.1",
                "file": "00264_HDL_M-PT0L6.1.json",
                "image": "HDL_M-PT0L6.1.png",
                "model": "M/PT0L6.1",
                "protocol": ["KNX"]
            },
            {
                "brand": "HDL",
                "deviceType": 264,
                "discarded": false,
                "dispName": "方悦/单开单控面板/M/PT1RA.1",
                "file": "00264_HDL_M-PT1RA.1.json",
                "image": "HDL_M-PT1RA.1.png",
                "model": "M/PT1RA.1",
                "protocol": ["KNX"]
            },
            {
                "file": "00264_HDL_M-PT1RB.1.json",
                "image": "HDL_M-PT1RB.1.png",
                "model": "M/PT1RB.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 264,
                "discarded": false,
                "dispName": "方悦/单开双控面板/M/PT1RB.1"
            },
            {
                "deviceType": 264,
                "discarded": false,
                "dispName": "方悦/双开双控面板/M/PT2RA.1",
                "file": "00264_HDL_M-PT2RA.1.json",
                "image": "HDL_M-PT2RA.1.png",
                "model": "M/PT2RA.1",
                "protocol": ["KNX"],
                "brand": "HDL"
            },
            {
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 264,
                "discarded": false,
                "dispName": "方悦/双开四控面板/M/PT2RB.1",
                "file": "00264_HDL_M-PT2RB.1.json",
                "image": "HDL_M-PT2RB.1.png",
                "model": "M/PT2RB.1"
            },
            {
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 264,
                "discarded": false,
                "dispName": "方悦/四开四控面板面板/M/PT4RA.1",
                "file": "00264_HDL_M-PT4RA.1.json",
                "image": "HDL_M-PT4RA.1.png",
                "model": "M/PT4RA.1"
            },
            {
                "brand": "HDL",
                "deviceType": 264,
                "discarded": false,
                "dispName": "简约S 2按键触控面板（欧标）/M/TBP2.1",
                "file": "00264_HDL_M-TBP2.1.json",
                "image": "HDL_M-TBP4.1.png",
                "model": "M/TBP2.1",
                "protocol": ["KNX"]
            },
            {
                "image": "HDL_M-TBP4.1.png",
                "model": "M/TBP4.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 264,
                "discarded": false,
                "dispName": "简约S 4按键触控面板（欧标）/M/TBP4.1",
                "file": "00264_HDL_M-TBP4.1.json"
            },
            {
                "brand": "Non",
                "deviceType": 265,
                "discarded": false,
                "dispName": "灯/Non",
                "file": "00265_Non_Non.json",
                "image": "Non_Non.png",
                "model": "Non",
                "protocol": ["KNX", "MdB"]
            },
            {
                "image": "DY_DM35EQ.png",
                "model": "DM35EQ",
                "protocol": ["MdB"],
                "brand": "DOOYA",
                "deviceType": 514,
                "discarded": false,
                "dispName": "开合帘电机/DM35EQ",
                "file": "00514_DY_DM35EQ.json"
            },
            {
                "brand": "Non",
                "deviceType": 514,
                "discarded": false,
                "dispName": "窗帘/Non",
                "file": "00514_Non_Non.json",
                "image": "Non_Non.png",
                "model": "Non",
                "protocol": ["KNX", "MdB"]
            },
            {
                "file": "00529_HDL_M-W04.10.1.json",
                "image": "HDL_M-W04.10.1.png",
                "model": "M/W04.10.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 529,
                "discarded": false,
                "dispName": "窗帘控制模块/M/W04.10.1"
            },
            {
                "model": "Non",
                "protocol": ["KNX", "MdB"],
                "brand": "Non",
                "deviceType": 768,
                "discarded": false,
                "dispName": "空调/Non",
                "file": "00768_Non_Non.json",
                "image": "Non_Non.png"
            },
            {
                "file": "00784_AD_ADA-L1-C.json",
                "image": "ADA-L1-C",
                "model": "ADA-L1-C",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 784,
                "discarded": false,
                "dispName": "单路控制器/ADA-L1-C"
            },
            {
                "model": "ADS-CO2/TH",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 788,
                "discarded": false,
                "dispName": "CO2 三合一传感器/ADS-CO2/TH",
                "file": "00788_AD_ADS-CO2-TH.json",
                "image": "AD_ADS-CO2-TH.png"
            },
            {
                "image": "AD_ADS-PM2.5-TH.png",
                "model": "ADS-PM2.5/TH",
                "protocol": ["EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 788,
                "discarded": false,
                "dispName": "PM2.5 传感器/ADS-PM2.5/TH",
                "file": "00788_AD_ADS-PM2.5-TH.json"
            },
            {
                "file": "00790_INNO_INNO-RQT04-R4.json",
                "image": "INNO_INNO-RQT04-R4.png",
                "model": "INNO-RQT04-R4",
                "protocol": ["MdB"],
                "brand": "INNO",
                "deviceType": 790,
                "discarded": false,
                "dispName": "可燃气体探测器/INNO-RQT04-R4"
            },
            {
                "protocol": ["MdB"],
                "brand": "Acrel",
                "deviceType": 1296,
                "discarded": false,
                "dispName": "单相预付费电能表/DDSY1352-NK",
                "file": "01296_ACREL_DDSY1352-NK.json",
                "image": "ACREL_DDSY1352-NK.png",
                "model": "DDSY1352-NK"
            },
            {
                "deviceType": 1297,
                "discarded": false,
                "dispName": "ZP 水表/CJ188",
                "file": "01297_ZP_CJ188.json",
                "image": "ZP_CJ188.png",
                "model": "CJ188",
                "protocol": ["MdB"],
                "brand": "Zhonpei Electronic"
            },
            {
                "deviceType": 1298,
                "discarded": false,
                "dispName": "燃气表抄表器/YT-EY1001",
                "file": "01298_WSD_YT-EY1001.json",
                "image": "WSD_YT-EY1001.png",
                "model": "YT-EY1001",
                "protocol": ["2G"],
                "brand": "Wisdon"
            },
            {
                "file": "60928_AD_ADH-L4-C.json",
                "image": "ADH-L4-C.png",
                "model": "ADH-L4-C",
                "protocol": ["MdB", "EnO"],
                "brand": "AdvancedDevices",
                "deviceType": 60928,
                "discarded": true,
                "dispName": "RS485回路控制器/ADH-L4-C"
            },
            {
                "discarded": false,
                "dispName": "露点温控器（三合一）/DP13RB0",
                "file": "60929_CJH_DP13RB0.json",
                "image": "CJH_DP13RB0.png",
                "model": "DP13RB0",
                "protocol": ["MdB"],
                "brand": "中国金茂",
                "deviceType": 60929
            },
            {
                "file": "60929_CJH_DP16RB0.json",
                "image": "CJH_DP16RB0.png",
                "model": "DP16RB0",
                "protocol": ["MdB"],
                "brand": "中国金茂",
                "deviceType": 60929,
                "discarded": false,
                "dispName": "旋转型露点温控器/DP16RB0"
            },
            {
                "image": "CJH_X3H-A01.png",
                "model": "X3H-A01",
                "protocol": ["MdB"],
                "brand": "中国金茂",
                "deviceType": 60929,
                "discarded": false,
                "dispName": "露点温控器（三合一）/X3H-A01",
                "file": "60929_CJH_X3H-A01.json"
            },
            {
                "model": "ME/485",
                "protocol": ["MdB"],
                "brand": "IRACC",
                "deviceType": 60929,
                "discarded": false,
                "dispName": "空调室内机网关/ME/485",
                "file": "60929_IRC_ME-485.json",
                "image": "IRC_ME-485.png"
            },
            {
                "image": "KNF_DC22-JG-JMY.png",
                "model": "DC22-JG-JMY",
                "protocol": ["MdB"],
                "brand": "okonoff",
                "deviceType": 60929,
                "discarded": false,
                "dispName": "露点控制器/DC22-JG-JMY",
                "file": "60929_KNF_DC22-JG-JMY.json"
            },
            {
                "brand": "ZHONGHONG",
                "deviceType": 60929,
                "discarded": false,
                "dispName": "空调室外机网关/B05X2RT",
                "file": "60929_ZH_B05X2RT.json",
                "image": "ZH_B05X2RT.png",
                "model": "B05X2RT",
                "protocol": ["MdB"]
            },
            {
                "brand": "AdvancedDevices",
                "deviceType": 60930,
                "discarded": false,
                "dispName": "RS485回路控制器/ADH-L4-C",
                "file": "60930_AD_ADH-L4-C.json",
                "image": "AD_ADH-L4-C.png",
                "model": "ADH-L4-C",
                "protocol": ["MdB", "EnO"]
            },
            {
                "discarded": false,
                "dispName": "调光器2路3A/M/D02.1",
                "file": "60930_HDL_M-D02.1.json",
                "image": "HDL_M-D02.1.png",
                "model": "M/D02.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 60930
            },
            {
                "discarded": false,
                "dispName": "调光器4路1.5A/M/D04.1",
                "file": "60930_HDL_M-D04.1.json",
                "image": "HDL_M-D04.1.png",
                "model": "M/D04.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 60930
            },
            {
                "image": "HDL_M-D06.1.png",
                "model": "M/D06.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 60930,
                "discarded": false,
                "dispName": "调光器6路1A/M/D06.1",
                "file": "60930_HDL_M-D06.1.json"
            },
            {
                "discarded": false,
                "dispName": "调光器6路0-10V/M/DA06.10.1",
                "file": "60930_HDL_M-DA06.10.1.json",
                "image": "HDL_M-DA06.10.1.png",
                "model": "M/DA06.10.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 60930
            },
            {
                "brand": "HDL",
                "deviceType": 60930,
                "discarded": false,
                "dispName": "继电器12路10A/M/R12.10.1",
                "file": "60930_HDL_M-R12.10.1.json",
                "image": "HDL_M-R12.10.1.png",
                "model": "M/R12.10.1",
                "protocol": ["KNX"]
            },
            {
                "deviceType": 60930,
                "discarded": false,
                "dispName": "继电器12路16A/M/R12.16.1",
                "file": "60930_HDL_M-R12.16.1.json",
                "image": "HDL_M-R12.16.1.png",
                "model": "M/R12.16.1",
                "protocol": ["KNX"],
                "brand": "HDL"
            },
            {
                "model": "M/R16.10.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 60930,
                "discarded": false,
                "dispName": "继电器16路10A/M/R16.10.1",
                "file": "60930_HDL_M-R16.10.1.json",
                "image": "HDL_M-R16.10.1.png"
            },
            {
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 60930,
                "discarded": false,
                "dispName": "继电器16路16A/M/R16.16.1",
                "file": "60930_HDL_M-R16.16.1.json",
                "image": "HDL_M-R16.16.1.png",
                "model": "M/R16.16.1"
            },
            {
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 60930,
                "discarded": false,
                "dispName": "继电器4路10A/M/R4.10.1",
                "file": "60930_HDL_M-R4.10.1.json",
                "image": "HDL_M-R4.10.1.png",
                "model": "M/R4.10.1"
            },
            {
                "image": "HDL_M-R4.16.1.png",
                "model": "M/R4.16.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 60930,
                "discarded": false,
                "dispName": "继电器4路16A/M/R4.16.1",
                "file": "60930_HDL_M-R4.16.1.json"
            },
            {
                "model": "M/R8.10.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 60930,
                "discarded": false,
                "dispName": "继电器8路10A/M/R8.10.1",
                "file": "60930_HDL_M-R8.10.1.json",
                "image": "HDL_M-R8.10.1.png"
            },
            {
                "discarded": false,
                "dispName": "继电器8路16A/M/R8.16.1",
                "file": "60930_HDL_M-R8.16.1.json",
                "image": "HDL_M-R8.16.1.png",
                "model": "M/R8.16.1",
                "protocol": ["KNX"],
                "brand": "HDL",
                "deviceType": 60930
            },
            {
                "dispName": "4路16A开关执行器/SW0004.1611",
                "file": "60930_Sation_SW0004.1611.json",
                "image": "Sation_SW0004.1611.png",
                "model": "SW0004.1611",
                "protocol": ["KNX"],
                "brand": "Sation",
                "deviceType": 60930,
                "discarded": false
            },
            {
                "file": "60932_AD_ADD-RO-M-04.json",
                "image": "AD_ADD-RO-M-04.png",
                "model": "ADD-RO-M-04",
                "protocol": ["MdB"],
                "brand": "AdvancedDevices",
                "deviceType": 60932,
                "discarded": false,
                "dispName": "四路干接点桥接器/ADD-RO-M-04"
            },
            {
                "deviceType": 61184,
                "discarded": false,
                "dispName": "主机/ADM01",
                "file": "61184_AD_ADM01.json",
                "image": "AD_ADM01.png",
                "model": "ADM01",
                "protocol": ["EtN", "MdB", "KNX"],
                "brand": "AdvancedDevices"
            },
            {
                "file": "61184_AD_ADM02.json",
                "image": "AD_ADM02.png",
                "model": "ADM02",
                "protocol": ["EtN", "MdB", "KNX", "BsP"],
                "brand": "AdvancedDevices",
                "deviceType": 61184,
                "discarded": false,
                "dispName": "主机/ADM02"
            },
            {
                "image": "CJH_GW7MWL1.png",
                "model": "GW7MWL1",
                "protocol": ["EtN", "MdB", "KNX"],
                "brand": "中国金茂",
                "deviceType": 61184,
                "discarded": false,
                "dispName": "执士家多协议网关/GW7MWL1",
                "file": "61184_CJH_GW7MWL1.json"
            },
            {
                "deviceType": 60930,
                "discarded": false,
                "dispName": "8路16A开关执行器/SW0008.1611",
                "file": "60930_Sation_SW0008.1611.json",
                "image": "Sation_SW0008.1611.png",
                "model": "SW0008.1611",
                "protocol": ["KNX"],
                "brand": "Sation"
            },
            {
                "discarded": false,
                "dispName": "12路16A开关执行器/SW0012.1611",
                "file": "60930_Sation_SW0012.1611.json",
                "image": "Sation_SW0012.1611.png",
                "model": "SW0012.1611",
                "protocol": ["KNX"],
                "brand": "Sation",
                "deviceType": 60930
            },
            {
                "deviceType": 60930,
                "discarded": false,
                "dispName": "4路10A开关执行器/KNXUOR4_10",
                "file": "60930_EmbSys_KNXUOR4_10.json",
                "image": "EmbSys_KNXUOR4_10.png",
                "model": "KNXUOR4_10",
                "protocol": ["KNX"],
                "brand": "embedded systems"
            },
            {
                "image": "Sation_SW0006.1611.png",
                "model": "SW0006.1611",
                "protocol": ["KNX"],
                "brand": "Sation",
                "deviceType": 60930,
                "discarded": false,
                "dispName": "6路16A开关执行器/SW0006.1611",
                "file": "60930_Sation_SW0006.1611.json"
            },
            {
                "dispName": "12路16A开关执行器/KNXUOR4_16",
                "file": "60930_EmbSys_KNXUOR4_16.json",
                "image": "EmbSys_KNXUOR4_16.png",
                "model": "KNXUOR4_16",
                "protocol": ["KNX"],
                "brand": "embedded systems",
                "deviceType": 60930,
                "discarded": false
            },
            {
                "dispName": "12路16A开关执行器/KNXUOR12_16",
                "file": "60930_EmbSys_KNXUOR12_16.json",
                "image": "EmbSys_KNXUOR12_16.png",
                "model": "KNXUOR12_16",
                "protocol": ["KNX"],
                "brand": "embedded systems",
                "deviceType": 60930,
                "discarded": false
            },
            {
                "discarded": false,
                "dispName": "4路20A开关执行器/SW0004.2010",
                "file": "60930_Sation_SW0004.2010.json",
                "image": "Sation_SW0004.2010.png",
                "model": "SW0004.2010",
                "protocol": ["KNX"],
                "brand": "Sation",
                "deviceType": 60930
            },
            {
                "discarded": false,
                "dispName": "6路20A开关执行器/SW0006.2010",
                "file": "60930_Sation_SW0006.2010.json",
                "image": "Sation_SW0006.2010.png",
                "model": "SW0006.2010",
                "protocol": ["KNX"],
                "brand": "Sation",
                "deviceType": 60930
            },
            {
                "protocol": ["KNX"],
                "brand": "Sation",
                "deviceType": 60930,
                "discarded": false,
                "dispName": "8路20A开关执行器/SW0008.2010",
                "file": "60930_Sation_SW0008.2010.json",
                "image": "Sation_SW0008.2010.png",
                "model": "SW0008.2010"
            },
            {
                "deviceType": 60930,
                "discarded": false,
                "dispName": "12路20A开关执行器/SW0012.2010",
                "file": "60930_Sation_SW0012.2010.json",
                "image": "Sation_SW0012.2010.png",
                "model": "SW0012.2010",
                "protocol": ["KNX"],
                "brand": "Sation"
            },
            {
                "brand": "embedded systems",
                "deviceType": 264,
                "discarded": false,
                "dispName": "温控器/IMTP3T_S",
                "file": "00264_EmbSys_IMTP3T_S.json",
                "image": "EmbSys_IMTP3T_S.png",
                "model": "IMTP3T_S",
                "protocol": ["MdB"]
            },
            {
                "brand": "AdvancedDevices",
                "deviceType": 61184,
                "discarded": false,
                "dispName": "IoT网关/ADM-S2-K1M4",
                "file": "61184_AD_ADM-S2-K1M4.json",
                "image": "AD_ADM-S2-K1M4.png",
                "model": "ADM-S2-K1M4",
                "protocol": ["EtN", "MdB", "KNX"]
            }
        ],
        "docTag": "deviceList"
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b75" },
        "docTag": "61184_AD_ADM01",
        "comPorts": {
            "portCnt": 6
        },
        "deviceType": 61184,
        "hwInfo": {
            "class": "GW",
            "brand": "AdvancedDevices",
            "model": "ADM01"
        },
        "icon": "g-1.png",
        "image": "AD_ADM01.png",
        "name": "主机",
        "protocolInfo": [
            {
                "protocol": "EtN"
            },
            {
                "protocol": "MdB"
            },
            {
                "protocol": "KNX"
            }
        ]
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b77" },
        "docTag": "00259_AD_ADS-SWLS1",
        "deviceType": 259,
        "hwInfo": {
            "class": "S",
            "brand": "AdvancedDevices",
            "model": "ADS-SWLS1"
        },
        "icon": "d-71.png",
        "image": "ADS-SWLS1.png",
        "name": "单键复位照明面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60001"
            }
        ],
        "attrs": [
            {
                "btn": 1,
                "fp": 1,
                "name": "开关",
                "flags": 212,
                "bIdx": 1,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "lpress": false,
                "objId": 1,
                "page": 1,
                "dpt": "1.001",
                "style": 0,
                "funId": "Switch",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"]
            }
        ],
        "switch": {
            "pageCount": 1,
            "layout": "horizontal",
            "btnCnt": 1,
            "isVRB": false,
            "keyValues": [16]
        }
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b79" },
        "docTag": "00004_AD_ADS-SWSS2",
        "deviceType": 4,
        "hwInfo": {
            "class": "S",
            "brand": "AdvancedDevices",
            "model": "ADS-SWSS2"
        },
        "icon": "d-71.png",
        "image": "ADS-SWSS2.png",
        "name": "两键复位场景面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60101"
            }
        ],
        "attrs": [
            {
                "rt": ["bh.r.attr.button"],
                "objId": 1,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "page": 1,
                "flags": 212,
                "valueType": "boolean",
                "bIdx": 1,
                "btn": 1,
                "name": "开关",
                "valueKey": "value",
                "lpress": false,
                "dpt": "1.001",
                "style": 0
            },
            {
                "valueType": "boolean",
                "objId": 2,
                "page": 1,
                "createdRT": "oic.r.switch.binary",
                "btn": 2,
                "style": 0,
                "flags": 212,
                "dpt": "1.001",
                "bIdx": 2,
                "funId": "Switch",
                "lpress": false,
                "name": "开关",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"]
            }
        ],
        "switch": {
            "layout": "horizontal",
            "btnCnt": 2,
            "isVRB": false,
            "keyValues": [16, 48],
            "pageCount": 1
        }
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b7b" },
        "docTag": "60928_AD_ADH-L4-C",
        "comPorts": {
            "portCnt": 4
        },
        "deviceType": 60928,
        "hwInfo": {
            "class": "A",
            "brand": "AdvancedDevices",
            "model": "ADH-L4-C"
        },
        "icon": "c-2.png",
        "image": "ADH-L4-C.png",
        "name": "RS485回路控制器",
        "protocolInfo": [
            {
                "protocol": "MdB",
                "protocolType": "000100"
            },
            {
                "protocol": "EnO",
                "protocolType": "0"
            }
        ],
        "attrs": [
            {
                "objId": 1,
                "fp": 1,
                "funId": "Switch",
                "name": "回路1",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 1,
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 2,
                "flags": 148,
                "valueType": "boolean",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "fp": 2,
                "funId": "Switch",
                "name": "回路2"
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 3,
                "funId": "Switch",
                "name": "回路3",
                "flags": 148,
                "dpt": "1.001",
                "fp": 3,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3
            },
            {
                "valueKey": "value",
                "fp": 4,
                "funId": "Switch",
                "name": "回路4",
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 4,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            }
        ],
        "RS485": {
            "maxCh": 4,
            "chCnt": 4,
            "phyConf": {
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 0,
                "sBit": 1
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": true
            }
        }
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b7f" },
        "docTag": "00259_AD_ADS-SWLS2",
        "deviceType": 259,
        "hwInfo": {
            "class": "S",
            "brand": "AdvancedDevices",
            "model": "ADS-SWLS2"
        },
        "icon": "d-71.png",
        "image": "ADS-SWLS2.png",
        "name": "两键复位照明面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60102"
            }
        ],
        "attrs": [
            {
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "bIdx": 1,
                "dpt": "1.001",
                "lpress": false,
                "style": 0,
                "page": 1,
                "name": "开关",
                "valueKey": "value",
                "btn": 1,
                "rt": ["bh.r.attr.button"],
                "objId": 1,
                "fp": 1,
                "flags": 212,
                "valueType": "boolean"
            },
            {
                "btn": 2,
                "fp": 2,
                "valueType": "boolean",
                "valueKey": "value",
                "bIdx": 2,
                "lpress": false,
                "page": 1,
                "dpt": "1.001",
                "style": 0,
                "objId": 2,
                "createdRT": "oic.r.switch.binary",
                "flags": 212,
                "rt": ["bh.r.attr.button"],
                "funId": "Switch",
                "name": "开关"
            }
        ],
        "switch": {
            "pageCount": 1,
            "layout": "horizontal",
            "btnCnt": 2,
            "isVRB": false,
            "keyValues": [16, 48]
        }
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b81" },
        "docTag": "00004_AD_ADS-SWSS1",
        "deviceType": 4,
        "hwInfo": {
            "model": "ADS-SWSS1",
            "class": "S",
            "brand": "AdvancedDevices"
        },
        "icon": "d-71.png",
        "image": "ADS-SWSS1.png",
        "name": "单键复位场景面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60001"
            }
        ],
        "attrs": [
            {
                "valueKey": "value",
                "valueType": "boolean",
                "lpress": false,
                "page": 1,
                "funId": "Switch",
                "flags": 212,
                "dpt": "1.001",
                "btn": 1,
                "style": 0,
                "objId": 1,
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "bIdx": 1
            }
        ],
        "switch": {
            "layout": "horizontal",
            "btnCnt": 1,
            "isVRB": false,
            "keyValues": [16],
            "pageCount": 1
        }
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b83" },
        "docTag": "00784_AD_ADA-L1-C",
        "comPorts": {
            "portCnt": 1
        },
        "deviceType": 784,
        "hwInfo": {
            "class": "S",
            "brand": "AdvancedDevices",
            "model": "ADA-L1-C"
        },
        "icon": "d-84.png",
        "image": "ADA-L1-C",
        "name": "单路控制器",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "D2-01-02"
            }
        ],
        "attrs": [
            {
                "name": "回路1",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 1,
                "funId": "Switch"
            }
        ],
        "heartbeat": 30
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b85" },
        "docTag": "00004_AD_ADS-SWSR2",
        "deviceType": 4,
        "hwInfo": {
            "model": "ADS-SWSR2",
            "class": "S",
            "brand": "AdvancedDevices"
        },
        "icon": "d-71.png",
        "image": "ADS-SWSR2.png",
        "name": "两键跷板场景面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60101"
            }
        ],
        "attrs": [
            {
                "objId": 1,
                "page": 1,
                "valueType": "boolean",
                "lpress": false,
                "funId": "Switch",
                "rt": ["bh.r.attr.button"],
                "btn": 1,
                "name": "开关",
                "flags": 212,
                "dpt": "1.001",
                "valueKey": "value",
                "bIdx": 1,
                "style": 1,
                "createdRT": "oic.r.switch.binary"
            }
        ],
        "switch": {
            "layout": "horizontal",
            "btnCnt": 2,
            "isVRB": false,
            "keyValues": [16, 48],
            "pageCount": 1
        }
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b87" },
        "docTag": "00004_AD_ADS-SWSR4",
        "deviceType": 4,
        "hwInfo": {
            "class": "S",
            "brand": "AdvancedDevices",
            "model": "ADS-SWSR4"
        },
        "icon": "d-71.png",
        "image": "ADS-SWSR4.png",
        "name": "四键跷板场景面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60202"
            }
        ],
        "attrs": [
            {
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "page": 1,
                "name": "开关",
                "style": 1,
                "objId": 1,
                "funId": "Switch",
                "flags": 212,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "bIdx": 1,
                "btn": 1,
                "lpress": false
            },
            {
                "funId": "Switch",
                "flags": 212,
                "bIdx": 3,
                "style": 1,
                "lpress": false,
                "name": "开关",
                "rt": ["bh.r.attr.button"],
                "valueKey": "value",
                "valueType": "boolean",
                "btn": 2,
                "objId": 2,
                "page": 1,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            }
        ],
        "switch": {
            "layout": "horizontal",
            "btnCnt": 4,
            "isVRB": false,
            "keyValues": [16, 48, 80, 112],
            "pageCount": 1
        }
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b89" },
        "docTag": "00259_AD_ADS-SWLR2",
        "deviceType": 259,
        "hwInfo": {
            "brand": "AdvancedDevices",
            "model": "ADS-SWLR2",
            "class": "S"
        },
        "icon": "d-71.png",
        "image": "ADS-SWLR2.png",
        "name": "两键跷板照明面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60101"
            }
        ],
        "attrs": [
            {
                "funId": "Switch",
                "dpt": "1.001",
                "page": 1,
                "rt": ["bh.r.attr.button"],
                "bIdx": 1,
                "btn": 1,
                "style": 1,
                "objId": 1,
                "fp": 1,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "name": "开关",
                "flags": 212,
                "valueKey": "value",
                "lpress": false
            }
        ],
        "switch": {
            "layout": "rockH",
            "btnCnt": 2,
            "isVRB": true,
            "keyValues": [16, 48],
            "VRBCnt": 1,
            "vrtRockButtons": [
                {
                    "on": 16,
                    "off": 48
                }
            ],
            "pageCount": 1
        }
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b8b" },
        "docTag": "00259_AD_ADS-SWLR4",
        "deviceType": 259,
        "hwInfo": {
            "class": "S",
            "brand": "AdvancedDevices",
            "model": "ADS-SWLR4"
        },
        "icon": "d-71.png",
        "image": "ADS-SWLR4.png",
        "name": "四键跷板照明面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60201"
            }
        ],
        "attrs": [
            {
                "flags": 212,
                "rt": ["bh.r.attr.button"],
                "lpress": false,
                "funId": "Switch",
                "valueType": "boolean",
                "btn": 1,
                "style": 1,
                "objId": 1,
                "page": 1,
                "name": "右键开关",
                "bIdx": 1,
                "fp": 1,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "btn": 2,
                "style": 1,
                "page": 1,
                "valueKey": "value",
                "dpt": "1.001",
                "valueType": "boolean",
                "bIdx": 3,
                "name": "左键开关",
                "flags": 212,
                "lpress": false,
                "fp": 2,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "objId": 2,
                "funId": "Switch"
            }
        ],
        "switch": {
            "layout": "rockH",
            "btnCnt": 4,
            "isVRB": true,
            "keyValues": [80, 112, 16, 48],
            "vrtRockButtons": [
                {
                    "on": 80,
                    "off": 112
                },
                {
                    "off": 48,
                    "on": 16
                }
            ],
            "hasLPress": false,
            "VRBCnt": 2,
            "pageCount": 1,
            "modifyStyle": false
        }
    },
    {
        "_id": { "$oid": "5c062a9c127ab8cb628f2b8d" },
        "docTag": "00256_Non_Non",
        "deviceType": 256,
        "hwInfo": {
            "class": "S",
            "brand": "Non",
            "model": "Non"
        },
        "icon": "d-41.png",
        "image": "Non_Non.png",
        "name": "灯",
        "protocolInfo": [
            {
                "protocol": "MdB",
                "protocolType": "000100"
            }
        ],
        "attrs": [
            {
                "objId": 1,
                "funId": "Switch",
                "name": "灯",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.sensor"]
            }
        ],
        "heartbeat": 30
    },
    {
        "_id": { "$oid": "5c10b803127ab8cb629b1b05" },
        "docTag": "00259_AD_ADS-SWLR6",
        "deviceType": 259,
        "hwInfo": {
            "class": "S",
            "brand": "AdvanceDevices",
            "model": "ADS-SWLR4"
        },
        "icon": "d-71.png",
        "name": "四键跷板照明面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60201"
            }
        ],
        "switch": {
            "layout": "rockH",
            "btnCnt": 4,
            "isVRB": true,
            "keyValues": [80, 112, 16, 48],
            "VRBCnt": 2,
            "vrtRockButtons": [
                {
                    "on": 80,
                    "off": 112
                },
                {
                    "on": 16,
                    "off": 48
                }
            ]
        }
    },
    {
        "_id": { "$oid": "5c755e6f406cc71510e857d3" },
        "docTag": "00265_Non_Non",
        "deviceType": 265,
        "hwInfo": {
            "class": "S",
            "brand": "Non",
            "model": "Non"
        },
        "icon": "d-41.png",
        "image": "Non_Non.png",
        "name": "灯",
        "protocolInfo": [
            {
                "protocol": "KNX",
                "protocolType": "000000"
            },
            {
                "protocol": "MdB",
                "protocolType": "000000"
            }
        ],
        "heartbeat": 30
    },
    {
        "_id": { "$oid": "5c755fc6406cc71510e85891" },
        "docTag": "60930_HDL_M-R8.10.1",
        "deviceType": 60930,
        "hwInfo": {
            "model": "M/R8.10.1",
            "class": "A",
            "brand": "HDL"
        },
        "icon": "c-2.png",
        "image": "HDL_M-R8.10.1.png",
        "name": "继电器8路10A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "chId": 1,
                "funId": "Switch",
                "valueKey": "value",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 1,
                "name": "开关"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 2,
                "funId": "Switch",
                "flags": 148
            },
            {
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 3
            },
            {
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 4,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value"
            },
            {
                "objId": 5,
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "objId": 6,
                "funId": "Switch",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 6
            },
            {
                "objId": 7,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "chId": 7,
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 8,
                "objId": 8,
                "funId": "Switch",
                "name": "开关",
                "flags": 148
            },
            {
                "objId": 9,
                "funId": "Switch",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "flags": 76,
                "dpt": "1.001",
                "ack4Obj": 1,
                "chId": 1
            },
            {
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 2,
                "chId": 2,
                "objId": 10,
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 11,
                "funId": "Switch",
                "dpt": "1.001",
                "ack4Obj": 3,
                "name": "开关 状态",
                "flags": 76
            },
            {
                "objId": 12,
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "chId": 4
            },
            {
                "flags": 76,
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 5,
                "objId": 13,
                "funId": "Switch",
                "name": "开关 状态",
                "chId": 5,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 14,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 6,
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "chId": 7,
                "objId": 15,
                "funId": "Switch",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 7,
                "rt": ["bh.r.attr.actuator"],
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "ack4Obj": 8,
                "chId": 8,
                "objId": 16,
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "funId": "Switch",
                "flags": 76,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "flags": 4,
                "appHidden": true,
                "objId": 17,
                "funId": "Heartbeat",
                "name": "心跳",
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"]
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 8,
            "chCnt": 8
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5c7e55d9406cc71510ec1b0a" },
        "docTag": "00264_HDL_M-P2R.1",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "HDL",
            "model": "M/P2R.1"
        },
        "icon": "d-71.png",
        "image": "HDL_M-P2R.1.png",
        "name": "KNX两键毅系列面板",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "funId": "Switch",
                "dpt": "1.001",
                "style": 1,
                "flags": 212,
                "rt": ["bh.r.attr.button"],
                "valueType": "boolean",
                "hidden": false,
                "objId": 1,
                "page": 1,
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "bIdx": 1,
                "btn": 1,
                "lpress": false
            },
            {
                "valueKey": "value",
                "hidden": false,
                "rt": ["bh.r.attr.button"],
                "valueType": "boolean",
                "bIdx": 1,
                "btn": 1,
                "style": 1,
                "page": 1,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "lpress": true,
                "objId": 2,
                "name": "开关",
                "flags": 212
            },
            {
                "objId": 3,
                "name": "开关",
                "dpt": "1.001",
                "style": 1,
                "funId": "Switch",
                "flags": 212,
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "bIdx": 3,
                "page": 1,
                "btn": 2,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "lpress": false,
                "hidden": false
            },
            {
                "funId": "Switch",
                "valueKey": "value",
                "objId": 4,
                "flags": 212,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "page": 1,
                "dpt": "1.001",
                "valueType": "boolean",
                "bIdx": 3,
                "style": 1,
                "name": "开关",
                "btn": 2,
                "lpress": true,
                "hidden": false
            },
            {
                "page": 1,
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"],
                "objId": 5,
                "funId": "Heartbeat",
                "createdRT": "bh.r.dvHeartbeat",
                "appHidden": true
            }
        ],
        "switch": {
            "modifySytle": true,
            "hasLPress": true,
            "layout": "rockV",
            "btnCnt": 4,
            "pageCount": 1
        },
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5c7e55d9406cc71510ec1b0e" },
        "docTag": "00264_HDL_M-P3R.1",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "HDL",
            "model": "M/P3R.1"
        },
        "icon": "d-71.png",
        "image": "HDL_M-P3R.1.png",
        "name": "KNX三键毅系列面板",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "bIdx": 1,
                "style": 1,
                "hidden": false,
                "page": 1,
                "flags": 212,
                "rt": ["bh.r.attr.button"],
                "btn": 1,
                "lpress": false,
                "objId": 1,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "name": "开关",
                "rt": ["bh.r.attr.button"],
                "bIdx": 1,
                "lpress": true,
                "hidden": false,
                "objId": 2,
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "btn": 1,
                "style": 1,
                "page": 1,
                "flags": 212,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "style": 1,
                "hidden": false,
                "page": 1,
                "btn": 2,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "funId": "Switch",
                "name": "开关",
                "flags": 212,
                "bIdx": 3,
                "lpress": false,
                "objId": 3
            },
            {
                "rt": ["bh.r.attr.button"],
                "lpress": true,
                "funId": "Switch",
                "dpt": "1.001",
                "valueType": "boolean",
                "bIdx": 3,
                "btn": 2,
                "flags": 212,
                "name": "开关",
                "valueKey": "value",
                "style": 1,
                "page": 1,
                "createdRT": "oic.r.switch.binary",
                "hidden": false,
                "objId": 4
            },
            {
                "objId": 5,
                "flags": 212,
                "btn": 3,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "hidden": false,
                "name": "开关",
                "valueType": "boolean",
                "bIdx": 5,
                "page": 1,
                "funId": "Switch",
                "style": 1,
                "lpress": false
            },
            {
                "objId": 6,
                "page": 1,
                "dpt": "1.001",
                "valueType": "boolean",
                "style": 1,
                "flags": 212,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "bIdx": 5,
                "btn": 3,
                "hidden": false,
                "name": "开关",
                "lpress": true,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "appHidden": true,
                "page": 1,
                "flags": 4,
                "dpt": "1.006",
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"],
                "objId": 7,
                "funId": "Heartbeat",
                "name": "心跳"
            }
        ],
        "switch": {
            "modifySytle": true,
            "hasLPress": true,
            "layout": "rockV",
            "btnCnt": 6,
            "pageCount": 1
        },
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5c7e55d9406cc71510ec1b19" },
        "docTag": "60930_HDL_M-R12.10.1",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "HDL",
            "model": "M/R12.10.1"
        },
        "icon": "c-2.png",
        "image": "HDL_M-R12.10.1.png",
        "name": "继电器12路10A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 1,
                "objId": 1,
                "funId": "Switch",
                "name": "开关",
                "rt": ["bh.r.attr.actuator"],
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "dpt": "1.001",
                "valueKey": "value",
                "funId": "Switch",
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 2,
                "flags": 148
            },
            {
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 3,
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "funId": "Switch",
                "flags": 148
            },
            {
                "objId": 4,
                "funId": "Switch",
                "dpt": "1.001",
                "chId": 4,
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "chId": 5,
                "objId": 5,
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "开关",
                "valueKey": "value",
                "valueType": "boolean",
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "objId": 6
            },
            {
                "valueKey": "value",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 7,
                "objId": 7,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "name": "开关",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 8,
                "objId": 8,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "flags": 148,
                "dpt": "1.001"
            },
            {
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 9,
                "funId": "Switch",
                "rt": ["bh.r.attr.actuator"],
                "chId": 9,
                "dpt": "1.001",
                "valueKey": "value"
            },
            {
                "objId": 10,
                "name": "开关",
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 10
            },
            {
                "flags": 148,
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 11,
                "funId": "Switch",
                "name": "开关",
                "chId": 11,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 12,
                "objId": 12,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "objId": 13,
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 1,
                "chId": 1,
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "name": "开关 状态",
                "valueKey": "value",
                "ack4Obj": 2,
                "rt": ["bh.r.attr.actuator"],
                "valueType": "boolean",
                "chId": 2,
                "objId": 14,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 15,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 3
            },
            {
                "objId": 16,
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "valueType": "boolean",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "chId": 4
            },
            {
                "funId": "Switch",
                "name": "开关 状态",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 5,
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "objId": 17,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "flags": 76
            },
            {
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 6,
                "chId": 6,
                "objId": 18,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 7,
                "chId": 7,
                "objId": 19
            },
            {
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 20,
                "funId": "Switch",
                "name": "开关 状态",
                "chId": 8,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 8
            },
            {
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 9,
                "chId": 9,
                "objId": 21,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "ack4Obj": 10,
                "rt": ["bh.r.attr.actuator"],
                "chId": 10,
                "flags": 76,
                "dpt": "1.001",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 22,
                "funId": "Switch"
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 11,
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "funId": "Switch",
                "flags": 76,
                "chId": 11,
                "objId": 23
            },
            {
                "objId": 24,
                "name": "开关 状态",
                "ack4Obj": 12,
                "rt": ["bh.r.attr.actuator"],
                "chId": 12,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "objId": 25,
                "flags": 4,
                "dpt": "1.006",
                "valueKey": "value",
                "funId": "Heartbeat",
                "name": "心跳",
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "appHidden": true,
                "rt": ["bh.r.attr.event"]
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "chCnt": 12,
            "maxCh": 12
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5c7e55d9406cc71510ec1b1d" },
        "docTag": "60930_HDL_M-R4.10.1",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "HDL",
            "model": "M/R4.10.1"
        },
        "icon": "c-2.png",
        "image": "HDL_M-R4.10.1.png",
        "name": "继电器4路10A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "funId": "Switch",
                "valueKey": "value",
                "chId": 1,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 1,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001"
            },
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 2,
                "valueKey": "value",
                "valueType": "boolean",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 3,
                "name": "开关",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "funId": "Switch"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "chId": 4,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 4,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001"
            },
            {
                "objId": 5,
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 1,
                "funId": "Switch",
                "flags": 76,
                "ack4Obj": 1,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueType": "boolean",
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 6,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 2
            },
            {
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 3,
                "chId": 3,
                "objId": 7,
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "chId": 4,
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "objId": 8,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "funId": "Heartbeat",
                "name": "心跳",
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "appHidden": true,
                "objId": 9,
                "flags": 4,
                "dpt": "1.006",
                "valueKey": "value",
                "rt": ["bh.r.attr.event"]
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 4,
            "chCnt": 4
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5c85d6ce406cc71510ef3c21" },
        "docTag": "bindRules",
        "bindRules": [
            {
                "deviceType": 4,
                "allowBind": [256, 257, 258, 512, 769]
            },
            {
                "deviceType": 256,
                "allowBindMe": [4, 263]
            },
            {
                "deviceType": 263,
                "allowBind": [256, 265, 514, 768, 784, 788]
            },
            {
                "deviceType": 264,
                "allowBind": [256, 265, 514, 768, 784, 788]
            },
            {
                "deviceType": 256,
                "allowBindMe": [4, 263, 264]
            },
            {
                "allowBindMe": [263, 264],
                "deviceType": 514
            },
            {
                "deviceType": 529,
                "allowBindMe": [514]
            },
            {
                "deviceType": 768,
                "allowBindMe": [265]
            },
            {
                "deviceType": 787,
                "allowBindMe": [60928]
            },
            {
                "deviceType": 788,
                "allowBindMe": [4, 259, 264]
            },
            {
                "deviceType": 60928,
                "allowBind": [256, 259, 264, 265, 515, 775, 784, 787, 788]
            },
            {
                "deviceType": 60929,
                "allowBind": [256, 259, 264, 265, 515, 775, 784, 787, 788]
            },
            {
                "deviceType": 60930,
                "allowBind": [256, 259, 264, 265, 515, 775, 784, 787, 788]
            },
            {
                "deviceType": 61184,
                "allowBind": [16, 624, 515, 60928, 60929, 60930]
            }
        ]
    },
    {
        "_id": { "$oid": "5c946c88406cc71510f570f1" },
        "docTag": "knxDataFormat",
        "dptInfo": [
            {
                "dpt": "1.001",
                "name": "Switch",
                "desc_zh_CN": "0=关; 1=开",
                "createdRT": "oic.r.switch.binary",
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.002",
                "name": "Bool",
                "desc_zh_CN": "0=非; 1=是",
                "createdRT": "bh.r.value.bool"
            },
            {
                "valueType": "boolean",
                "dpt": "1.003",
                "name": "Enable",
                "desc_zh_CN": "0=禁用; 1=开启",
                "createdRT": "bh.r.value.bool",
                "rt": [],
                "valueKey": "value"
            },
            {
                "createdRT": "bh.r.value.bool",
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.004",
                "name": "Ramp",
                "desc_zh_CN": "0=不渐变;  1=渐变"
            },
            {
                "dpt": "1.005",
                "name": "Alarm",
                "desc_zh_CN": "0=不警报; 1=警报",
                "createdRT": "bh.r.alarm",
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.006",
                "name": "BinaryValue",
                "desc_zh_CN": "0=低; 1=高",
                "createdRT": "bh.r.dvHeartbeat"
            },
            {
                "dpt": "1.007",
                "name": "Step",
                "desc_zh_CN": "0=降低; 1=升高",
                "createdRT": "bh.r.movement",
                "rt": [],
                "valueKey": "value",
                "valueType": "string"
            },
            {
                "valueKey": "value",
                "valueType": "string",
                "dpt": "1.008",
                "name": "UpDown",
                "desc_zh_CN": "0=向上; 1=向下",
                "createdRT": "bh.r.movement",
                "rt": []
            },
            {
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.009",
                "name": "OpenClose",
                "desc_zh_CN": "0=开启; 1=关闭",
                "createdRT": "bh.r.value.bool"
            },
            {
                "name": "Start",
                "desc_zh_CN": "0=停止; 1=开始",
                "createdRT": "bh.r.movement",
                "rt": [],
                "valueKey": "value",
                "valueType": "string",
                "dpt": "1.010"
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.011",
                "name": "State",
                "desc_zh_CN": "0=未激活; 1=激活",
                "createdRT": "bh.r.value.bool",
                "rt": []
            },
            {
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.012",
                "name": "Invert",
                "desc_zh_CN": "0=不反转; 1=反转",
                "createdRT": "bh.r.value.bool"
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.013",
                "name": "DimSendStyle",
                "desc_zh_CN": "0=开始/停止; 1=循环",
                "createdRT": "bh.r.value.bool",
                "rt": []
            },
            {
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.014",
                "name": "InputSource",
                "desc_zh_CN": "0=不变; 1=计算",
                "createdRT": "bh.r.value.bool"
            },
            {
                "name": "Reset",
                "desc_zh_CN": "0=无动作; 1=重置",
                "createdRT": "bh.r.value.bool",
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.015"
            },
            {
                "name": "Ack",
                "desc_zh_CN": "0=无动作; 1=驱动",
                "createdRT": "bh.r.value.bool",
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.016"
            },
            {
                "name": "Trigger",
                "desc_zh_CN": "0,1=触发",
                "createdRT": "bh.r.value.bool",
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.017"
            },
            {
                "name": "Occupancy",
                "desc_zh_CN": "0=无人; 1=有人",
                "createdRT": "bh.r.occupancy",
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.018"
            },
            {
                "desc_zh_CN": "0=关闭; 1=开启",
                "createdRT": "bh.r.open",
                "rt": [],
                "dpt": "1.019",
                "name": "WindowDoor"
            },
            {
                "desc_zh_CN": "0=或; 1=与",
                "createdRT": "bh.r.value.bool",
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.021",
                "name": "LogicalFunction"
            },
            {
                "valueType": "boolean",
                "dpt": "1.022",
                "name": "Scene AB",
                "desc_zh_CN": "0=场景A; 1=场景B",
                "createdRT": "bh.r.value.bool",
                "rt": [],
                "valueKey": "value"
            },
            {
                "desc_zh_CN": "0=场景A; 1=场景B",
                "createdRT": "bh.r.value.bool",
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.100",
                "name": "Scene AB"
            },
            {
                "name": "Shutter Blinds Mode",
                "desc_zh_CN": "0=仅移动; 1=移动+停止",
                "createdRT": "bh.r.value.bool",
                "rt": [],
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.023"
            },
            {
                "dpt": "3.007",
                "name": "Control Dimming",
                "desc_zh_CN": "调光",
                "createdRT": "bh.r.dimming",
                "rt": [],
                "valueKey": "value",
                "valueType": "integer"
            },
            {
                "dpt": "3.008",
                "name": "Control Blinds",
                "desc_zh_CN": "窗帘控制"
            },
            {
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "5.001",
                "name": "Percentage",
                "desc_zh_CN": "百分比",
                "createdRT": "bh.r.openLevel",
                "rt": []
            },
            {
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "5.003",
                "name": "Angle",
                "desc_zh_CN": "",
                "createdRT": "bh.r.angle",
                "rt": ["bh.r.angle"]
            },
            {
                "name": "Percent U8",
                "desc_zh_CN": "数值(0~255)",
                "createdRT": "bh.r.value.UChar",
                "rt": [],
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "5.004"
            },
            {
                "valueType": "integer",
                "dpt": "5.010",
                "name": "Value 1 Count",
                "desc_zh_CN": "",
                "createdRT": "bh.r.value.UChar",
                "rt": [],
                "valueKey": "value"
            },
            {
                "desc_zh_CN": "风速数值(0~255)",
                "createdRT": "bh.r.airFlow.level",
                "rt": [],
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "5.100",
                "name": "fan stage"
            },
            {
                "valueType": "integer",
                "dpt": "6.010",
                "name": "Value 1 Count",
                "desc_zh_CN": "数值(-128~127)",
                "createdRT": "bh.r.value.char",
                "rt": [],
                "valueKey": "value"
            },
            {
                "valueType": "integer",
                "dpt": "7.001",
                "name": "pulses",
                "desc_zh_CN": "数值(0~65535)",
                "createdRT": "bh.r.value.UShort",
                "rt": [],
                "valueKey": "value"
            },
            {
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "8.001",
                "name": "pulses difference",
                "desc_zh_CN": "数值(-32768~32767)",
                "createdRT": "bh.r.value.short",
                "rt": []
            },
            {
                "dpt": "9.001",
                "name": "Value Temp",
                "desc_zh_CN": "温度",
                "createdRT": "bh.r.temperature",
                "rt": [],
                "valueKey": "value",
                "valueType": "number"
            },
            {
                "rt": [],
                "valueKey": "value",
                "valueType": "number",
                "dpt": "9.007",
                "name": "Value Humidity",
                "desc_zh_CN": "湿度",
                "createdRT": "bh.r.humidity"
            },
            {
                "dpt": "9.008",
                "name": "Value AirQuality",
                "desc_zh_CN": "",
                "createdRT": "bh.r.airQualities",
                "rt": [],
                "valueKey": "value",
                "valueType": "number"
            },
            {
                "desc_zh_CN": "",
                "createdRT": "bh.r.airFlow",
                "rt": [],
                "valueKey": "value",
                "valueType": "number",
                "dpt": "9.009",
                "name": "Air Flow"
            },
            {
                "createdRT": "bh.r.value.int",
                "rt": [],
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "13.001",
                "name": "Counter pulses (singed)",
                "desc_zh_CN": "4字节数值(有符号数)"
            },
            {
                "dpt": "12.001",
                "name": "Counter pulses (unsinged)",
                "desc_zh_CN": "4字节数值(无符号数)",
                "createdRT": "bh.r.value.UInt",
                "rt": [],
                "valueKey": "value",
                "valueType": "integer"
            },
            {
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "13.010",
                "name": "Active Energy (Wh)",
                "desc_zh_CN": "实電能",
                "createdRT": "bh.r.energy",
                "rt": []
            },
            {
                "dpt": "13.013",
                "name": "Active Energy (kWh)",
                "desc_zh_CN": "实電能",
                "createdRT": "bh.r.energy",
                "rt": [],
                "valueKey": "value",
                "valueType": "number"
            },
            {
                "desc_zh_CN": "浮点",
                "createdRT": "bh.r.value.number",
                "rt": [],
                "valueKey": "value",
                "valueType": "number",
                "dpt": "14.068",
                "name": "Temperature"
            },
            {
                "dpt": "14.007",
                "name": "Angle",
                "desc_zh_CN": "角度",
                "createdRT": "bh.r.value.float",
                "rt": [],
                "valueKey": "value",
                "valueType": "number"
            },
            {
                "valueType": "number",
                "dpt": "14.076",
                "name": "Volume",
                "desc_zh_CN": "体积",
                "createdRT": "bh.r.volume",
                "rt": [],
                "valueKey": "value"
            },
            {
                "valueKey": "value",
                "valueType": "number",
                "dpt": "14.077",
                "name": "Volume Flux",
                "desc_zh_CN": "体积流量",
                "createdRT": "bh.r.volume.flux",
                "rt": []
            },
            {
                "name": "SCLOMode",
                "desc_zh_CN": "",
                "dpt": "20.001"
            },
            {
                "dpt": "20.002",
                "name": "BuildingMode",
                "desc_zh_CN": ""
            },
            {
                "dpt": "20.003",
                "name": "OccMode",
                "desc_zh_CN": ""
            },
            {
                "dpt": "20.004",
                "name": "Priority",
                "desc_zh_CN": ""
            },
            {
                "dpt": "20.005",
                "name": "LightApplicationMode",
                "desc_zh_CN": ""
            },
            {
                "dpt": "20.006",
                "name": "ApplicationArea",
                "desc_zh_CN": ""
            },
            {
                "dpt": "20.007",
                "name": "AlarmClassType",
                "desc_zh_CN": ""
            },
            {
                "dpt": "20.008",
                "name": "PSUMode",
                "desc_zh_CN": ""
            },
            {
                "dpt": "20.011",
                "name": "ErrorClass System",
                "desc_zh_CN": ""
            },
            {
                "dpt": "20.012",
                "name": "ErrorClass HVAC",
                "desc_zh_CN": ""
            },
            {
                "dpt": "20.013",
                "name": "Time Delay",
                "desc_zh_CN": ""
            },
            {
                "dpt": "20.014",
                "name": "Beaufort Wind Force Scale",
                "desc_zh_CN": ""
            },
            {
                "name": "SensorSelect",
                "desc_zh_CN": "",
                "dpt": "20.017"
            },
            {
                "dpt": "20.020",
                "name": "ActuatorConnectType",
                "desc_zh_CN": ""
            },
            {
                "rt": [],
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "20.102",
                "name": "HVAC Mode",
                "desc_zh_CN": "HVAC模式",
                "createdRT": "bh.r.hvac.ctrlMode"
            },
            {
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "20.105",
                "name": "HVAC Control Mode",
                "desc_zh_CN": "温控模式",
                "createdRT": "bh.r.hvac.ctrlMode",
                "rt": []
            },
            {
                "name": "",
                "desc_zh_CN": "气流量",
                "createdRT": "bh.r.value.float",
                "rt": [],
                "valueKey": "value",
                "valueType": "number",
                "dpt": "203.104"
            },
            {
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "232.600",
                "name": "Color RGB",
                "desc_zh_CN": "",
                "createdRT": "bh.r.color.rgb",
                "rt": []
            }
        ],
        "flagRules": [
            {
                "write": 0,
                "readInit": 0,
                "fValue": 196,
                "commumication": 1,
                "read": 0,
                "trasmit": 1,
                "update": 1,
                "type": "bh.r.attr.sensor",
                "priority": 0
            },
            {
                "fValue": 212,
                "type": "bh.r.attr.button",
                "write": 1,
                "read": 0,
                "readInit": 0,
                "trasmit": 1,
                "update": 1,
                "priority": 0,
                "commumication": 1
            },
            {
                "type": "bh.r.attr.actuator",
                "write": 1,
                "readInit": 0,
                "update": 1,
                "fValue": 148,
                "priority": 0,
                "commumication": 1,
                "read": 0,
                "trasmit": 0
            },
            {
                "priority": 0,
                "read": 0,
                "write": 0,
                "readInit": 0,
                "type": "default",
                "commumication": 1,
                "trasmit": 0,
                "update": 0,
                "fValue": 4
            }
        ],
        "fun2dps": [
            {
                "Name_zh_CN": "气流",
                "valueStyle": {
                    "style": "Label"
                },
                "funId": "AirFlow",
                "dpts": ["1.003", "5.010", "14.007", "203.104"]
            },
            {
                "funId": "AirQuality",
                "dpts": ["9.008"],
                "Name_zh_CN": "空气质量",
                "valueStyle": {
                    "style": "Label",
                    "unit": "PPM"
                }
            },
            {
                "funId": "Color",
                "dpts": ["5.010"],
                "Name_zh_CN": "颜色",
                "valueStyle": {
                    "style": "InputBox"
                }
            },
            {
                "funId": "ColorRGB",
                "dpts": ["232.600"],
                "Name_zh_CN": "RGB颜色",
                "valueStyle": {
                    "style": "InputBox",
                    "default": "255,255,255"
                }
            },
            {
                "Name_zh_CN": "指令",
                "valueStyle": {
                    "style": "DPT_DESC"
                },
                "funId": "Command",
                "dpts": ["1.003"]
            },
            {
                "dpts": ["1.008", "1.010", "5.001"],
                "Name_zh_CN": "窗帘",
                "valueStyle": {
                    "style": "InputBox"
                },
                "funId": "Curtain"
            },
            {
                "funId": "Dimming",
                "dpts": ["3.007", "5.001"],
                "Name_zh_CN": "调光",
                "valueStyle": {
                    "style": "InputBox"
                }
            },
            {
                "funId": "Energy",
                "dpts": ["13.010", "13.013"],
                "Name_zh_CN": "能源",
                "valueStyle": {
                    "style": "DPT_DESC"
                }
            },
            {
                "funId": "FHeating",
                "dpts": ["5.010"],
                "Name_zh_CN": "地暖",
                "valueStyle": {
                    "style": "DPT_DESC"
                }
            },
            {
                "funId": "Heartbeat",
                "dpts": ["1.006"],
                "Name_zh_CN": "心跳",
                "valueStyle": {
                    "style": "DPT_DESC"
                }
            },
            {
                "Name_zh_CN": "湿度",
                "valueStyle": {
                    "style": "DPT_DESC",
                    "unit": "%"
                },
                "funId": "Humidity",
                "dpts": ["9.007"]
            },
            {
                "funId": "HVAC",
                "dpts": ["1.100", "5.100", "20.102", "20.105"],
                "Name_zh_CN": "空调",
                "valueStyle": {
                    "style": "DPT_DESC"
                }
            },
            {
                "funId": "Moving",
                "dpts": ["1.008", "1.010", "1.018"],
                "Name_zh_CN": "移动",
                "valueStyle": {
                    "style": "DPT_DESC"
                }
            },
            {
                "funId": "Percentage",
                "dpts": ["5.001", "5.003", "5.004"],
                "Name_zh_CN": "百分比",
                "valueStyle": {
                    "style": "InputBox",
                    "unit": "%"
                }
            },
            {
                "funId": "Switch",
                "dpts": ["1.001", "1.002", "1.003"],
                "Name_zh_CN": "开关",
                "valueStyle": {
                    "style": "DPT_DESC"
                }
            },
            {
                "Name_zh_CN": "温度",
                "valueStyle": {
                    "unit": "C",
                    "style": "Label"
                },
                "funId": "Temperature",
                "dpts": ["9.001"]
            },
            {
                "Name_zh_CN": "数值",
                "valueStyle": {
                    "style": "DPT_DESC"
                },
                "funId": "Value",
                "dpts": ["1.002", "1.005", "1.009", "5.004", "6.010", "7.001", "8.001", "12.001", "13.001", "14.068", "14.076", "14.077"]
            }
        ],
        "rtCodeDefs": [
            {
                "codeDefs": [
                    {
                        "createdRT": "bh.r.airFlow.level",
                        "codes": [0, 25, 50, 75, 100],
                        "codes_en_US": ["Quiet", "Low", "Medium", "High", "Highest"],
                        "codes_zh_CN": ["安静", "低", "中", "高", "最强"]
                    }
                ],
                "createdRT": "bh.r.airFlow.level"
            },
            {
                "createdRT": "bh.r.alarm",
                "suffixes": ["gas", "occupancy"],
                "susffixes_en_US": ["Gas", "Occupancy"],
                "susffixes_zh_CN": ["煤气", "有人"]
            },
            {
                "createdRT": "bh.r.airQualities",
                "suffixes": ["co", "co2", "pm2p5", "pollution", "tvoc"],
                "susffixes_en_US": ["CO", "CO2", "PM2.5", "Pollution", "TVOC"],
                "susffixes_zh_CN": ["一氧化碳", "二氧化碳", "PM2.5", "污染", "总挥发性有机物"],
                "codeDefs": [
                    {
                        "createdRT": "bh.r.airQualities:pollution",
                        "codes": [0, 1, 2, 3, 4, 5],
                        "codes_en_US": ["Clean", "Slight", "Low", "Medium", "High", "Serious"],
                        "codes_zh_CN": ["干净", "轻微污染", "低污染", "中污染", "高污染", "严重污染"]
                    }
                ]
            },
            {
                "createdRT": "bh.r.fheat.opMode",
                "codeDefs": [
                    {
                        "createdRT": "bh.r.fheat.opMode",
                        "codes_en_US": ["Auto", "General", "Day", "Night", "Away"],
                        "codes": [0, 1, 2, 3, 4, 5],
                        "codes_zh_CN": ["自动", "一般", "昼", "夜", "离家"]
                    }
                ]
            },
            {
                "createdRT": "bh.r.hvac.ctrlMode",
                "codeDefs": [
                    {
                        "createdRT": "bh.r.hvac.ctrlMode",
                        "codes": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20],
                        "codes_en_US": ["Auto", "Heat", "Morning Warmup", "Cool", "Night Purge", "Precool", "Off", "Test", "Emergency Heat", "Fan only", "Free Cool", "Ice", "Maximum Heating Mode", "Economic Heat or Cool Mode", "Dehumidification", "Calibration Mode", "Emergency Cool Mode", "Emergency Steam Mode", "NoDem"],
                        "codes_zh_CN": ["自动", "制热", "早晨预热", "制冷", "夜间净化", "预冷", "关机", "测试", "急热", "仅风扇", "自然冷却", "冷冻", "最大制热", "节能制热或制冷", "除湿", "校正模式", "节能制冷", "节能暖气", "NoDem"]
                    }
                ]
            },
            {
                "createdRT": "bh.r.humidity",
                "suffixes": ["current", "outdoor", "setpoint"],
                "susffixes_en_US": ["Current", "Outdoor", "Setpoint"],
                "susffixes_zh_CN": ["当前", "设定", "户外"]
            },
            {
                "createdRT": "bh.r.movement",
                "suffixes": ["UpDown", "StartStop", "LeftRight", "ForwardBackward"],
                "susffixes_en_US": ["Up/Down", "Start/Stop", "Left/Right", "Forward/Backward"],
                "susffixes_zh_CN": ["上/下", "开始/停止", "左/右", "前进/后退"],
                "codeDefs": [
                    {
                        "codes": ["up", "down", "start", "stop", "left", "right", "forward", "backward", "rotate"],
                        "codes_en_US": ["Up", "Down", "Start", "Stop", "Left", "Right", "Forward", "Backward", "Rotate"],
                        "codes_zh_CN": ["上", "下", "开始", "停止", "左", "右", "前进", "后退", "旋转"],
                        "createdRT": "bh.r.movement"
                    },
                    {
                        "codes": ["up", "down"],
                        "codes_en_US": ["Up", "Down"],
                        "codes_zh_CN": ["上", "下"],
                        "createdRT": "bh.r.movement:UpDown"
                    },
                    {
                        "codes_zh_CN": ["开始", "停止"],
                        "createdRT": "bh.r.movement:StartStop",
                        "codes": ["start", "stop"],
                        "codes_en_US": ["Start", "Stop"]
                    },
                    {
                        "createdRT": "bh.r.movement:LeftRight",
                        "codes": ["left", "right"],
                        "codes_en_US": ["Left", "Right"],
                        "codes_zh_CN": ["左", "右"]
                    },
                    {
                        "createdRT": "bh.r.movement:ForwardBackward",
                        "codes": ["left", "right"],
                        "codes_en_US": ["Forward", "Backward"],
                        "codes_zh_CN": ["前进", "后退"]
                    }
                ]
            },
            {
                "susffixes_en_US": ["Door", "Window"],
                "susffixes_zh_CN": ["门", "窗"],
                "createdRT": "bh.r.open",
                "suffixes": ["door", "window"]
            },
            {
                "createdRT": "bh.r.temperature",
                "suffixes": ["current", "dewpoint", "outdoor", "setpoint"],
                "susffixes_en_US": ["Current", "Dew Point", "Outdoor", "Setpoint"],
                "susffixes_zh_CN": ["当前", "露点", "户外", "设定"]
            },
            {
                "createdRT": "bh.r.time.period",
                "suffixes": ["upload"],
                "susffixes_en_US": ["Upload"],
                "susffixes_zh_CN": ["上载"]
            },
            {
                "createdRT": "bh.r.volume",
                "suffixes": ["gasConsumption", "waterConsumption"],
                "susffixes_en_US": ["Gas Sonsumption", "Water Consumption"],
                "susffixes_zh_CN": ["总燃气用量", "总用水量"]
            }
        ]
    },
    {
        "_id": { "$oid": "5caf8da3406cc71510011aa6" },
        "docTag": "00264_HDL_M-TBP2.1",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "HDL",
            "model": "M/TBP2.1"
        },
        "icon": "d-71.png",
        "image": "HDL_M-TBP4.1.png",
        "name": "简约S 2按键触控面板（欧标）",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "bIdx": 1,
                "btn": 1,
                "flags": 212,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "page": 1,
                "lpress": false,
                "valueKey": "value",
                "hidden": false,
                "objId": 1,
                "name": "按键1",
                "dpt": "1.001",
                "funId": "Switch",
                "valueType": "boolean",
                "style": 0
            },
            {
                "funId": "Switch",
                "flags": 212,
                "dpt": "1.001",
                "page": 1,
                "valueType": "boolean",
                "btn": 2,
                "style": 0,
                "hidden": false,
                "objId": 2,
                "name": "按键2",
                "createdRT": "oic.r.switch.binary",
                "bIdx": 2,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "lpress": false
            },
            {
                "objId": 3,
                "funId": "Heartbeat",
                "appHidden": true,
                "page": 1,
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"]
            }
        ],
        "switch": {
            "layout": "matrix",
            "btnCnt": 2,
            "pageCount": 1,
            "modifyStyle": true,
            "hasLPress": true
        },
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5caf8da3406cc71510011aaa" },
        "docTag": "00264_HDL_M-TBP4.1",
        "deviceType": 264,
        "hwInfo": {
            "model": "M/TBP4.1",
            "class": "S",
            "brand": "HDL"
        },
        "icon": "d-71.png",
        "image": "HDL_M-TBP4.1.png",
        "name": "简约S 4按键触控面板（欧标）",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "hidden": false,
                "name": "按键1",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "page": 1,
                "rt": ["bh.r.attr.button"],
                "bIdx": 1,
                "style": 0,
                "objId": 1,
                "funId": "Switch",
                "lpress": false,
                "flags": 212,
                "valueType": "boolean",
                "btn": 1
            },
            {
                "page": 1,
                "name": "按键2",
                "bIdx": 2,
                "style": 0,
                "lpress": false,
                "objId": 2,
                "rt": ["bh.r.attr.button"],
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "funId": "Switch",
                "dpt": "1.001",
                "valueType": "boolean",
                "btn": 2,
                "hidden": false,
                "flags": 212
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "bIdx": 3,
                "btn": 3,
                "page": 1,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "lpress": false,
                "objId": 3,
                "name": "按键1",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "hidden": false,
                "flags": 212
            },
            {
                "rt": ["bh.r.attr.button"],
                "bIdx": 4,
                "valueType": "boolean",
                "lpress": false,
                "name": "按键2",
                "dpt": "1.001",
                "valueKey": "value",
                "createdRT": "oic.r.switch.binary",
                "style": 0,
                "hidden": false,
                "objId": 4,
                "funId": "Switch",
                "flags": 212,
                "page": 1,
                "btn": 4
            },
            {
                "name": "心跳",
                "valueKey": "value",
                "valueType": "boolean",
                "appHidden": true,
                "rt": ["bh.r.attr.event"],
                "funId": "Heartbeat",
                "page": 1,
                "flags": 4,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "objId": 5
            }
        ],
        "switch": {
            "modifyStyle": true,
            "hasLPress": true,
            "layout": "matrix",
            "btnCnt": 4,
            "pageCount": 1
        },
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5caf8da4406cc71510011ab4" },
        "docTag": "60930_HDL_M-D02.1",
        "deviceType": 60930,
        "hwInfo": {
            "model": "M/D02.1",
            "class": "A",
            "brand": "HDL"
        },
        "icon": "c-2.png",
        "image": "HDL_M-D02.1.png",
        "name": "调光器2路3A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "objId": 1,
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开/关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 1
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 2,
                "name": "开/关 状态",
                "flags": 76,
                "dpt": "1.001",
                "chId": 1,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 1
            },
            {
                "name": "调光",
                "flags": 148,
                "valueKey": "step",
                "min": "1",
                "max": "7",
                "rt": ["bh.r.attr.actuator"],
                "objId": 3,
                "funId": "Dimming",
                "dpt": "3.007",
                "createdRT": "bh.r.dimming",
                "valueType": "integer",
                "chId": 1
            },
            {
                "flags": 148,
                "dpt": "5.001",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "unit": "%",
                "objId": 4,
                "funId": "Dimming",
                "name": "亮度设定",
                "unitName": "%",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "valueType": "integer"
            },
            {
                "dpt": "5.001",
                "valueType": "integer",
                "unitName": "%",
                "name": "亮度状态",
                "flags": 76,
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "unit": "%",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 5,
                "funId": "Dimming"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "chId": 2,
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 6,
                "funId": "Switch",
                "name": "开/关"
            },
            {
                "flags": 76,
                "chId": 2,
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 6,
                "objId": 7,
                "funId": "Switch",
                "name": "开/关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "funId": "Dimming",
                "dpt": "3.007",
                "createdRT": "bh.r.dimming",
                "valueKey": "step",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 8,
                "name": "调光",
                "flags": 148,
                "valueType": "integer",
                "min": "1",
                "max": "7"
            },
            {
                "unit": "%",
                "name": "亮度设定",
                "dpt": "5.001",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "valueType": "integer",
                "chId": 2,
                "objId": 9,
                "funId": "Dimming",
                "flags": 148,
                "unitName": "%",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "funId": "Dimming",
                "name": "亮度状态",
                "flags": 76,
                "valueType": "integer",
                "unit": "%",
                "ack4Obj": 9,
                "objId": 10,
                "dpt": "5.001",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "unitName": "%",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2
            },
            {
                "valueKey": "value",
                "objId": 11,
                "funId": "Heartbeat",
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "appHidden": true,
                "rt": ["bh.r.attr.event"]
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 2,
            "chCnt": 2
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5caf8da4406cc71510011ab8" },
        "docTag": "60930_HDL_M-D04.1",
        "deviceType": 60930,
        "hwInfo": {
            "model": "M/D04.1",
            "class": "A",
            "brand": "HDL"
        },
        "icon": "c-2.png",
        "image": "HDL_M-D04.1.png",
        "name": "调光器4路1.5A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "name": "开/关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 1,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "chId": 1
            },
            {
                "chId": 1,
                "objId": 2,
                "dpt": "1.001",
                "ack4Obj": 1,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开/关 状态",
                "flags": 76
            },
            {
                "max": "7",
                "objId": 3,
                "funId": "Dimming",
                "name": "调光",
                "createdRT": "bh.r.dimming",
                "valueKey": "step",
                "valueType": "integer",
                "min": "1",
                "rt": ["bh.r.attr.actuator"],
                "flags": 148,
                "dpt": "3.007",
                "chId": 1
            },
            {
                "flags": 148,
                "dpt": "5.001",
                "valueKey": "value",
                "valueType": "integer",
                "unit": "%",
                "objId": 4,
                "funId": "Dimming",
                "name": "亮度设定",
                "createdRT": "bh.r.openLevel",
                "unitName": "%",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "valueType": "integer",
                "unitName": "%",
                "chId": 1,
                "name": "亮度状态",
                "flags": 76,
                "dpt": "5.001",
                "valueKey": "value",
                "unit": "%",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "objId": 5,
                "funId": "Dimming",
                "createdRT": "bh.r.openLevel"
            },
            {
                "objId": 6,
                "funId": "Switch",
                "name": "开/关",
                "flags": 148,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "valueType": "boolean",
                "ack4Obj": 6,
                "chId": 2,
                "funId": "Switch",
                "name": "开/关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "objId": 7,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "dpt": "3.007",
                "createdRT": "bh.r.dimming",
                "valueKey": "step",
                "min": "1",
                "chId": 2,
                "name": "调光",
                "funId": "Dimming",
                "flags": 148,
                "valueType": "integer",
                "max": "7",
                "rt": ["bh.r.attr.actuator"],
                "objId": 8
            },
            {
                "objId": 9,
                "name": "亮度设定",
                "dpt": "5.001",
                "unitName": "%",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Dimming",
                "flags": 148,
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "valueType": "integer",
                "unit": "%",
                "chId": 2
            },
            {
                "unitName": "%",
                "ack4Obj": 9,
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 10,
                "flags": 76,
                "dpt": "5.001",
                "unit": "%",
                "valueType": "integer",
                "funId": "Dimming",
                "name": "亮度状态",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value"
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 11,
                "dpt": "1.001",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "chId": 3,
                "funId": "Switch",
                "name": "开/关"
            },
            {
                "objId": 12,
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 11,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "funId": "Switch",
                "name": "开/关 状态",
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "max": "7",
                "funId": "Dimming",
                "flags": 148,
                "dpt": "3.007",
                "createdRT": "bh.r.dimming",
                "valueKey": "step",
                "valueType": "integer",
                "objId": 13,
                "name": "调光",
                "min": "1",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3
            },
            {
                "valueKey": "value",
                "valueType": "integer",
                "name": "亮度设定",
                "funId": "Dimming",
                "flags": 148,
                "dpt": "5.001",
                "createdRT": "bh.r.openLevel",
                "unit": "%",
                "unitName": "%",
                "rt": ["bh.r.attr.actuator"],
                "objId": 14,
                "chId": 3
            },
            {
                "valueKey": "value",
                "ack4Obj": 14,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 15,
                "funId": "Dimming",
                "flags": 76,
                "dpt": "5.001",
                "unitName": "%",
                "name": "亮度状态",
                "createdRT": "bh.r.openLevel",
                "valueType": "integer",
                "unit": "%"
            },
            {
                "objId": 16,
                "funId": "Switch",
                "name": "开/关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4
            },
            {
                "objId": 17,
                "funId": "Switch",
                "name": "开/关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 16,
                "rt": ["bh.r.attr.actuator"],
                "chId": 4
            },
            {
                "name": "调光",
                "createdRT": "bh.r.dimming",
                "valueKey": "step",
                "valueType": "integer",
                "objId": 18,
                "funId": "Dimming",
                "flags": 148,
                "dpt": "3.007",
                "min": "1",
                "max": "7",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4
            },
            {
                "createdRT": "bh.r.openLevel",
                "valueType": "integer",
                "unit": "%",
                "unitName": "%",
                "chId": 4,
                "funId": "Dimming",
                "name": "亮度设定",
                "flags": 148,
                "dpt": "5.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 19
            },
            {
                "valueKey": "value",
                "unitName": "%",
                "ack4Obj": 19,
                "objId": 20,
                "funId": "Dimming",
                "flags": 76,
                "dpt": "5.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "name": "亮度状态",
                "createdRT": "bh.r.openLevel",
                "valueType": "integer",
                "unit": "%"
            },
            {
                "appHidden": true,
                "flags": 4,
                "valueKey": "value",
                "name": "心跳",
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"],
                "objId": 21,
                "funId": "Heartbeat"
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 4,
            "chCnt": 4
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5caf8da4406cc71510011abc" },
        "docTag": "60930_HDL_M-D06.1",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "HDL",
            "model": "M/D06.1"
        },
        "icon": "c-2.png",
        "image": "HDL_M-D06.1.png",
        "name": "调光器6路1A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "name": "开/关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 1,
                "objId": 1,
                "funId": "Switch",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 1,
                "objId": 2,
                "name": "开/关 状态",
                "createdRT": "oic.r.switch.binary",
                "chId": 1
            },
            {
                "dpt": "3.007",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "flags": 148,
                "createdRT": "bh.r.dimming",
                "valueKey": "step",
                "valueType": "integer",
                "min": "1",
                "objId": 3,
                "funId": "Dimming",
                "name": "调光",
                "max": "7"
            },
            {
                "objId": 4,
                "name": "亮度设定",
                "flags": 148,
                "dpt": "5.001",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "funId": "Dimming",
                "unit": "%",
                "unitName": "%"
            },
            {
                "dpt": "5.001",
                "valueKey": "value",
                "valueType": "integer",
                "unit": "%",
                "createdRT": "bh.r.openLevel",
                "unitName": "%",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "objId": 5,
                "funId": "Dimming",
                "name": "亮度状态",
                "flags": 76,
                "chId": 1
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 2,
                "objId": 6,
                "funId": "Switch",
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "name": "开/关",
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "ack4Obj": 6,
                "chId": 2,
                "objId": 7,
                "name": "开/关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "createdRT": "bh.r.dimming",
                "chId": 2,
                "objId": 8,
                "funId": "Dimming",
                "name": "调光",
                "flags": 148,
                "dpt": "3.007",
                "valueKey": "step",
                "valueType": "integer",
                "min": "1",
                "max": "7",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "dpt": "5.001",
                "valueKey": "value",
                "valueType": "integer",
                "unit": "%",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "name": "亮度设定",
                "flags": 148,
                "createdRT": "bh.r.openLevel",
                "unitName": "%",
                "objId": 9,
                "funId": "Dimming"
            },
            {
                "objId": 10,
                "name": "亮度状态",
                "dpt": "5.001",
                "valueKey": "value",
                "unit": "%",
                "unitName": "%",
                "ack4Obj": 9,
                "funId": "Dimming",
                "flags": 76,
                "createdRT": "bh.r.openLevel",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "chId": 3,
                "name": "开/关",
                "funId": "Switch",
                "flags": 148,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 11
            },
            {
                "name": "开/关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "objId": 12,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 11,
                "chId": 3,
                "funId": "Switch"
            },
            {
                "valueType": "integer",
                "max": "7",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "flags": 148,
                "valueKey": "step",
                "name": "调光",
                "dpt": "3.007",
                "createdRT": "bh.r.dimming",
                "min": "1",
                "objId": 13,
                "funId": "Dimming"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "objId": 14,
                "name": "亮度设定",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "unitName": "%",
                "chId": 3,
                "funId": "Dimming",
                "flags": 148,
                "dpt": "5.001",
                "valueType": "integer",
                "unit": "%"
            },
            {
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "valueType": "integer",
                "unit": "%",
                "unitName": "%",
                "funId": "Dimming",
                "flags": 76,
                "dpt": "5.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 15,
                "name": "亮度状态",
                "ack4Obj": 14
            },
            {
                "objId": 16,
                "funId": "Switch",
                "name": "开/关",
                "flags": 148,
                "chId": 4,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 17,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "name": "开/关 状态",
                "ack4Obj": 16,
                "chId": 4
            },
            {
                "flags": 148,
                "valueType": "integer",
                "min": "1",
                "chId": 4,
                "objId": 18,
                "funId": "Dimming",
                "name": "调光",
                "max": "7",
                "rt": ["bh.r.attr.actuator"],
                "dpt": "3.007",
                "createdRT": "bh.r.dimming",
                "valueKey": "step"
            },
            {
                "unitName": "%",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 19,
                "funId": "Dimming",
                "valueType": "integer",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "unit": "%",
                "name": "亮度设定",
                "flags": 148,
                "dpt": "5.001"
            },
            {
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "unit": "%",
                "ack4Obj": 19,
                "rt": ["bh.r.attr.actuator"],
                "objId": 20,
                "name": "亮度状态",
                "dpt": "5.001",
                "valueType": "integer",
                "unitName": "%",
                "chId": 4,
                "funId": "Dimming",
                "flags": 76
            },
            {
                "name": "开/关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "dpt": "1.001",
                "valueType": "boolean",
                "chId": 5,
                "objId": 21
            },
            {
                "name": "开/关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 22,
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "ack4Obj": 21,
                "chId": 5
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "name": "调光",
                "flags": 148,
                "dpt": "3.007",
                "createdRT": "bh.r.dimming",
                "valueKey": "step",
                "max": "7",
                "objId": 23,
                "funId": "Dimming",
                "valueType": "integer",
                "min": "1",
                "chId": 5
            },
            {
                "funId": "Dimming",
                "name": "亮度设定",
                "flags": 148,
                "valueKey": "value",
                "chId": 5,
                "objId": 24,
                "createdRT": "bh.r.openLevel",
                "valueType": "integer",
                "unit": "%",
                "unitName": "%",
                "rt": ["bh.r.attr.actuator"],
                "dpt": "5.001"
            },
            {
                "valueType": "integer",
                "unit": "%",
                "ack4Obj": 24,
                "rt": ["bh.r.attr.actuator"],
                "objId": 25,
                "name": "亮度状态",
                "dpt": "5.001",
                "valueKey": "value",
                "chId": 5,
                "funId": "Dimming",
                "flags": 76,
                "createdRT": "bh.r.openLevel",
                "unitName": "%"
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 6,
                "name": "开/关",
                "funId": "Switch",
                "flags": 148,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 26
            },
            {
                "objId": 27,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 6,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开/关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueType": "boolean",
                "ack4Obj": 26
            },
            {
                "objId": 28,
                "flags": 148,
                "dpt": "3.007",
                "createdRT": "bh.r.dimming",
                "valueKey": "step",
                "valueType": "integer",
                "funId": "Dimming",
                "name": "调光",
                "min": "1",
                "max": "7",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6
            },
            {
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "valueType": "integer",
                "unitName": "%",
                "chId": 6,
                "funId": "Dimming",
                "flags": 148,
                "dpt": "5.001",
                "unit": "%",
                "rt": ["bh.r.attr.actuator"],
                "objId": 29,
                "name": "亮度设定"
            },
            {
                "flags": 76,
                "dpt": "5.001",
                "valueKey": "value",
                "valueType": "integer",
                "unit": "%",
                "objId": 30,
                "name": "亮度状态",
                "createdRT": "bh.r.openLevel",
                "unitName": "%",
                "ack4Obj": 29,
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "funId": "Dimming"
            },
            {
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "appHidden": true,
                "rt": ["bh.r.attr.event"],
                "objId": 31,
                "funId": "Heartbeat",
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "valueKey": "value"
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 6,
            "chCnt": 6
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5caf8da4406cc71510011ac0" },
        "docTag": "60930_HDL_M-DA6.1",
        "deviceType": 60930,
        "hwInfo": {
            "model": "M/DA6.1",
            "class": "A",
            "brand": "HDL"
        },
        "icon": "c-2.png",
        "image": "HDL_M-DA6.1.png",
        "name": "调光器6路0-10V",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "name": "开/关",
                "flags": 148,
                "dpt": "1.001",
                "chId": 1,
                "objId": 1,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 2,
                "funId": "Switch",
                "flags": 148,
                "valueKey": "value",
                "chId": 2,
                "name": "开/关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 3,
                "objId": 3,
                "name": "开/关",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "dpt": "1.001",
                "valueKey": "value",
                "chId": 4,
                "objId": 4,
                "name": "开/关",
                "flags": 148
            },
            {
                "funId": "Switch",
                "flags": 148,
                "valueType": "boolean",
                "chId": 5,
                "objId": 5,
                "name": "开/关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "objId": 6,
                "name": "调光",
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "funId": "Switch"
            },
            {
                "dpt": "3.007",
                "funId": "Dimming",
                "name": "调光",
                "flags": 148,
                "createdRT": "oic.r.light.dimming",
                "valueKey": "dimmingSetting",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "objId": 7,
                "chId": 1
            },
            {
                "flags": 148,
                "createdRT": "oic.r.light.dimming",
                "valueKey": "dimmingSetting",
                "objId": 8,
                "funId": "Dimming",
                "name": "调光",
                "chId": 2,
                "dpt": "3.007",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 9,
                "funId": "Dimming",
                "valueKey": "dimmingSetting",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "name": "调光",
                "flags": 148,
                "dpt": "3.007",
                "createdRT": "oic.r.light.dimming",
                "valueType": "integer"
            },
            {
                "name": "调光",
                "flags": 148,
                "dpt": "3.007",
                "createdRT": "oic.r.light.dimming",
                "valueType": "integer",
                "chId": 4,
                "objId": 10,
                "funId": "Dimming",
                "valueKey": "dimmingSetting",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "createdRT": "oic.r.light.dimming",
                "valueKey": "dimmingSetting",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "funId": "Dimming",
                "flags": 148,
                "dpt": "3.007",
                "valueType": "integer",
                "objId": 11,
                "name": "调光"
            },
            {
                "objId": 12,
                "flags": 148,
                "valueKey": "dimmingSetting",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "funId": "Dimming",
                "name": "调光",
                "dpt": "3.007",
                "createdRT": "oic.r.light.dimming",
                "valueType": "integer"
            },
            {
                "funId": "Percentage",
                "createdRT": "oic.r.openLevel",
                "valueType": "integer",
                "valueKey": "openLevel",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 13,
                "name": "比例调光",
                "flags": 148,
                "dpt": "5.001"
            },
            {
                "createdRT": "oic.r.openLevel",
                "valueKey": "openLevel",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 14,
                "funId": "Percentage",
                "dpt": "5.001",
                "name": "比例调光",
                "flags": 148
            },
            {
                "funId": "Percentage",
                "name": "比例调光",
                "dpt": "5.001",
                "createdRT": "oic.r.openLevel",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "objId": 15,
                "valueKey": "openLevel",
                "chId": 3,
                "flags": 148
            },
            {
                "funId": "Percentage",
                "name": "比例调光",
                "createdRT": "oic.r.openLevel",
                "valueKey": "openLevel",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 16,
                "flags": 148,
                "dpt": "5.001",
                "valueType": "integer"
            },
            {
                "objId": 17,
                "flags": 148,
                "createdRT": "oic.r.openLevel",
                "valueType": "integer",
                "chId": 5,
                "funId": "Percentage",
                "name": "比例调光",
                "dpt": "5.001",
                "valueKey": "openLevel",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 18,
                "name": "比例调光",
                "dpt": "5.001",
                "valueKey": "openLevel",
                "valueType": "integer",
                "funId": "Percentage",
                "flags": 148,
                "createdRT": "oic.r.openLevel",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6
            }
        ],
        "KNX": {
            "chCnt": 6
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5caf8da4406cc71510011ac6" },
        "docTag": "60930_HDL_M-R12.16.1",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "HDL",
            "model": "M/R12.16.1"
        },
        "icon": "c-2.png",
        "image": "HDL_M-R12.16.1.png",
        "name": "继电器12路16A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 1,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "objId": 2,
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 2
            },
            {
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "chId": 3,
                "objId": 3,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 4,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 5,
                "objId": 5,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "objId": 6,
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "flags": 148,
                "valueKey": "value",
                "chId": 7,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 7,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001"
            },
            {
                "objId": 8,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 8,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "valueKey": "value",
                "chId": 9,
                "objId": 9
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "objId": 10,
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 10
            },
            {
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 11,
                "objId": 11,
                "funId": "Switch",
                "valueKey": "value",
                "name": "开关",
                "dpt": "1.001"
            },
            {
                "valueType": "boolean",
                "chId": 12,
                "objId": 12,
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 13,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 1,
                "chId": 1
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 2,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "objId": 14,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 15,
                "name": "开关 状态",
                "flags": 76,
                "valueType": "boolean",
                "ack4Obj": 3,
                "chId": 3
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "objId": 16,
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 4,
                "chId": 4,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 17,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "ack4Obj": 5
            },
            {
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "objId": 18,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "ack4Obj": 6
            },
            {
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 7,
                "rt": ["bh.r.attr.actuator"],
                "chId": 7,
                "objId": 19,
                "funId": "Switch",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "objId": 20,
                "funId": "Switch",
                "dpt": "1.001",
                "valueType": "boolean",
                "ack4Obj": 8,
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 8
            },
            {
                "chId": 9,
                "objId": 21,
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 9,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 76,
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 10,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "chId": 10,
                "objId": 22,
                "createdRT": "oic.r.switch.binary"
            },
            {
                "valueKey": "value",
                "ack4Obj": 11,
                "rt": ["bh.r.attr.actuator"],
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 11,
                "objId": 23,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 12,
                "chId": 12,
                "objId": 24,
                "dpt": "1.001",
                "flags": 76,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关 状态"
            },
            {
                "objId": 25,
                "funId": "Heartbeat",
                "name": "心跳",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "flags": 4,
                "dpt": "1.006",
                "valueType": "boolean",
                "appHidden": true,
                "rt": ["bh.r.attr.event"]
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 12,
            "chCnt": 12
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5caf8da4406cc71510011aca" },
        "docTag": "60930_HDL_M-R16.10.1",
        "deviceType": 60930,
        "hwInfo": {
            "brand": "HDL",
            "model": "M/R16.10.1",
            "class": "A"
        },
        "icon": "c-2.png",
        "image": "HDL_M-R16.10.1.png",
        "name": "继电器16路10A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "name": "开关",
                "flags": 148,
                "valueKey": "value",
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 1
            },
            {
                "dpt": "1.001",
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 2,
                "name": "开关"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 3,
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "funId": "Switch",
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 4,
                "name": "开关",
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "objId": 5,
                "name": "开关",
                "flags": 148
            },
            {
                "valueType": "boolean",
                "funId": "Switch",
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "objId": 6,
                "flags": 148,
                "dpt": "1.001"
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "objId": 7,
                "name": "开关",
                "flags": 148,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 7
            },
            {
                "objId": 8,
                "funId": "Switch",
                "valueType": "boolean",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 8,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "flags": 148,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "chId": 9,
                "objId": 9,
                "dpt": "1.001"
            },
            {
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 10,
                "objId": 10,
                "funId": "Switch",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 11,
                "objId": 11,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 12,
                "funId": "Switch",
                "flags": 148,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 12,
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 13,
                "objId": 13,
                "name": "开关",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 14,
                "objId": 14,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "objId": 15,
                "flags": 148,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 15
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 16,
                "objId": 16,
                "flags": 148,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "chId": 1,
                "objId": 17,
                "name": "开关 状态",
                "ack4Obj": 1
            },
            {
                "objId": 18,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "ack4Obj": 2,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 19,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 3,
                "name": "开关 状态",
                "flags": 76,
                "valueType": "boolean"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 20,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "chId": 4
            },
            {
                "ack4Obj": 5,
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "objId": 21,
                "funId": "Switch",
                "name": "开关 状态",
                "valueKey": "value",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 6,
                "chId": 6,
                "objId": 22,
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "flags": 76,
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 7,
                "objId": 23,
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 7,
                "funId": "Switch"
            },
            {
                "objId": 24,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 8,
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 8
            },
            {
                "dpt": "1.001",
                "ack4Obj": 9,
                "rt": ["bh.r.attr.actuator"],
                "objId": 25,
                "funId": "Switch",
                "flags": 76,
                "valueType": "boolean",
                "chId": 9,
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "objId": 26,
                "name": "开关 状态",
                "flags": 76,
                "ack4Obj": 10,
                "rt": ["bh.r.attr.actuator"],
                "chId": 10,
                "funId": "Switch",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 27,
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "funId": "Switch",
                "valueType": "boolean",
                "ack4Obj": 11,
                "chId": 11
            },
            {
                "funId": "Switch",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 12,
                "objId": 28,
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "ack4Obj": 12,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "ack4Obj": 13,
                "chId": 13,
                "objId": 29,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "valueType": "boolean",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueType": "boolean",
                "ack4Obj": 14,
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 14,
                "objId": 30,
                "funId": "Switch",
                "flags": 76,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 15,
                "objId": 31,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 15
            },
            {
                "chId": 16,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 32,
                "valueKey": "value",
                "ack4Obj": 16
            },
            {
                "rt": ["bh.r.attr.event"],
                "objId": 33,
                "name": "心跳",
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "funId": "Heartbeat",
                "flags": 4,
                "valueType": "boolean",
                "appHidden": true
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 16,
            "chCnt": 16
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5caf8da4406cc71510011ace" },
        "docTag": "60930_HDL_M-R16.16.1",
        "deviceType": 60930,
        "hwInfo": {
            "brand": "HDL",
            "model": "M/R16.16.1",
            "class": "A"
        },
        "icon": "c-2.png",
        "image": "HDL_M-R16.16.1.png",
        "name": "继电器16路16A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 1,
                "funId": "Switch",
                "name": "开关",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 2,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "objId": 3,
                "valueKey": "value",
                "chId": 3,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001"
            },
            {
                "objId": 4,
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 4
            },
            {
                "objId": 5,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean",
                "chId": 5
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "objId": 6,
                "valueKey": "value",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "funId": "Switch",
                "name": "开关"
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 7,
                "funId": "Switch",
                "flags": 148,
                "chId": 7,
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "valueKey": "value",
                "objId": 8,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 8,
                "dpt": "1.001"
            },
            {
                "objId": 9,
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 9,
                "funId": "Switch",
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "objId": 10,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 10,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "objId": 11,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 11,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "chId": 12,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 12,
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "objId": 13,
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关",
                "dpt": "1.001",
                "chId": 13
            },
            {
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 14,
                "funId": "Switch",
                "dpt": "1.001",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 14,
                "name": "开关"
            },
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "chId": 15,
                "objId": 15,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "valueType": "boolean",
                "chId": 16,
                "objId": 16,
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 148
            },
            {
                "objId": 17,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "valueType": "boolean",
                "ack4Obj": 1,
                "rt": ["bh.r.attr.actuator"],
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 1
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 2,
                "rt": ["bh.r.attr.actuator"],
                "flags": 76,
                "dpt": "1.001",
                "name": "开关 状态",
                "valueKey": "value",
                "chId": 2,
                "objId": 18,
                "funId": "Switch"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "dpt": "1.001",
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "ack4Obj": 3,
                "objId": 19
            },
            {
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 4,
                "chId": 4,
                "objId": 20,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 21,
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "ack4Obj": 5,
                "rt": ["bh.r.attr.actuator"],
                "chId": 5
            },
            {
                "valueType": "boolean",
                "flags": 76,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 6,
                "rt": ["bh.r.attr.actuator"],
                "objId": 22,
                "chId": 6
            },
            {
                "valueType": "boolean",
                "ack4Obj": 7,
                "rt": ["bh.r.attr.actuator"],
                "objId": 23,
                "name": "开关 状态",
                "flags": 76,
                "valueKey": "value",
                "chId": 7,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "name": "开关 状态",
                "valueType": "boolean",
                "ack4Obj": 8,
                "chId": 8,
                "objId": 24,
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch"
            },
            {
                "ack4Obj": 9,
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 25,
                "funId": "Switch",
                "chId": 9
            },
            {
                "objId": 26,
                "name": "开关 状态",
                "valueKey": "value",
                "ack4Obj": 10,
                "rt": ["bh.r.attr.actuator"],
                "chId": 10,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "flags": 76,
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 11,
                "chId": 11,
                "objId": 27,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 12,
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 12,
                "objId": 28,
                "funId": "Switch",
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 13,
                "rt": ["bh.r.attr.actuator"],
                "valueKey": "value",
                "chId": 13,
                "objId": 29,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001"
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 14,
                "objId": 30,
                "name": "开关 状态",
                "ack4Obj": 14,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 76
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "ack4Obj": 15,
                "chId": 15,
                "objId": 31,
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 32,
                "funId": "Switch",
                "valueType": "boolean",
                "ack4Obj": 16,
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 16
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "objId": 33,
                "funId": "Heartbeat",
                "appHidden": true,
                "rt": ["bh.r.attr.event"]
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 16,
            "chCnt": 16
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5caf8da5406cc71510011ad4" },
        "docTag": "60930_HDL_M-R4.16.1",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "HDL",
            "model": "M/R4.16.1"
        },
        "icon": "c-2.png",
        "image": "HDL_M-R4.16.1.png",
        "name": "继电器4路16A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "objId": 1,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "objId": 2,
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "chId": 3,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "flags": 148,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 3,
                "funId": "Switch",
                "name": "开关"
            },
            {
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "objId": 4,
                "funId": "Switch",
                "name": "开关",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 4
            },
            {
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "ack4Obj": 1,
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 5,
                "funId": "Switch",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "objId": 6,
                "ack4Obj": 2,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2
            },
            {
                "objId": 7,
                "funId": "Switch",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "chId": 3,
                "name": "开关 状态",
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 3,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "chId": 4,
                "objId": 8,
                "valueKey": "value",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关 状态"
            },
            {
                "rt": ["bh.r.attr.event"],
                "funId": "Heartbeat",
                "name": "心跳",
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "appHidden": true,
                "objId": 9,
                "flags": 4,
                "valueKey": "value",
                "valueType": "boolean"
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 4,
            "chCnt": 4
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5caf8da5406cc71510011ada" },
        "docTag": "60930_HDL_M-R8.16.1",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "HDL",
            "model": "M/R8.16.1"
        },
        "icon": "c-2.png",
        "image": "HDL_M-R8.16.1.png",
        "name": "继电器8路16A",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 1,
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "objId": 2,
                "funId": "Switch",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 3,
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 4,
                "objId": 4,
                "funId": "Switch"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "chId": 5,
                "flags": 148,
                "dpt": "1.001",
                "name": "开关",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 5,
                "funId": "Switch"
            },
            {
                "funId": "Switch",
                "valueType": "boolean",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "objId": 6,
                "name": "开关",
                "flags": 148
            },
            {
                "chId": 7,
                "objId": 7,
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "chId": 8,
                "objId": 8,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "dpt": "1.001"
            },
            {
                "ack4Obj": 1,
                "rt": ["bh.r.attr.actuator"],
                "objId": 9,
                "funId": "Switch",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "flags": 76,
                "dpt": "1.001",
                "chId": 1
            },
            {
                "chId": 2,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 2,
                "objId": 10,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "dpt": "1.001",
                "valueType": "boolean",
                "objId": 11,
                "name": "开关 状态",
                "flags": 76,
                "ack4Obj": 3,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "objId": 12,
                "flags": 76,
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 5,
                "rt": ["bh.r.attr.actuator"],
                "objId": 13,
                "funId": "Switch",
                "chId": 5,
                "dpt": "1.001",
                "valueKey": "value"
            },
            {
                "name": "开关 状态",
                "flags": 76,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 6,
                "chId": 6,
                "objId": 14
            },
            {
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 7,
                "objId": 15,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "chId": 7,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 16,
                "funId": "Switch",
                "flags": 76,
                "chId": 8,
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 8,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "心跳",
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"],
                "objId": 17,
                "funId": "Heartbeat",
                "flags": 4,
                "valueKey": "value",
                "appHidden": true
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 8,
            "chCnt": 8
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5cbc8281406cc7151006830b" },
        "docTag": "00529_HDL_M-W04.10.1",
        "deviceType": 529,
        "hwInfo": {
            "model": "M/W04.10.1",
            "class": "A",
            "brand": "HDL"
        },
        "icon": "c-2.png",
        "image": "HDL_M-W04.10.1.png",
        "name": "窗帘控制模块",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "rt": ["bh.r.attr.actuator"],
                "objId": 1,
                "funId": "Curtain",
                "name": "上/下",
                "valueKey": "value",
                "valueDefs": {
                    "up": "上",
                    "down": "下"
                },
                "chId": 1,
                "flags": 148,
                "dpt": "1.008",
                "createdRT": "bh.r.movement:UpDown",
                "valueType": "string"
            },
            {
                "objId": 2,
                "name": "上/下 状态",
                "flags": 76,
                "dpt": "1.008",
                "valueKey": "value",
                "chId": 1,
                "funId": "Curtain",
                "createdRT": "bh.r.movement:UpDown",
                "valueType": "string",
                "valueDefs": {
                    "down": "下",
                    "up": "上"
                },
                "ack4Obj": 1,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "dpt": "1.010",
                "valueKey": "value",
                "valueDefs": {
                    "start": "启动",
                    "stop": "停止"
                },
                "rt": ["bh.r.attr.actuator"],
                "funId": "Moving",
                "name": "停止",
                "flags": 148,
                "createdRT": "bh.r.movement:StartStop",
                "valueType": "string",
                "chId": 1,
                "objId": 3
            },
            {
                "funId": "Moving",
                "valueKey": "value",
                "ack4Obj": 3,
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "valueType": "string",
                "valueDefs": {
                    "start": "启动",
                    "stop": "停止"
                },
                "objId": 4,
                "name": "停止 状态",
                "flags": 76,
                "dpt": "1.010",
                "createdRT": "bh.r.movement:StartStop"
            },
            {
                "name": "百分比",
                "flags": 148,
                "valueKey": "value",
                "unit": "%",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 5,
                "funId": "Curtain",
                "dpt": "5.001",
                "createdRT": "bh.r.openLevel",
                "valueType": "integer",
                "unitName": "%"
            },
            {
                "funId": "Curtain",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "ack4Obj": 5,
                "objId": 6,
                "name": "开启 状态",
                "flags": 76,
                "dpt": "5.001",
                "valueType": "integer",
                "unit": "%",
                "unitName": "%"
            },
            {
                "createdRT": "bh.r.movement:UpDown",
                "valueKey": "value",
                "valueDefs": {
                    "up": "上",
                    "down": "下"
                },
                "objId": 7,
                "name": "上/下",
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "funId": "Curtain",
                "dpt": "1.008",
                "valueType": "string"
            },
            {
                "funId": "Curtain",
                "createdRT": "bh.r.movement:UpDown",
                "valueType": "string",
                "rt": ["bh.r.attr.actuator"],
                "valueDefs": {
                    "up": "上",
                    "down": "下"
                },
                "ack4Obj": 7,
                "chId": 2,
                "objId": 8,
                "name": "上/下 状态",
                "flags": 76,
                "dpt": "1.008",
                "valueKey": "value"
            },
            {
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "name": "停止",
                "createdRT": "bh.r.movement:StartStop",
                "flags": 148,
                "dpt": "1.010",
                "valueType": "string",
                "valueDefs": {
                    "start": "启动",
                    "stop": "停止"
                },
                "chId": 2,
                "objId": 9,
                "funId": "Moving"
            },
            {
                "createdRT": "bh.r.movement:StartStop",
                "valueKey": "value",
                "valueType": "string",
                "valueDefs": {
                    "start": "启动",
                    "stop": "停止"
                },
                "objId": 10,
                "name": "停止 状态",
                "dpt": "1.010",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "funId": "Moving",
                "flags": 76,
                "ack4Obj": 9
            },
            {
                "funId": "Curtain",
                "dpt": "5.001",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "unitName": "%",
                "rt": ["bh.r.attr.actuator"],
                "objId": 11,
                "name": "百分比",
                "flags": 148,
                "valueType": "integer",
                "unit": "%",
                "chId": 2
            },
            {
                "funId": "Curtain",
                "createdRT": "bh.r.openLevel",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 12,
                "name": "开启 状态",
                "flags": 76,
                "dpt": "5.001",
                "valueKey": "value",
                "valueType": "integer",
                "unit": "%",
                "unitName": "%",
                "ack4Obj": 11
            },
            {
                "objId": 13,
                "name": "上/下",
                "valueType": "string",
                "chId": 3,
                "valueKey": "value",
                "valueDefs": {
                    "up": "上",
                    "down": "下"
                },
                "rt": ["bh.r.attr.actuator"],
                "funId": "Curtain",
                "flags": 148,
                "dpt": "1.008",
                "createdRT": "bh.r.movement:UpDown"
            },
            {
                "dpt": "1.008",
                "createdRT": "bh.r.movement:UpDown",
                "valueKey": "value",
                "valueDefs": {
                    "up": "上",
                    "down": "下"
                },
                "objId": 14,
                "funId": "Curtain",
                "name": "上/下 状态",
                "flags": 76,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "valueType": "string",
                "ack4Obj": 13
            },
            {
                "dpt": "1.010",
                "valueKey": "value",
                "valueType": "string",
                "chId": 3,
                "objId": 15,
                "funId": "Moving",
                "name": "停止",
                "flags": 148,
                "createdRT": "bh.r.movement:StartStop",
                "valueDefs": {
                    "start": "启动",
                    "stop": "停止"
                },
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 16,
                "funId": "Moving",
                "dpt": "1.010",
                "valueType": "string",
                "valueDefs": {
                    "start": "启动",
                    "stop": "停止"
                },
                "ack4Obj": 15,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "name": "停止 状态",
                "flags": 76,
                "createdRT": "bh.r.movement:StartStop",
                "valueKey": "value"
            },
            {
                "openLevel": 0,
                "objId": 17,
                "flags": 148,
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "valueType": "integer",
                "unitName": "%",
                "funId": "Curtain",
                "name": "百分比",
                "dpt": "5.001",
                "unit": "%",
                "rt": ["bh.r.attr.actuator", "bh.r.openLevel"],
                "chId": 3
            },
            {
                "valueType": "integer",
                "unit": "%",
                "objId": 18,
                "funId": "Curtain",
                "flags": 76,
                "dpt": "5.001",
                "createdRT": "bh.r.openLevel",
                "chId": 3,
                "name": "开启 状态",
                "valueKey": "value",
                "unitName": "%",
                "ack4Obj": 17,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "flags": 148,
                "dpt": "1.008",
                "valueType": "string",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Curtain",
                "name": "上/下",
                "createdRT": "bh.r.movement:UpDown",
                "valueKey": "value",
                "valueDefs": {
                    "up": "上",
                    "down": "下"
                },
                "chId": 4,
                "objId": 19
            },
            {
                "createdRT": "bh.r.movement:UpDown",
                "valueKey": "value",
                "valueDefs": {
                    "up": "上",
                    "down": "下"
                },
                "ack4Obj": 19,
                "flags": 76,
                "dpt": "1.008",
                "name": "上/下 状态",
                "valueType": "string",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 20,
                "funId": "Curtain"
            },
            {
                "valueDefs": {
                    "start": "启动",
                    "stop": "停止"
                },
                "funId": "Moving",
                "name": "停止",
                "valueKey": "value",
                "valueType": "string",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 21,
                "flags": 148,
                "dpt": "1.010",
                "createdRT": "bh.r.movement:StartStop"
            },
            {
                "chId": 4,
                "valueKey": "value",
                "valueType": "string",
                "name": "停止 状态",
                "flags": 76,
                "dpt": "1.010",
                "createdRT": "bh.r.movement:StartStop",
                "valueDefs": {
                    "start": "启动",
                    "stop": "停止"
                },
                "ack4Obj": 21,
                "objId": 22,
                "funId": "Moving",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "百分比",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "valueType": "integer",
                "unit": "%",
                "unitName": "%",
                "objId": 23,
                "funId": "Curtain",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "flags": 148,
                "dpt": "5.001"
            },
            {
                "objId": 24,
                "funId": "Curtain",
                "name": "开启 状态",
                "flags": 76,
                "dpt": "5.001",
                "valueKey": "value",
                "valueType": "integer",
                "unit": "%",
                "unitName": "%",
                "ack4Obj": 23,
                "chId": 4,
                "createdRT": "bh.r.openLevel",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueType": "boolean",
                "appHidden": true,
                "flags": 4,
                "valueKey": "value",
                "name": "心跳",
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "rt": ["bh.r.attr.event"],
                "objId": 25,
                "funId": "Heartbeat"
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 4,
            "chCnt": 4
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5cc014de406cc71510082201" },
        "docTag": "00514_Non_Non",
        "deviceType": 514,
        "hwInfo": {
            "model": "Non",
            "class": "S",
            "brand": "Non"
        },
        "icon": "d-21.png",
        "image": "Non_Non.png",
        "name": "窗帘",
        "protocolInfo": [
            {
                "protocol": "KNX",
                "protocolType": "000000"
            },
            {
                "protocol": "MdB",
                "protocolType": "000000"
            }
        ],
        "heartbeat": 30
    },
    {
        "_id": { "$oid": "5cc6a8eaa1d91c4ebef7cb3b" },
        "docTag": "00263_HDL_M-HS05.1-D",
        "deviceType": 263,
        "hwInfo": {
            "class": "S",
            "brand": "HDL",
            "model": "M/HS05.1-D"
        },
        "icon": "d-60.png",
        "image": "HDL_M-HS05.1-D.png",
        "name": "吸顶式移动传感器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "appHidden": true,
                "rt": ["bh.r.attr.event"],
                "funId": "Heartbeat",
                "flags": 4,
                "dpt": "1.006",
                "valueKey": "value",
                "objId": 1,
                "name": "心跳",
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean"
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 2,
                "name": "开关",
                "flags": 76,
                "rt": ["bh.r.attr.ctrl"],
                "funId": "Switch"
            },
            {
                "objId": 3,
                "funId": "Moving",
                "flags": 148,
                "dpt": "1.018",
                "createdRT": "bh.r.occupancy",
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"],
                "name": "从传感器有/无人",
                "valueKey": "value",
                "valueDefs": {
                    "flase": "无人",
                    "true": "有人"
                }
            }
        ],
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5cc6a8eaa1d91c4ebef7cb3f" },
        "docTag": "00263_HDL_M-IS05.1-D",
        "deviceType": 263,
        "hwInfo": {
            "brand": "HDL",
            "model": "M/IS05.1-D",
            "class": "S"
        },
        "icon": "d-60.png",
        "image": "HDL_M-IS05.1-D.png",
        "name": "吸顶式红外传感器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "flags": 4,
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 1,
                "funId": "Heartbeat",
                "name": "心跳",
                "rt": ["bh.r.attr.event"],
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "appHidden": true
            },
            {
                "rt": ["bh.r.attr.ctrl"],
                "objId": 2,
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "funId": "Switch",
                "name": "开关",
                "valueKey": "value"
            },
            {
                "createdRT": "bh.r.occupancy",
                "valueType": "boolean",
                "valueDefs": {
                    "flase": "无人",
                    "true": "有人"
                },
                "rt": ["bh.r.attr.event"],
                "objId": 3,
                "funId": "Moving",
                "flags": 148,
                "dpt": "1.018",
                "name": "从传感器有/无人",
                "valueKey": "value"
            }
        ],
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5cc6a8eaa1d91c4ebef7cb43" },
        "docTag": "00263_HDL_M-US05.1-D",
        "deviceType": 263,
        "hwInfo": {
            "model": "M/US05.1-D",
            "class": "S",
            "brand": "HDL"
        },
        "icon": "d-60.png",
        "image": "HDL_M-US05.1-D.png",
        "name": "吸顶式超声波传感器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "funId": "Heartbeat",
                "flags": 4,
                "rt": ["bh.r.attr.event"],
                "valueKey": "value",
                "valueType": "boolean",
                "appHidden": true,
                "objId": 1,
                "name": "心跳",
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat"
            },
            {
                "valueKey": "value",
                "rt": ["bh.r.attr.ctrl"],
                "name": "开关",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 2,
                "funId": "Switch"
            },
            {
                "funId": "Moving",
                "flags": 148,
                "dpt": "1.018",
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"],
                "objId": 3,
                "name": "从传感器有/无人",
                "createdRT": "bh.r.occupancy",
                "valueKey": "value",
                "valueDefs": {
                    "true": "有人",
                    "flase": "无人"
                }
            }
        ],
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5cc6a8eaa1d91c4ebef7cb4b" },
        "docTag": "00264_HDL_M-PT1RA.1",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "HDL",
            "model": "M/PT1RA.1"
        },
        "icon": "d-71.png",
        "image": "HDL_M-PT1RA.1.png",
        "name": "方悦/单开单控面板",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "page": 1,
                "dpt": "1.001",
                "valueType": "boolean",
                "bIdx": 1,
                "btn": 1,
                "objId": 1,
                "createdRT": "oic.r.switch.binary",
                "style": 1,
                "hidden": false,
                "funId": "Switch",
                "lpress": false,
                "name": "短按",
                "flags": 212,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"]
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "funId": "Switch",
                "bIdx": 1,
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "lpress": false,
                "hidden": false,
                "page": 1,
                "name": "长按",
                "flags": 212,
                "dpt": "1.001",
                "objId": 2,
                "btn": 1,
                "style": 1
            },
            {
                "funId": "Heartbeat",
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "valueKey": "value",
                "appHidden": true,
                "rt": ["bh.r.attr.event"],
                "objId": 3,
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "page": 1
            }
        ],
        "switch": {
            "layout": "vertical",
            "btnCnt": 2,
            "pageCount": 1,
            "modifyStyle": true,
            "hasLPress": true
        },
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5cc6a8eaa1d91c4ebef7cb4f" },
        "docTag": "00264_HDL_M-PT1RB.1",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "HDL",
            "model": "M/PT1RB.1"
        },
        "icon": "d-71.png",
        "image": "HDL_M-PT1RB.1.png",
        "name": "方悦/单开双控面板",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "name": "上按键短按",
                "flags": 212,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "hidden": false,
                "createdRT": "oic.r.switch.binary",
                "lpress": false,
                "valueKey": "value",
                "btn": 1,
                "objId": 1,
                "page": 1,
                "funId": "Switch",
                "bIdx": 1
            },
            {
                "page": 1,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "lpress": true,
                "hidden": false,
                "objId": 2,
                "valueKey": "value",
                "btn": 1,
                "name": "上按键长按",
                "flags": 212,
                "valueType": "boolean",
                "bIdx": 1
            },
            {
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "objId": 3,
                "btn": 2,
                "lpress": false,
                "hidden": false,
                "name": "下按键短按",
                "flags": 212,
                "dpt": "1.001",
                "bIdx": 2,
                "page": 1,
                "valueKey": "value",
                "valueType": "boolean",
                "style": 0
            },
            {
                "createdRT": "oic.r.switch.binary",
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "btn": 2,
                "hidden": false,
                "objId": 4,
                "funId": "Switch",
                "flags": 212,
                "valueKey": "value",
                "bIdx": 2,
                "style": 0,
                "page": 1,
                "name": "下按键长按",
                "lpress": true
            },
            {
                "valueKey": "value",
                "appHidden": true,
                "funId": "Heartbeat",
                "flags": 4,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "rt": ["bh.r.attr.event"],
                "objId": 5,
                "page": 1,
                "name": "心跳",
                "valueType": "boolean"
            }
        ],
        "switch": {
            "layout": "vertical",
            "btnCnt": 2,
            "pageCount": 1,
            "modifyStyle": false,
            "hasLPress": true
        },
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5cc6a8eaa1d91c4ebef7cb53" },
        "docTag": "00264_HDL_M-PT2RA.1",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "HDL",
            "model": "M/PT2RA.1"
        },
        "icon": "d-71.png",
        "image": "HDL_M-PT2RA.1.png",
        "name": "方悦/双开双控面板",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "page": 1,
                "name": "按键1短按",
                "flags": 212,
                "bIdx": 1,
                "lpress": false,
                "objId": 1,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "btn": 1,
                "style": 1,
                "hidden": false
            },
            {
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "bIdx": 1,
                "btn": 1,
                "lpress": true,
                "name": "按键1长按",
                "hidden": false,
                "objId": 2,
                "funId": "Switch",
                "flags": 212,
                "dpt": "1.001",
                "page": 1,
                "valueKey": "value",
                "valueType": "boolean",
                "style": 1
            },
            {
                "page": 1,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "btn": 2,
                "style": 1,
                "dpt": "1.001",
                "objId": 3,
                "createdRT": "oic.r.switch.binary",
                "lpress": false,
                "hidden": false,
                "funId": "Switch",
                "name": "按键2短按",
                "flags": 212,
                "valueType": "boolean",
                "bIdx": 3
            },
            {
                "style": 1,
                "objId": 4,
                "page": 1,
                "name": "按键2长按",
                "flags": 212,
                "funId": "Switch",
                "valueKey": "value",
                "bIdx": 3,
                "hidden": false,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "lpress": true,
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "btn": 2
            },
            {
                "rt": ["bh.r.attr.event"],
                "funId": "Heartbeat",
                "valueType": "boolean",
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "appHidden": true,
                "objId": 5,
                "page": 1
            }
        ],
        "switch": {
            "modifyStyle": true,
            "hasLPress": true,
            "layout": "vertical",
            "btnCnt": 4,
            "pageCount": 1
        },
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5cc6a942a1d91c4ebef7cbb7" },
        "docTag": "00264_HDL_M-PT2RB.1",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "HDL",
            "model": "M/PT2RB.1"
        },
        "icon": "d-71.png",
        "image": "HDL_M-PT2RB.1.png",
        "name": "方悦/双开四控面板",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "btn": 1,
                "objId": 1,
                "page": 1,
                "bIdx": 1,
                "style": 0,
                "lpress": false,
                "funId": "Switch",
                "flags": 212,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "hidden": false,
                "name": "按键1短按",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "objId": 2,
                "page": 1,
                "funId": "Switch",
                "name": "按键1长按",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "btn": 1,
                "lpress": true,
                "hidden": false,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "bIdx": 1,
                "flags": 212,
                "valueKey": "value",
                "style": 0
            },
            {
                "funId": "Switch",
                "bIdx": 2,
                "btn": 2,
                "style": 0,
                "hidden": false,
                "objId": 3,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "page": 1,
                "name": "按键2短按",
                "flags": 212,
                "valueType": "boolean",
                "lpress": false
            },
            {
                "objId": 4,
                "page": 1,
                "name": "按键2长按",
                "valueKey": "value",
                "valueType": "boolean",
                "style": 0,
                "lpress": true,
                "flags": 212,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "hidden": false,
                "btn": 2,
                "funId": "Switch",
                "rt": ["bh.r.attr.button"],
                "bIdx": 2
            },
            {
                "objId": 5,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "btn": 3,
                "page": 1,
                "name": "按键3短按",
                "lpress": false,
                "hidden": false,
                "funId": "Switch",
                "valueKey": "value",
                "flags": 212,
                "rt": ["bh.r.attr.button"],
                "bIdx": 3,
                "style": 0
            },
            {
                "hidden": false,
                "page": 1,
                "createdRT": "oic.r.switch.binary",
                "bIdx": 3,
                "btn": 3,
                "lpress": true,
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "objId": 6,
                "name": "按键3长按",
                "flags": 212
            },
            {
                "style": 0,
                "hidden": false,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "name": "按键4短按",
                "flags": 212,
                "bIdx": 4,
                "page": 1,
                "lpress": false,
                "valueKey": "value",
                "btn": 4,
                "objId": 7,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "objId": 8,
                "funId": "Switch",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "btn": 4,
                "style": 0,
                "hidden": false,
                "page": 1,
                "flags": 212,
                "dpt": "1.001",
                "bIdx": 4,
                "name": "按键4长按",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "lpress": true
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"],
                "funId": "Heartbeat",
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "objId": 9,
                "page": 1,
                "appHidden": true
            }
        ],
        "switch": {
            "layout": "vertical",
            "btnCnt": 4,
            "pageCount": 1,
            "modifyStyle": true,
            "hasLPress": true
        },
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5cc6a942a1d91c4ebef7cbc5" },
        "docTag": "00768_Non_Non",
        "deviceType": 768,
        "hwInfo": {
            "class": "S",
            "brand": "Non",
            "model": "Non"
        },
        "icon": "d-31.png",
        "image": "Non_Non.png",
        "name": "空调",
        "protocolInfo": [
            {
                "protocol": "KNX",
                "protocolType": "000000"
            },
            {
                "protocol": "MdB",
                "protocolType": "000000"
            }
        ],
        "heartbeat": 30,
        "period": 60
    },
    {
        "_id": { "$oid": "5cc6ca0da1d91c4ebef7e57f" },
        "docTag": "00264_HDL_M-PT4RA.1",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "HDL",
            "model": "M/PT4RA.1"
        },
        "icon": "d-71.png",
        "image": "HDL_M-PT4RA.1.png",
        "name": "方悦/四开四控面板面板",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "dpt": "1.001",
                "objId": 1,
                "page": 1,
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "lpress": false,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "bIdx": 1,
                "style": 1,
                "name": "按键1短按",
                "flags": 212,
                "btn": 1,
                "hidden": false
            },
            {
                "btn": 1,
                "page": 1,
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "valueKey": "value",
                "flags": 212,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "hidden": false,
                "objId": 2,
                "name": "按键1长按",
                "bIdx": 1,
                "funId": "Switch",
                "style": 1,
                "lpress": true
            },
            {
                "flags": 212,
                "objId": 3,
                "page": 1,
                "funId": "Switch",
                "valueType": "boolean",
                "hidden": false,
                "lpress": false,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "bIdx": 3,
                "btn": 2,
                "style": 1,
                "name": "按键2短按",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "hidden": false,
                "valueKey": "value",
                "bIdx": 3,
                "btn": 2,
                "lpress": true,
                "objId": 4,
                "page": 1,
                "funId": "Switch",
                "style": 1,
                "dpt": "1.001",
                "valueType": "boolean",
                "name": "按键2长按",
                "flags": 212,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"]
            },
            {
                "dpt": "1.008",
                "createdRT": "bh.r.movement:UpDown",
                "valueKey": "value",
                "valueType": "string",
                "valueDefs": {
                    "up": "上",
                    "down": "下"
                },
                "lpress": false,
                "funId": "Curtain",
                "rt": ["bh.r.attr.button"],
                "objId": 5,
                "flags": 212,
                "bIdx": 5,
                "name": "按键3 上/下",
                "btn": 3,
                "style": 1,
                "hidden": false,
                "page": 1
            },
            {
                "lpress": true,
                "page": 1,
                "flags": 212,
                "valueKey": "value",
                "valueType": "string",
                "name": "按键3长按 停止/启动",
                "valueDefs": {
                    "start": "启动",
                    "stop": "停止"
                },
                "btn": 3,
                "objId": 6,
                "style": 1,
                "bIdx": 5,
                "hidden": false,
                "funId": "Curtain",
                "dpt": "1.010",
                "createdRT": "bh.r.movement:StartStop",
                "rt": ["bh.r.attr.button"]
            },
            {
                "page": 1,
                "valueDefs": {
                    "up": "上",
                    "down": "下"
                },
                "rt": ["bh.r.attr.button"],
                "bIdx": 7,
                "createdRT": "bh.r.movement:UpDown",
                "style": 1,
                "objId": 7,
                "funId": "Curtain",
                "name": "按键4 上/下",
                "dpt": "1.008",
                "hidden": false,
                "flags": 212,
                "valueKey": "value",
                "valueType": "string",
                "btn": 4,
                "lpress": false
            },
            {
                "valueType": "string",
                "valueDefs": {
                    "start": "启动",
                    "stop": "停止"
                },
                "lpress": true,
                "rt": ["bh.r.attr.button"],
                "btn": 4,
                "funId": "Curtain",
                "flags": 212,
                "style": 1,
                "hidden": false,
                "objId": 8,
                "page": 1,
                "name": "按键4长按 停止/启动",
                "dpt": "1.010",
                "createdRT": "bh.r.movement:StartStop",
                "valueKey": "value",
                "bIdx": 7
            },
            {
                "rt": ["bh.r.attr.event"],
                "page": 1,
                "funId": "Heartbeat",
                "flags": 4,
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "objId": 9,
                "name": "心跳",
                "dpt": "1.006",
                "valueType": "boolean",
                "appHidden": true
            }
        ],
        "switch": {
            "layout": "matrix",
            "btnCnt": 8,
            "pageCount": 1,
            "modifyStyle": true,
            "hasLPress": true
        },
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5ccbc6faa1d91c4ebefaaec7" },
        "docTag": "00264_CJH_SWB11RS0",
        "deviceType": 264,
        "hwInfo": {
            "model": "SWB11RS0",
            "class": "S",
            "brand": "中国金茂"
        },
        "icon": "d-71.png",
        "image": "CJH_SWB11RS0.png",
        "name": "RS485开关面板",
        "protocolInfo": [
            {
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "fp": 1,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "btn": 1,
                "objId": 1,
                "name": "按键1",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "lpress": false,
                "funId": "Switch",
                "valueType": "boolean",
                "dpt": "1.001",
                "bIdx": 1,
                "page": 1,
                "flags": 76
            },
            {
                "createdRT": "oic.r.switch.binary",
                "page": 1,
                "funId": "Switch",
                "bIdx": 2,
                "lpress": false,
                "name": "按键2",
                "valueKey": "value",
                "dpt": "1.001",
                "rt": ["bh.r.attr.button"],
                "objId": 2,
                "flags": 76,
                "btn": 2,
                "style": 0,
                "fp": 2,
                "valueType": "boolean"
            },
            {
                "flags": 156,
                "valueKey": "value",
                "valueType": "boolean",
                "fp": 5,
                "page": 1,
                "funId": "Switch",
                "name": "LED1",
                "appHidden": true,
                "objId": 3,
                "dpt": "1.001",
                "createdRT": "bh.r.value.bool:1",
                "rt": ["bh.r.attr.sensor"]
            },
            {
                "page": 1,
                "name": "LED2",
                "valueKey": "value",
                "objId": 4,
                "funId": "Switch",
                "flags": 156,
                "dpt": "1.001",
                "createdRT": "bh.r.value.bool:2",
                "valueType": "boolean",
                "rt": ["bh.r.attr.sensor"],
                "appHidden": true,
                "fp": 6
            }
        ],
        "switch": {
            "hasLPress": false,
            "layout": "matrix",
            "btnCnt": 2,
            "pageCount": 1,
            "modifyStyle": true
        },
        "RS485": {
            "phyConf": {
                "sBit": 1,
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 0
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": false
            }
        }
    },
    {
        "_id": { "$oid": "5ccbca13a1d91c4ebefab100" },
        "docTag": "60930_AD_ADH-L4-C",
        "comPorts": {
            "portCnt": 2
        },
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "AdvancedDevices",
            "model": "ADH-L4-C"
        },
        "icon": "c-2.png",
        "image": "AD_ADH-L4-C.png",
        "name": "RS485回路控制器",
        "protocolInfo": [
            {
                "protocol": "MdB",
                "protocolType": "000100"
            },
            {
                "protocol": "EnO",
                "protocolType": "0"
            }
        ],
        "attrs": [
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 220,
                "valueKey": "value",
                "chId": 1,
                "objId": 1,
                "fp": 1,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "开关",
                "flags": 220,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 2,
                "objId": 2,
                "fp": 2,
                "funId": "Switch",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 3,
                "fp": 3,
                "name": "开关",
                "flags": 220
            },
            {
                "fp": 4,
                "name": "开关",
                "flags": 220,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 4,
                "dpt": "1.001",
                "valueType": "boolean",
                "funId": "Switch"
            }
        ],
        "RS485": {
            "maxCh": 4,
            "chCnt": 4,
            "phyConf": {
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 0,
                "sBit": 1
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": false
            }
        }
    },
    {
        "_id": { "$oid": "5ccc32baa1d91c4ebefaeaa3" },
        "docTag": "60929_CJH_DP16RB0",
        "comPorts": {
            "portCnt": 0
        },
        "deviceType": 60929,
        "hwInfo": {
            "model": "DP16RB0",
            "class": "A",
            "brand": "中国金茂"
        },
        "icon": "d-66.png",
        "image": "CJH_DP16RB0.png",
        "name": "旋转型露点温控器",
        "protocolInfo": [
            {
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:current",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "range": [-40, 40],
                "chId": 1,
                "funId": "Temperature",
                "name": "当前温度",
                "flags": 76,
                "valueType": "integer",
                "step": 1,
                "objId": 1,
                "fp": 1,
                "valueKey": "value"
            },
            {
                "createdRT": "bh.r.humidity:current",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "chId": 1,
                "objId": 2,
                "fp": 2,
                "flags": 76,
                "dpt": "9.007",
                "valueKey": "value",
                "valueType": "integer",
                "range": [0, 100],
                "step": 1,
                "funId": "Humidity",
                "name": "当前湿度"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "range": [16, 28],
                "objId": 3,
                "fp": 3,
                "funId": "Temperature",
                "dpt": "9.001",
                "valueKey": "value",
                "valueType": "integer",
                "name": "设置温度",
                "flags": 220,
                "createdRT": "bh.r.temperature:setpoint",
                "step": 1,
                "chId": 1
            },
            {
                "objId": 4,
                "funId": "Switch",
                "dpt": "1.001",
                "valueType": "boolean",
                "chId": 1,
                "fp": 4,
                "name": "开关机信息",
                "flags": 220,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "createdRT": "bh.r.value.UChar:1",
                "value": 0,
                "objId": 5,
                "fp": 5,
                "name": "设备地址",
                "funId": "Value",
                "flags": 12,
                "valueKey": "value",
                "valueType": "integer",
                "valueStyle": {
                    "style": "Label"
                },
                "dpt": "1.002",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "appHidden": true
            },
            {
                "funId": "HVAC",
                "flags": 220,
                "valueType": "integer",
                "valueDefs": {
                    "2": "夏季模式",
                    "1": "冬季模式"
                },
                "chId": 1,
                "fp": 6,
                "name": "季节模式",
                "dpt": "20.102",
                "createdRT": "bh.r.hvac.ctrlMode",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 6
            },
            {
                "chId": 1,
                "objId": 7,
                "fp": 7,
                "dpt": "20.102",
                "valueType": "integer",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "appHidden": true,
                "funId": "HVAC",
                "name": "通讯协议",
                "flags": 12,
                "createdRT": "bh.r.value.UChar:2"
            },
            {
                "objId": 8,
                "funId": "Temperature",
                "createdRT": "bh.r.temperature:1",
                "valueKey": "value",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "chId": 1,
                "appHidden": true,
                "name": "露点浮动",
                "flags": 156,
                "dpt": "9.001",
                "valueType": "integer",
                "range": [-40, 40],
                "step": 1,
                "fp": 8
            },
            {
                "name": "冷表面温度",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "range": [-40, 40],
                "step": 1,
                "fp": 8,
                "funId": "Temperature",
                "flags": 156,
                "valueKey": "value",
                "chId": 1,
                "dpt": "9.001",
                "valueType": "integer",
                "appHidden": true,
                "objId": 8,
                "createdRT": "bh.r.temperature:2"
            }
        ],
        "RS485": {
            "chCnt": 1,
            "phyConf": {
                "ptyBit": 0,
                "sBit": 1,
                "bRate": 9600,
                "dBit": 8
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": false
            }
        },
        "commInfo": {
            "protocol4GW": "MdB"
        },
        "period": 60
    },
    {
        "_id": { "$oid": "5ceb7841a1d91c4ebe187ad8" },
        "docTag": "60930_HDL_M-DA06.10.1",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "HDL",
            "model": "M/DA06.10.1"
        },
        "icon": "c-2.png",
        "image": "HDL_M-DA06.10.1.png",
        "name": "调光器6路0-10V",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "valueType": "boolean",
                "chId": 1,
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 1,
                "name": "开/关",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "objId": 2,
                "funId": "Switch",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "name": "开/关 状态",
                "dpt": "1.001",
                "valueType": "boolean",
                "ack4Obj": 1,
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "funId": "Switch",
                "name": "开/关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 3,
                "chId": 2,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 4,
                "name": "开/关 状态",
                "valueKey": "value",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 3,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001"
            },
            {
                "objId": 5,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "funId": "Switch",
                "name": "开/关",
                "flags": 148,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "objId": 6,
                "flags": 76,
                "dpt": "1.001",
                "ack4Obj": 5,
                "valueType": "boolean",
                "chId": 3,
                "funId": "Switch",
                "name": "开/关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "chId": 4,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean",
                "objId": 7,
                "funId": "Switch",
                "name": "开/关"
            },
            {
                "valueType": "boolean",
                "ack4Obj": 7,
                "rt": ["bh.r.attr.actuator"],
                "name": "开/关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "objId": 8,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "chId": 4
            },
            {
                "objId": 9,
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "funId": "Switch",
                "name": "开/关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "objId": 10,
                "name": "开/关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 9
            },
            {
                "name": "开/关",
                "flags": 148,
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 6,
                "objId": 11,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "objId": 12,
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "funId": "Switch",
                "name": "开/关 状态",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 11
            },
            {
                "flags": 148,
                "dpt": "3.007",
                "rt": ["bh.r.attr.actuator"],
                "valueKey": "value",
                "chId": 1,
                "objId": 13,
                "funId": "Dimming",
                "valueType": "integer",
                "name": "调光",
                "createdRT": "bh.r.dimming"
            },
            {
                "flags": 148,
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "name": "调光",
                "funId": "Dimming",
                "dpt": "3.007",
                "createdRT": "bh.r.dimming",
                "chId": 2,
                "objId": 14
            },
            {
                "valueKey": "value",
                "valueType": "integer",
                "funId": "Dimming",
                "name": "调光",
                "flags": 148,
                "dpt": "3.007",
                "objId": 15,
                "createdRT": "bh.r.dimming",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3
            },
            {
                "chId": 4,
                "objId": 16,
                "funId": "Dimming",
                "flags": 148,
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "name": "调光",
                "dpt": "3.007",
                "createdRT": "bh.r.dimming"
            },
            {
                "valueType": "integer",
                "chId": 5,
                "funId": "Dimming",
                "name": "调光",
                "flags": 148,
                "dpt": "3.007",
                "objId": 17,
                "createdRT": "bh.r.dimming",
                "rt": ["bh.r.attr.actuator"],
                "valueKey": "value"
            },
            {
                "flags": 148,
                "valueType": "integer",
                "objId": 18,
                "name": "调光",
                "createdRT": "bh.r.dimming",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "funId": "Dimming",
                "dpt": "3.007"
            },
            {
                "objId": 19,
                "funId": "Dimming",
                "dpt": "5.001",
                "valueType": "integer",
                "unit": "%",
                "unitName": "%",
                "rt": ["bh.r.attr.actuator"],
                "name": "亮度状态",
                "flags": 76,
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "chId": 1
            },
            {
                "valueKey": "value",
                "chId": 2,
                "objId": 20,
                "name": "亮度状态",
                "flags": 76,
                "dpt": "5.001",
                "createdRT": "bh.r.openLevel",
                "valueType": "integer",
                "unit": "%",
                "unitName": "%",
                "funId": "Dimming",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 21,
                "createdRT": "bh.r.openLevel",
                "chId": 3,
                "funId": "Dimming",
                "name": "亮度状态",
                "flags": 76,
                "dpt": "5.001",
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "亮度状态",
                "flags": 76,
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 22,
                "dpt": "5.001",
                "unit": "%",
                "unitName": "%",
                "funId": "Dimming"
            },
            {
                "name": "亮度状态",
                "dpt": "5.001",
                "valueKey": "value",
                "unit": "%",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "objId": 23,
                "funId": "Dimming",
                "flags": 76,
                "createdRT": "bh.r.openLevel",
                "valueType": "integer",
                "unitName": "%"
            },
            {
                "unitName": "%",
                "objId": 24,
                "funId": "Dimming",
                "unit": "%",
                "createdRT": "bh.r.openLevel",
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "name": "亮度状态",
                "flags": 76,
                "dpt": "5.001"
            }
        ],
        "KNX": {
            "maxCh": 6,
            "chCnt": 6
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5ced043aba3538468567027f" },
        "docTag": "60929_CJH_DP13RB0",
        "comPorts": {
            "portCnt": 0
        },
        "deviceType": 60929,
        "hwInfo": {
            "class": "A",
            "brand": "中国金茂",
            "model": "DP13RB0"
        },
        "icon": "d-66.png",
        "image": "CJH_DP13RB0.png",
        "name": "露点温控器（三合一）",
        "protocolInfo": [
            {
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "funId": "Value",
                "name": "版本号",
                "flags": 8,
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "appHidden": true,
                "objId": 1,
                "fp": 1,
                "dpt": "1.001",
                "createdRT": "bh.r.value.UShort:1"
            },
            {
                "funId": "Value",
                "createdRT": "bh.r.value.bool:1",
                "chId": 1,
                "valueKey": "value",
                "value": true,
                "appHidden": true,
                "objId": 2,
                "flags": 156,
                "dpt": "1.002",
                "valueType": "boolean",
                "valueDefs": {
                    "false": "上电时关机",
                    "true": "上电恢复上次状态"
                },
                "fp": 2,
                "name": "上电恢复",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 1
                },
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueDefs": {
                    "false": "解锁设备地址",
                    "true": "锁定设备地址"
                },
                "rt": ["bh.r.attr.actuator"],
                "value": false,
                "name": "地址远程锁定",
                "createdRT": "bh.r.value.bool:2",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "funId": "Value",
                "valueType": "boolean",
                "appHidden": true,
                "objId": 3,
                "valueKey": "value",
                "chId": 1,
                "fp": 3,
                "flags": 156,
                "dpt": "1.002"
            },
            {
                "valueStyle": {
                    "style": "Label"
                },
                "rt": ["bh.r.attr.actuator"],
                "dpt": "1.002",
                "valueType": "integer",
                "funId": "Value",
                "name": "地址设定",
                "flags": 12,
                "createdRT": "bh.r.value.UChar:1",
                "appHidden": true,
                "objId": 4,
                "fp": 4,
                "chId": 1,
                "valueKey": "value",
                "value": 0
            },
            {
                "appHidden": true,
                "objId": 5,
                "name": "面板波特率设置锁定",
                "dpt": "1.002",
                "valueStyle": {
                    "style": "Label"
                },
                "valueDefs": {
                    "true": "通讯波特率9600",
                    "false": "通讯波特率4800"
                },
                "funId": "Value",
                "createdRT": "bh.r.value.bool:3",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "value": true,
                "fp": 5,
                "flags": 12,
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "flags": 220,
                "valueKey": "value",
                "funId": "Switch",
                "name": "开关机",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 6,
                "fp": 6
            },
            {
                "fp": 7,
                "funId": "HVAC",
                "createdRT": "bh.r.hvac.ctrlMode",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 7,
                "name": "工作模式",
                "flags": 220,
                "dpt": "20.102",
                "valueKey": "value",
                "valueDefs": {
                    "2": "通风",
                    "0": "制冷",
                    "1": "制热"
                }
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "appHidden": true,
                "objId": 8,
                "dpt": "5.010",
                "createdRT": "bh.r.value.UChar:2",
                "valueKey": "value",
                "valueStyle": {
                    "style": "Label"
                },
                "funId": "Value",
                "name": "连网状态",
                "chId": 1,
                "fp": 8,
                "flags": 12,
                "valueType": "integer",
                "valueDefs": {
                    "1": "连网",
                    "2": "连接云端",
                    "0": "未连网"
                },
                "value": 0
            },
            {
                "objId": 9,
                "fp": 9,
                "flags": 220,
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:setpoint",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "range": [5, 35],
                "step": 1,
                "chId": 1,
                "funId": "Temperature",
                "name": "温度设定",
                "valueType": "integer"
            },
            {
                "flags": 156,
                "createdRT": "bh.r.temperature:1",
                "funId": "Value",
                "name": "温度带宽设定",
                "rt": ["bh.r.attr.actuator"],
                "fp": 10,
                "range": [0, 5],
                "appHidden": true,
                "dpt": "14.068",
                "valueKey": "value",
                "valueType": "number",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0.5
                },
                "value": 0.5,
                "step": 1,
                "chId": 1,
                "objId": 10
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "step": 1,
                "chId": 1,
                "objId": 11,
                "funId": "Humidity",
                "dpt": "9.007",
                "valueType": "integer",
                "valueKey": "value",
                "range": [20, 70],
                "fp": 11,
                "name": "湿度设定",
                "flags": 220,
                "createdRT": "bh.r.humidity:setpoint"
            },
            {
                "objId": 12,
                "fp": 12,
                "valueKey": "value",
                "step": 1,
                "chId": 1,
                "name": "湿度带宽设定",
                "dpt": "9.001",
                "createdRT": "bh.r.humidity:1",
                "valueType": "integer",
                "range": [5, 20],
                "appHidden": true,
                "funId": "Value",
                "flags": 156,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "flags": 156,
                "range": [15, 25],
                "step": 1,
                "fp": 13,
                "dpt": "9.001",
                "valueKey": "value",
                "appHidden": true,
                "funId": "Temperature",
                "name": "露点保护值设定",
                "createdRT": "bh.r.temperature:2",
                "objId": 13,
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "appHidden": true,
                "valueType": "integer",
                "value": 3,
                "step": 1,
                "chId": 1,
                "dpt": "9.001",
                "flags": 156,
                "createdRT": "bh.r.temperature:2",
                "valueKey": "value",
                "range": [0, 10],
                "name": "辅助系统开启判断温度",
                "fp": 14,
                "funId": "Temperature",
                "valueStyle": {
                    "style": "InputBox",
                    "units": "°C",
                    "default": 3
                },
                "rt": ["bh.r.attr.actuator"],
                "objId": 14
            },
            {
                "funId": "Value",
                "flags": 156,
                "value": true,
                "appHidden": true,
                "createdRT": "bh.r.value.bool:4",
                "rt": ["bh.r.attr.actuator"],
                "objId": 15,
                "name": "露点判断设定",
                "valueKey": "value",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 1
                },
                "fp": 15,
                "dpt": "1.002",
                "valueType": "boolean",
                "valueDefs": {
                    "false": "不启用露点保护",
                    "true": "启用露点保护"
                },
                "chId": 1
            },
            {
                "fp": 16,
                "dpt": "5.004",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 3
                },
                "rt": ["bh.r.attr.actuator"],
                "name": "是否启动辅助设定",
                "flags": 156,
                "createdRT": "bh.r.value.UChar:3",
                "value": 3,
                "objId": 16,
                "valueKey": "value",
                "valueType": "integer",
                "chId": 1,
                "appHidden": true,
                "funId": "Value",
                "valueDefs": {
                    "0": "不启动辅助",
                    "1": "制冷时启动辅助，制热不启动辅助",
                    "2": "制热时启动辅助，制冷不启动辅助",
                    "3": "启动辅助"
                }
            },
            {
                "objId": 17,
                "fp": 17,
                "flags": 24,
                "valueKey": "value",
                "valueType": "integer",
                "dpt": "5.004",
                "createdRT": "bh.r.value.UChar:4",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "value": 0,
                "valueDefs": {
                    "2": "制冷时阀2为主，阀1辅助，制热阀1为主，阀2为辅助",
                    "0": "阀1为主，阀2为辅助",
                    "1": "制冷时阀1为主，阀2为辅助，制热时阀2为主，阀1为辅助"
                },
                "appHidden": true,
                "funId": "Value",
                "name": "主设备和辅助设备选择",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "flags": 156,
                "appHidden": true,
                "name": "阀门类型",
                "createdRT": "bh.r.value.UChar:5",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "fp": 18,
                "funId": "Value",
                "valueDefs": {
                    "1": "两线阀",
                    "2": "三线阀"
                },
                "value": 1,
                "objId": 18,
                "dpt": "5.004",
                "valueKey": "value",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 1
                }
            },
            {
                "step": 1,
                "chId": 1,
                "valueKey": "value",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "range": [-40, 40],
                "name": "当前温度",
                "flags": 76,
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:current",
                "valueType": "integer",
                "objId": 19,
                "fp": 19,
                "funId": "Temperature"
            },
            {
                "range": [0, 100],
                "step": 1,
                "name": "当前湿度",
                "flags": 76,
                "dpt": "9.007",
                "createdRT": "bh.r.humidity:current",
                "valueKey": "value",
                "valueType": "integer",
                "chId": 1,
                "objId": 20,
                "fp": 20,
                "funId": "Humidity",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"]
            },
            {
                "valueKey": "value",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "range": [-40, 40],
                "step": 1,
                "name": "露点温度",
                "flags": 76,
                "createdRT": "bh.r.temperature:dewpoint",
                "dpt": "9.001",
                "valueType": "integer",
                "chId": 1,
                "objId": 21,
                "fp": 21,
                "funId": "Temperature"
            },
            {
                "objId": 22,
                "fp": 22,
                "funId": "value",
                "name": "阀1运行状态",
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool:5",
                "flags": 76,
                "valueKey": "value",
                "valueType": "boolean",
                "valueDefs": {
                    "false": "关",
                    "true": "开"
                },
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "dpt": "1.002",
                "valueType": "boolean",
                "valueDefs": {
                    "true": "开",
                    "false": "关"
                },
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 23,
                "fp": 23,
                "funId": "value",
                "name": "阀2运行状态",
                "flags": 76,
                "createdRT": "bh.r.value.bool:6",
                "chId": 1
            },
            {
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "objId": 24,
                "name": "故障显示",
                "flags": 76,
                "dpt": "1.002",
                "createdRT": "bh.r.value.UShort:2",
                "chId": 1,
                "fp": 24,
                "funId": "value",
                "valueDefs": {
                    "4": "露点保护报警",
                    "1": "温度传感器故障",
                    "2": "湿度传感器故障"
                }
            }
        ],
        "RS485": {
            "chCnt": 1,
            "phyConf": {
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 0,
                "sBit": 1
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": false
            },
            "maxCh": 1
        },
        "commInfo": {
            "protocol4GW": "MdB"
        },
        "period": 60
    },
    {
        "_id": { "$oid": "5cf7a22af898b6f75c84c69e" },
        "docTag": "60929_KNF_DC22-JG-JMY",
        "comPorts": {
            "portCnt": 0
        },
        "deviceType": 60929,
        "hwInfo": {
            "brand": "okonoff",
            "model": "DC22-JG-JMY",
            "class": "A"
        },
        "icon": "d-66.png",
        "image": "KNF_DC22-JG-JMY.png",
        "name": "露点控制器",
        "protocolInfo": [
            {
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "fp": 1,
                "flags": 8,
                "dpt": "1.001",
                "valueKey": "value",
                "appHidden": true,
                "objId": 1,
                "name": "设备类型",
                "createdRT": "bh.r.value.UShort",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "funId": "Value"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 2,
                "funId": "Switch",
                "flags": 220,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "fp": 2,
                "name": "开关机"
            },
            {
                "name": "工作模式",
                "dpt": "20.102",
                "createdRT": "bh.r.hvac.ctrlMode",
                "valueKey": "value",
                "valueType": "integer",
                "chId": 1,
                "objId": 3,
                "fp": 3,
                "funId": "HVAC",
                "flags": 220,
                "valueDefs": {
                    "2": "通风",
                    "1": "制热"
                },
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "温度设定",
                "flags": 220,
                "rt": ["bh.r.attr.actuator"],
                "step": 1,
                "funId": "Temperature",
                "fp": 5,
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:setpoint",
                "valueKey": "value",
                "valueType": "integer",
                "range": [10, 35],
                "chId": 1,
                "objId": 5
            },
            {
                "dpt": "9.007",
                "valueKey": "value",
                "valueType": "integer",
                "chId": 1,
                "funId": "Humidity",
                "name": "湿度设定",
                "appHidden": true,
                "objId": 6,
                "createdRT": "bh.r.humidity:setpoint",
                "rt": ["bh.r.attr.actuator"],
                "fp": 6,
                "flags": 156,
                "range": [25, 95],
                "step": 1
            },
            {
                "valueType": "number",
                "rt": ["bh.r.attr.actuator"],
                "createdRT": "bh.r.temperature:1",
                "appHidden": true,
                "objId": 7,
                "fp": 7,
                "funId": "Value",
                "name": "温度带宽设定",
                "flags": 156,
                "dpt": "14.068",
                "value": 1,
                "range": [0, 3],
                "valueKey": "value",
                "valueStyle": {
                    "style": "InputBox",
                    "units": "°C",
                    "default": 1
                },
                "step": 1,
                "chId": 1
            },
            {
                "fp": 8,
                "funId": "Value",
                "flags": 156,
                "chId": 1,
                "appHidden": true,
                "objId": 8,
                "valueDefs": {
                    "true": "记忆",
                    "false": "不记忆"
                },
                "rt": ["bh.r.attr.actuator"],
                "valueKey": "value",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "name": "掉电记忆",
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool:1",
                "valueType": "boolean",
                "value": false
            },
            {
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "valueDefs": {
                    "false": "不锁",
                    "true": "锁"
                },
                "fp": 9,
                "name": "键盘全锁",
                "value": false,
                "chId": 1,
                "appHidden": true,
                "funId": "Value",
                "flags": 156,
                "createdRT": "bh.r.value.bool:2",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 9,
                "dpt": "1.002"
            },
            {
                "name": "单锁 模式键",
                "valueDefs": {
                    "false": "不锁",
                    "true": "锁"
                },
                "appHidden": true,
                "objId": 10,
                "funId": "Value",
                "rt": ["bh.r.attr.actuator"],
                "value": false,
                "flags": 156,
                "valueKey": "value",
                "fp": 10,
                "dpt": "1.002",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "chId": 1,
                "createdRT": "bh.r.value.bool:3",
                "valueType": "boolean"
            },
            {
                "valueStyle": {
                    "default": 0,
                    "style": "InputBox"
                },
                "rt": ["bh.r.attr.actuator"],
                "objId": 11,
                "fp": 11,
                "createdRT": "bh.r.value.bool:4",
                "valueKey": "value",
                "appHidden": true,
                "funId": "Value",
                "flags": 156,
                "chId": 1,
                "name": "单锁 + 键",
                "valueType": "Boolean",
                "value": false,
                "dpt": "1.002",
                "valueDefs": {
                    "true": "锁",
                    "false": "不锁"
                }
            },
            {
                "name": "单锁 水滴键",
                "createdRT": "bh.r.value.bool:5",
                "valueDefs": {
                    "false": "不锁",
                    "boolean": "锁"
                },
                "chId": 1,
                "flags": 156,
                "dpt": "1.002",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "objId": 12,
                "fp": 12,
                "funId": "Value",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "value": false,
                "appHidden": true
            },
            {
                "fp": 13,
                "dpt": "1.002",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "rt": ["bh.r.attr.actuator"],
                "value": false,
                "objId": 13,
                "name": "单锁 - 键",
                "valueDefs": {
                    "false": "不锁",
                    "true": "锁"
                },
                "appHidden": true,
                "flags": 156,
                "createdRT": "bh.r.value.bool:6",
                "valueKey": "value",
                "funId": "Value",
                "valueType": "boolean",
                "chId": 1
            },
            {
                "fp": 14,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "appHidden": true,
                "objId": 14,
                "valueDefs": {
                    "true": "锁",
                    "false": "不锁"
                },
                "name": "单锁 开关机键",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "flags": 156,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool:7",
                "value": false,
                "chId": 1,
                "funId": "Value"
            },
            {
                "valueType": "boolean",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "value": false,
                "chId": false,
                "appHidden": true,
                "fp": 15,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool:8",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "valueDefs": {
                    "false": "不锁",
                    "true": "锁"
                },
                "objId": 15,
                "funId": "Value",
                "name": "单锁 通信地址锁",
                "flags": 156
            },
            {
                "name": "露点保护提前量",
                "dpt": "14.068",
                "createdRT": "bh.r.temperature:2",
                "valueType": "number",
                "chId": 1,
                "objId": 16,
                "flags": 156,
                "valueKey": "value",
                "valueStyle": {
                    "default": 1,
                    "style": "InputBox",
                    "units": "°C"
                },
                "rt": ["bh.r.attr.actuator"],
                "value": 1,
                "funId": "Value",
                "step": 1,
                "range": [0, 5],
                "appHidden": true,
                "fp": 16
            },
            {
                "value": 1,
                "valueDefs": {
                    "false": "使用",
                    "true": "不使用"
                },
                "chId": 1,
                "appHidden": true,
                "objId": 17,
                "createdRT": "bh.r.value.bool:9",
                "flags": 156,
                "valueKey": "value",
                "valueType": "boolean",
                "fp": 17,
                "funId": "Value",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "rt": ["bh.r.attr.actuator"],
                "name": "外置传感器是否启用",
                "dpt": "1.002"
            },
            {
                "dpt": "1.002",
                "createdRT": "bh.r.value.boo:10",
                "valueKey": "value",
                "valueDefs": {
                    "false": "关闭",
                    "true": "打开"
                },
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 18,
                "flags": 76,
                "name": "辐射阀",
                "valueType": "boolean",
                "fp": 18,
                "funId": "Value"
            },
            {
                "fp": 19,
                "name": "新风阀",
                "dpt": "1.002",
                "valueKey": "value",
                "valueType": "boolean",
                "valueDefs": {
                    "false": "关闭",
                    "true": "打开"
                },
                "rt": ["bh.r.attr.actuator"],
                "objId": 19,
                "funId": "Value",
                "flags": 76,
                "createdRT": "bh.r.value.bool:10",
                "chId": 1
            },
            {
                "createdRT": "bh.r.temperature:current",
                "valueKey": "value",
                "step": 1,
                "objId": 20,
                "flags": 76,
                "name": "当前温度",
                "dpt": "9.001",
                "valueType": "integer",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "range": [0, 100],
                "chId": 1,
                "fp": 20,
                "funId": "Temperature"
            },
            {
                "objId": 21,
                "name": "当前湿度",
                "dpt": "9.007",
                "valueType": "integer",
                "step": 1,
                "range": [0, 100],
                "chId": 1,
                "fp": 21,
                "funId": "Humidity",
                "flags": 76,
                "createdRT": "bh.r.humidity:current",
                "valueKey": "value",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"]
            },
            {
                "objId": 22,
                "flags": 76,
                "createdRT": "bh.r.temperature:3",
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "fp": 22,
                "funId": "Temperature",
                "name": "NTC传感器测量温度",
                "dpt": "9.001",
                "range": [0, 100],
                "step": 1,
                "chId": 1
            },
            {
                "fp": 23,
                "funId": "Temperature",
                "name": "露点温度",
                "valueKey": "value",
                "valueType": "integer",
                "chId": 1,
                "objId": 23,
                "flags": 76,
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:dewpoint",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "range": [0, 100],
                "step": 1
            },
            {
                "funId": "Value",
                "flags": 12,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool:11",
                "rt": ["bh.r.attr.actuator"],
                "appHidden": true,
                "objId": 24,
                "fp": 24,
                "name": "温湿度出错",
                "valueKey": "value",
                "valueType": "boolean",
                "valueDefs": {
                    "false": "正确",
                    "true": "错误"
                },
                "chId": 1
            },
            {
                "objId": 25,
                "fp": 25,
                "funId": "Value",
                "flags": 12,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool:12",
                "rt": ["bh.r.attr.actuator"],
                "appHidden": true,
                "name": "温度出错",
                "valueKey": "value",
                "valueType": "boolean",
                "valueDefs": {
                    "false": "正确",
                    "true": "错误"
                },
                "chId": 1
            },
            {
                "funId": "Value",
                "chId": 1,
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "name": "通讯地址",
                "flags": 12,
                "dpt": "1.002",
                "createdRT": "bh.r.value.UChar",
                "valueKey": "value",
                "objId": 26,
                "fp": 26,
                "valueStyle": {
                    "style": "Label"
                },
                "value": 0,
                "appHidden": true
            },
            {
                "createdRT": "bh.r.temperature:setpoint.ac",
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "step": 1,
                "dpt": "9.001",
                "range": [10, 35],
                "chId": 1,
                "objId": 27,
                "fp": 27,
                "funId": "Temperature",
                "name": "制冷设定温度",
                "flags": 220
            },
            {
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "range": [10, 35],
                "chId": 1,
                "objId": 28,
                "valueKey": "value",
                "name": "制热设定温度",
                "flags": 220,
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:setpoint.heat",
                "step": 1,
                "fp": 28,
                "funId": "Temperature"
            },
            {
                "funId": "Value",
                "createdRT": "bh.r.value.bool:13",
                "valueKey": "value",
                "chId": 1,
                "objId": 29,
                "name": "节能模式",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "valueType": "boolean",
                "valueDefs": {
                    "true": "启用节能模式",
                    "false": "禁用节能模式"
                },
                "rt": ["bh.r.attr.actuator"],
                "value": false,
                "fp": 29,
                "flags": 220,
                "dpt": "1.002"
            },
            {
                "dpt": "1.002",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "value": false,
                "fp": 30,
                "funId": "Value",
                "name": "防结露保护",
                "flags": 12,
                "valueKey": "value",
                "valueDefs": {
                    "false": "停止防结露保护",
                    "true": "启动防结露保护"
                },
                "objId": 30,
                "valueType": "boolean",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "appHidden": true,
                "createdRT": "bh.r.value.bool:14"
            }
        ],
        "RS485": {
            "mdbConf": {
                "master": false,
                "std": true,
                "RTU": true
            },
            "maxCh": 1,
            "chCnt": 1,
            "phyConf": {
                "bRate": 4800,
                "dBit": 8,
                "ptyBit": 0,
                "sBit": 1
            }
        },
        "commInfo": {
            "protocol4GW": "MdB"
        },
        "period": 60
    },
    {
        "_id": { "$oid": "5cfe0334f898b6f75c881a2c" },
        "docTag": "00788_AD_ADS-CO2-TH",
        "deviceType": 788,
        "hwInfo": {
            "class": "S",
            "brand": "AdvancedDevices",
            "model": "ADS-CO2/TH"
        },
        "icon": "d-60.png",
        "image": "AD_ADS-CO2-TH.png",
        "name": "CO2 三合一传感器",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "A50904"
            }
        ],
        "attrs": [
            {
                "fp": 1,
                "dpt": "9.007",
                "valueType": "integer",
                "range": [10, 95],
                "objId": 1,
                "funId": "Humidity",
                "name": "当前湿度",
                "flags": 76,
                "createdRT": "bh.r.humidity:current",
                "valueKey": "value",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "step": 1
            },
            {
                "objId": 2,
                "funId": "AirQuality",
                "flags": 76,
                "dpt": "9.008",
                "createdRT": "bh.r.airQualities:co2",
                "valueType": "integer",
                "rt": ["bh.r.attr.sensor"],
                "fp": 2,
                "name": "CO2浓度",
                "valueKey": "value"
            },
            {
                "valueType": "integer",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "range": [0, 50],
                "step": 1,
                "name": "当前温度",
                "createdRT": "bh.r.temperature:current",
                "valueKey": "value",
                "flags": 76,
                "dpt": "9.001",
                "objId": 3,
                "fp": 3,
                "funId": "Temperature"
            }
        ],
        "period": 300
    },
    {
        "_id": { "$oid": "5cfe0334f898b6f75c881a30" },
        "docTag": "00788_AD_ADS-PM2.5-TH",
        "deviceType": 788,
        "hwInfo": {
            "model": "ADS-PM2.5/TH",
            "class": "S",
            "brand": "AdvancedDevices"
        },
        "icon": "d-60.png",
        "image": "AD_ADS-PM2.5-TH.png",
        "name": "PM2.5 传感器",
        "protocolInfo": [
            {
                "protocolType": "A50907",
                "protocol": "EnO"
            }
        ],
        "attrs": [
            {
                "funId": "AirQuality",
                "flags": 76,
                "createdRT": "bh.r.airQualities:pm2p5",
                "valueKey": "value",
                "fp": 1,
                "name": "PM2.5浓度",
                "dpt": "9.008",
                "valueType": "integer",
                "rt": ["bh.r.attr.sensor"],
                "objId": 1
            }
        ],
        "period": 300
    },
    {
        "_id": { "$oid": "5d0b08b6f898b6f75c909175" },
        "docTag": "00264_AD_ADS-SWLR2",
        "deviceType": 264,
        "hwInfo": {
            "model": "ADS-SWLR2",
            "class": "S",
            "brand": "AdvancedDevices"
        },
        "icon": "d-71.png",
        "image": "ADS-SWLR2.png",
        "name": "两键跷板照明面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60101"
            }
        ],
        "attrs": [
            {
                "lpress": false,
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "page": 1,
                "fp": 1,
                "rt": ["bh.r.attr.button"],
                "style": 1,
                "funId": "Switch",
                "name": "开关",
                "valueKey": "value",
                "btn": 1,
                "objId": 1,
                "bIdx": 1
            }
        ],
        "switch": {
            "layout": "rockH",
            "btnCnt": 2,
            "isVRB": true,
            "keyValues": [16, 48],
            "VRBCnt": 1,
            "vrtRockButtons": [
                {
                    "on": 16,
                    "off": 48
                }
            ],
            "pageCount": 1
        }
    },
    {
        "_id": { "$oid": "5d0b08b6f898b6f75c909179" },
        "docTag": "00264_AD_ADS-SWLR4",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "AdvancedDevices",
            "model": "ADS-SWLR4"
        },
        "icon": "d-71.png",
        "image": "ADS-SWLR4.png",
        "name": "四键跷板照明面板",
        "protocolInfo": [
            {
                "protocolType": "F60201",
                "protocol": "EnO"
            }
        ],
        "attrs": [
            {
                "flags": 76,
                "name": "右键开关",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "btn": 1,
                "style": 1,
                "lpress": false,
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "objId": 1,
                "page": 1,
                "bIdx": 1,
                "fp": 1
            },
            {
                "dpt": "1.001",
                "valueKey": "value",
                "style": 1,
                "page": 1,
                "name": "左键开关",
                "flags": 76,
                "btn": 2,
                "lpress": false,
                "fp": 2,
                "bIdx": 3,
                "objId": 2,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"]
            }
        ],
        "switch": {
            "modifyStyle": false,
            "hasLPress": false,
            "layout": "rockH",
            "btnCnt": 4,
            "VRBCnt": 2,
            "vrtRockButtons": [
                {
                    "off": 112,
                    "on": 80
                },
                {
                    "on": 16,
                    "off": 48
                }
            ],
            "pageCount": 1,
            "isVRB": true,
            "keyValues": [80, 112, 16, 48]
        }
    },
    {
        "_id": { "$oid": "5d0b08b6f898b6f75c90917d" },
        "docTag": "00264_AD_ADS-SWLS1",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "AdvancedDevices",
            "model": "ADS-SWLS1"
        },
        "icon": "d-71.png",
        "image": "ADS-SWLS1.png",
        "name": "单键复位照明面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60001"
            }
        ],
        "attrs": [
            {
                "btn": 1,
                "objId": 1,
                "name": "开关",
                "flags": 76,
                "valueType": "boolean",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "bIdx": 1,
                "page": 1,
                "fp": 1,
                "funId": "Switch",
                "dpt": "1.001",
                "style": 0,
                "lpress": false
            }
        ],
        "switch": {
            "layout": "horizontal",
            "btnCnt": 1,
            "isVRB": false,
            "keyValues": [16],
            "pageCount": 1
        }
    },
    {
        "_id": { "$oid": "5d0b08b6f898b6f75c909181" },
        "docTag": "00264_AD_ADS-SWLS2",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "AdvancedDevices",
            "model": "ADS-SWLS2"
        },
        "icon": "d-71.png",
        "image": "ADS-SWLS2.png",
        "name": "两键复位照明面板",
        "protocolInfo": [
            {
                "protocol": "EnO",
                "protocolType": "F60102"
            }
        ],
        "attrs": [
            {
                "bIdx": 1,
                "lpress": false,
                "flags": 76,
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "objId": 1,
                "createdRT": "oic.r.switch.binary",
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "btn": 1,
                "page": 1,
                "fp": 1,
                "style": 0
            },
            {
                "dpt": "1.001",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "objId": 2,
                "funId": "Switch",
                "name": "开关",
                "valueType": "boolean",
                "bIdx": 2,
                "page": 1,
                "fp": 2,
                "valueKey": "value",
                "lpress": false,
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "btn": 2
            }
        ],
        "switch": {
            "layout": "horizontal",
            "btnCnt": 2,
            "isVRB": false,
            "keyValues": [16, 48],
            "pageCount": 1
        }
    },
    {
        "_id": { "$oid": "5d135383856db5ac0581f04d" },
        "docTag": "00790_INNO_INNO-RQT04-R4",
        "deviceType": 790,
        "hwInfo": {
            "brand": "INNO",
            "model": "INNO-RQT04-R4",
            "class": "S"
        },
        "icon": "d-133.png",
        "image": "INNO_INNO-RQT04-R4.png",
        "name": "可燃气体探测器",
        "protocolInfo": [
            {
                "protocolType": "000000",
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "valueKey": "value",
                "rt": ["bh.r.attr.event"],
                "funId": "value",
                "createdRT": "bh.r.alarm:gas",
                "name": "报警状态",
                "flags": 76,
                "dpt": "1.005",
                "valueType": "boolean",
                "objId": 1,
                "fp": 1
            }
        ],
        "RS485": {
            "phyConf": {
                "sBit": 1,
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 0
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": false
            }
        }
    },
    {
        "_id": { "$oid": "5d135564856db5ac0581f2a1" },
        "docTag": "01296_ACREL_DDSY1352",
        "deviceType": 1296,
        "hwInfo": {
            "brand": "Acrel",
            "model": "DDSY1352",
            "class": "S"
        },
        "icon": "d-132.png",
        "image": "ACREL_DDSY1352.png",
        "name": "单相预付费电能表",
        "protocolInfo": [
            {
                "protocol": "MdB",
                "protocolType": "000000"
            }
        ],
        "attrs": [
            {
                "funId": "Energy",
                "name": "当前总有功电能",
                "createdRT": "bh.r.energy.powerConsumption",
                "valueKey": "value",
                "unitName": "千瓦·时",
                "step": 0.01,
                "fp": 1,
                "flags": 76,
                "dpt": "13.013",
                "valueType": "number",
                "unit": "kWh",
                "rt": ["bh.r.attr.sensor"],
                "objId": 1
            },
            {
                "name": "电闸控制",
                "valueType": "boolean",
                "rt": ["bh.r.attr.sensor"],
                "valueKey": "value",
                "objId": 2,
                "fp": 2,
                "funId": "Switch",
                "flags": 220,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "funId": "Value",
                "createdRT": "bh.r.value.UChar",
                "rt": ["bh.r.attr.sensor"],
                "appHidden": true,
                "dpt": "5.010",
                "valueKey": "value",
                "valueType": "integer",
                "objId": 3,
                "fp": 3,
                "name": "电表通讯地址",
                "flags": 12
            },
            {
                "createdRT": "bh.r.value.UChar",
                "valueType": "integer",
                "valueStyle": {
                    "style": "Label"
                },
                "rt": ["bh.r.attr.sensor"],
                "appHidden": true,
                "funId": "Value",
                "flags": 12,
                "dpt": "5.010",
                "valueKey": "value",
                "valueDef": {
                    "4": "通讯波特率19200",
                    "5": "通讯波特率38400",
                    "0": "通讯波特率1200",
                    "1": "通讯波特率2400",
                    "2": "通讯波特率4800",
                    "3": "通讯波特率9600"
                },
                "objId": 4,
                "fp": 4,
                "name": "电表通讯波特率"
            }
        ],
        "RS485": {
            "phyConf": {
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 1,
                "sBit": 1
            },
            "mdbConf": {
                "master": false,
                "std": true,
                "RTU": true
            },
            "chCnt": 1
        }
    },
    {
        "_id": { "$oid": "5d197d5f856db5ac058810f3" },
        "docTag": "01297_ZP_CJ188",
        "deviceType": 1297,
        "hwInfo": {
            "class": "S",
            "brand": "Zhonpei Electronic",
            "model": "CJ188"
        },
        "icon": "d-115.png",
        "image": "ZP_CJ188.png",
        "name": "ZP 水表",
        "protocolInfo": [
            {
                "protocolType": "000000",
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "objId": 1,
                "name": "累计流量",
                "valueKey": "value",
                "valueType": "number",
                "step": 0.001,
                "rt": ["bh.r.attr.sensor"],
                "fp": 1,
                "funId": "Value",
                "flags": 76,
                "dpt": "14.076",
                "createdRT": "bh.r.volume:waterConsumption"
            },
            {
                "name": "瞬时流量",
                "flags": 76,
                "createdRT": "bh.r.volume.flux:water",
                "valueType": "number",
                "rt": ["bh.r.attr.sensor"],
                "funId": "Value",
                "fp": 2,
                "dpt": "14.077",
                "valueKey": "value",
                "step": 0.0001,
                "objId": 2
            },
            {
                "createdRT": "bh.r.value.UInt:1",
                "valueKey": "value",
                "fp": 3,
                "funId": "Value",
                "name": "水表地址",
                "valueType": "integer",
                "rt": ["bh.r.attr.value"],
                "appHidden": true,
                "objId": 3,
                "flags": 12,
                "dpt": "12.001"
            },
            {
                "name": "厂商代码",
                "flags": 8,
                "valueKey": "value",
                "objId": 4,
                "fp": 4,
                "funId": "Value",
                "dpt": "12.001",
                "createdRT": "bh.r.value.UInt:2",
                "valueType": "integer",
                "rt": ["bh.r.attr.value"],
                "appHidden": true
            }
        ],
        "RS485": {
            "phyConf": {
                "bRate": 2400,
                "dBit": 8,
                "ptyBit": 1,
                "sBit": 1
            },
            "mdbConf": {
                "RTU": false,
                "master": false,
                "std": false
            }
        },
        "period": 0
    },
    {
        "_id": { "$oid": "5d1c8b4e856db5ac058b5790" },
        "docTag": "00010_JT_Z-5N",
        "deviceType": 10,
        "hwInfo": {
            "class": "S",
            "brand": "JUSTTREE",
            "model": "Z-5N"
        },
        "icon": "d-5.png",
        "image": "JT_Z-5N.png",
        "name": "Z-5N商用锁",
        "protocolInfo": [
            {
                "protocol": "EtN",
                "protocolType": "0"
            }
        ],
        "attrs": [
            {
                "valueKey": "value",
                "valueDefs": {
                    "0": "开启",
                    "1": "关闭"
                },
                "rt": ["bh.r.attr.sensor"],
                "objId": 1,
                "funId": "Value",
                "createdRT": "bh.r.lock.state",
                "valueType": "boolean",
                "flags": 212,
                "name": "门锁状态",
                "dpt": "1.009"
            },
            {
                "name": "低电量报警",
                "dpt": "1.002",
                "rt": ["bh.r.attr.sensor"],
                "objId": 2,
                "flags": 204,
                "funId": "Value",
                "createdRT": "bh.r.battery.lowBattery",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "createdRT": "bh.r.lock.tamperAlarm",
                "valueKey": "value",
                "rt": ["bh.r.attr.sensor"],
                "flags": 204,
                "name": "防撬报警",
                "dpt": "1.002",
                "objId": 3,
                "funId": "Value",
                "valueType": "boolean"
            }
        ],
        "commInfo": {
            "protocol4GW": "EtN"
        },
        "status": 1
    },
    {
        "_id": { "$oid": "5d1f17e9856db5ac058e04d3" },
        "docTag": "60929_CJH_X3H-A01",
        "comPorts": {
            "portCnt": 0
        },
        "deviceType": 60929,
        "hwInfo": {
            "class": "A",
            "brand": "中国金茂",
            "model": "X3H-A01"
        },
        "icon": "d-66.png",
        "image": "CJH_X3H-A01.png",
        "name": "露点温控器（三合一）",
        "protocolInfo": [
            {
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "funId": "Value",
                "flags": 8,
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 1,
                "fp": 1,
                "name": "版本号",
                "dpt": "1.001",
                "createdRT": "bh.r.value.UShort:1",
                "appHidden": true
            },
            {
                "objId": 2,
                "funId": "Value",
                "name": "上电恢复",
                "flags": 156,
                "valueType": "boolean",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 1
                },
                "fp": 2,
                "value": true,
                "appHidden": true,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool:1",
                "valueKey": "value",
                "valueDefs": {
                    "false": "上电时关机",
                    "true": "上电恢复上次状态"
                },
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "funId": "Value",
                "fp": 3,
                "createdRT": "bh.r.value.bool:2",
                "valueType": "boolean",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                },
                "chId": 1,
                "name": "地址远程锁定",
                "valueKey": "value",
                "valueDefs": {
                    "false": "解锁设备地址",
                    "true": "锁定设备地址"
                },
                "value": false,
                "objId": 3,
                "flags": 156,
                "dpt": "1.002",
                "rt": ["bh.r.attr.actuator"],
                "appHidden": true
            },
            {
                "funId": "Value",
                "valueKey": "value",
                "dpt": "1.002",
                "valueStyle": {
                    "style": "Label"
                },
                "chId": 1,
                "appHidden": true,
                "objId": 4,
                "fp": 4,
                "name": "地址设定",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "flags": 12,
                "createdRT": "bh.r.value.UChar:1",
                "value": 0
            },
            {
                "funId": "Value",
                "name": "面板波特率设置锁定",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "appHidden": true,
                "flags": 12,
                "createdRT": "bh.r.value.bool:3",
                "valueDefs": {
                    "false": "通讯波特率4800",
                    "true": "通讯波特率9600"
                },
                "objId": 5,
                "dpt": "1.002",
                "valueStyle": {
                    "style": "Label"
                },
                "value": true,
                "chId": 1,
                "fp": 5,
                "valueType": "boolean"
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "fp": 6,
                "funId": "Switch",
                "name": "开关机",
                "dpt": "1.001",
                "objId": 6,
                "flags": 220,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "valueDefs": {
                    "0": "制冷",
                    "1": "制热",
                    "2": "通风"
                },
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "funId": "HVAC",
                "flags": 220,
                "valueType": "integer",
                "dpt": "20.102",
                "createdRT": "bh.r.hvac.ctrlMode",
                "valueKey": "value",
                "objId": 7,
                "fp": 7,
                "name": "工作模式"
            },
            {
                "funId": "Value",
                "flags": 12,
                "valueDefs": {
                    "0": "未连网",
                    "1": "连网",
                    "2": "连接云端"
                },
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "objId": 8,
                "fp": 8,
                "dpt": "5.010",
                "valueKey": "value",
                "appHidden": true,
                "name": "连网状态",
                "createdRT": "bh.r.value.UChar:2",
                "valueStyle": {
                    "style": "Label"
                },
                "chId": 1,
                "value": 0
            },
            {
                "createdRT": "bh.r.temperature:setpoint",
                "valueKey": "value",
                "valueType": "integer",
                "range": [5, 35],
                "objId": 9,
                "name": "温度设定",
                "flags": 220,
                "dpt": "9.001",
                "chId": 1,
                "fp": 9,
                "funId": "Temperature",
                "rt": ["bh.r.attr.actuator"],
                "step": 1
            },
            {
                "valueKey": "value",
                "range": [0, 5],
                "valueType": "number",
                "rt": ["bh.r.attr.actuator"],
                "value": 0.5,
                "step": 1,
                "flags": 156,
                "createdRT": "bh.r.temperature:1",
                "dpt": "9.001",
                "valueStyle": {
                    "units": "°C",
                    "default": 0.5,
                    "style": "InputBox"
                },
                "funId": "Value",
                "name": "温度带宽设定",
                "chId": 1,
                "appHidden": true,
                "objId": 10,
                "fp": 10
            },
            {
                "flags": 220,
                "valueType": "integer",
                "step": 1,
                "fp": 11,
                "funId": "Humidity",
                "dpt": "9.007",
                "createdRT": "bh.r.humidity:setpoint",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "range": [20, 70],
                "chId": 1,
                "objId": 11,
                "name": "湿度设定"
            },
            {
                "flags": 156,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Value",
                "step": 1,
                "name": "湿度带宽设定",
                "dpt": "9.001",
                "createdRT": "bh.r.humidity:1",
                "valueType": "number",
                "objId": 12,
                "valueKey": "value",
                "range": [5, 20],
                "chId": 1,
                "appHidden": true,
                "fp": 12
            },
            {
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:2",
                "rt": ["bh.r.attr.actuator"],
                "appHidden": true,
                "objId": 13,
                "fp": 13,
                "funId": "Temperature",
                "name": "露点保护值设定",
                "flags": 156,
                "valueKey": "value",
                "range": [15, 25],
                "step": 1,
                "chId": 1,
                "valueType": "integer"
            },
            {
                "funId": "Temperature",
                "name": "辅助系统开启判断温度",
                "range": [0, 10],
                "flags": 156,
                "rt": ["bh.r.attr.actuator"],
                "value": 3,
                "step": 1,
                "objId": 14,
                "fp": 14,
                "createdRT": "bh.r.temperature:3",
                "dpt": "9.001",
                "valueKey": "value",
                "valueType": "integer",
                "valueStyle": {
                    "style": "InputBox",
                    "units": "°C",
                    "default": 3
                },
                "chId": 1,
                "appHidden": true
            },
            {
                "fp": 15,
                "rt": ["bh.r.attr.actuator"],
                "createdRT": "bh.r.value.bool:4",
                "valueType": "boolean",
                "valueDefs": {
                    "false": "不启用露点保护",
                    "true": "启用露点保护"
                },
                "funId": "Value",
                "valueKey": "value",
                "appHidden": true,
                "valueStyle": {
                    "style": "InputBox",
                    "default": 1
                },
                "value": true,
                "chId": 1,
                "objId": 15,
                "name": "露点判断设定",
                "flags": 156,
                "dpt": "1.002"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "value": 3,
                "appHidden": true,
                "funId": "Value",
                "name": "是否启动辅助设定",
                "valueKey": "value",
                "chId": 1,
                "createdRT": "bh.r.value.UChar:3",
                "valueType": "integer",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 3
                },
                "objId": 16,
                "flags": 156,
                "fp": 16,
                "dpt": "5.004",
                "valueDefs": {
                    "2": "制热时启动辅助，制冷不启动辅助",
                    "3": "启动辅助",
                    "0": "不启动辅助",
                    "1": "制冷时启动辅助，制热不启动辅助"
                }
            },
            {
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "appHidden": true,
                "objId": 17,
                "name": "主设备和辅助设备选择",
                "dpt": "5.004",
                "createdRT": "bh.r.value.UChar:4",
                "valueType": "integer",
                "fp": 17,
                "flags": 24,
                "valueDefs": {
                    "0": "阀1为主，阀2为辅助",
                    "1": "制冷时阀1为主，阀2为辅助，制热时阀2为主，阀1为辅助",
                    "2": "制冷时阀2为主，阀1辅助，制热阀1为主，阀2为辅助"
                },
                "value": 0,
                "chId": 1,
                "funId": "Value",
                "valueStyle": {
                    "style": "InputBox",
                    "default": 0
                }
            },
            {
                "valueStyle": {
                    "style": "InputBox",
                    "default": 1
                },
                "funId": "Value",
                "name": "阀门类型",
                "valueKey": "value",
                "valueDefs": {
                    "2": "三线阀",
                    "1": "两线阀"
                },
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 18,
                "flags": 156,
                "valueType": "integer",
                "dpt": "5.004",
                "value": 1,
                "fp": 18,
                "createdRT": "bh.r.value.UChar:5",
                "appHidden": true
            },
            {
                "valueType": "number",
                "objId": 19,
                "fp": 19,
                "funId": "Temperature",
                "name": "当前温度",
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:current",
                "valueKey": "value",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "range": [-40, 40],
                "step": 1,
                "flags": 76,
                "chId": 1
            },
            {
                "chId": 1,
                "objId": 20,
                "flags": 76,
                "dpt": "9.007",
                "createdRT": "bh.r.humidity:current",
                "valueType": "number",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "fp": 20,
                "funId": "Humidity",
                "name": "当前湿度",
                "valueKey": "value",
                "range": [0, 100],
                "step": 1
            },
            {
                "name": "露点温度",
                "flags": 76,
                "range": [-40, 40],
                "step": 1,
                "chId": 1,
                "valueKey": "value",
                "valueType": "number",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "objId": 21,
                "fp": 21,
                "funId": "Temperature",
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:dewpoint"
            },
            {
                "objId": 22,
                "fp": 22,
                "name": "阀1运行状态",
                "flags": 76,
                "valueKey": "value",
                "valueDefs": {
                    "false": "关",
                    "true": "开"
                },
                "funId": "value",
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool:5",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "objId": 23,
                "fp": 23,
                "funId": "value",
                "name": "阀2运行状态",
                "valueKey": "value",
                "valueDefs": {
                    "true": "开",
                    "false": "关"
                },
                "flags": 76,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool:6",
                "valueType": "boolean",
                "chId": 1
            },
            {
                "objId": 24,
                "name": "故障显示",
                "createdRT": "bh.r.value.UShort:2",
                "valueDefs": {
                    "1": "温度传感器故障",
                    "2": "湿度传感器故障",
                    "4": "露点保护报警"
                },
                "chId": 1,
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "fp": 24,
                "funId": "value",
                "flags": 76,
                "dpt": "1.002",
                "valueKey": "value"
            }
        ],
        "RS485": {
            "phyConf": {
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 0,
                "sBit": 1
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": false
            },
            "maxCh": 1,
            "chCnt": 1
        },
        "commInfo": {
            "protocol4GW": "MdB"
        },
        "period": 60
    },
    {
        "_id": { "$oid": "5d3e6696856db5ac05a95cd9" },
        "docTag": "00017_RAYG_M1",
        "deviceType": 17,
        "hwInfo": {
            "model": "M1",
            "class": "SD",
            "brand": "RAYSGEM"
        },
        "icon": "d-111.png",
        "image": "RAYG_M1.png",
        "name": "智能魔镜M1",
        "protocolInfo": [
            {
                "protocol": "MdB",
                "protocolType": "000000"
            }
        ],
        "attrs": [],
        "RS485": {
            "phyConf": {
                "bRate": 38400,
                "dBit": 8,
                "ptyBit": 0,
                "sBit": 1
            },
            "mdbConf": {
                "std": false,
                "RTU": false,
                "master": true
            }
        }
    },
    {
        "_id": { "$oid": "5d5e61b8813eca2d8e333937" },
        "docTag": "00264_HDL_M-PT0L6.1",
        "deviceType": 264,
        "hwInfo": {
            "class": "S",
            "brand": "HDL",
            "model": "M/PT0L6.1"
        },
        "icon": "d-71.png",
        "image": "HDL_M-PT0L6.1.png",
        "name": "方悦/6键液晶面板",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "name": "空调页面(无需设定)",
                "rt": ["bh.r.attr.button"],
                "bIdx": 1,
                "lpress": false,
                "funId": "Value",
                "valueType": "boolean",
                "style": 0,
                "valueKey": "value",
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool",
                "btn": 1,
                "appHidden": true,
                "objId": 1,
                "flags": 0,
                "hidden": false,
                "page": 1
            },
            {
                "rt": ["bh.r.attr.button"],
                "bIdx": 2,
                "style": 0,
                "objId": 2,
                "flags": 212,
                "dpt": "1.001",
                "valueType": "boolean",
                "name": "空调开关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "lpress": false,
                "hidden": false,
                "appHidden": true,
                "page": 1,
                "funId": "Switch",
                "btn": 2
            },
            {
                "flags": 212,
                "createdRT": "bh.r.hvac.ctrlMode",
                "btn": 3,
                "funId": "HVAC",
                "lpress": false,
                "hidden": false,
                "appHidden": true,
                "style": 0,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "bIdx": 3,
                "objId": 3,
                "name": "空调模式设定",
                "dpt": "20.105",
                "valueType": "integer",
                "page": 1
            },
            {
                "appHidden": true,
                "page": 1,
                "funId": "HVAC",
                "flags": 212,
                "createdRT": "bh.r.airFlow.level",
                "valueKey": "value",
                "btn": 4,
                "style": 0,
                "valueType": "integer",
                "rt": ["bh.r.attr.button"],
                "bIdx": 4,
                "hidden": false,
                "objId": 4,
                "name": "空调风速设定",
                "dpt": "5.100",
                "lpress": false
            },
            {
                "hidden": false,
                "appHidden": true,
                "objId": 5,
                "funId": "Temperature",
                "bIdx": 5,
                "style": 1,
                "name": "空调温度设定",
                "flags": 212,
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:setpoint",
                "btn": 4,
                "page": 1,
                "valueKey": "value",
                "valueType": "number",
                "rt": ["bh.r.attr.button"],
                "lpress": false
            },
            {
                "funId": "Command",
                "valueType": "boolean",
                "rt": ["bh.r.attr.sensor"],
                "dpt": "1.003",
                "createdRT": "bh.r.hvac.ctrlMode.FanAuto",
                "valueKey": "value",
                "objId": 6,
                "page": 1,
                "name": "空调风速自动",
                "flags": 212
            },
            {
                "objId": 7,
                "valueKey": "value",
                "valueType": "boolean",
                "page": 1,
                "funId": "Heartbeat",
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "appHidden": true,
                "rt": ["bh.r.attr.event"]
            },
            {
                "funId": "Temperature",
                "flags": 204,
                "dpt": "9.001",
                "valueType": "number",
                "objId": 8,
                "page": 1,
                "name": "当前温度",
                "createdRT": "bh.r.temperature:current",
                "valueKey": "value",
                "rt": ["bh.r.attr.sensor"],
                "range": [-5, 45],
                "step": 1
            },
            {
                "createdRT": "bh.r.humidity:current",
                "range": [0, 100],
                "valueType": "integer",
                "objId": 9,
                "funId": "Humidity",
                "page": 1,
                "name": "当前湿度",
                "flags": 204,
                "dpt": "9.007",
                "valueKey": "value",
                "rt": ["bh.r.attr.sensor"],
                "step": 1
            },
            {
                "objId": 10,
                "page": 2,
                "funId": "Value",
                "createdRT": "bh.r.value.bool",
                "name": "新风通道1页面(无需设定)",
                "flags": 0,
                "valueKey": "value",
                "lpress": false,
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "appHidden": true,
                "dpt": "1.002",
                "bIdx": 1,
                "btn": 1,
                "style": 0,
                "hidden": false
            },
            {
                "dpt": "1.001",
                "bIdx": 2,
                "lpress": false,
                "appHidden": true,
                "funId": "Switch",
                "valueType": "boolean",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "style": 0,
                "hidden": false,
                "page": 2,
                "name": "新风通道1开关",
                "rt": ["bh.r.attr.button"],
                "btn": 2,
                "objId": 11,
                "flags": 212
            },
            {
                "dpt": "1.002",
                "btn": 3,
                "style": 0,
                "hidden": false,
                "bIdx": 3,
                "lpress": false,
                "page": 2,
                "funId": "Value",
                "name": "新风通道切換(无需设定)",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "valueKey": "value",
                "objId": 12,
                "flags": 0,
                "createdRT": "bh.r.value.bool",
                "appHidden": true
            },
            {
                "hidden": false,
                "name": "新风通道1风速设定",
                "createdRT": "bh.r.airFlow.level",
                "valueType": "integer",
                "bIdx": 4,
                "btn": 4,
                "objId": 13,
                "dpt": "5.100",
                "style": 0,
                "appHidden": true,
                "page": 2,
                "flags": 212,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "lpress": false,
                "funId": "HVAC"
            },
            {
                "page": 2,
                "name": "PM2.5浓度",
                "createdRT": "bh.r.airQualities:pm2p5",
                "valueType": "integer",
                "objId": 14,
                "funId": "AirQuality",
                "flags": 76,
                "dpt": "9.008",
                "valueKey": "value",
                "rt": ["bh.r.attr.sensor"]
            },
            {
                "objId": 15,
                "name": "CO2浓度",
                "dpt": "9.008",
                "createdRT": "bh.r.airQualities:co2",
                "valueType": "integer",
                "rt": ["bh.r.attr.sensor"],
                "page": 2,
                "funId": "AirQuality",
                "flags": 76,
                "valueKey": "value"
            },
            {
                "flags": 76,
                "createdRT": "bh.r.airQualities:tvoc",
                "valueType": "integer",
                "objId": 16,
                "page": 2,
                "name": "TVOC浓度",
                "rt": ["bh.r.attr.sensor"],
                "funId": "AirQuality",
                "dpt": "9.008",
                "valueKey": "value"
            },
            {
                "hidden": false,
                "page": 3,
                "funId": "Value",
                "createdRT": "bh.r.value.bool",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "bIdx": 1,
                "objId": 17,
                "flags": 0,
                "style": 0,
                "lpress": false,
                "appHidden": true,
                "name": "新风通道2页面(无需设定)",
                "dpt": "1.002",
                "valueKey": "value",
                "btn": 1
            },
            {
                "objId": 18,
                "name": "新风通道2开关",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "valueKey": "value",
                "btn": 2,
                "lpress": false,
                "appHidden": true,
                "page": 3,
                "funId": "Switch",
                "flags": 212,
                "bIdx": 2,
                "style": 0,
                "dpt": "1.001",
                "rt": ["bh.r.attr.button"],
                "hidden": false
            },
            {
                "funId": "Value",
                "name": "新风通道切換(无需设定)",
                "valueKey": "value",
                "btn": 3,
                "hidden": false,
                "objId": 19,
                "dpt": "1.002",
                "bIdx": 3,
                "style": 0,
                "appHidden": true,
                "page": 3,
                "flags": 0,
                "createdRT": "bh.r.value.bool",
                "valueType": "boolean",
                "lpress": false,
                "rt": ["bh.r.attr.button"]
            },
            {
                "objId": 20,
                "createdRT": "bh.r.airFlow.level",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "lpress": false,
                "appHidden": true,
                "page": 3,
                "funId": "HVAC",
                "dpt": "5.100",
                "bIdx": 4,
                "btn": 4,
                "name": "新风通道2风速设定",
                "flags": 212,
                "hidden": false,
                "valueType": "integer"
            },
            {
                "page": 4,
                "funId": "Value",
                "flags": 0,
                "valueKey": "value",
                "lpress": false,
                "dpt": "1.002",
                "bIdx": 1,
                "appHidden": true,
                "objId": 21,
                "createdRT": "bh.r.value.bool",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "name": "新风通道3页面(无需设定)",
                "btn": 1,
                "hidden": false
            },
            {
                "page": 4,
                "lpress": false,
                "hidden": false,
                "funId": "Switch",
                "valueType": "boolean",
                "valueKey": "value",
                "bIdx": 2,
                "btn": 2,
                "style": 0,
                "appHidden": true,
                "objId": 22,
                "name": "新风通道3开关",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "flags": 212,
                "dpt": "1.001"
            },
            {
                "flags": 0,
                "dpt": "1.002",
                "valueKey": "value",
                "bIdx": 3,
                "page": 4,
                "btn": 3,
                "funId": "Value",
                "style": 0,
                "lpress": false,
                "appHidden": true,
                "objId": 23,
                "name": "新风通道切換(无需设定)",
                "createdRT": "bh.r.value.bool",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "hidden": false
            },
            {
                "objId": 24,
                "lpress": false,
                "funId": "HVAC",
                "name": "新风通道3风速设定",
                "rt": ["bh.r.attr.button"],
                "bIdx": 4,
                "style": 0,
                "page": 4,
                "flags": 212,
                "createdRT": "bh.r.airFlow.level",
                "valueType": "integer",
                "dpt": "5.100",
                "valueKey": "value",
                "btn": 4,
                "hidden": false,
                "appHidden": true
            },
            {
                "createdRT": "bh.r.value.bool",
                "bIdx": 1,
                "btn": 1,
                "objId": 25,
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "hidden": false,
                "funId": "Value",
                "valueKey": "value",
                "lpress": false,
                "appHidden": true,
                "page": 5,
                "flags": 0,
                "dpt": "1.002",
                "style": 0,
                "name": "新风通道4页面(无需设定)"
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "page": 5,
                "name": "新风通道4开关",
                "hidden": false,
                "appHidden": true,
                "bIdx": 2,
                "btn": 2,
                "lpress": false,
                "funId": "Switch",
                "valueKey": "value",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "style": 0,
                "objId": 26,
                "flags": 212
            },
            {
                "dpt": "1.002",
                "lpress": false,
                "hidden": false,
                "appHidden": true,
                "objId": 27,
                "page": 5,
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "btn": 3,
                "funId": "Value",
                "name": "新风通道切換(无需设定)",
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "bIdx": 3,
                "flags": 0
            },
            {
                "funId": "HVAC",
                "name": "新风通道4风速设定",
                "flags": 212,
                "bIdx": 4,
                "btn": 4,
                "objId": 28,
                "page": 5,
                "createdRT": "bh.r.airFlow.level",
                "valueType": "integer",
                "lpress": false,
                "hidden": false,
                "dpt": "5.100",
                "appHidden": true,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "style": 0
            },
            {
                "createdRT": "bh.r.value.bool",
                "style": 0,
                "objId": 29,
                "name": "HVAC页面(无需设定)",
                "dpt": "1.002",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "btn": 1,
                "appHidden": true,
                "lpress": false,
                "page": 6,
                "funId": "Value",
                "flags": 0,
                "valueType": "boolean",
                "bIdx": 1,
                "hidden": false
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "btn": 2,
                "objId": 30,
                "lpress": false,
                "bIdx": 2,
                "flags": 212,
                "funId": "Switch",
                "name": "HVAC开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "style": 0,
                "hidden": false,
                "appHidden": true,
                "page": 6
            },
            {
                "rt": ["bh.r.attr.button"],
                "objId": 31,
                "page": 6,
                "funId": "HVAC",
                "dpt": "20.105",
                "createdRT": "bh.r.hvac.ctrlMode",
                "name": "HVAC模式设定",
                "btn": 3,
                "style": 0,
                "flags": 212,
                "hidden": false,
                "valueKey": "value",
                "valueType": "boolean",
                "bIdx": 3,
                "lpress": false,
                "appHidden": true
            },
            {
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "btn": 4,
                "appHidden": true,
                "funId": "HVAC",
                "dpt": "5.100",
                "createdRT": "bh.r.airFlow.level",
                "hidden": false,
                "objId": 32,
                "page": 6,
                "valueType": "integer",
                "bIdx": 4,
                "style": 0,
                "name": "HVAC风速设定",
                "flags": 212,
                "lpress": false
            },
            {
                "name": "HVAC温度设定",
                "flags": 212,
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:setpoint.ac",
                "page": 6,
                "funId": "Temperature",
                "valueType": "number",
                "appHidden": true,
                "bIdx": 5,
                "style": 1,
                "hidden": false,
                "objId": 33,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "btn": 4,
                "lpress": false
            },
            {
                "objId": 34,
                "valueType": "boolean",
                "name": "地暖通道1普通页面(无需设定)",
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "btn": 1,
                "lpress": false,
                "page": 7,
                "funId": "Value",
                "appHidden": true,
                "hidden": false,
                "bIdx": 1,
                "style": 0,
                "flags": 0,
                "rt": ["bh.r.attr.button"]
            },
            {
                "objId": 35,
                "flags": 212,
                "dpt": "1.001",
                "btn": 2,
                "lpress": false,
                "appHidden": true,
                "page": 7,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "funId": "Switch",
                "valueKey": "value",
                "valueType": "boolean",
                "name": "地暖通道1开关",
                "bIdx": 2,
                "hidden": false
            },
            {
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "objId": 36,
                "funId": "Value",
                "name": "地暖通道1模式切换(无需设定)",
                "flags": 0,
                "valueType": "boolean",
                "page": 7,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool",
                "lpress": false,
                "valueKey": "value",
                "bIdx": 3,
                "btn": 3,
                "hidden": false,
                "appHidden": true
            },
            {
                "valueKey": "value",
                "name": "地暖通道切换(无需设定)",
                "bIdx": 4,
                "style": 0,
                "lpress": false,
                "funId": "Value",
                "flags": 0,
                "dpt": "1.002",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "btn": 4,
                "hidden": false,
                "page": 7,
                "createdRT": "bh.r.value.bool",
                "appHidden": true,
                "objId": 37
            },
            {
                "valueKey": "value",
                "valueType": "number",
                "rt": ["bh.r.attr.button"],
                "bIdx": 5,
                "funId": "Temperature",
                "name": "地暖通道1普通温度设定",
                "flags": 212,
                "createdRT": "bh.r.temperature:heat",
                "hidden": false,
                "page": 7,
                "dpt": "9.001",
                "btn": 4,
                "appHidden": true,
                "objId": 38,
                "style": 1,
                "lpress": false
            },
            {
                "valueKey": "value",
                "btn": 1,
                "lpress": false,
                "objId": 39,
                "dpt": "1.002",
                "appHidden": true,
                "valueType": "boolean",
                "hidden": false,
                "createdRT": "bh.r.value.bool",
                "bIdx": 1,
                "funId": "Value",
                "flags": 0,
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "page": 8,
                "name": "地暖通道1白天页面(无需设定)"
            },
            {
                "style": 0,
                "lpress": false,
                "valueKey": "value",
                "btn": 2,
                "hidden": false,
                "name": "地暖通道1开关(无需设定)",
                "flags": 0,
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "bIdx": 2,
                "appHidden": true,
                "objId": 40,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool",
                "page": 8,
                "funId": "Value"
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "appHidden": true,
                "flags": 0,
                "bIdx": 3,
                "style": 0,
                "hidden": false,
                "objId": 41,
                "page": 8,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool",
                "funId": "Value",
                "name": "地暖通道1模式切换(无需设定)",
                "btn": 3,
                "lpress": false
            },
            {
                "appHidden": true,
                "page": 8,
                "funId": "Value",
                "flags": 0,
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "btn": 4,
                "objId": 42,
                "name": "地暖通道切换(无需设定)",
                "dpt": "1.002",
                "rt": ["bh.r.attr.button"],
                "bIdx": 4,
                "valueType": "boolean",
                "lpress": false,
                "hidden": false,
                "style": 0
            },
            {
                "funId": "Temperature",
                "createdRT": "bh.r.temperature:setpoint.date",
                "valueKey": "value",
                "name": "地暖通道1白天温度设定",
                "dpt": "9.001",
                "valueType": "number",
                "bIdx": 5,
                "hidden": false,
                "page": 8,
                "rt": ["bh.r.attr.button"],
                "lpress": false,
                "appHidden": true,
                "objId": 43,
                "flags": 212,
                "btn": 4,
                "style": 1
            },
            {
                "dpt": "1.002",
                "bIdx": 1,
                "lpress": false,
                "hidden": false,
                "funId": "Value",
                "flags": 0,
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "btn": 1,
                "name": "地暖通道1夜晚页面(无需设定)",
                "style": 0,
                "objId": 44,
                "page": 9,
                "valueType": "boolean",
                "appHidden": true
            },
            {
                "style": 0,
                "appHidden": true,
                "funId": "Value",
                "bIdx": 2,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "page": 9,
                "name": "地暖通道1开关(无需设定)",
                "btn": 2,
                "hidden": false,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool",
                "valueType": "boolean",
                "lpress": false,
                "objId": 45,
                "flags": 0
            },
            {
                "page": 9,
                "name": "地暖通道1模式切换(无需设定)",
                "createdRT": "bh.r.value.bool",
                "rt": ["bh.r.attr.button"],
                "btn": 3,
                "valueKey": "value",
                "style": 0,
                "hidden": false,
                "objId": 46,
                "funId": "Value",
                "flags": 0,
                "bIdx": 3,
                "appHidden": true,
                "dpt": "1.002",
                "valueType": "boolean",
                "lpress": false
            },
            {
                "btn": 4,
                "lpress": false,
                "name": "地暖通道切换(无需设定)",
                "createdRT": "bh.r.value.bool",
                "dpt": "1.002",
                "valueType": "boolean",
                "page": 9,
                "funId": "Value",
                "rt": ["bh.r.attr.button"],
                "bIdx": 4,
                "style": 0,
                "appHidden": true,
                "objId": 47,
                "flags": 0,
                "valueKey": "value",
                "hidden": false
            },
            {
                "rt": ["bh.r.attr.button"],
                "style": 1,
                "lpress": false,
                "hidden": false,
                "appHidden": true,
                "funId": "Temperature",
                "createdRT": "bh.r.temperature:setpoint.night",
                "valueKey": "value",
                "bIdx": 5,
                "btn": 4,
                "objId": 47,
                "page": 9,
                "name": "地暖通道1夜晚温度设定",
                "dpt": "9.001",
                "flags": 212,
                "valueType": "number"
            },
            {
                "appHidden": true,
                "btn": 1,
                "style": 0,
                "name": "地暖通道1离开页面(无需设定)",
                "flags": 0,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "bIdx": 1,
                "lpress": false,
                "hidden": false,
                "funId": "Value",
                "createdRT": "bh.r.value.bool",
                "dpt": "1.002",
                "objId": 48,
                "page": 10
            },
            {
                "objId": 49,
                "valueKey": "value",
                "lpress": false,
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool",
                "rt": ["bh.r.attr.button"],
                "appHidden": true,
                "style": 0,
                "name": "地暖通道1开关(无需设定)",
                "valueType": "boolean",
                "bIdx": 2,
                "btn": 2,
                "page": 10,
                "funId": "Value",
                "flags": 0,
                "hidden": false
            },
            {
                "lpress": false,
                "hidden": false,
                "objId": 50,
                "funId": "Value",
                "name": "地暖通道1模式切换(无需设定)",
                "createdRT": "bh.r.value.bool",
                "bIdx": 3,
                "dpt": "1.002",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "page": 10,
                "btn": 3,
                "style": 0,
                "flags": 0,
                "valueType": "boolean",
                "appHidden": true
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "btn": 4,
                "style": 0,
                "name": "地暖通道切换(无需设定)",
                "dpt": "1.002",
                "valueKey": "value",
                "funId": "Value",
                "lpress": false,
                "appHidden": true,
                "page": 10,
                "bIdx": 4,
                "hidden": false,
                "objId": 51,
                "flags": 0,
                "createdRT": "bh.r.value.bool"
            },
            {
                "page": 10,
                "hidden": false,
                "objId": 52,
                "dpt": "9.001",
                "valueType": "number",
                "lpress": false,
                "appHidden": true,
                "name": "地暖通道1离开温度设定",
                "flags": 212,
                "createdRT": "bh.r.temperature:setpoint.away",
                "valueKey": "value",
                "bIdx": 5,
                "funId": "Temperature",
                "btn": 4,
                "style": 1,
                "rt": ["bh.r.attr.button"]
            },
            {
                "page": 11,
                "funId": "Value",
                "dpt": "1.002",
                "valueType": "boolean",
                "name": "地暖通道2普通页面(无需设定)",
                "style": 0,
                "hidden": false,
                "appHidden": true,
                "objId": 53,
                "rt": ["bh.r.attr.button"],
                "btn": 1,
                "lpress": false,
                "flags": 0,
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "bIdx": 1
            },
            {
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "btn": 2,
                "lpress": false,
                "page": 11,
                "valueType": "boolean",
                "hidden": false,
                "objId": 54,
                "dpt": "1.001",
                "valueKey": "value",
                "bIdx": 2,
                "style": 0,
                "name": "地暖通道2开关",
                "rt": ["bh.r.attr.button"],
                "appHidden": true,
                "flags": 212
            },
            {
                "objId": 55,
                "page": 11,
                "funId": "Value",
                "createdRT": "bh.r.value.bool",
                "hidden": false,
                "bIdx": 3,
                "style": 0,
                "name": "地暖通道2模式切换(无需设定)",
                "flags": 0,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "btn": 3,
                "appHidden": true,
                "dpt": "1.002",
                "valueType": "boolean",
                "lpress": false
            },
            {
                "style": 0,
                "objId": 56,
                "flags": 0,
                "bIdx": 4,
                "rt": ["bh.r.attr.button"],
                "hidden": false,
                "appHidden": true,
                "dpt": "1.002",
                "valueKey": "value",
                "valueType": "boolean",
                "createdRT": "bh.r.value.bool",
                "btn": 4,
                "lpress": false,
                "page": 11,
                "funId": "Value",
                "name": "地暖通道切换(无需设定)"
            },
            {
                "dpt": "9.001",
                "valueType": "number",
                "appHidden": true,
                "flags": 212,
                "rt": ["bh.r.attr.button"],
                "btn": 4,
                "style": 1,
                "page": 11,
                "funId": "Temperature",
                "createdRT": "bh.r.temperature:setoint.normal",
                "valueKey": "value",
                "objId": 57,
                "name": "地暖通道2普通温度设定",
                "bIdx": 5,
                "lpress": false,
                "hidden": false
            },
            {
                "objId": 58,
                "lpress": false,
                "funId": "Value",
                "name": "地暖通道2白天页面(无需设定)",
                "createdRT": "bh.r.value.bool",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "appHidden": true,
                "page": 12,
                "flags": 0,
                "dpt": "1.002",
                "valueKey": "value",
                "bIdx": 1,
                "btn": 1,
                "hidden": false
            },
            {
                "valueKey": "value",
                "appHidden": true,
                "funId": "Value",
                "flags": 0,
                "dpt": "1.002",
                "rt": ["bh.r.attr.button"],
                "hidden": false,
                "lpress": false,
                "page": 12,
                "name": "地暖通道2开关(无需设定)",
                "createdRT": "bh.r.value.bool",
                "bIdx": 2,
                "btn": 2,
                "objId": 59,
                "valueType": "boolean",
                "style": 0
            },
            {
                "btn": 3,
                "hidden": false,
                "page": 12,
                "dpt": "1.002",
                "bIdx": 3,
                "appHidden": true,
                "name": "地暖通道2模式切换(无需设定)",
                "funId": "Value",
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "valueType": "boolean",
                "lpress": false,
                "objId": 60,
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "flags": 0
            },
            {
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "valueType": "boolean",
                "btn": 4,
                "flags": 0,
                "page": 12,
                "funId": "Value",
                "name": "地暖通道切换(无需设定)",
                "appHidden": true,
                "objId": 61,
                "rt": ["bh.r.attr.button"],
                "lpress": false,
                "dpt": "1.002",
                "style": 0,
                "hidden": false,
                "bIdx": 4
            },
            {
                "funId": "Temperature",
                "dpt": "9.001",
                "style": 1,
                "lpress": false,
                "name": "地暖通道2白天温度设定",
                "valueType": "number",
                "btn": 4,
                "appHidden": true,
                "bIdx": 5,
                "page": 12,
                "createdRT": "bh.r.temperature:setoint.date",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "objId": 62,
                "flags": 212,
                "hidden": false
            },
            {
                "lpress": false,
                "hidden": false,
                "createdRT": "bh.r.value.bool",
                "funId": "Value",
                "name": "地暖通道2夜晚页面(无需设定)",
                "style": 0,
                "page": 13,
                "bIdx": 1,
                "flags": 0,
                "dpt": "1.002",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "btn": 1,
                "appHidden": true,
                "objId": 63
            },
            {
                "appHidden": true,
                "page": 13,
                "dpt": "1.002",
                "valueType": "boolean",
                "bIdx": 2,
                "objId": 64,
                "flags": 0,
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "hidden": false,
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "btn": 2,
                "lpress": false,
                "funId": "Value",
                "name": "地暖通道2开关(无需设定)"
            },
            {
                "objId": 65,
                "flags": 0,
                "dpt": "1.002",
                "valueType": "boolean",
                "lpress": false,
                "hidden": false,
                "funId": "Value",
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "bIdx": 3,
                "btn": 3,
                "page": 13,
                "name": "地暖通道2模式切换(无需设定)",
                "style": 0,
                "appHidden": true
            },
            {
                "rt": ["bh.r.attr.button"],
                "valueType": "boolean",
                "funId": "Value",
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "bIdx": 4,
                "appHidden": true,
                "page": 13,
                "flags": 0,
                "objId": 66,
                "dpt": "1.002",
                "btn": 4,
                "style": 0,
                "lpress": false,
                "hidden": false,
                "name": "地暖通道切换(无需设定)"
            },
            {
                "rt": ["bh.r.attr.button"],
                "style": 1,
                "bIdx": 5,
                "lpress": false,
                "hidden": false,
                "objId": 67,
                "valueKey": "value",
                "valueType": "number",
                "btn": 4,
                "funId": "Temperature",
                "name": "地暖通道2夜晚温度设定",
                "dpt": "9.001",
                "createdRT": "bh.r.temperature:setpoint.night",
                "appHidden": true,
                "page": 13,
                "flags": 212
            },
            {
                "objId": 68,
                "funId": "Value",
                "name": "地暖通道2离开页面(无需设定)",
                "appHidden": true,
                "page": 14,
                "dpt": "1.002",
                "valueType": "boolean",
                "btn": 1,
                "hidden": false,
                "flags": 0,
                "createdRT": "bh.r.value.bool",
                "rt": ["bh.r.attr.button"],
                "lpress": false,
                "valueKey": "value",
                "bIdx": 1,
                "style": 0
            },
            {
                "objId": 69,
                "dpt": "1.002",
                "bIdx": 2,
                "btn": 2,
                "lpress": false,
                "valueType": "boolean",
                "style": 0,
                "hidden": false,
                "funId": "Value",
                "name": "地暖通道2开关(无需设定)",
                "flags": 0,
                "rt": ["bh.r.attr.button"],
                "appHidden": true,
                "page": 14,
                "createdRT": "bh.r.value.bool",
                "valueKey": "value"
            },
            {
                "page": 14,
                "valueType": "boolean",
                "bIdx": 3,
                "objId": 70,
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "lpress": false,
                "hidden": false,
                "name": "地暖通道2模式切换(无需设定)",
                "dpt": "1.002",
                "rt": ["bh.r.attr.button"],
                "btn": 3,
                "style": 0,
                "funId": "Value",
                "flags": 0,
                "appHidden": true
            },
            {
                "funId": "Value",
                "createdRT": "bh.r.value.bool",
                "hidden": false,
                "flags": 0,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "bIdx": 4,
                "btn": 4,
                "objId": 71,
                "name": "地暖通道切换(无需设定)",
                "dpt": "1.002",
                "lpress": false,
                "page": 14,
                "style": 0,
                "appHidden": true
            },
            {
                "name": "地暖通道2离开温度设定",
                "valueType": "number",
                "bIdx": 5,
                "style": 1,
                "flags": 212,
                "dpt": "9.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "hidden": false,
                "objId": 72,
                "page": 14,
                "funId": "Temperature",
                "appHidden": true,
                "createdRT": "bh.r.temperature:setpoint.away",
                "btn": 4,
                "lpress": false
            }
        ],
        "switch": {
            "btnCnt": 6,
            "pageCount": 14,
            "modifyStyle": true,
            "hasLPress": true,
            "layout": "horizontal"
        },
        "heartbeat": 5,
        "commInfo": {
            "protocol4GW": "KNX"
        },
        "period": 60
    },
    {
        "_id": { "$oid": "5d6899e4813eca2d8e3d21fa" },
        "docTag": "01296_ACREL_DDSY1352-NK",
        "deviceType": 1296,
        "hwInfo": {
            "class": "S",
            "brand": "Acrel",
            "model": "DDSY1352-NK"
        },
        "icon": "d-132.png",
        "image": "ACREL_DDSY1352-NK.png",
        "name": "单相预付费电能表",
        "protocolInfo": [
            {
                "protocolType": "000000",
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "name": "当前总有功电能",
                "flags": 76,
                "valueKey": "value",
                "unit": "kWh",
                "unitName": "千瓦·时",
                "step": 0.01,
                "rt": ["bh.r.attr.sensor"],
                "objId": 1,
                "funId": "Energy",
                "dpt": "13.013",
                "createdRT": "bh.r.energy.powerConsumption",
                "valueType": "number",
                "fp": 1
            },
            {
                "name": "电闸控制",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.ctrl"],
                "objId": 2,
                "fp": 2,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "funId": "Switch",
                "flags": 220
            },
            {
                "objId": 3,
                "funId": "Value",
                "dpt": "5.010",
                "createdRT": "bh.r.value.UChar:1",
                "rt": ["bh.r.attr.value"],
                "appHidden": true,
                "fp": 3,
                "name": "电表通讯地址",
                "flags": 12,
                "valueKey": "value",
                "valueType": "integer"
            },
            {
                "fp": 4,
                "funId": "Value",
                "flags": 12,
                "createdRT": "bh.r.value.UChar:2",
                "valueStyle": {
                    "style": "Label"
                },
                "valueDefs": {
                    "0": "通讯波特率1200",
                    "1": "通讯波特率2400",
                    "2": "通讯波特率4800",
                    "3": "通讯波特率9600",
                    "4": "通讯波特率19200",
                    "5": "通讯波特率38400"
                },
                "appHidden": true,
                "objId": 4,
                "name": "电表通讯波特率",
                "dpt": "5.010",
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.value"]
            }
        ],
        "RS485": {
            "phyConf": {
                "ptyBit": 0,
                "sBit": 1,
                "bRate": 9600,
                "dBit": 8
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": false
            }
        },
        "period": 0
    },
    {
        "_id": { "$oid": "5d78c783813eca2d8e4b0a1f" },
        "docTag": "01298_WSD_YT-EY1001",
        "deviceType": 1298,
        "hwInfo": {
            "model": "YT-EY1001",
            "class": "S",
            "brand": "Wisdon"
        },
        "icon": "d-132.png",
        "image": "WSD_YT-EY1001.png",
        "name": "燃气表抄表器",
        "protocolInfo": [
            {
                "protocol": "2G",
                "protocolType": "000000"
            }
        ],
        "attrs": [
            {
                "valueKey": "value",
                "valueType": "number",
                "step": 0.001,
                "objId": 1,
                "flags": 76,
                "dpt": "14.076",
                "createdRT": "bh.r.volume:gasConsumption",
                "rt": ["bh.r.attr.sensor"],
                "fp": 1,
                "funId": "Value",
                "name": "累计流量"
            }
        ],
        "period": 0
    },
    {
        "_id": { "$oid": "5d9d65c7813eca2d8e618c88" },
        "docTag": "00000_LR_067571",
        "deviceType": 0,
        "hwInfo": {
            "class": "S",
            "brand": "Legrand",
            "model": "067571"
        },
        "icon": "d-71.png",
        "image": "LR_067571.png",
        "name": "四键开关",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "name": "开关",
                "flags": 212,
                "dpt": "1.001",
                "bIdx": 1,
                "btn": 1,
                "style": 0,
                "objId": 1,
                "page": 1,
                "rt": ["bh.r.attr.button"],
                "lpress": false,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "bIdx": 2,
                "btn": 2,
                "objId": 2,
                "page": 1,
                "funId": "Switch",
                "flags": 212,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "name": "开关",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "lpress": false
            },
            {
                "objId": 3,
                "page": 1,
                "flags": 212,
                "createdRT": "oic.r.switch.binary",
                "bIdx": 3,
                "style": 0,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "rt": ["bh.r.attr.button"],
                "btn": 3,
                "lpress": false
            },
            {
                "funId": "Switch",
                "flags": 212,
                "createdRT": "oic.r.switch.binary",
                "bIdx": 4,
                "btn": 4,
                "page": 1,
                "name": "开关",
                "dpt": "1.001",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "lpress": false,
                "objId": 2
            }
        ],
        "switch": {
            "layout": "matrix",
            "btnCnt": 4,
            "pageCount": 1
        }
    },
    {
        "_id": { "$oid": "5df3169b813eca2d8ea39e0d" },
        "docTag": "61184_CJH_GW7MWL1",
        "comPorts": {
            "portCnt": 4
        },
        "deviceType": 61184,
        "hwInfo": {
            "class": "GW",
            "brand": "中国金茂",
            "model": "GW7MWL1"
        },
        "icon": "g-1.png",
        "image": "CJH_GW7MWL1.png",
        "name": "执士家多协议网关",
        "protocolInfo": [
            {
                "protocol": "EtN"
            },
            {
                "protocol": "MdB"
            },
            {
                "protocol": "KNX"
            }
        ]
    },
    {
        "_id": { "$oid": "5e70421dfba4dee9ee81ccff" },
        "docTag": "00514_DY_DM35EQ",
        "deviceType": 514,
        "hwInfo": {
            "class": "S",
            "brand": "DOOYA",
            "model": "DM35EQ"
        },
        "icon": "d-21.png",
        "image": "DY_DM35EQ.png",
        "name": "开合帘电机",
        "protocolInfo": [
            {
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "funId": "Value",
                "flags": 12,
                "fp": 1,
                "valueKey": "value",
                "valueType": "integer",
                "objId": 1,
                "name": "电机设备地址",
                "createdRT": "bh.r.value.UShort",
                "rt": ["bh.r.attr.value"]
            },
            {
                "createdRT": "bh.r.movement",
                "valueKey": "value",
                "valueDefs": {
                    "0": "停止",
                    "1": "打开",
                    "2": "关闭"
                },
                "rt": ["bh.r.attr.ctrl"],
                "name": "设置电机运行状态",
                "fp": 2,
                "flags": 148,
                "valueType": "integer",
                "objId": 2,
                "funId": "Curtain"
            },
            {
                "valueKey": "value",
                "valueType": "integer",
                "flags": 76,
                "fp": 3,
                "createdRT": "bh.r.value.UChar",
                "valueDefs": {
                    "0": "停止",
                    "1": "打开",
                    "2": "关闭",
                    "3": "设置状态"
                },
                "rt": ["bh.r.attr.value"],
                "objId": 3,
                "funId": "Value",
                "name": "当前电机运行状态"
            },
            {
                "flags": 148,
                "createdRT": "bh.r.openLevel:setpoint",
                "unit": "%",
                "rt": ["bh.r.attr.ctrl"],
                "objId": 4,
                "name": "设置当前位置",
                "fp": 4,
                "valueKey": "value",
                "valueType": "integer",
                "unitName": "%",
                "range": [0, 100],
                "funId": "Curtain"
            },
            {
                "fp": 5,
                "objId": 5,
                "funId": "Curtain",
                "flags": 76,
                "valueType": "integer",
                "unit": "%",
                "unitName": "%",
                "range": [0, 100],
                "rt": ["bh.r.attr.event"],
                "name": "当前位置",
                "createdRT": "bh.r.openLevel:current",
                "valueKey": "value"
            },
            {
                "objId": 6,
                "funId": "Value",
                "fp": 6,
                "valueKey": "value",
                "valueDefs": {
                    "1": "反方向",
                    "0": "默认方向 "
                },
                "rt": ["bh.r.attr.value"],
                "name": "电机默认方向",
                "flags": 220,
                "createdRT": "bh.r.value.UChar:1",
                "valueType": "integer"
            },
            {
                "valueType": "integer",
                "rt": ["bh.r.attr.value"],
                "objId": 7,
                "name": "手拉启动使能",
                "flags": 220,
                "createdRT": "bh.r.value.UChar:2",
                "valueKey": "value",
                "funId": "Value",
                "fp": 7,
                "valueDefs": {
                    "0": "开启 ",
                    "1": "关闭"
                }
            }
        ],
        "RS485": {
            "phyConf": {
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 0,
                "sBit": 1
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": false,
                "broadcast": true
            }
        },
        "heartbeat": 30
    },
    {
        "_id": { "$oid": "5e71dfc5fba4dee9ee858204" },
        "docTag": "deviceCategory",
        "deviceCategory": [
            {
                "categories": [
                    {
                        "Name_en_US": "Door Lock",
                        "Name_zh_CN": "门锁",
                        "brands": [
                            {
                                "Name_en_US": "JUSTREE",
                                "Name_zh_CN": "榉树",
                                "brand": "JUSTTREE"
                            }
                        ],
                        "deviceType": 10,
                        "AppHidden": false
                    }
                ],
                "group": "OTHER",
                "protocol": "EtN",
                "Name_en_US": "Ethernet Device",
                "Name_zh_CN": "乙太网设备"
            },
            {
                "Name_en_US": "RS485 Device",
                "Name_zh_CN": "RS485设备",
                "categories": [
                    {
                        "AppHidden": false,
                        "Name_en_US": "Mirror",
                        "Name_zh_CN": "智能魔镜",
                        "brands": [
                            {
                                "Name_en_US": "RAYSGEM",
                                "Name_zh_CN": "瑞吉",
                                "brand": "RAYSGEM"
                            }
                        ],
                        "deviceType": 17
                    },
                    {
                        "AppHidden": true,
                        "Name_en_US": "Switch Panel",
                        "Name_zh_CN": "智能面板",
                        "brands": [
                            {
                                "Name_zh_CN": "AdvancedDevices",
                                "brand": "AdvancedDevices",
                                "Name_en_US": "AdvancedDevices"
                            },
                            {
                                "Name_en_US": "China Jinmao",
                                "Name_zh_CN": "中国金茂",
                                "brand": "中国金茂"
                            },
                            {
                                "Name_en_US": "Wisdon",
                                "Name_zh_CN": "亦备德",
                                "brand": "embedded systems"
                            }
                        ],
                        "deviceType": 264
                    },
                    {
                        "AppHidden": false,
                        "Name_en_US": "Curtain",
                        "Name_zh_CN": "窗帘",
                        "brands": [
                            {
                                "Name_zh_CN": "杜亚",
                                "brand": "DOOYA",
                                "Name_en_US": "DOOYA"
                            }
                        ],
                        "deviceType": 514
                    },
                    {
                        "AppHidden": false,
                        "Name_en_US": "Combustible Gas Sensor",
                        "Name_zh_CN": "可燃气体传感器",
                        "brands": [
                            {
                                "Name_en_US": "INNO ",
                                "Name_zh_CN": "一诺仪表",
                                "brand": "INNO"
                            }
                        ],
                        "deviceType": 790
                    },
                    {
                        "AppHidden": false,
                        "Name_en_US": "Electricity Meter",
                        "Name_zh_CN": "智能电能表",
                        "brands": [
                            {
                                "brand": "Acrel",
                                "Name_en_US": "Acrel",
                                "Name_zh_CN": "安科瑞"
                            }
                        ],
                        "deviceType": 1296
                    },
                    {
                        "AppHidden": false,
                        "Name_en_US": "Water Meter",
                        "Name_zh_CN": "智能水表",
                        "brands": [
                            {
                                "brand": "Zhonpei Electronic",
                                "Name_en_US": "Zhonpei Electronic",
                                "Name_zh_CN": "中沛电子"
                            }
                        ],
                        "deviceType": 1297
                    },
                    {
                        "Name_zh_CN": "空调执行器",
                        "brands": [
                            {
                                "Name_en_US": "China Jinmao",
                                "Name_zh_CN": "中国金茂",
                                "brand": "中国金茂"
                            },
                            {
                                "Name_en_US": "IRACC ",
                                "Name_zh_CN": "南京艾睿柯",
                                "brand": "IRACC"
                            },
                            {
                                "Name_en_US": "okonoff",
                                "Name_zh_CN": "柯耐弗",
                                "brand": "okonoff"
                            },
                            {
                                "Name_en_US": "ZHONGHONG",
                                "Name_zh_CN": "中弘科技",
                                "brand": "ZHONGHONG"
                            }
                        ],
                        "deviceType": 60929,
                        "AppHidden": true,
                        "Name_en_US": "Air Conditioner Actuator"
                    },
                    {
                        "brands": [
                            {
                                "Name_en_US": "AdvancedDevices",
                                "Name_zh_CN": "AdvancedDevices",
                                "brand": "AdvancedDevices"
                            }
                        ],
                        "deviceType": 60930,
                        "AppHidden": true,
                        "Name_en_US": "Light Actuator",
                        "Name_zh_CN": "照明执行器"
                    },
                    {
                        "AppHidden": true,
                        "Name_en_US": "Contact Point Bridge",
                        "Name_zh_CN": "干接点桥接器",
                        "brands": [
                            {
                                "Name_zh_CN": "AdvancedDevices",
                                "brand": "AdvancedDevices",
                                "Name_en_US": "AdvancedDevices"
                            }
                        ],
                        "deviceType": 60932
                    }
                ],
                "protocol": "MdB"
            },
            {
                "Name_en_US": "KNX Device",
                "Name_zh_CN": "KNX设备",
                "categories": [
                    {
                        "AppHidden": false,
                        "Name_en_US": "Occupancy Sensor",
                        "Name_zh_CN": "人体感应传感器",
                        "brands": [
                            {
                                "Name_en_US": "HDL",
                                "Name_zh_CN": "河东",
                                "brand": "HDL"
                            }
                        ],
                        "deviceType": 263
                    },
                    {
                        "Name_zh_CN": "智能面板",
                        "brands": [
                            {
                                "Name_en_US": "HDL",
                                "Name_zh_CN": "河东",
                                "brand": "HDL"
                            }
                        ],
                        "deviceType": 264,
                        "AppHidden": true,
                        "Name_en_US": "Switch Panel"
                    },
                    {
                        "Name_en_US": "Curtain Actuator",
                        "Name_zh_CN": "窗帘执行器",
                        "brands": [
                            {
                                "Name_en_US": "HDL",
                                "Name_zh_CN": "河东",
                                "brand": "HDL"
                            }
                        ],
                        "deviceType": 529,
                        "AppHidden": true
                    },
                    {
                        "AppHidden": true,
                        "Name_en_US": "Light Actuator",
                        "Name_zh_CN": "照明执行器",
                        "brands": [
                            {
                                "Name_en_US": "HDL",
                                "Name_zh_CN": "河东",
                                "brand": "HDL"
                            },
                            {
                                "brand": "Sation",
                                "Name_en_US": "Sation",
                                "Name_zh_CN": "世讯"
                            },
                            {
                                "brand": "embedded systems",
                                "Name_en_US": "Wisdon",
                                "Name_zh_CN": "亦备德"
                            }
                        ],
                        "deviceType": 60930
                    }
                ],
                "protocol": "KNX"
            },
            {
                "Name_en_US": "EnOcean Device",
                "Name_zh_CN": "EnOcean设备",
                "categories": [
                    {
                        "deviceType": 264,
                        "AppHidden": true,
                        "Name_en_US": "Switch Panel",
                        "Name_zh_CN": "智能面板",
                        "brands": [
                            {
                                "Name_en_US": "AdvancedDevices",
                                "Name_zh_CN": "AdvancedDevices",
                                "brand": "AdvancedDevices"
                            }
                        ]
                    },
                    {
                        "deviceType": 784,
                        "AppHidden": true,
                        "Name_en_US": "Single Relay",
                        "Name_zh_CN": "单路控制器",
                        "brands": [
                            {
                                "Name_zh_CN": "AdvancedDevices",
                                "brand": "AdvancedDevices",
                                "Name_en_US": "AdvancedDevices"
                            }
                        ]
                    },
                    {
                        "Name_zh_CN": "空气质量传感器",
                        "brands": [
                            {
                                "Name_en_US": "AdvancedDevices",
                                "Name_zh_CN": "AdvancedDevices",
                                "brand": "AdvancedDevices"
                            }
                        ],
                        "deviceType": 788,
                        "AppHidden": false,
                        "Name_en_US": "Air Quality monitor"
                    },
                    {
                        "AppHidden": true,
                        "Name_en_US": "Light Actuator",
                        "Name_zh_CN": "照明执行器",
                        "brands": [
                            {
                                "Name_en_US": "AdvancedDevices",
                                "Name_zh_CN": "AdvancedDevices",
                                "brand": "AdvancedDevices"
                            }
                        ],
                        "deviceType": 60930
                    }
                ],
                "protocol": "EnO"
            },
            {
                "Name_zh_CN": "2G设备",
                "categories": [
                    {
                        "AppHidden": false,
                        "Name_en_US": "Gas Meter",
                        "Name_zh_CN": "智能瓦斯表",
                        "brands": [
                            {
                                "Name_zh_CN": "万智生",
                                "brand": "Wisdon",
                                "Name_en_US": "Wisdon"
                            }
                        ],
                        "deviceType": 1298
                    }
                ],
                "group": "OTHER",
                "protocol": "2G",
                "Name_en_US": "2G Device"
            }
        ]
    },
    {
        "_id": { "$oid": "5e7874a0fba4dee9ee8bbb4d" },
        "docTag": "60929_ZH_B05X2RT",
        "comPorts": {
            "portCnt": 0
        },
        "deviceType": 60929,
        "hwInfo": {
            "class": "A",
            "brand": "ZHONGHONG",
            "model": "B05X2RT"
        },
        "icon": "d-66.png",
        "image": "ZH_B05X2RT.png",
        "name": "空调室外机网关",
        "protocolInfo": [
            {
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "objId": 1,
                "fp": 4,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 1,
                "funId": "Switch",
                "name": "开关机",
                "flags": 220,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "step": 1,
                "chId": 1,
                "fp": 5,
                "valueType": "integer",
                "range": [19, 30],
                "flags": 220,
                "createdRT": "bh.r.temperature:setpoint",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 2,
                "funId": "Temperature",
                "name": "温度设定"
            },
            {
                "fp": 5,
                "funId": "HVAC",
                "name": "模式设定",
                "valueDefs": {
                    "0": "制冷",
                    "1": "制热",
                    "2": "通风",
                    "3": "除湿"
                },
                "chId": 1,
                "objId": 3,
                "flags": 220,
                "createdRT": "bh.r.hvac.ctrlMode",
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 4,
                "funId": "HVAC",
                "name": "风速设定",
                "flags": 220,
                "createdRT": "bh.r.airFlow.level:setpoint",
                "valueKey": "value",
                "valueType": "integer",
                "valueDefs": {
                    "1": "高速",
                    "2": "中速",
                    "3": "中高速",
                    "4": "低速",
                    "5": "中低速"
                },
                "chId": 1,
                "fp": 7,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "step": 1,
                "fp": 8,
                "funId": "Temperature",
                "name": "当前温度",
                "flags": 76,
                "createdRT": "bh.r.temperature:current",
                "valueKey": "value",
                "valueType": "integer",
                "chId": 1,
                "objId": 5,
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "range": [-40, 40]
            },
            {
                "createdRT": "bh.r.value.UChar",
                "rt": ["bh.r.attr.actuator"],
                "funId": "value",
                "fp": 9,
                "name": "错误代码",
                "flags": 76,
                "valueKey": "value",
                "valueType": "integer",
                "chId": 1,
                "objId": 6
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "funId": "Switch",
                "name": "开关机",
                "flags": 220,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 7,
                "fp": 4
            },
            {
                "createdRT": "bh.r.temperature:setpoint",
                "name": "温度设定",
                "flags": 220,
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.actuator"],
                "objId": 8,
                "fp": 5,
                "funId": "Temperature",
                "range": [19, 30],
                "step": 1,
                "chId": 2
            },
            {
                "funId": "HVAC",
                "createdRT": "bh.r.hvac.ctrlMode",
                "valueType": "integer",
                "chId": 2,
                "objId": 9,
                "fp": 6,
                "name": "模式设定",
                "flags": 220,
                "valueKey": "value",
                "valueDefs": {
                    "0": "制冷",
                    "1": "制热",
                    "2": "通风",
                    "3": "除湿"
                },
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "fp": 7,
                "funId": "HVAC",
                "flags": 220,
                "rt": ["bh.r.attr.actuator"],
                "objId": 10,
                "createdRT": "bh.r.airFlow.level:setpoint",
                "valueKey": "value",
                "valueType": "integer",
                "valueDefs": {
                    "1": "高速",
                    "2": "中速",
                    "3": "中高速",
                    "4": "低速",
                    "5": "中低速"
                },
                "chId": 2,
                "name": "风速设定"
            },
            {
                "objId": 11,
                "flags": 76,
                "step": 1,
                "range": [-40, 40],
                "fp": 8,
                "funId": "Temperature",
                "name": "当前温度",
                "createdRT": "bh.r.temperature:current",
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.sensor", "bh.r.attr.actuator"],
                "chId": 2
            },
            {
                "fp": 9,
                "name": "错误代码",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 12,
                "funId": "value",
                "flags": 76,
                "createdRT": "bh.r.value.UChar",
                "valueKey": "value",
                "valueType": "integer"
            }
        ],
        "RS485": {
            "chCnt": 2,
            "maxCh": 64,
            "phyConf": {
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 1,
                "sBit": 1
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": false,
                "broadcast": false
            },
            "multiTopo": true
        },
        "commInfo": {
            "protocol4GW": "MdB"
        },
        "period": 60
    },
    {
        "_id": { "$oid": "5e79ef18fba4dee9ee8d08ff" },
        "docTag": "61184_AD_ADM02",
        "comPorts": {
            "portCnt": 4
        },
        "deviceType": 61184,
        "hwInfo": {
            "brand": "AdvancedDevices",
            "model": "ADM02",
            "class": "GW"
        },
        "icon": "g-1.png",
        "image": "AD_ADM02.png",
        "name": "主机",
        "protocolInfo": [
            {
                "protocol": "EtN"
            },
            {
                "protocol": "MdB"
            },
            {
                "protocol": "KNX"
            },
            {
                "protocol": "BsP"
            }
        ]
    },
    {
        "_id": { "$oid": "5ea691e9634919d01f7ff8a4" },
        "docTag": "deviceTypeDefs",
        "deviceTypeDefs": [
            {
                "Name_en_US": "Door Lock",
                "Name_zh_CN": "门锁",
                "devType": 10
            },
            {
                "Name_en_US": "Indoor Intercom",
                "Name_zh_CN": "室内对讲机",
                "devType": 16
            },
            {
                "Name_en_US": "Mirror",
                "Name_zh_CN": "智能魔镜",
                "devType": 17
            },
            {
                "Name_en_US": "IR Remote Controller",
                "Name_zh_CN": "紅外線遙控器",
                "devType": 18
            },
            {
                "Name_en_US": "Power Supplier",
                "Name_zh_CN": "电源供应器",
                "devType": 19
            },
            {
                "Name_en_US": "Occupancy Sensor",
                "Name_zh_CN": "人体感应传感器",
                "devType": 263
            },
            {
                "Name_en_US": "Switch Panel",
                "Name_zh_CN": "智能面板",
                "devType": 264
            },
            {
                "Name_en_US": "Light",
                "Name_zh_CN": "灯",
                "devType": 265
            },
            {
                "Name_en_US": "Curtain",
                "Name_zh_CN": "窗帘",
                "devType": 514
            },
            {
                "Name_en_US": "Curtain Actuator",
                "Name_zh_CN": "窗帘执行器",
                "devType": 529
            },
            {
                "Name_en_US": "Air Conditioner",
                "Name_zh_CN": "空调",
                "devType": 768
            },
            {
                "Name_zh_CN": "温度传感器",
                "devType": 770,
                "Name_en_US": "Temperature Sensor"
            },
            {
                "Name_en_US": "Single Relay",
                "Name_zh_CN": "单路控制器",
                "devType": 784
            },
            {
                "Name_en_US": "Temperature and Humidity Sensor",
                "Name_zh_CN": "温湿度传感器",
                "devType": 787
            },
            {
                "Name_en_US": "Air Quality monitor",
                "Name_zh_CN": "空气质量传感器",
                "devType": 788
            },
            {
                "Name_zh_CN": "可燃气体传感器",
                "devType": 790,
                "Name_en_US": "Combustible Gas Sensor"
            },
            {
                "Name_en_US": "Radiant Floor Heating",
                "Name_zh_CN": "地暖",
                "devType": 791
            },
            {
                "devType": 792,
                "Name_en_US": "Air Exchager",
                "Name_zh_CN": "新风"
            },
            {
                "Name_en_US": "Electricity Meter",
                "Name_zh_CN": "智能电能表",
                "devType": 1296
            },
            {
                "Name_en_US": "Water Meter",
                "Name_zh_CN": "智能水表",
                "devType": 1297
            },
            {
                "Name_zh_CN": "智能瓦斯表",
                "devType": 1298,
                "Name_en_US": "Gas Meter"
            },
            {
                "Name_en_US": "Air Conditioner Actuator",
                "Name_zh_CN": "空调执行器",
                "devType": 60929
            },
            {
                "Name_zh_CN": "照明执行器",
                "devType": 60930,
                "Name_en_US": "Light Actuator"
            },
            {
                "Name_en_US": "IR Emitter",
                "Name_zh_CN": "智能魔镜",
                "devType": 60931
            },
            {
                "Name_en_US": "Switch Hub",
                "Name_zh_CN": "干節点 ",
                "devType": 60932
            },
            {
                "Name_en_US": "Air Exchanger Actuator",
                "Name_zh_CN": "新风执行器",
                "devType": 60933
            },
            {
                "Name_en_US": "IoT Gateway",
                "Name_zh_CN": "IoT网关",
                "devType": 61184
            },
            {
                "Name_en_US": "Line Coupler",
                "Name_zh_CN": "線耦合器",
                "devType": 61185
            }
        ]
    },
    {
        "_id": { "$oid": "5ebb8a4cf4b15e6f54a06e0b" },
        "docTag": "60929_IRC_ME-485",
        "comPorts": {
            "portCnt": 0
        },
        "deviceType": 60929,
        "hwInfo": {
            "model": "ME/485",
            "class": "A",
            "brand": "IRACC"
        },
        "icon": "d-66.png",
        "image": "IRC_ME-485.png",
        "name": "空调室内机网关",
        "protocolInfo": [
            {
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "flags": 76,
                "createdRT": "bh.r.value.bool:1",
                "valueKey": "value",
                "fp": 4,
                "name": "当前内机连接状态",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 1,
                "funId": "Value"
            },
            {
                "name": "当前运行状态",
                "createdRT": "bh.r.value.bool:2",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 2,
                "fp": 5,
                "funId": "Value",
                "flags": 76,
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "fp": 6,
                "valueType": "integer",
                "valueDefs": {
                    "0": "通风",
                    "1": "制热",
                    "2": "制冷",
                    "3": "除湿",
                    "7": "自动"
                },
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 3,
                "funId": "HVAC",
                "name": "当前运转模式",
                "flags": 76,
                "createdRT": "bh.r.hvac.ctrlMode:current",
                "valueKey": "value"
            },
            {
                "funId": "Temperature",
                "createdRT": "bh.r.temperature:setpoint.current",
                "valueType": "number",
                "range": [-40, 40],
                "step": 0.1,
                "objId": 4,
                "fp": 7,
                "name": "设置温度",
                "flags": 76,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "name": "当前温度",
                "createdRT": "bh.r.temperature:current",
                "valueKey": "value",
                "valueType": "number",
                "range": [-40, 40],
                "objId": 5,
                "fp": 8,
                "funId": "Temperature",
                "flags": 76,
                "rt": ["bh.r.attr.actuator"],
                "step": 0.1,
                "chId": 1
            },
            {
                "flags": 76,
                "createdRT": "bh.r.airFlow.level:setpoint.current",
                "valueDefs": {
                    "48": "中速",
                    "64": "中高速",
                    "80": "高速",
                    "16": "低速",
                    "32": "中低速"
                },
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 6,
                "fp": 9,
                "funId": "HVAC",
                "name": "当前风速",
                "valueKey": "value",
                "valueType": "integer"
            },
            {
                "createdRT": "bh.r.value.bool:3",
                "chId": 1,
                "funId": "Value",
                "name": "过滤网清洗",
                "flags": 76,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 7,
                "fp": 10,
                "valueKey": "value"
            },
            {
                "chId": 1,
                "name": "异常错误",
                "createdRT": "bh.r.value.str",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "valueType": "string",
                "objId": 8,
                "fp": 11,
                "funId": "Value",
                "flags": 76
            },
            {
                "name": "温度传感器状态",
                "flags": 76,
                "valueKey": "value",
                "valueType": "integer",
                "valueDefs": {
                    "1": "异常",
                    "2048": "正常"
                },
                "chId": 1,
                "fp": 12,
                "funId": "Value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 9,
                "createdRT": "bh.r.value.UShort"
            },
            {
                "objId": 10,
                "fp": 13,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "funId": "Switch",
                "name": "开关机",
                "flags": 220,
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "valueKey": "value",
                "chId": 1,
                "objId": 11,
                "fp": 14,
                "name": "设置运转模式",
                "createdRT": "bh.r.hvac.ctrlMode",
                "rt": ["bh.r.attr.actuator"],
                "funId": "HVAC",
                "flags": 220,
                "valueType": "integer",
                "valueDefs": {
                    "0": "通风",
                    "1": "制热",
                    "2": "制冷",
                    "3": "除湿",
                    "7": "自动"
                }
            },
            {
                "valueType": "number",
                "range": [19, 30],
                "objId": 12,
                "fp": 15,
                "funId": "Temperature",
                "name": "温度设定",
                "step": 0.1,
                "chId": 1,
                "flags": 220,
                "createdRT": "bh.r.temperature:setpoint",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "fp": 16,
                "name": "风速设定",
                "valueType": "integer",
                "valueDefs": {
                    "16": "低速",
                    "32": "中低速",
                    "48": "中速",
                    "64": "中高速",
                    "80": "高速"
                },
                "objId": 13,
                "funId": "HVAC",
                "flags": 76,
                "createdRT": "bh.r.airFlow.level:setpoint",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "funId": "Value",
                "createdRT": "bh.r.value.bool:1",
                "valueType": "boolean",
                "chId": 2,
                "objId": 14,
                "name": "当前内机连接状态",
                "flags": 76,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "fp": 4
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 15,
                "funId": "Value",
                "name": "当前运行状态",
                "valueKey": "value",
                "fp": 5,
                "flags": 76,
                "createdRT": "bh.r.value.bool:2",
                "chId": 2
            },
            {
                "flags": 76,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 16,
                "fp": 6,
                "funId": "HVAC",
                "name": "当前运转模式",
                "createdRT": "bh.r.hvac.ctrlMode:current",
                "valueType": "integer",
                "valueDefs": {
                    "7": "自动",
                    "0": "通风",
                    "1": "制热",
                    "2": "制冷",
                    "3": "除湿"
                },
                "chId": 2
            },
            {
                "valueKey": "value",
                "valueType": "number",
                "objId": 17,
                "fp": 7,
                "name": "设置温度",
                "createdRT": "bh.r.temperature:setpoint.current",
                "step": 0.1,
                "chId": 2,
                "funId": "Temperature",
                "flags": 76,
                "rt": ["bh.r.attr.actuator"],
                "range": [-40, 40]
            },
            {
                "createdRT": "bh.r.temperature:current",
                "valueKey": "value",
                "valueType": "number",
                "rt": ["bh.r.attr.actuator"],
                "step": 0.1,
                "chId": 2,
                "name": "当前温度",
                "fp": 8,
                "funId": "Temperature",
                "flags": 76,
                "range": [-40, 40],
                "objId": 18
            },
            {
                "flags": 76,
                "createdRT": "bh.r.airFlow.level:setpoint.current",
                "valueKey": "value",
                "valueType": "integer",
                "valueDefs": {
                    "32": "中低速",
                    "48": "中速",
                    "64": "中高速",
                    "80": "高速",
                    "16": "低速"
                },
                "objId": 19,
                "fp": 9,
                "funId": "HVAC",
                "name": "当前风速",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2
            },
            {
                "funId": "Value",
                "createdRT": "bh.r.value.bool:3",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 20,
                "fp": 10,
                "name": "过滤网清洗",
                "flags": 76,
                "valueType": "boolean"
            },
            {
                "createdRT": "bh.r.value.str",
                "valueType": "string",
                "rt": ["bh.r.attr.actuator"],
                "objId": 21,
                "fp": 11,
                "funId": "Value",
                "name": "异常错误",
                "flags": 76,
                "valueKey": "value",
                "chId": 2
            },
            {
                "funId": "Value",
                "flags": 76,
                "createdRT": "bh.r.value.UShort",
                "valueType": "integer",
                "valueDefs": {
                    "1": "异常",
                    "2048": "正常"
                },
                "chId": 2,
                "objId": 22,
                "fp": 12,
                "rt": ["bh.r.attr.actuator"],
                "name": "温度传感器状态",
                "valueKey": "value"
            },
            {
                "fp": 13,
                "funId": "Switch",
                "name": "开关机",
                "flags": 220,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 23,
                "createdRT": "oic.r.switch.binary",
                "chId": 2
            },
            {
                "fp": 14,
                "funId": "HVAC",
                "name": "设置运转模式",
                "valueType": "integer",
                "valueDefs": {
                    "7": "自动",
                    "0": "通风",
                    "1": "制热",
                    "2": "制冷",
                    "3": "除湿"
                },
                "chId": 2,
                "objId": 24,
                "flags": 220,
                "createdRT": "bh.r.hvac.ctrlMode",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 25,
                "fp": 15,
                "funId": "Temperature",
                "createdRT": "bh.r.temperature:setpoint",
                "valueKey": "value",
                "valueType": "number",
                "range": [19, 30],
                "name": "温度设定",
                "flags": 220,
                "rt": ["bh.r.attr.actuator"],
                "step": 0.1,
                "chId": 2
            },
            {
                "flags": 76,
                "valueDefs": {
                    "16": "低速",
                    "32": "中低速",
                    "48": "中速",
                    "64": "中高速",
                    "80": "高速"
                },
                "rt": ["bh.r.attr.actuator"],
                "fp": 16,
                "name": "风速设定",
                "createdRT": "bh.r.airFlow.level:setpoint",
                "valueKey": "value",
                "valueType": "integer",
                "chId": 2,
                "objId": 26,
                "funId": "HVAC"
            }
        ],
        "RS485": {
            "phyConf": {
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 0,
                "sBit": 1
            },
            "mdbConf": {
                "broadcast": false,
                "std": true,
                "RTU": true,
                "master": false
            },
            "multiTopo": true,
            "chCnt": 2,
            "maxCh": 64
        },
        "commInfo": {
            "protocol4GW": "MdB"
        },
        "period": 60
    },
    {
        "_id": { "$oid": "5ec22a31f4b15e6f54a6ce8d" },
        "docTag": "00264_AD_ADP-SM-M-B8",
        "deviceType": 264,
        "hwInfo": {
            "model": "ADP-SM-M-B8",
            "class": "S",
            "brand": "AdvancedDevices"
        },
        "icon": "d-71.png",
        "image": "AD_ADP-SM-M-B8.png",
        "name": "Irene开关面板(八键)",
        "protocolInfo": [
            {
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "valueType": "boolean",
                "appHidden": true,
                "objId": 1,
                "flags": 156,
                "createdRT": "bh.r.value.bool:1",
                "name": "面板协议模式",
                "valueKey": "value",
                "rt": ["bh.r.attr.value"],
                "fp": 3,
                "page": 1,
                "funId": "Value"
            },
            {
                "page": 1,
                "funId": "Color",
                "flags": 156,
                "appHidden": true,
                "objId": 2,
                "fp": 4,
                "name": "背光灯颜色",
                "createdRT": "bh.r.color.rgb",
                "valueKey": "value",
                "valueType": "integer",
                "rt": ["bh.r.attr.value"]
            },
            {
                "valueKey": "value",
                "appHidden": true,
                "objId": 3,
                "fp": 5,
                "page": 1,
                "createdRT": "bh.r.value.UChar",
                "rt": ["bh.r.attr.value"],
                "funId": "Value",
                "name": "背光灯亮度",
                "flags": 156,
                "valueType": "integer"
            },
            {
                "flags": 76,
                "valueType": "boolean",
                "bIdx": 1,
                "btn": 1,
                "style": 0,
                "lpress": false,
                "funId": "Switch",
                "name": "按键1",
                "page": 1,
                "fp": 6,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "objId": 4,
                "createdRT": "oic.r.switch.binary"
            },
            {
                "style": 0,
                "name": "按键2",
                "createdRT": "oic.r.switch.binary",
                "bIdx": 2,
                "page": 1,
                "valueKey": "value",
                "valueType": "boolean",
                "btn": 2,
                "objId": 5,
                "fp": 7,
                "flags": 76,
                "funId": "Switch",
                "rt": ["bh.r.attr.button"],
                "lpress": false
            },
            {
                "objId": 6,
                "fp": 8,
                "rt": ["bh.r.attr.button"],
                "bIdx": 3,
                "funId": "Switch",
                "flags": 76,
                "name": "按键3",
                "style": 0,
                "page": 1,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "btn": 3,
                "lpress": false
            },
            {
                "funId": "Switch",
                "objId": 7,
                "page": 1,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "lpress": false,
                "fp": 9,
                "name": "按键4",
                "valueType": "boolean",
                "btn": 4,
                "flags": 76,
                "bIdx": 4
            },
            {
                "rt": ["bh.r.attr.button"],
                "funId": "Switch",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "lpress": false,
                "fp": 10,
                "page": 1,
                "name": "按键5",
                "bIdx": 5,
                "style": 0,
                "objId": 8,
                "valueType": "boolean",
                "btn": 5
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "objId": 9,
                "page": 1,
                "funId": "Switch",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "lpress": false,
                "bIdx": 6,
                "name": "按键6",
                "style": 0,
                "fp": 11,
                "btn": 6
            },
            {
                "bIdx": 7,
                "rt": ["bh.r.attr.button"],
                "valueType": "boolean",
                "style": 0,
                "createdRT": "oic.r.switch.binary",
                "page": 1,
                "funId": "Switch",
                "valueKey": "value",
                "objId": 10,
                "name": "按键7",
                "flags": 76,
                "btn": 7,
                "lpress": false,
                "fp": 12
            },
            {
                "page": 1,
                "funId": "Switch",
                "name": "按键8",
                "flags": 76,
                "lpress": false,
                "objId": 11,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "style": 0,
                "btn": 8,
                "fp": 13,
                "createdRT": "oic.r.switch.binary",
                "bIdx": 8
            },
            {
                "page": 1,
                "funId": "Switch",
                "name": "LED1",
                "rt": ["bh.r.attr.ctrl"],
                "relBIdx": 1,
                "objId": 12,
                "fp": 14,
                "flags": 156,
                "createdRT": "bh.r.value.bool:2",
                "valueKey": "value",
                "valueType": "boolean",
                "appHidden": true
            },
            {
                "name": "LED2",
                "flags": 156,
                "createdRT": "bh.r.value.bool:3",
                "valueKey": "value",
                "rt": ["bh.r.attr.ctrl"],
                "objId": 13,
                "fp": 15,
                "page": 1,
                "appHidden": true,
                "funId": "Switch",
                "valueType": "boolean",
                "relBIdx": 2
            },
            {
                "fp": 16,
                "funId": "Switch",
                "name": "LED3",
                "createdRT": "bh.r.value.bool:4",
                "rt": ["bh.r.attr.ctrl"],
                "objId": 14,
                "flags": 156,
                "valueKey": "value",
                "valueType": "boolean",
                "relBIdx": 3,
                "appHidden": true,
                "page": 1
            },
            {
                "fp": 17,
                "page": 1,
                "funId": "Switch",
                "name": "LED4",
                "createdRT": "bh.r.value.bool:5",
                "relBIdx": 4,
                "objId": 15,
                "flags": 156,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.ctrl"],
                "appHidden": true
            },
            {
                "fp": 18,
                "createdRT": "bh.r.value.bool:6",
                "valueKey": "value",
                "rt": ["bh.r.attr.ctrl"],
                "appHidden": true,
                "valueType": "boolean",
                "relBIdx": 5,
                "objId": 16,
                "page": 1,
                "funId": "Switch",
                "name": "LED5",
                "flags": 156
            },
            {
                "funId": "Switch",
                "name": "LED6",
                "valueKey": "value",
                "appHidden": true,
                "rt": ["bh.r.attr.ctrl"],
                "relBIdx": 6,
                "objId": 17,
                "fp": 19,
                "page": 1,
                "flags": 156,
                "createdRT": "bh.r.value.bool:7",
                "valueType": "boolean"
            },
            {
                "relBIdx": 7,
                "appHidden": true,
                "objId": 18,
                "fp": 20,
                "funId": "Switch",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.ctrl"],
                "page": 1,
                "name": "LED7",
                "flags": 156,
                "createdRT": "bh.r.value.bool:8"
            },
            {
                "valueKey": "value",
                "objId": 19,
                "page": 1,
                "name": "LED8",
                "flags": 156,
                "rt": ["bh.r.attr.ctrl"],
                "relBIdx": 8,
                "appHidden": true,
                "fp": 21,
                "funId": "Switch",
                "createdRT": "bh.r.value.bool:9",
                "valueType": "boolean"
            }
        ],
        "switch": {
            "pageCount": 1,
            "modifyStyle": true,
            "hasLPress": false,
            "layout": "matrix",
            "btnCnt": 8
        },
        "RS485": {
            "phyConf": {
                "sBit": 1,
                "bRate": 19200,
                "dBit": 8,
                "ptyBit": 0
            },
            "mdbConf": {
                "master": false,
                "broadcast": false,
                "std": true,
                "RTU": true
            }
        }
    },
    {
        "_id": { "$oid": "5ee708bcf4b15e6f54cba40d" },
        "docTag": "60932_AD_ADD-RO-M-04",
        "comPorts": {
            "portCnt": 1
        },
        "deviceType": 60932,
        "hwInfo": {
            "brand": "AdvancedDevices",
            "model": "ADD-RO-M-04",
            "class": "CPB"
        },
        "icon": "d-134.png",
        "image": "AD_ADD-RO-M-04.png",
        "name": "四路干接点桥接器",
        "protocolInfo": [
            {
                "protocol": "MdB",
                "protocolType": "0"
            }
        ],
        "attrs": [
            {
                "flags": 76,
                "fp": 6,
                "valueKey": "value",
                "chId": 1,
                "rt": ["bh.r.attr.contPoint"],
                "objId": 1,
                "funId": "Switch",
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.contPoint"],
                "objId": 2,
                "funId": "Switch",
                "name": "开关",
                "fp": 5,
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 2
            },
            {
                "objId": 3,
                "funId": "Switch",
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 3,
                "flags": 76,
                "fp": 4,
                "valueType": "boolean",
                "rt": ["bh.r.attr.contPoint"]
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 4,
                "objId": 4,
                "funId": "有/无",
                "fp": 3,
                "createdRT": "bh.r.value.bool",
                "name": "",
                "flags": 76,
                "rt": ["bh.r.attr.contPoint"]
            }
        ],
        "RS485": {
            "maxCh": 4,
            "chCnt": 4,
            "phyConf": {
                "ptyBit": 0,
                "sBit": 1,
                "bRate": 9600,
                "dBit": 8
            },
            "mdbConf": {
                "std": true,
                "RTU": true,
                "master": false
            }
        }
    },
    {
        "_id": { "$oid": "5f47677df4b15e6f546f941d" },
        "docTag": "60930_Sation_SW0004.1611",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "Sation",
            "model": "SW0004.1611"
        },
        "icon": "c-2.png",
        "image": "Sation_SW0004.1611.png",
        "name": "4路16A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 1,
                "objId": 1,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 2,
                "objId": 2,
                "name": "开关",
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value"
            },
            {
                "objId": 3,
                "funId": "Switch",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 3,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 4,
                "flags": 148,
                "dpt": "1.001",
                "chId": 4,
                "funId": "Switch",
                "name": "开关",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueKey": "value",
                "ack4Obj": 1,
                "objId": 5,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "objId": 6,
                "funId": "Switch",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 2,
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "name": "开关 状态",
                "dpt": "1.001",
                "valueKey": "value"
            },
            {
                "chId": 3,
                "objId": 7,
                "funId": "Switch",
                "flags": 76,
                "ack4Obj": 3,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "ack4Obj": 4,
                "chId": 4,
                "objId": 8,
                "name": "开关 状态"
            },
            {
                "appHidden": true,
                "objId": 9,
                "funId": "Heartbeat",
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"],
                "valueKey": "value"
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 4,
            "chCnt": 4
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f5b13fcf4b15e6f548dc1a9" },
        "docTag": "60930_Sation_SW0008.1611",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "Sation",
            "model": "SW0008.1611"
        },
        "icon": "c-2.png",
        "image": "Sation_SW0008.1611.png",
        "name": "8路16A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "chId": 1,
                "objId": 1,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 2,
                "funId": "Switch",
                "flags": 148,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2
            },
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 3,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3
            },
            {
                "flags": 148,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 4,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001"
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "funId": "Switch",
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "objId": 5,
                "flags": 148,
                "dpt": "1.001"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "funId": "Switch",
                "valueType": "boolean",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "objId": 6,
                "name": "开关"
            },
            {
                "objId": 7,
                "funId": "Switch",
                "rt": ["bh.r.attr.actuator"],
                "chId": 7,
                "valueKey": "value",
                "valueType": "boolean",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 8,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "chId": 8
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 9,
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "funId": "Switch",
                "valueKey": "value",
                "ack4Obj": 1
            },
            {
                "ack4Obj": 2,
                "objId": 10,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "dpt": "1.001",
                "chId": 2
            },
            {
                "objId": 11,
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 3,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3
            },
            {
                "objId": 12,
                "dpt": "1.001",
                "valueKey": "value",
                "chId": 4,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "flags": 76,
                "dpt": "1.001",
                "valueType": "boolean",
                "ack4Obj": 5,
                "rt": ["bh.r.attr.actuator"],
                "objId": 13,
                "funId": "Switch",
                "name": "开关 状态",
                "chId": 5
            },
            {
                "flags": 76,
                "dpt": "1.001",
                "ack4Obj": 6,
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 6,
                "objId": 14
            },
            {
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 15,
                "dpt": "1.001",
                "valueKey": "value",
                "ack4Obj": 7,
                "rt": ["bh.r.attr.actuator"],
                "chId": 7
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 8,
                "objId": 16,
                "dpt": "1.001",
                "valueType": "boolean",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 8,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76
            },
            {
                "appHidden": true,
                "objId": 17,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "valueType": "boolean",
                "funId": "Heartbeat",
                "name": "心跳",
                "flags": 4,
                "rt": ["bh.r.attr.event"]
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 8,
            "chCnt": 8
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f5b13fdf4b15e6f548dc1ad" },
        "docTag": "60930_Sation_SW0012.1611",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "Sation",
            "model": "SW0012.1611"
        },
        "icon": "c-2.png",
        "image": "Sation_SW0012.1611.png",
        "name": "12路16A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "objId": 1,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1
            },
            {
                "objId": 2,
                "funId": "Switch",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "objId": 3,
                "name": "开关",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "funId": "Switch",
                "flags": 148
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 4,
                "funId": "Switch",
                "name": "开关"
            },
            {
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "objId": 5,
                "funId": "Switch",
                "name": "开关",
                "valueType": "boolean",
                "chId": 5,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "objId": 6,
                "name": "开关",
                "flags": 148,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 6
            },
            {
                "funId": "Switch",
                "flags": 148,
                "valueKey": "value",
                "chId": 7,
                "objId": 7,
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 8,
                "objId": 8,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "chId": 9,
                "objId": 9,
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "name": "开关",
                "dpt": "1.001",
                "valueType": "boolean",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 10,
                "objId": 10,
                "funId": "Switch",
                "flags": 148
            },
            {
                "chId": 11,
                "objId": 11,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "funId": "Switch",
                "name": "开关",
                "flags": 148
            },
            {
                "chId": 12,
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "valueKey": "value",
                "objId": 12,
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001"
            },
            {
                "funId": "Switch",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "ack4Obj": 1,
                "objId": 13,
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "ack4Obj": 2,
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 14,
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value"
            },
            {
                "flags": 76,
                "valueKey": "value",
                "ack4Obj": 3,
                "rt": ["bh.r.attr.actuator"],
                "objId": 15,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 3
            },
            {
                "objId": 16,
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 4,
                "chId": 4,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 17,
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 5,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5
            },
            {
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 6,
                "chId": 6,
                "objId": 18,
                "funId": "Switch",
                "name": "开关 状态",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 19,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 7,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 7
            },
            {
                "ack4Obj": 8,
                "rt": ["bh.r.attr.actuator"],
                "objId": 20,
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "funId": "Switch",
                "valueKey": "value",
                "chId": 8
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 21,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "flags": 76,
                "ack4Obj": 9,
                "rt": ["bh.r.attr.actuator"],
                "chId": 9
            },
            {
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 10,
                "objId": 22,
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 10,
                "name": "开关 状态"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueType": "boolean",
                "ack4Obj": 11,
                "rt": ["bh.r.attr.actuator"],
                "chId": 11,
                "objId": 23,
                "funId": "Switch"
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 12,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 12,
                "rt": ["bh.r.attr.actuator"],
                "objId": 24,
                "name": "开关 状态"
            },
            {
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "rt": ["bh.r.attr.event"],
                "objId": 25,
                "name": "心跳",
                "flags": 4,
                "valueKey": "value",
                "appHidden": true,
                "funId": "Heartbeat"
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 12,
            "chCnt": 12
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f5b21e5f4b15e6f548dd88f" },
        "docTag": "60930_EmbSys_KNXUOR4_10",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "embedded systems",
            "model": "KNXUOR4_10"
        },
        "icon": "c-2.png",
        "image": "EmbSys_KNXUOR4_10.png",
        "name": "4路10A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 1,
                "funId": "Switch",
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "name": "开关",
                "flags": 148,
                "valueType": "boolean",
                "chId": 2,
                "rt": ["bh.r.attr.actuator"],
                "objId": 2,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "chId": 3,
                "objId": 3,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 4,
                "name": "开关",
                "flags": 148,
                "valueType": "boolean"
            },
            {
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "objId": 5,
                "funId": "Switch",
                "name": "开关 状态",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 1
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "dpt": "1.001",
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "ack4Obj": 2,
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 6
            },
            {
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 3,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "name": "开关 状态",
                "funId": "Switch",
                "valueKey": "value",
                "objId": 7
            },
            {
                "funId": "Switch",
                "flags": 76,
                "valueType": "boolean",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "objId": 8,
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 4
            },
            {
                "dpt": "1.006",
                "valueKey": "value",
                "rt": ["bh.r.attr.event"],
                "objId": 9,
                "flags": 4,
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "appHidden": true,
                "funId": "Heartbeat",
                "name": "心跳"
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 4,
            "chCnt": 4
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f5b2273f4b15e6f548dd999" },
        "docTag": "60930_Sation_SW0006.1611",
        "deviceType": 60930,
        "hwInfo": {
            "brand": "Sation",
            "model": "SW0006.1611",
            "class": "A"
        },
        "icon": "c-2.png",
        "image": "Sation_SW0006.1611.png",
        "name": "6路16A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "objId": 1,
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "chId": 1,
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "开关",
                "dpt": "1.001",
                "valueType": "boolean",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 2,
                "funId": "Switch",
                "flags": 148
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 3,
                "dpt": "1.001",
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "funId": "Switch",
                "name": "开关"
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 4,
                "name": "开关",
                "flags": 148,
                "valueType": "boolean"
            },
            {
                "objId": 5,
                "funId": "Switch",
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "name": "开关",
                "funId": "Switch",
                "valueKey": "value",
                "objId": 6
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "objId": 7,
                "funId": "Switch",
                "name": "开关 状态",
                "valueType": "boolean",
                "ack4Obj": 1,
                "chId": 1,
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "objId": 8,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 2,
                "chId": 2,
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 9,
                "name": "开关 状态",
                "flags": 76,
                "ack4Obj": 3,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3
            },
            {
                "objId": 10,
                "name": "开关 状态",
                "valueKey": "value",
                "chId": 4,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "ack4Obj": 5,
                "rt": ["bh.r.attr.actuator"],
                "objId": 11,
                "name": "开关 状态",
                "flags": 76,
                "valueKey": "value",
                "chId": 5,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "chId": 6,
                "name": "开关 状态",
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 6,
                "rt": ["bh.r.attr.actuator"],
                "objId": 12,
                "funId": "Switch",
                "flags": 76,
                "createdRT": "oic.r.switch.binary"
            },
            {
                "objId": 13,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "valueType": "boolean",
                "funId": "Heartbeat",
                "name": "心跳",
                "flags": 4,
                "appHidden": true,
                "rt": ["bh.r.attr.event"]
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "chCnt": 6,
            "maxCh": 6
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f5b269ef4b15e6f548de37f" },
        "docTag": "60930_EmbSys_KNXUOR4_16",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "embedded systems",
            "model": "KNXUOR4_16"
        },
        "icon": "c-2.png",
        "image": "EmbSys_KNXUOR4_16.png",
        "name": "12路16A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "flags": 148,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 1,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 1
            },
            {
                "chId": 2,
                "funId": "Switch",
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 2,
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean"
            },
            {
                "valueType": "boolean",
                "chId": 3,
                "objId": 3,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueType": "boolean",
                "objId": 4,
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "name": "开关",
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4
            },
            {
                "objId": 5,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5
            },
            {
                "name": "开关",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 6,
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 6
            },
            {
                "valueType": "boolean",
                "name": "开关",
                "dpt": "1.001",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 7,
                "objId": 7,
                "funId": "Switch"
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 8,
                "flags": 148,
                "valueKey": "value",
                "chId": 8,
                "name": "开关"
            },
            {
                "objId": 9,
                "funId": "Switch",
                "flags": 148,
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 9,
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "chId": 10,
                "objId": 10,
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "name": "开关",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 11,
                "name": "开关",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 11,
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "chId": 12,
                "rt": ["bh.r.attr.actuator"],
                "objId": 12,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "objId": 13,
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 1,
                "chId": 1,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "ack4Obj": 2,
                "chId": 2,
                "objId": 14,
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "dpt": "1.001",
                "valueType": "boolean",
                "ack4Obj": 3,
                "chId": 3,
                "funId": "Switch",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 15,
                "name": "开关 状态"
            },
            {
                "chId": 4,
                "objId": 16,
                "flags": 76,
                "valueKey": "value",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean"
            },
            {
                "ack4Obj": 5,
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 5,
                "objId": 17,
                "funId": "Switch"
            },
            {
                "name": "开关 状态",
                "ack4Obj": 6,
                "chId": 6,
                "rt": ["bh.r.attr.actuator"],
                "objId": 18,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 76,
                "valueKey": "value",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 7,
                "chId": 7,
                "objId": 19,
                "name": "开关 状态",
                "dpt": "1.001"
            },
            {
                "flags": 76,
                "valueType": "boolean",
                "chId": 8,
                "objId": 20,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 8,
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "dpt": "1.001"
            },
            {
                "objId": 21,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 9,
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 9
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 10,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "name": "开关 状态",
                "flags": 76,
                "rt": ["bh.r.attr.actuator"],
                "chId": 10,
                "objId": 22,
                "funId": "Switch"
            },
            {
                "name": "开关 状态",
                "valueKey": "value",
                "chId": 11,
                "objId": 23,
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 11,
                "rt": ["bh.r.attr.actuator"],
                "flags": 76,
                "dpt": "1.001"
            },
            {
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 12,
                "objId": 24,
                "valueKey": "value",
                "ack4Obj": 12,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch"
            },
            {
                "name": "心跳",
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 25,
                "funId": "Heartbeat",
                "flags": 4,
                "appHidden": true,
                "rt": ["bh.r.attr.event"]
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 12,
            "chCnt": 12
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f5b27fff4b15e6f548de68b" },
        "docTag": "60930_EmbSys_KNXUOR12_16",
        "deviceType": 60930,
        "hwInfo": {
            "brand": "embedded systems",
            "model": "KNXUOR12_16",
            "class": "A"
        },
        "icon": "c-2.png",
        "image": "EmbSys_KNXUOR12_16.png",
        "name": "12路16A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "valueKey": "value",
                "flags": 148,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "objId": 1
            },
            {
                "valueType": "boolean",
                "chId": 2,
                "objId": 2,
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 148
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 3,
                "objId": 3,
                "name": "开关"
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 4,
                "name": "开关",
                "dpt": "1.001",
                "funId": "Switch",
                "flags": 148,
                "valueType": "boolean"
            },
            {
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "objId": 5,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "objId": 6,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "createdRT": "oic.r.switch.binary",
                "chId": 6
            },
            {
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 7,
                "objId": 7,
                "name": "开关",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 8,
                "rt": ["bh.r.attr.actuator"],
                "objId": 8,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 9,
                "dpt": "1.001",
                "valueKey": "value",
                "chId": 9
            },
            {
                "flags": 148,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 10,
                "objId": 10,
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "funId": "Switch"
            },
            {
                "funId": "Switch",
                "flags": 148,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 11,
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "chId": 11
            },
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "chId": 12,
                "objId": 12,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "ack4Obj": 1,
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "name": "开关 状态",
                "dpt": "1.001",
                "valueType": "boolean",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "objId": 13,
                "funId": "Switch",
                "flags": 76
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 14,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "dpt": "1.001",
                "valueKey": "value",
                "ack4Obj": 2
            },
            {
                "flags": 76,
                "ack4Obj": 3,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 15,
                "funId": "Switch",
                "name": "开关 状态",
                "valueType": "boolean",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "objId": 16,
                "name": "开关 状态",
                "flags": 76,
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 4
            },
            {
                "ack4Obj": 5,
                "chId": 5,
                "objId": 17,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "objId": 18,
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 6,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 6,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76
            },
            {
                "name": "开关 状态",
                "flags": 76,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 7,
                "objId": 19,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 7
            },
            {
                "objId": 20,
                "ack4Obj": 8,
                "chId": 8,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "chId": 9,
                "objId": 21,
                "name": "开关 状态",
                "flags": 76,
                "valueKey": "value",
                "valueType": "boolean",
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 9
            },
            {
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 10,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "objId": 22,
                "createdRT": "oic.r.switch.binary",
                "chId": 10
            },
            {
                "flags": 76,
                "valueType": "boolean",
                "ack4Obj": 11,
                "rt": ["bh.r.attr.actuator"],
                "chId": 11,
                "objId": 23,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 12,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 12,
                "objId": 24
            },
            {
                "rt": ["bh.r.attr.event"],
                "objId": 25,
                "name": "心跳",
                "flags": 4,
                "valueType": "boolean",
                "appHidden": true,
                "funId": "Heartbeat",
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value"
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 12,
            "chCnt": 12
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f5ece10f4b15e6f54934b96" },
        "docTag": "60930_Sation_SW0004.2010",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "Sation",
            "model": "SW0004.2010"
        },
        "icon": "c-2.png",
        "image": "Sation_SW0004.2010.png",
        "name": "4路20A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 1,
                "objId": 1,
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "开关",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 2,
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 2
            },
            {
                "objId": 3,
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "objId": 4,
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 4
            },
            {
                "objId": 5,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关 状态",
                "flags": 76,
                "valueKey": "value",
                "ack4Obj": 1,
                "chId": 1
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 6,
                "name": "开关 状态",
                "dpt": "1.001",
                "ack4Obj": 2,
                "funId": "Switch",
                "flags": 76,
                "valueType": "boolean"
            },
            {
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "chId": 3,
                "objId": 7,
                "valueType": "boolean",
                "ack4Obj": 3,
                "rt": ["bh.r.attr.actuator"],
                "createdRT": "oic.r.switch.binary"
            },
            {
                "objId": 8,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "valueType": "boolean",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "chId": 4
            },
            {
                "valueType": "boolean",
                "appHidden": true,
                "rt": ["bh.r.attr.event"],
                "funId": "Heartbeat",
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueKey": "value",
                "objId": 9,
                "name": "心跳",
                "flags": 4
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 4,
            "chCnt": 4
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f5ece11f4b15e6f54934b9a" },
        "docTag": "60930_Sation_SW0006.2010",
        "deviceType": 60930,
        "hwInfo": {
            "model": "SW0006.2010",
            "class": "A",
            "brand": "Sation"
        },
        "icon": "c-2.png",
        "image": "Sation_SW0006.2010.png",
        "name": "6路20A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "name": "开关",
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 1
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 2,
                "objId": 2,
                "flags": 148,
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关"
            },
            {
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 3,
                "funId": "Switch",
                "name": "开关"
            },
            {
                "chId": 4,
                "objId": 4,
                "funId": "Switch",
                "name": "开关",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 5,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "chId": 5
            },
            {
                "objId": 6,
                "funId": "Switch",
                "name": "开关",
                "valueKey": "value",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 6
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "ack4Obj": 1,
                "chId": 1,
                "rt": ["bh.r.attr.actuator"],
                "objId": 7,
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "chId": 2,
                "objId": 8,
                "name": "开关 状态",
                "flags": 76,
                "valueType": "boolean",
                "ack4Obj": 2,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "ack4Obj": 3,
                "objId": 9,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "flags": 76
            },
            {
                "chId": 4,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 4,
                "rt": ["bh.r.attr.actuator"],
                "valueKey": "value",
                "valueType": "boolean",
                "objId": 10,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76
            },
            {
                "name": "开关 状态",
                "flags": 76,
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 5,
                "chId": 5,
                "objId": 11,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch"
            },
            {
                "objId": 12,
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "chId": 6,
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 6
            },
            {
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "objId": 13,
                "funId": "Heartbeat",
                "name": "心跳",
                "flags": 4,
                "dpt": "1.006",
                "valueKey": "value",
                "appHidden": true,
                "rt": ["bh.r.attr.event"]
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 6,
            "chCnt": 6
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f5ece11f4b15e6f54934b9e" },
        "docTag": "60930_Sation_SW0008.2010",
        "deviceType": 60930,
        "hwInfo": {
            "brand": "Sation",
            "model": "SW0008.2010",
            "class": "A"
        },
        "icon": "c-2.png",
        "image": "Sation_SW0008.2010.png",
        "name": "8路20A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 1,
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "objId": 1,
                "flags": 148
            },
            {
                "name": "开关",
                "flags": 148,
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 2,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "chId": 3,
                "objId": 3
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 4,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "valueKey": "value"
            },
            {
                "objId": 5,
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关",
                "dpt": "1.001",
                "chId": 5
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "objId": 6,
                "funId": "Switch",
                "valueType": "boolean",
                "chId": 6,
                "name": "开关",
                "flags": 148
            },
            {
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "objId": 7,
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 7
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 8,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "chId": 8,
                "funId": "Switch"
            },
            {
                "objId": 9,
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "chId": 1,
                "funId": "Switch",
                "dpt": "1.001",
                "valueKey": "value",
                "ack4Obj": 1,
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "objId": 10,
                "flags": 76,
                "ack4Obj": 2,
                "chId": 2
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "flags": 76,
                "dpt": "1.001",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 3,
                "rt": ["bh.r.attr.actuator"],
                "chId": 3,
                "objId": 11,
                "funId": "Switch"
            },
            {
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 12,
                "funId": "Switch",
                "name": "开关 状态",
                "dpt": "1.001",
                "ack4Obj": 4,
                "chId": 4
            },
            {
                "name": "开关 状态",
                "dpt": "1.001",
                "ack4Obj": 5,
                "rt": ["bh.r.attr.actuator"],
                "objId": 13,
                "funId": "Switch",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 5,
                "flags": 76,
                "createdRT": "oic.r.switch.binary"
            },
            {
                "name": "开关 状态",
                "flags": 76,
                "ack4Obj": 6,
                "rt": ["bh.r.attr.actuator"],
                "chId": 6,
                "objId": 14,
                "funId": "Switch",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "ack4Obj": 7,
                "chId": 7,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "objId": 15,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 8,
                "objId": 16,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 8
            },
            {
                "flags": 4,
                "valueKey": "value",
                "rt": ["bh.r.attr.event"],
                "funId": "Heartbeat",
                "name": "心跳",
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "appHidden": true,
                "objId": 17,
                "dpt": "1.006"
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 8,
            "chCnt": 8
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f5ece11f4b15e6f54934ba3" },
        "docTag": "60930_Sation_SW0012.2010",
        "deviceType": 60930,
        "hwInfo": {
            "class": "A",
            "brand": "Sation",
            "model": "SW0012.2010"
        },
        "icon": "c-2.png",
        "image": "Sation_SW0012.2010.png",
        "name": "12路20A开关执行器",
        "protocolInfo": [
            {
                "protocol": "KNX"
            }
        ],
        "attrs": [
            {
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 1,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "chId": 1
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 2,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "objId": 2,
                "funId": "Switch"
            },
            {
                "chId": 3,
                "objId": 3,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "valueKey": "value",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "name": "开关",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "dpt": "1.001",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 4,
                "objId": 4,
                "funId": "Switch",
                "flags": 148
            },
            {
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 5,
                "funId": "Switch",
                "valueKey": "value",
                "chId": 5
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 6,
                "name": "开关",
                "dpt": "1.001",
                "funId": "Switch",
                "flags": 148,
                "chId": 6
            },
            {
                "objId": 7,
                "name": "开关",
                "valueType": "boolean",
                "chId": 7,
                "funId": "Switch",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "objId": 8,
                "funId": "Switch",
                "flags": 148,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "name": "开关",
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 8
            },
            {
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 9,
                "objId": 9,
                "name": "开关",
                "dpt": "1.001",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "flags": 148
            },
            {
                "funId": "Switch",
                "name": "开关",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "objId": 10,
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 10,
                "flags": 148
            },
            {
                "funId": "Switch",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 11,
                "objId": 11,
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 12,
                "objId": 12,
                "funId": "Switch",
                "name": "开关",
                "flags": 148,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary"
            },
            {
                "objId": 13,
                "funId": "Switch",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"],
                "chId": 1,
                "flags": 76,
                "dpt": "1.001",
                "valueType": "boolean",
                "ack4Obj": 1
            },
            {
                "funId": "Switch",
                "dpt": "1.001",
                "valueType": "boolean",
                "ack4Obj": 2,
                "rt": ["bh.r.attr.actuator"],
                "chId": 2,
                "objId": 14,
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value"
            },
            {
                "objId": 15,
                "funId": "Switch",
                "dpt": "1.001",
                "ack4Obj": 3,
                "chId": 3,
                "name": "开关 状态",
                "flags": 76,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "flags": 76,
                "valueKey": "value",
                "valueType": "boolean",
                "ack4Obj": 4,
                "chId": 4,
                "objId": 16,
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch"
            },
            {
                "objId": 17,
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 5,
                "rt": ["bh.r.attr.actuator"],
                "chId": 5,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "valueKey": "value",
                "chId": 6,
                "objId": 18,
                "funId": "Switch",
                "name": "开关 状态",
                "flags": 76,
                "rt": ["bh.r.attr.actuator"],
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "ack4Obj": 6
            },
            {
                "objId": 19,
                "flags": 76,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 7,
                "funId": "Switch",
                "name": "开关 状态",
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "ack4Obj": 7
            },
            {
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 8,
                "chId": 8,
                "name": "开关 状态",
                "flags": 76,
                "dpt": "1.001",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "objId": 20,
                "funId": "Switch",
                "valueKey": "value"
            },
            {
                "valueKey": "value",
                "ack4Obj": 9,
                "objId": 21,
                "name": "开关 状态",
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "rt": ["bh.r.attr.actuator"],
                "chId": 9,
                "funId": "Switch",
                "flags": 76
            },
            {
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "ack4Obj": 10,
                "rt": ["bh.r.attr.actuator"],
                "objId": 22,
                "name": "开关 状态",
                "flags": 76,
                "chId": 10,
                "funId": "Switch",
                "valueKey": "value",
                "valueType": "boolean"
            },
            {
                "rt": ["bh.r.attr.actuator"],
                "funId": "Switch",
                "name": "开关 状态",
                "ack4Obj": 11,
                "createdRT": "oic.r.switch.binary",
                "valueKey": "value",
                "valueType": "boolean",
                "chId": 11,
                "objId": 23,
                "flags": 76,
                "dpt": "1.001"
            },
            {
                "ack4Obj": 12,
                "chId": 12,
                "funId": "Switch",
                "flags": 76,
                "dpt": "1.001",
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "objId": 24,
                "name": "开关 状态",
                "valueKey": "value",
                "rt": ["bh.r.attr.actuator"]
            },
            {
                "valueType": "boolean",
                "appHidden": true,
                "objId": 25,
                "createdRT": "bh.r.dvHeartbeat",
                "flags": 4,
                "dpt": "1.006",
                "valueKey": "value",
                "rt": ["bh.r.attr.event"],
                "funId": "Heartbeat",
                "name": "心跳"
            }
        ],
        "heartbeat": 5,
        "KNX": {
            "maxCh": 12,
            "chCnt": 12
        },
        "commInfo": {
            "protocol4GW": "KNX"
        }
    },
    {
        "_id": { "$oid": "5f6b2e86f4b15e6f54a89f84" },
        "docTag": "00264_EmbSys_IMTP3T_S",
        "comPorts": {
            "portCnt": 0
        },
        "deviceType": 264,
        "hwInfo": {
            "brand": "embedded systems",
            "model": "IMTP3T_S",
            "class": "S"
        },
        "icon": "d-71.png",
        "image": "EmbSys_IMTP3T_S.png",
        "name": "温控器",
        "protocolInfo": [
            {
                "protocol": "MdB"
            }
        ],
        "attrs": [
            {
                "funId": "Value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "bIdx": 1,
                "lpress": false,
                "appHidden": true,
                "name": "空调页面（无需设定）",
                "flags": 0,
                "createdRT": "bh.r.value.bool",
                "valueKey": "value",
                "page": 1,
                "objId": 1,
                "btn": 1,
                "style": 0,
                "hidden": false
            },
            {
                "page": 1,
                "createdRT": "oic.r.switch.binary",
                "rt": ["bh.r.attr.button"],
                "bIdx": 2,
                "style": 0,
                "valueKey": "value",
                "hidden": false,
                "objId": 2,
                "funId": "Switch",
                "flags": 212,
                "valueType": "boolean",
                "appHidden": true,
                "name": "空调开关",
                "btn": 2,
                "lpress": false
            },
            {
                "appHidden": true,
                "flags": 212,
                "createdRT": "bh.r.hvac.ctrlMode",
                "btn": 3,
                "style": 0,
                "hidden": false,
                "page": 1,
                "valueType": "integer",
                "rt": ["bh.r.attr.button"],
                "objId": 3,
                "funId": "HVAC",
                "bIdx": 3,
                "lpress": false,
                "name": "空调模式设定",
                "valueKey": "value"
            },
            {
                "hidden": false,
                "funId": "HVAC",
                "flags": 212,
                "createdRT": "bh.r.airFlow.level",
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "appHidden": true,
                "objId": 4,
                "valueType": "integer",
                "btn": 4,
                "style": 0,
                "lpress": false,
                "name": "空调风速设定",
                "bIdx": 4,
                "page": 1
            },
            {
                "funId": "Temperature",
                "btn": 4,
                "flags": 212,
                "valueKey": "value",
                "bIdx": 5,
                "appHidden": true,
                "objId": 5,
                "name": "空调温度设定",
                "valueType": "number",
                "style": 1,
                "lpress": false,
                "hidden": false,
                "page": 1,
                "createdRT": "bh.r.temperature:setpoint",
                "rt": ["bh.r.attr.button"]
            },
            {
                "rt": ["bh.r.attr.sensor"],
                "objId": 6,
                "page": 1,
                "valueKey": "value",
                "createdRT": "bh.r.hvac.ctrlMode.FanAuto",
                "valueType": "boolean",
                "appHidden": true,
                "funId": "Command",
                "name": "空调风速自动",
                "flags": 212
            },
            {
                "funId": "Heartbeat",
                "valueKey": "value",
                "flags": 4,
                "dpt": "1.006",
                "createdRT": "bh.r.dvHeartbeat",
                "valueType": "boolean",
                "appHidden": true,
                "objId": 7,
                "page": 1,
                "name": "心跳",
                "rt": ["bh.r.attr.event"]
            },
            {
                "objId": 8,
                "page": 1,
                "createdRT": "bh.r.temperature:current",
                "valueType": "number",
                "rt": ["bh.r.attr.sensor"],
                "funId": "Temperature",
                "name": "当前温度",
                "flags": 204,
                "valueKey": "value",
                "range": [-5, 45],
                "step": 1
            },
            {
                "valueKey": "value",
                "style": 0,
                "objId": 9,
                "rt": ["bh.r.attr.button"],
                "flags": 0,
                "hidden": false,
                "createdRT": "bh.r.value.bool",
                "funId": "Value",
                "name": "地暖普通页面(无需设定)",
                "valueType": "boolean",
                "bIdx": 1,
                "btn": 1,
                "lpress": false,
                "appHidden": true,
                "page": 2
            },
            {
                "page": 2,
                "createdRT": "oic.r.switch.binary",
                "valueType": "boolean",
                "bIdx": 2,
                "lpress": false,
                "objId": 10,
                "name": "地暖开关",
                "flags": 212,
                "style": 0,
                "funId": "Switch",
                "rt": ["bh.r.attr.button"],
                "valueKey": "value",
                "btn": 2,
                "hidden": false,
                "appHidden": true
            },
            {
                "bIdx": 3,
                "lpress": false,
                "flags": 0,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "createdRT": "bh.r.value.bool",
                "valueType": "boolean",
                "btn": 3,
                "style": 0,
                "objId": 11,
                "page": 2,
                "funId": "Value",
                "appHidden": true,
                "name": "地暖模式切换(无需设定)",
                "dpt": "1.002",
                "hidden": false
            },
            {
                "objId": 12,
                "name": "地暖普通温度设定",
                "flags": 212,
                "btn": 4,
                "style": 1,
                "valueType": "number",
                "rt": ["bh.r.attr.button"],
                "lpress": false,
                "page": 2,
                "funId": "Temperature",
                "hidden": false,
                "createdRT": "bh.r.temperature:heat",
                "valueKey": "value",
                "bIdx": 5,
                "appHidden": true
            },
            {
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "bIdx": 3,
                "lpress": false,
                "page": 2,
                "flags": 0,
                "valueType": "boolean",
                "style": 0,
                "funId": "Value",
                "appHidden": true,
                "btn": 3,
                "name": "地暖模式切换",
                "createdRT": "bh.r.value.bool",
                "hidden": false,
                "objId": 13
            },
            {
                "name": "地暖通道1开关(无需设定)",
                "flags": 0,
                "style": 0,
                "appHidden": true,
                "funId": "Value",
                "dpt": "1.002",
                "createdRT": "bh.r.value.bool",
                "valueType": "boolean",
                "bIdx": 2,
                "lpress": false,
                "hidden": false,
                "page": 9,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "objId": 14,
                "btn": 2
            },
            {
                "lpress": false,
                "hidden": false,
                "valueType": "boolean",
                "style": 0,
                "appHidden": true,
                "funId": "Value",
                "dpt": "1.002",
                "name": "地暖通道1模式切换(无需设定)",
                "createdRT": "bh.r.value.bool",
                "bIdx": 3,
                "objId": 15,
                "page": 9,
                "rt": ["bh.r.attr.button"],
                "btn": 3,
                "flags": 0,
                "valueKey": "value"
            },
            {
                "bIdx": 1,
                "objId": 16,
                "page": 3,
                "valueType": "boolean",
                "style": 0,
                "hidden": false,
                "appHidden": true,
                "funId": "Value",
                "createdRT": "bh.r.value.bool",
                "name": "新风页面(无需设定)",
                "flags": 0,
                "valueKey": "value",
                "rt": ["bh.r.attr.button"],
                "btn": 1,
                "lpress": false
            },
            {
                "funId": "Switch",
                "createdRT": "oic.r.switch.binary",
                "hidden": false,
                "name": "新风开关",
                "bIdx": 2,
                "appHidden": true,
                "objId": 17,
                "page": 3,
                "flags": 212,
                "btn": 2,
                "lpress": false,
                "valueKey": "value",
                "valueType": "boolean",
                "rt": ["bh.r.attr.button"],
                "style": 0
            },
            {
                "flags": 212,
                "valueType": "integer",
                "appHidden": true,
                "page": 3,
                "bIdx": 4,
                "btn": 4,
                "hidden": false,
                "funId": "HVAC",
                "rt": ["bh.r.attr.button"],
                "lpress": false,
                "objId": 18,
                "name": "新风风速设定",
                "createdRT": "bh.r.airFlow.level",
                "valueKey": "value",
                "style": 0
            }
        ],
        "switch": {
            "layout": "matrix",
            "btnCnt": 4,
            "pageCount": 3,
            "modifyStyle": false,
            "hasLPress": false
        },
        "RS485": {
            "maxCh": 64,
            "phyConf": {
                "bRate": 9600,
                "dBit": 8,
                "ptyBit": 1,
                "sBit": 1
            },
            "mdbConf": {
                "master": false,
                "broadcast": false,
                "std": true,
                "RTU": true
            },
            "multiTopo": true,
            "chCnt": 2
        },
        "heartbeat": 30,
        "commInfo": {
            "protocol4GW": "MdB"
        },
        "period": 60
    },
    {
        "_id": { "$oid": "5fb7931d09ae18a0a29766c4" },
        "docTag": "61184_AD_ADM-S2-K1M4",
        "comPorts": {
            "portCnt": 4
        },
        "deviceType": 61184,
        "hwInfo": {
            "class": "GW",
            "brand": "AdvancedDevices",
            "model": "ADM-S2-K1M4"
        },
        "icon": "g-1.png",
        "image": "AD_ADM-S2-K1M4.png",
        "name": "IoT网关",
        "protocolInfo": [
            {
                "protocol": "EtN"
            },
            {
                "protocol": "MdB"
            },
            {
                "protocol": "KNX"
            }
        ],
        "KNX": {
            "isIPR": true
        },
        "commInfo": {
            "protocol4GW": "EtN",
            "KNX": {
                "pAddr": "1/1/1"
            }
        },
        "networkCardCnt": 2
    }
];
