const puppeteer = require("puppeteer");

(async () => {
  let i = 6;
  let j = 0;
  while (j < 10) {
    const browser = await puppeteer.launch({
      defaultViewport: { width: 100 * i, height: 100 * i },
      // timeout: 0,
    });
    const page = await browser.newPage();
    console.log("getting iteration ", j);
    try {
      await page.goto(
        "http://127.0.0.1:5500",
        // "https://gateway.fxhash.xyz/ipfs/QmaN4onnUgFs2eDsriy2ns82jWMYm8ZnPHrbSkh5LmEfkP/?fxhash=op4QY7XrvdA7XzvXCw36L9kXhrZ5E4Fr4RPb79cHgC1NYmvx5XW",
        {
          waitUntil: "networkidle2",
          timeout: 0,
        }
      );
      await page.$("canvas#defaultCanvas0");
      await page.screenshot({ path: `example-${j}.png` });
    } catch (error) {
      console.error(error);
    }
    await browser.close();
    j++;
  }
})();
