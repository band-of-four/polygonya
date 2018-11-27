import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import hash from 'rollup-plugin-hash';

const production = process.env.NODE_ENV === "production",
      development = !production;

export default {
  input: 'src/App.js',
  output: {
    file: 'dist/app.js',
    format: 'iife',
    sourcemap: development ? 'inline' : false
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/react'],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        '@babel/plugin-transform-classes'
      ]
    }),
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      sourceMap: false,
      namedExports: {
        './node_modules/react/index.js': ['Component', 'Children', 'createElement'],
        './node_modules/react-dom/index.js': ['render'],
        './node_modules/react-is/index.js': ['isValidElementType']
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'dist/': production ? 'client/dist/' : 'dist/'
    })
  ].concat(production ? [
    terser(),
    hash({
      dest: 'dist/app.prod.[hash:6].js',
      manifest: 'dist/manifest-js.json'
    })
  ] : [])
};
