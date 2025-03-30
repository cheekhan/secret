import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended' // 解决eslint和pretter的冲突

/**
 * 规则参考：https://eslint.vuejs.org/rules/
 */

export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'public'],
  },
  /** js推荐配置 */
  eslint.configs.recommended,
  /** ts推荐配置 */
  ...tseslint.configs.recommended,
  /** vue社区推荐配置 */
  ...pluginVue.configs['flat/recommended'],
  /**
   * javascript 规则
   */
  {
    rules: {
      'no-console': 'warn',
    },
  },
  /**
   * vue 规则
   */
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        /** typescript项目需要用到这个 */
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 在这里追加 vue 规则
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true,
        },
      ],
    },
  },
  /**
   * typescript 规则
   */
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {},
  },
  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended,
)
