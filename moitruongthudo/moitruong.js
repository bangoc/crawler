const puppeteer = require('puppeteer');
var util = require('util');
var fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://moitruongthudo.vn/?site_id=14', {waitUntil: 'load', timeOut: 0});
  data = await page.evaluate(() => {
    var out = {};
    var allCharts = AmCharts.charts;
    for (var i = 0; i < allCharts.length; ++i) {
      out[allCharts[i].div.id] = allCharts[i].dataProvider;
    }
    return out;
  });
  fs.writeFileSync('./moitruong.json', 
        util.inspect(data, {showHidden: true, depth: null, maxArrayLength: null}) , 'utf-8');
  await browser.close();
})();