const fs = require("fs");
const ameClient = require("amethyste-api");
const ameApi = new ameClient(
  "365745f69238ead2e433c23bb9ccd972293d3c9553a25fc31f647b4ae047e5b201bc5d94584dfe3afbd79d233ec8bbc85d2f1d610bf9749ddb97a0915e630040"
);

module.exports = async ({ api, event }) => {
  if (event.logMessageType == "log:subscribe") {
    const addedParticipants = event.logMessageData.addedParticipants;
    addedParticipants.forEach(async participant => {
      const joinMemberID = participant.userFbId;
      const joinMemberInfo = await api.getUserInfo(joinMemberID);
      const joinMemberfullName = joinMemberInfo[joinMemberID].name;
      const welcome = [`Wassup,`, `Welcome,`, "Supp,", "Wazzup,"];
      const randomIndex = Math.floor(Math.random() * welcome.length);
      const welcomeMessage = welcome[randomIndex];
      let url = `https://graph.facebook.com/${joinMemberID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      ameApi
        .generate("challenger", {
          url: url
        })
        .then(image => {
          const filePath = __dirname + "/../cache/" + joinMemberID + ".png";
          fs.writeFile(filePath, image, err => {
            if (err) {
              console.error("Error writing file:", err);
              return;
            }
            api.sendMessage(
              {
                body: `${welcomeMessage} @${joinMemberfullName}`,
                mentions: [{ tag: `@${joinMemberfullName}`, id: joinMemberID }],
                attachment: fs.createReadStream(filePath)
              },
              event.threadID
            );
          });
        });
    });
  } else if (event.logMessageType == "log:unsubscribe") {
    let userInfo = await api.getUserInfo(
      event.logMessageData.leftParticipantFbId
    );
    userInfo = userInfo[event.logMessageData.leftParticipantFbId];
    let gcInfo = await api.getThreadInfo(event.threadID);
    if (event.author == event.logMessageData.leftParticipantFbId) {
      const goodbye = [`Goodbye,`, `Sayonara,`, "Paalam,"];
      const randomIndex = Math.floor(Math.random() * goodbye.length);
      const goodbyeMessage = goodbye[randomIndex];
      const goodbyemessage = [
        `may the Force be with you.`,
        `we will miss you.🕊️❤️`
      ];
      const randomInde1 = Math.floor(Math.random() * goodbyemessage.length);
      const goodbyeMessage1 = goodbyemessage[randomInde1];
      api.sendMessage(
        {
          body: `${goodbyeMessage} @${userInfo.name} ${goodbyeMessage1}`
        },
        event.threadID
      );
    } else {
      api.sendMessage(
        {
          body: `${userInfo.name} has kicked to ${gcInfo.threadName}`
        },
        event.threadID
      );
    }
  } else if (event.logMessageType == "log:thread-name") {
    const newThreadName = event.logMessageData.name;
    const authorInfo = await api.getUserInfo(event.author);
    const authorFullName = authorInfo[event.author].name;
    api.sendMessage(
      {
        body: `@${authorFullName} changed the group chat name to "${newThreadName}"`
      },
      event.threadID
    );
  } else {
  }
};
