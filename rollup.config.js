import { terser } from 'rollup-plugin-terser';
import ts from '@wessberg/rollup-plugin-ts';

import pkg from './package.json';

export default {
    input: 'src/main.ts',
    output: [
        // CommonJS (for Node)
        { file: pkg.main, format: 'cjs' },
        // ES module (for bundlers) build
        { file: pkg.module, format: 'es' },
        // browser-friendly UMD build
        {
            file: pkg.browser,
            format: 'umd',
            name: 'iban',
        },
    ],
    plugins: [
        ts({
            browserslist: ['last 1 version', '> 1%'],
        }),
        terser(),
    ],
};
