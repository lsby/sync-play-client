exports.getWsHard = (conf) => () => {
  return new Promise((res, rej) => {
    var WebSocket = require("ws");
    var ws = new WebSocket(`ws://${conf.addr}:${conf.port}`);
    ws.on("open", function open() {
      res(ws);
    });
  });
};
