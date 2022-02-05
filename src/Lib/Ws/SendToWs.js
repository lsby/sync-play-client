exports._sendToWs = (ws) => (obj) => () => {
  return new Promise((res, rej) => {
    ws.send(JSON.stringify(obj));
    res();
  });
};
