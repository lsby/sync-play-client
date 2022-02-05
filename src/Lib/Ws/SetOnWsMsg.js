exports._setOnWsMsg = (ws) => (f) => () => {
  return new Promise((res, rej) => {
    ws.on("message", function message(data) {
      f(JSON.parse(data))();
    });
    res();
  });
};
