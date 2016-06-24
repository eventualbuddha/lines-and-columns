import babel from 'rollup-plugin-babel';

var pkg = require('./package.json');

export default {
  entry: 'index.js',
  plugins: [babel()],
  targets: [
    {
      format: 'cjs',
      dest: pkg['main']
    },
    {
      format: 'es',
      dest: pkg['jsnext:main']
    }
  ]
};
