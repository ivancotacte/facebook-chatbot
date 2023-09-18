module.exports = async ({ api, event }) => {
    const newThreadName = event.logMessageData.name;
    const authorInfo = await api.getUserInfo(event.author);
    const authorFullName = authorInfo[event.author].name;
    api.sendMessage(
      {
        body: `@${authorFullName} changed the group chat name to "${newThreadName}"`
      },
      event.threadID
    );
}