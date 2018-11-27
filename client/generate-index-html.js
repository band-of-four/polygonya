var fs = require('fs');

fs.readFile('index.html', 'utf8', function (err, index) {
  if (err) return console.log(err);
  fs.readFile('dist/manifest-js.json', 'utf8', function (err, jsMan) {
    if (err) return console.log(err);
    fs.readFile('dist/manifest-css.json', 'utf8', function (err, cssMan) {
      if (err) return console.log(err);
      replaceAssetPaths(index, jsMan, cssMan);
    });
  });
});

function replaceAssetPaths(indexHtml, jsManifest, cssManifest) {
  const jsPath = 'client/' + JSON.parse(jsManifest)['dist/app.js'];
  const cssPath = 'client/dist/' + JSON.parse(cssManifest)['app.prod.css'];

  var result = (indexHtml
    .replace(/dist\/app.js/g, jsPath)
    .replace(/dist\/app.css/g, cssPath)
    .replace(/href="dist/g, 'href="client/dist')
  );

  console.log('Rewriting index.html with updated asset hashes...');

  fs.writeFile('../index.html', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
}
