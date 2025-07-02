import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  lang: "zh-CN",
  title: "CheeKhan",
  description: "cheekhan,占卜",
  themeConfig: {
    // 导航栏
    logo: "/icon.jpg",
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/src" },
      { text: "个人", link: "/about" },
    ],
    // 侧边栏
    sidebar: [
      {
        text: "参考工具",
        link: "/src/index",
      },
      {
        text: "工作沉淀",
        items: [
          { text: "跨域处理", link: "/src/跨域" },
          {
            text: "rollup参数",
            link: "/src/rollup参数",
          },
        ],
      },
      {
        text: "计算机",
        items: [{ text: "体系说明", link: "/src/CST体系" }],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/cheekhan/cheekhan.github.io",
      },
    ],
    lastUpdated: true,
    search: {
      provider: "local",
    },
  },
  markdown: {
    container: {
      infoLabel: "口诀：",
    },
  },
});
