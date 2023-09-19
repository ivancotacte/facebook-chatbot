const fs = require("fs");
const login = require("./login");
const path = require("path");

const proxy = {
  protocol: "https",
  host: "158.62.27.226",
  port: 8191,
  type: "https",
  anonymityLevel: "elite",
  country: "PH",
  city: "Pasig",
  hostname: "158.62.27.226"
};

const local = {
  timezone: "Asia/Manila",
  region: "ph",
  headers: {
    "X-Facebook-Locale": "en_US",
    "X-Facebook-Timezone": "Asia/Manila",
    "X-Fb-Connection-Quality": "EXCELLENT"
  }
};
const appStatePath = path.join(__dirname, "./session.json");
const credentials = JSON.parse(fs.readFileSync(appStatePath, "utf8"));
login({ appState: credentials, proxy: proxy, local: local }, (err, api) => {
  if (err) return console.error(err);

  const platform = process.platform;
  let userAgent;

  if (platform === "win32") {
    userAgent =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36";
  } else if (platform === "android") {
    userAgent =
      "Mozilla/5.0 (Linux; Android 11; SM-G991U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36";
  } else {
    userAgent =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/95.0.4638.50 Mobile/15E148 Safari/604.1";
  }

  api.setOptions({
    forceLogin: true,
    listenEvents: true,
    autoMarkDelivery: false,
    selfListen: true,
    userAgent: userAgent
  });

  api.listenMqtt(async (err, event) => {
    if (err) return console.error(err);

    let userInfo = await api.getUserInfo(event.senderID);
    userInfo = userInfo[event.senderID];

    if (event.type == "message") {
      let input = event.body.toLowerCase();

      if (input.startsWith("ping")) {
        api.sendMessage("pong", event.threadID, event.messageID);
      }
    } else if (event.type == "event") {
      require("./handle/handleEvent")({ api, event });
    }
  });
});
