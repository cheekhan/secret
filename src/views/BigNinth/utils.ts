import { select, arc } from "d3"

/** 创建svg容器 */
export function useSvg(el: HTMLElement, w: number, h: number) {
    const svg = select(el).append('svg').attr('width', w).attr('height', h);
    return svg
}

/**
 * 创建一整圈饼
 * @param inner 
 * @param outer 
 * @param items 
 */
export function useArcPath(
    inner: number,
    outer: number,
    len: number,
) {
    const arcGener = arc();
    // const len = items.length;
    const angleStep = 2 * Math.PI / len; // 每一块的角度
    const angleStart = Math.PI - angleStep / 2; // 开始角度
    // 每一个块的path
    const pathD = arcGener({
        innerRadius: inner,
        outerRadius: outer,
        startAngle: angleStart,
        endAngle: angleStart + angleStep
    })
    return {
        path: pathD,
        angle: angleStep
    }
}

// 地支枚举
type earthBranchesType =
    '子' |
    '丑' |
    '寅' |
    '卯' |
    '辰' |
    '巳' |
    '午' |
    '未' |
    '申' |
    '酉' |
    '戌' |
    '亥'

const earthBranches: Array<earthBranchesType> = [
    '子',
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
    '亥'
]

// 天干枚举
type celestialStemsType =
    '甲' |
    '乙' |
    '丙' |
    '丁' |
    '戊' |
    '己' |
    '庚' |
    '辛' |
    '壬' |
    '癸'

const celestialStems: Array<celestialStemsType> = [
    '甲',
    '乙',
    '丙',
    '丁',
    '戊',
    '己',
    '庚',
    '辛',
    '壬',
    '癸',
]
// 阴阳
enum Yinyang {
    '阴' = 0,
    '阳' = 1
}

export {
    earthBranches,
    celestialStems,
    Yinyang
}

/** 从天干,获取寄宫所在的地支 */
export function getBranchFromStem(stem: celestialStemsType): earthBranchesType {
    switch (stem) {
        case '甲':
            return '寅';
        case '乙':
            return '辰'
        case '丁':
            return '未'
        case '戊':
            return '巳'
        case '己':
            return '未'
        case '庚':
            return '申'
        case '辛':
            return '戌'
        case '壬':
            return '亥'
        case '癸':
            return '丑'
        case '丙':
            return '巳'
    }
}

/** 从天干,获取寄宫所在的地支 */
export function getStemFromBranch(branch: earthBranchesType): celestialStemsType[] {
    switch (branch) {
        case '寅':
            return ['甲'];
        case '辰':
            return ['乙']
        case '未':
            return ['丁', '己']
        case '巳':
            return ['戊', '丙'];
        case '申':
            return ['庚']
        case '戌':
            return ['辛']
        case '亥':
            return ['壬']
        case '丑':
            return ['癸']
        default:
            return []
    }
}