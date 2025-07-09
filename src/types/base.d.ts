export type stemType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 // 天干
export type branchType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type ganzhiType = [stemType, branchType]

// 四柱信息
export type FourInfoType = [ganzhiType, ganzhiType, ganzhiType, ganzhiType]
