const fs = require("fs");
const ameClient = require("amethyste-api");
const ameApi = new ameClient(
  "365745f69238ead2e433c23bb9ccd972293d3c9553a25fc31f647b4ae047e5b201bc5d94584dfe3afbd79d233ec8bbc85d2f1d610bf9749ddb97a0915e630040"
);

module.exports = async ({ api, event }) => {
  if (event.logMessageType == "log:subscribe") {
  } else if (event.logMessageType == "log:unsubscribe") {
  } else if (event.logMessageType == "log:thread-name") {
  } else {
  }
};
