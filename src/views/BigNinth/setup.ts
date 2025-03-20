import { type Selection } from "d3";
import { size, Color, use12Pie, godes, branches, getBranchesWx } from "./index";
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
    .attr("fill", "#191919")
    .attr("stroke", Color.linghtBorder)
    .attr("stroke-width", 2);
  const lines = [
    { x0: 0, y0: 166, x1: 500, y1: 166 },
    { x0: 0, y0: 334, x1: 500, y1: 334 },
    { x0: 166, y0: 0, x1: 166, y1: 500 },
    { x0: 334, y0: 0, x1: 334, y1: 500 },
    { x0: 3, y0: 3, x1: 497, y1: 497 },
    { x0: 3, y0: 497, x1: 497, y1: 3 },
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
    .attr(
      "transform",
      `translate(${size.width / 2 - 8},${size.height / 2 - 8})`
    );
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
}

/** 绘制天将 */
export function useGodesPie(
  container: Selection<SVGSVGElement, unknown, null, undefined>
) {
  const inner = size.godesSize[1];
  const outer = size.godesSize[0];
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
