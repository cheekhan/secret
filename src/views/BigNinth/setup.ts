import { type Selection } from "d3";
import { size, Color, use12Pie, godes, branches, getBranchesWx } from "./index";
import { dayjs } from "element-plus";
/** 绘制地盘 */
export function useRect(
  container: Selection<SVGSVGElement, unknown, null, undefined>
) {
  const group = container.append("g"); // 地盘容器
  group
    .append("rect")
    .attr("width", size.width)
    .attr("height", size.height)
    .attr("rx", 8)
    .attr("ry", 8)
    .attr("fill", Color.CenterBg)
    .attr("stroke", Color.linghtBorder)
    .attr("stroke-width", 2);
  const lines = [
    { x0: 0, y0: 166 + 37, x1: 500, y1: 166 + 37 }, // 行1
    { x0: 0, y0: 334 - 37, x1: 500, y1: 334 - 37 }, // 行2
    { x0: 166 + 37, y0: 0, x1: 166 + 37, y1: 500 }, // 列1
    { x0: 334 - 37, y0: 0, x1: 334 - 37, y1: 500 }, // 列2
    { x0: 3, y0: 3, x1: 497, y1: 497 }, // 对角
    { x0: 3, y0: 497, x1: 497, y1: 3 }, // 对角
  ];
  lines.forEach((line) => {
    group
      .append("line")
      .attr("x1", line.x0)
      .attr("y1", line.y0)
      .attr("x2", line.x1)
      .attr("y2", line.y1)
      .attr("stroke", Color.linghtBorder);
  });
  // 地盘静态文字
  group
    .append("text")
    .text("子")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${250 - 8},${250 + 180 + 40})`);
  group
    .append("text")
    .text("丑")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${250 - 8 - 150 + 25},${250 + 180 + 30})`);
  group // 癸 => 丑
    .append("text")
    .text("癸")
    .attr("font-size", 20)
    .attr("fill", "rgb(167, 119.4, 48)")
    .attr("transform", `translate(${250 - 8 - 150 + 50},${250 + 180 + 15})`);
  group
    .append("text")
    .text("寅")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${30},${166 * 2 + 50})`);
  group // 甲 => 寅
    .append("text")
    .text("甲")
    .attr("font-size", 20)
    .attr("fill", "rgb(167, 119.4, 48)")
    .attr("transform", `translate(${30 + 25},${166 * 2 + 50 - 25})`);
  group
    .append("text")
    .text("卯")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${30},${167 + 90})`);
  group
    .append("text")
    .text("辰")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${30},${80 + 45})`);
  group // 乙 => 辰
    .append("text")
    .text("乙")
    .attr("font-size", 20)
    .attr("fill", "rgb(167, 119.4, 48)")
    .attr("transform", `translate(${30 + 25},${80 + 45 + 25})`);
  group
    .append("text")
    .text("巳")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${100 + 25},${50 + 10})`);
  group // 丙，戊 => 巳
    .append("text")
    .text("丙")
    .attr("font-size", 20)
    .attr("fill", "rgb(167, 119.4, 48)")
    .attr("transform", `translate(${100 + 15},${50 + 10 + 35})`);
  group // 丙，戊 => 巳
    .append("text")
    .text("戊")
    .attr("font-size", 20)
    .attr("fill", "rgb(167, 119.4, 48)")
    .attr("transform", `translate(${100 + 60},${50 + 10 + 10})`);
  group
    .append("text")
    .text("午")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${250 - 8},${50 - 10})`);

  group
    .append("text")
    .text("未")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${166 * 2 + 50 - 25},${50 + 10})`);
  group // 丁，己 => 巳
    .append("text")
    .text("丁")
    .attr("font-size", 20)
    .attr("fill", "rgb(167, 119.4, 48)")
    .attr("transform", `translate(${166 * 2 + 50 - 25 - 35},${50 + 10 + 10})`);
  group // 丁，己 => 巳
    .append("text")
    .text("己")
    .attr("font-size", 20)
    .attr("fill", "rgb(167, 119.4, 48)")
    .attr("transform", `translate(${166 * 2 + 50 - 25 + 15},${50 + 10 + 30})`);
  group
    .append("text")
    .text("申")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${166 * 2 + 120},${80 + 45})`);
  group // 庚 => 申
    .append("text")
    .text("庚")
    .attr("font-size", 20)
    .attr("fill", "rgb(167, 119.4, 48)")
    .attr("transform", `translate(${166 * 2 + 120 - 25},${80 + 45 + 25})`);
  group
    .append("text")
    .text("酉")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${166 * 2 + 120},${167 + 90})`);
  group
    .append("text")
    .text("戌")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${166 * 2 + 120},${166 * 2 + 50})`);
  group // 辛 =>  戌
    .append("text")
    .text("辛")
    .attr("font-size", 20)
    .attr("fill", "rgb(167, 119.4, 48)")
    .attr("transform", `translate(${166 * 2 + 120 - 25},${166 * 2 + 25})`);
  group
    .append("text")
    .text("亥")
    .attr("font-size", 18)
    .attr("fill", Color.linghtFont)
    .attr("transform", `translate(${166 * 2 + 50 - 25},${250 + 180 + 30})`);
  group // 壬 => 亥
    .append("text")
    .text("壬")
    .attr("font-size", 20)
    .attr("fill", "rgb(167, 119.4, 48)")
    .attr("transform", `translate(${166 * 2 + 50 - 50},${250 + 180 + 15})`);
  return group;
}
/** 绘制天盘 */
export function useStemsPie(
  container: Selection<SVGSVGElement, unknown, null, undefined>
) {
  const inner = size.stemsSize[1];
  const outer = size.stemsSize[0];
  const group = container.append("g"); // 地盘容器
  group.attr("transform", `translate(${size.width / 2},${size.height / 2})`);
  const { path, angle } = use12Pie(inner, outer);
  const rotateAngle = angle * (180 / Math.PI);
  for (let i = 0; i <= 11; i++) {
    const g = group
      .append("g")
      .datum(i)
      .attr("transform", (d) => `rotate(${d * rotateAngle})`);
    g.append("path")
      .attr("d", path)
      .attr("class", (d) => `stem_${branches[d]}`)
      .attr("fill", (d) => Color[getBranchesWx(d)]);
    g.append("text")
      .text((d) => branches[d])
      .style("font-weight", 600) // 显示神将名称
      .attr("y", (inner + outer) / 2)
      .attr("dy", 8)
      .attr("fill", Color.darkFont)
      .attr("text-anchor", "middle"); // 设置文本位置和颜色
  }
  return group;
}

/** 绘制天将 */
export function useGodesPie(
  container: Selection<SVGSVGElement, unknown, null, undefined>,
  startAngle: number = 0, // 角度偏差
  inverse: boolean = true // 是否逆序
) {
  const inner = size.godesSize[1];
  const outer = size.godesSize[0];
  const group = container.append("g"); // 地盘容器
  group.attr(
    "transform",
    `translate(${size.width / 2},${size.height / 2}),rotate(${startAngle})`
  );
  const { path, angle } = use12Pie(inner, outer);
  const rotateAngle = angle * (180 / Math.PI);
  for (let i = 0; i <= 11; i++) {
    const g = group
      .append("g")
      .datum(i)
      .attr(
        "transform",
        (d) => `rotate(${d * rotateAngle * (inverse ? -1 : 1)})`
      );
    g.append("path")
      .attr("d", path)
      .attr("class", (d) => `stem_${godes[d]}`)
      .attr("fill", Color.GodBg)
      .attr("stroke", Color.linghtBorder);
    g.append("text")
      .text((d) => godes[d])
      .style("font-weight", 600) // 显示天将名称
      .attr("y", (inner + outer) / 2)
      .attr("dy", 8)
      .attr("fill", Color.linghtFont)
      .attr("text-anchor", "middle"); // 设置文本位置和颜色
  }
  return group;
}

/** 五行说明 */
export function useWxInfo(
  container: Selection<SVGSVGElement, unknown, null, undefined>
) {
  const group = container.append("g"); // 地盘容器
  group.attr("transform", `translate(${size.width / 2},${size.height / 2})`);
  group
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", size.wuxingSize)
    .attr("fill", Color.CenterBg);
}
/** 获取时间 */
export function useDate() {
  const now = dayjs().format("YYYY,M,D,H,m,s").split(",");
  return {
    y: now[0],
    M: now[1],
    d: now[2],
    h: now[3],
    m: now[4],
    s: now[5],
  };
}
