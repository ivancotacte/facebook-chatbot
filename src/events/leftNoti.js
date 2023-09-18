module.exports = async ({ api, event }) => {
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
}