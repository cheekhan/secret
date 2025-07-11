export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bin',
        format: 'cjs',
        banner: '#!/usr/bin/env node',
    },
}
