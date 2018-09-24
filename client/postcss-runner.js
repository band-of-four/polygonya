import fs from 'fs';
import postcss from 'postcss';

export default function (rawCss, path, plugins) {
  postcss(plugins)
    .process(rawCss, { from: path, to: path })
    .then(({ css, map }) => {
      fs.writeFile(path, css + (map && map || ''), () => true)
    })
};
