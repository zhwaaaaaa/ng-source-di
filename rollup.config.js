/**
 * Created by 14261 on 2017/11/15.
 */
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'src/main.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'iife'
    },
    plugins: [
        typescript(),
        resolve(),
        commonjs(),
        // uglify()
    ]
};