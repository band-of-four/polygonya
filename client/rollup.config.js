import jsx from 'rollup-plugin-jsx';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const production = process.env.NODE_ENV === "production",
      development = !production;

export default {
  input: 'src/app.js',
  output: {
    file: 'dist/app.js',
    format: 'iife',
    sourcemap: development ? 'inline' : false
  },
  plugins: [
    jsx({
      factory: 'React.createElement'
    }),
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      sourceMap: false
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ].concat(production ? [
    terser()
  ] : [])
};
