# rollup 参数说明

## `rollup.config.js`配置文件概要

```js
export default [configObj];
var configObj = {
  // core input options
  external,
  input, // conditionally required
  plugins,
  // advanced input options
  cache,
  onwarn,
  preserveEntrySignatures,
  strictDeprecations,
  // danger zone
  acorn,
  acornInjectPlugins,
  context,
  moduleContext,
  preserveSymlinks,
  shimMissingExports,
  treeshake,
  // experimental
  experimentalCacheExpiry,
  perf,
  // required (can be an array, for multiple outputs)
  output: {
    // core output options
    dir,
    file,
    format, // required
    globals,
    name,
    plugins,
    // advanced output options
    assetFileNames,
    banner,
    chunkFileNames,
    compact,
    entryFileNames,
    extend,
    footer,
    hoistTransitiveImports,
    inlineDynamicImports,
    interop,
    intro,
    manualChunks,
    minifyInternalExports,
    outro,
    paths,
    preserveModules,
    preserveModulesRoot,
    sourcemap,
    sourcemapBaseUrl,
    sourcemapExcludeSources,
    sourcemapFile,
    sourcemapPathTransform,
    validate,
    // danger zone
    amd,
    esModule,
    exports,
    externalLiveBindings,
    freeze,
    indent,
    namespaceToStringTag,
    noConflict,
    preferConst,
    sanitizeFileName,
    strict,
    systemNullSetters,
  },
  watch: {
    buildDelay,
    chokidar,
    clearScreen,
    skipWrite,
    exclude,
    include,
  },
};
```

## 1、核心参数

### `external`：排除

值的类型： 字符串 正则表达式 \* 数组：元素是字符串或正则表达式。

用来声明某些依赖是再外部引用的，这些依赖不会打包进来。

例如在打包的代码中，引入了 jQuery，但是上下文中有全局的 jQuery， 这时打包的过程就可以使用该字段来排除打包 jQuery。

### `input`：入口

打包的入口，值为字符串。例如 src/index.js 。

如果是多入口打包模式，可以使用一个数组来包含； 也可以使用对象来表示，对象的建，就是生成 bundle 的名字：

```js
export default {
  ...,
  input: {
    a: 'src/main-a.js',
    'b/index': 'src/main-b.js'
  },
  output: {
    ...,
    entryFileNames: 'entry-[name].js'
  }
};
// 生成bundle文件：entry-a.js and entry-b/index.js,
```

### `output`

output 字段是一个对象，参数较多，用于控制生成结果

`dir`

dir 字段，用来声明生成结果的输出目录，当打包模式是多入口的时候，该字段是必填的。

`file`

当打包入口只有一个的时候，可以用这个字段来声明生成文件的名称。

`format`

打包文件的格式。

值为字符串，'amd' | 'cjs' | 'es' | 'iife' | 'umd' | 'system'

- umd：联合打包模式，集 cjs、iift、amd 于一体，可用于打包不支持 esm 的场景
- es：用于打包支持 es 的场景，值也可以写为'esm' , 'module'等

`globals`

配合 `external` 字段一起使用，external 字段排除了某些依赖， 再用 globals 来声明这些依赖在代码中的标识.

值为对象， key 是 external 出去的模块的 id(也可以是某些文件的路径),value 是该模块在代码中的标识符， 例如在代码中使用了 jQuery，标识符为$:

```js
export default {
  ...,
  external: ['jquery'],
  output: {
    globals: {
      jquery: '$'
    }
  }
};
```

`name`

如果打包的格式是 iife , umd 等格式，需要用一个全局变量来代表立即执行函数的结果。 name 字段用于声明这个全局变量。

`plugins`

输出阶段的插件列表。 如果是多个输出(例如既要打包 umd 格式的输出，也要打包 esm 格式的输出),则这个插件，之作用于当前的输出。

```js
import { terser } from "rollup-plugin-terser";

export default {
  input: "main.js",
  output: [
    {
      file: "bundle.js",
      format: "es",
    },
    {
      file: "bundle.min.js",
      format: "es",
      plugins: [terser()],
    },
  ],
};
```

### `plugins`：插件

全局插件。

能作用于构建的全部周期、全部输出。

值为数组。 参考文章[rollup 插件开发](./rollup插件开发)。

## 2、高级参数

### `cache`

用于存储之前的构建结果。

在监听模式中，可以加速构建， 因为 rollup 可以重新分析哪些包发生了变化。

### `makeAbsoluteExternalsRelative` ： 绝对路径转换相对路径

外链路径转换，默认为 true

### `maxParallelFileOps`

控制读取 modules 时的最大并发量，默认是 20

### `onwarn`

用于拦截警告信息，值是函数

### `output`

`assetFileNames`
重命名构建后生成产物的名字，传入一个字符串。

这个字符串中，有一些固定的标识:

- `[extname]`：文件后缀
- `[ext]`：纯文件后缀，没有句号
- `[hash]` ：文件内容的 hash 值
- `[name]`：文件名

这个参数的默认值是`assets/[name]-[hash][extname]`

`banner` , `footer`

这两个值，都是一段字符串。

banner 的值，用于插入到构建后产物的头部；

footer 的值，用于插入到构建后产物的底部；

`chunkFileNames`

用于重命名，由于代码分割导致的额外的构建产物的文件名，值是字符串.

有一些固定的标识:

- `[format]`：打包格式，已经在 output 的其他参数中定义过
- `[hash]`：文件内容的 hash 值
- `[name]`：文件名

这个而参数的默认值是[name]-[hash].js

`entryFileNames`

重命名，有打包入口生成的构建结果。

正常情况下，打包入口对应的构建产物，名字都是[name].js。

或者如果是多入口情况下，名字是 input 对象的 key 值。

可以在这个字段里，进行重命名，有以下几个固定的字段标识：

- `[format]`：打包格式，已经在 output 的其他参数中定义过
- `[hash]`：文件内容的 hash 值
- `[name]`：文件名

`compact`

对构建后的产物，进行换行压缩。
`extend`

umd 和 iife 模式下，是否启用导出功能。 如果启用的话，则在全局环境上挂载一个变量（这个变量名称在 formats 中定义过）， 然后将 iife 执行结果，赋值给这个变量。

`generatedCode`
rollup 添加的一些代码（如帮助信息、换行等辅助代码）能安全使用的 js 版本，值：

- es5（默认值）：不使用 es2015 及以后的语言特性
- es2015：使用 es2015 的语言特性

这个参数还可以使用对象格式细化：

- arrowFunctions
- constBindings
- objectShorthand
- preset
- reservedNamesAsProps
- symbols

`interop`

定义如何处理导入的像 commonjs 那样的依赖的 default、namespace、和异步导入等操作。
`paths`

用于指定外链依赖的 url 。 配合 external , globals 来实现。 值是对象，对象的 key 是外链的 id（在 external 中声明过）

```js
// app.js
import { selectAll } from "d3";
selectAll("p").style("color", "purple");
// ...

// rollup.config.js
export default {
  input: "app.js",
  external: ["d3"],
  output: {
    file: "bundle.js",
    format: "amd",
    paths: {
      d3: "https://d3js.org/d3.v4.min",
    },
  },
};

// bundle.js
define(["https://d3js.org/d3.v4.min"], function (d3) {
  d3.selectAll("p").style("color", "purple");
  // ...
});
```
