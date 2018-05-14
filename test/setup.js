import sass from 'node-sass';
import hook from 'css-modules-require-hook';

hook({
  extensions: ['.scss', '.css'],
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  preprocessCss: (data, file) => sass.renderSync({ file }).css,
});
