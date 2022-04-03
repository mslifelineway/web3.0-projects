let fs = require("fs");
let axios = require("axios");

let media = ["secretVideo.mp4"];
let ipfsArray = [];
let promises = [];

for (let i = 0; i < media.length; i++) {
  promises.push(
    new Promise((res, rej) => {
      fs.readFile(`${__dirname}/export/${media[i]}`, (err, data) => {
        if (err) rej();
        ipfsArray.push({
          path: `media/${i}`,
          content: data.toString("base64"),
        });
        res();
      });
    })
  );
}

/**
 * API KEY => Login to moralis.io site > web3 Api > Copy Api Key (dropdown) > default (will automatically copy api key)
 */
Promise.all(promises).then(() => {
  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
      headers: {
        "X-API-KEY":
          "pcfjE76L41jFI5uzFNgX1don80Bj4EICvLcSXNjlcisMoHVizUREYwsx1BZ9MDBL",
        "Content-Type": "application/json",
        accept: "application/json",
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
