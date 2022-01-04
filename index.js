const puppeteer = require("puppeteer");

(async () => {
  console.log("start");
  let opt = [
    { sa: 10, sp: 15, np: 11 },
    { sa: 10, sp: 15, np: 16 },
    { sa: 10, sp: 15, np: 26 },
    { sa: 10, sp: 25, np: 6 },
    { sa: 10, sp: 25, np: 11 },
    { sa: 10, sp: 25, np: 16 },
    { sa: 10, sp: 25, np: 26 },
    { sa: 10, sp: 35, np: 6 },
    { sa: 10, sp: 35, np: 11 },
    { sa: 10, sp: 35, np: 16 },
    { sa: 10, sp: 35, np: 26 },
    { sa: 10, sp: 45, np: 6 },
    { sa: 10, sp: 45, np: 11 },
    { sa: 10, sp: 45, np: 16 },
    { sa: 10, sp: 45, np: 26 },
    { sa: 10, sp: 55, np: 6 },
    { sa: 10, sp: 55, np: 11 },
    { sa: 10, sp: 55, np: 16 },
    { sa: 10, sp: 55, np: 26 },
    { sa: 100, sp: 25, np: 6 },
    { sa: 100, sp: 45, np: 6 },
    { sa: 100, sp: 55, np: 6 },
  ];
  let i = 12;
  for (let j = 0; j < 500; j++) {
    let seed = Math.floor(1000000 * Math.random());
    console.log(seed);

    const browser = await puppeteer.launch({
      defaultViewport: { width: 100 * i, height: 100 * i },
      // timeout: 0,
    });
    const page = await browser.newPage();
    console.log(`building example-${seed}.png`);
    try {
      await page.goto(
        `http://127.0.0.1:5500/?seed=${seed}&debug=true`,
        // "https://gateway.fxhash.xyz/ipfs/QmaN4onnUgFs2eDsriy2ns82jWMYm8ZnPHrbSkh5LmEfkP/?fxhash=op4QY7XrvdA7XzvXCw36L9kXhrZ5E4Fr4RPb79cHgC1NYmvx5XW",
        {
          waitUntil: "networkidle2",
          timeout: 0,
        }
      );
      await page.$("canvas#defaultCanvas0");
      await page.screenshot({
        path: `./output/example-${seed}.png`,
      });
    } catch (error) {
      console.error(error);
    }
    await browser.close();
  }
})();
