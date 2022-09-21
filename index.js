const puppeteer = require("puppeteer");

(async () => {
  console.log("start");
  let i = 24;
  // while (i > 2) {
  const browser = await puppeteer.launch({
    defaultViewport: { width: (100 * i * 1) / 1, height: 100 * i },
    headless: false,
    timeout: 60000,
  });
  const page = await browser.newPage();
  for (let j = 0; j < 500; j++) {
    let alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
    var fxhash =
      "oo" +
      Array(49)
        .fill(0)
        .map((_) => alphabet[(Math.random() * alphabet.length) | 0])
        .join("");
    console.log(fxhash);
    console.log(`building example-${j}-${fxhash}.png`);
    try {
      await page.goto(
        "http://localhost:8080/?fxhash=" + fxhash,
        // `http://127.0.0.1:5500/?seed=${seed}`,
        // "https://gateway.fxhash.xyz/ipfs/QmaN4onnUgFs2eDsriy2ns82jWMYm8ZnPHrbSkh5LmEfkP/?fxhash=op4QY7XrvdA7XzvXCw36L9kXhrZ5E4Fr4RPb79cHgC1NYmvx5XW",
        {
          waitUntil: "networkidle2",
          timeout: 0,
        }
      );
    } catch (error) {
      console.error(error);
    }
    await page.$("canvas#defaultCanvas0");
    await page.screenshot({
      path: `./output/example-${j}-${seed}.png`,
    });
    // await page.reload();
  }
  // i--;
  // }
  await browser.close();
})();
