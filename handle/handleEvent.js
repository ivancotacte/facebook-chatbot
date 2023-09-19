module.exports = async ({ api, event }) => {
  if (event.logMessageType == "log:subscribe") {
    require("../src/events/joinNoti")({ api, event });
  } else if (event.logMessageType == "log:unsubscribe") {
    require("../src/events/leftNoti")({ api, event });
  } else if (event.logMessageType == "log:thread-name") {
    require("../src/events/GroupChatChangeName")({ api, event });
  } else {
  }
};
