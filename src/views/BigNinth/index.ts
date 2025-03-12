import { useArcPath, earthBranches, getStemFromBranch } from "./utils";
import type { Selection } from "d3"

// 尺寸信息
const SizeInfo = {
    width: 450,
    height: 450,
    branchesSize: [225, 165],
    stemsSize: [125, 80]
    // 地盘:100
    // 天盘:70
}
// 使用的颜色
enum Color {
    BranchBg = '#ff8c00', // 地盘背景色
    BranchColor = '#000',// 地盘文字颜色
    BranchStem = "#000",// 地盘寄宫颜色
    StemBg = '#0f4b05', // 天盘背景色
    StemColor = '#ffffff', // 天盘文字颜色
    Border = "#4a3d4d", // 边框
    BorderLight = '#c6d6e6',// 亮色的边框
    GodBg = '#2C363F', // 12神将颜色信息
    GodColor = '#ffffff'
}
/** 创建地盘 */
export function use12Branches(
    container: Selection<SVGSVGElement, any, any, any>
): Selection<SVGGElement, any, any, any> {
    // 计算每个地支的角度
    const pathAngle = useArcPath(SizeInfo.branchesSize[0], SizeInfo.branchesSize[1], 12); // 路径和角度

    // 创建一个g元素，用于包裹所有地支
    const g = container.append('g');
    // 设置g元素的transform属性，使其中心在SVG画布的中心
    g.attr('transform', "translate(225,225)");
    // 绑定地支数据
    const branchesGroup = g.selectAll('g')
        .data(earthBranches) // 将地支数据绑定到g元素上
        .join('g'); // 如果数据存在则更新，否则创建新元素

    // 为每个地支设置旋转角度
    branchesGroup
        .attr('transform', (_, i) => `rotate(${i * pathAngle.angle * (180 / Math.PI)})`)
        .append('path').attr('d', pathAngle.path) // 绘制路径
        .attr('fill', Color.BranchBg)
        .attr('stroke', Color.Border)
        .attr('stroke-width', 1);
    // 添加地支文本标签
    branchesGroup.append('text').text(d => d) // 显示地支名称
        .attr('fill', Color.BranchColor) // 设置颜色
        .style('font-size', 18).style('font-weight', 600)
        .attr('transform', `rotate(${(pathAngle.angle * (180 / Math.PI) / 2) - 8})`).attr('y', 200); // 文本旋转,靠左
    // 绑定寄宫
    branchesGroup.append('g')
        .attr('transform', `rotate(${(pathAngle.angle * (180 / Math.PI) / 2) - 18})`)
        .selectAll('text').data(d => getStemFromBranch(d)).join('text')
        .attr('fill', Color.BranchStem).text(d => d).style('font-size', 14)
        .attr('y', (_, i, arr) => { // 计算寄宫天干的排列位置
            if (arr.length > 1) {
                return 190 + i * 20
            } else {
                return 200
            }
        });
    return g
}

/** 创建天盘,需要使用月将和占时进行对齐 */
export function use12Stems(container: Selection<SVGSVGElement, any, any, any>, branchIndex: number) {
    // 计算每个地支的角度
    const pathAngle = useArcPath(SizeInfo.stemsSize[0], SizeInfo.stemsSize[1], 12); // 路径和角度

    // 创建一个g元素，用于包裹所有地支
    const g = container.append('g');
    // 设置g元素的transform属性，使其中心在SVG画布的中心
    g.attr('transform', "translate(225,225)");
    // 绑定地支数据
    const branchesGroup = g.selectAll('g')
        .data(earthBranches) // 将地支数据绑定到g元素上
        .join('g'); // 如果数据存在则更新，否则创建新元素

    // 为每个地支设置旋转角度
    const rotateAngle = pathAngle.angle * (180 / Math.PI); // 角度转为旋转角度
    branchesGroup
        .attr('transform', (_, i) => `rotate(${(i + branchIndex) * rotateAngle})`)
        .append('path').attr('d', pathAngle.path).attr('fill', Color.StemBg) // 绘制路径
        .attr('stroke', Color.BorderLight)
        .attr('stroke-width', 1);
    // 添加地支文本标签
    branchesGroup.append('text').text(d => d).style('font-weight', 600) // 显示地支名称
        .attr('y', SizeInfo.stemsSize[1] + 27).attr('fill', Color.StemColor).attr('text-anchor', 'middle'); // 设置文本位置和颜色
    return g
}

/** 12神将信息 */
export function use12Godes(container: Selection<SVGSVGElement, any, any, any>) {
    const godes = [
        "贵人",
        "螣蛇",
        "朱雀",
        "六合",
        "勾陈",
        "青龙",
        "天空",
        "白虎",
        "太常",
        "玄武",
        "太阴",
        "天后",
    ]
    const pathAngle = useArcPath(SizeInfo.branchesSize[1], SizeInfo.stemsSize[0], 12); // 路径和角度
    // 创建一个g元素，用于包裹所有贵人
    const g = container.append('g');
    // 设置g元素的transform属性，使其中心在SVG画布的中心
    g.attr('transform', "translate(225,225)");
    const godesGroup = g.selectAll('g')
        .data(godes)
        .join('g');

    const rotateAngle = pathAngle.angle * (180 / Math.PI); // 角度转为旋转角度
    godesGroup
        .attr('transform', (_, i) => `rotate(${i * rotateAngle})`)
        .append('path').attr('d', pathAngle.path).attr('fill', Color.GodBg) // 绘制路径
        .attr('stroke', Color.BorderLight)
        .attr('stroke-width', 1);
    // 添加神将文本标签
    godesGroup.append('text').text(d => d).style('font-weight', 600) // 显示神将名称
        .attr('y', SizeInfo.stemsSize[0] + 27).attr('fill', Color.GodColor).attr('text-anchor', 'middle'); // 设置文本位置和颜色
    return g
}
/** 将输入的时间信息,转为标准的四柱信息 */
export function useDate(container: Selection<SVGSVGElement, any, any, any>) {
    const g = container.append('g');
    g.attr('transform', "translate(225,225)");

    g.append('text').text('甲子');
    g.append('text').text('甲子');
    g.append('text').text('甲子');
    g.append('text').text('甲子');
    return g
}


export {
    SizeInfo
}