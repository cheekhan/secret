import { select, arc } from 'd3'
// 五行，五行关系，和判断五行关系的函数
enum wuxing {
    '金' = '金',
    '水' = '水',
    '木' = '木',
    '火' = '火',
    '土' = '土',
}
type wxRelation = '生' | '被生' | '被克' | '克' | '相同'
function getWxRelatin(f: wuxing, s: wuxing): wxRelation {
    const relationMap: Record<wuxing, Record<wuxing, wxRelation>> = {
        金: {
            水: '生',
            木: '克',
            火: '被克',
            土: '被生',
            金: '相同',
        },
        土: {
            金: '生',
            火: '被生',
            木: '被克',
            水: '克',
            土: '相同',
        },
        木: {
            火: '生',
            土: '克',
            金: '被克',
            水: '被生',
            木: '相同',
        },
        水: {
            金: '被生',
            木: '生',
            火: '克',
            土: '被克',
            水: '相同',
        },
        火: {
            土: '生',
            木: '被生',
            金: '克',
            水: '被克',
            火: '相同',
        },
    }
    return relationMap[f][s]
}

enum stems {
    '甲' = 0,
    '乙',
    '丙',
    '丁',
    '戊',
    '己',
    '庚',
    '辛',
    '壬',
    '癸',
}
enum branches {
    '子' = 0,
    '丑',
    '寅',
    '卯',
    '辰',
    '巳',
    '午',
    '未',
    '申',
    '酉',
    '戌',
    '亥',
}
/**
 * 获取地支的五行属性
 * @param branch
 * @returns
 */
function getBranchesWx(branch: branches): wuxing {
    switch (branch) {
        case branches.子:
            return wuxing.水
        case branches.丑:
            return wuxing.土
        case branches.寅:
            return wuxing.木
        case branches.卯:
            return wuxing.木
        case branches.辰:
            return wuxing.土
        case branches.巳:
            return wuxing.火
        case branches.午:
            return wuxing.火
        case branches.未:
            return wuxing.土
        case branches.申:
            return wuxing.金
        case branches.酉:
            return wuxing.金
        case branches.戌:
            return wuxing.土
        case branches.亥:
            return wuxing.水
        default:
            throw new Error()
    }
}

enum godes {
    '贵人',
    '螣蛇',
    '朱雀',
    '六合',
    '勾陈',
    '青龙',
    '天空',
    '白虎',
    '太常',
    '玄武',
    '太阴',
    '天后',
}

export { wuxing, getWxRelatin, stems, branches, getBranchesWx, godes }
export type { wxRelation }

/** 创建svg容器 */
export function useSvg(el: HTMLElement, w: number, h: number) {
    const svg = select(el).append('svg').attr('width', w).attr('height', h)
    return svg
}
/**
 * 创建一个 12 分之 1 的弧形
 * @param inner 弧形内径
 * @param outer 弧形外径
 */
export function use12Pie(inner: number, outer: number) {
    const len = 12 // 12分之一
    const arcGener = arc()
    const angleStep = (2 * Math.PI) / len // 角度
    const angleStart = Math.PI - angleStep / 2 // 开始角度
    const pathD = arcGener({
        innerRadius: inner,
        outerRadius: outer,
        startAngle: angleStart,
        endAngle: angleStart + angleStep,
    })
    return {
        path: pathD,
        angle: angleStep,
    }
}

// 使用的颜色
enum Color {
    金 = '#909399', // 五行颜色
    水 = '#409EFF', // 深蓝
    木 = '#67C23A', // 绿色
    火 = '#F56C6C', // 红色
    土 = '#E6A23C', // 黄色
    darkFont = '#000000', // 暗色文字
    linghtFont = '#ffffff',
    GodBg = '#003152', // 神将背景色
    CenterBg = '#191919', // 圆心的背景色
    linghtBorder = '#414243', // 灰色边框
}

const size = {
    width: 500,
    height: 500,
    stemsSize: [180, 130],
    godesSize: [130, 80],
    wuxingSize: 80,
}

export { Color, size }

/** 生成一个甲子 */
class JiaZi {
    private set: Array<[number, number]> = []
    private year: [stems, branches] = [1, 5] // 年的计算锚点,2025 乙巳年
    private day: [stems, branches] = [7, 9] // 日的计算锚点，2025.04.22 辛酉日
    private yearIndex = 41
    private dayIndex = 57
    constructor() {
        let s = 0 // 天干
        let b = 0 // 地址
        let num = 0
        for (; num < 60; ) {
            this.set.push([s, b])
            s = ++s >= 10 ? 0 : s
            b = ++b >= 12 ? 0 : b
            num++
        }
        // console.log(this.set)
    }
    /**
     * 获取某个年份的干支信息，默认是2025
     * @param y
     */
    getYear(y?: number): [stems, branches] {
        if (y) {
            const step = 2025 - y
            return this.set[(this.yearIndex + step) % 59]
        } else {
            return this.year
        }
    }
    /**
     * 获取某个日期的干支
     * @param d
     * @returns
     */
    getDay(d: Date) {
        let step = new Date('2025/04/22').getTime() - d.getTime()
        step = step / (1000 * 60 * 60 * 24)
        step = Math.ceil(step)
        return this.set[(this.dayIndex + step) % 59]
    }
}

const jiazi = new JiaZi()

export { jiazi }
