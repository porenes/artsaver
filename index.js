const puppeteer = require("puppeteer");

(async () => {
  let i = 8;
  let j = 0;
  for (let np = 1; np <= 5 * 6; np += 5) {
    for (let sp = 5; sp <= 60; sp += 10) {
      for (let sa = 1; sa < 10000; sa = sa * 10) {
        const browser = await puppeteer.launch({
          defaultViewport: { width: 100 * i, height: 100 * i },
          // timeout: 0,
        });
        const page = await browser.newPage();
        console.log(`building example-${sa}-${sp}-${np}.png`);
        try {
          await page.goto(
            `http://127.0.0.1:5500/?seed=123456&stepA=${sa}&stepP=${sp}&noiseP=${np}`,
            // "https://gateway.fxhash.xyz/ipfs/QmaN4onnUgFs2eDsriy2ns82jWMYm8ZnPHrbSkh5LmEfkP/?fxhash=op4QY7XrvdA7XzvXCw36L9kXhrZ5E4Fr4RPb79cHgC1NYmvx5XW",
            {
              waitUntil: "networkidle2",
              timeout: 0,
            }
          );
          await page.$("canvas#defaultCanvas0");
          await page.screenshot({
            path: `./output/example-${sa}-${sp}-${np}.png`,
          });
        } catch (error) {
          console.error(error);
        }
        await browser.close();
        j++;
      }
    }
  }
})();
