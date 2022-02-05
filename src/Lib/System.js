exports.getVlcPort = () => {
  return new Promise((res, rej) => {
    var argv = require("minimist")(process.argv.slice(2));
    if (argv.vlcPort) return res(argv.vlcPort);
    rej("获取vlc端口失败");
  });
};
exports.getWsPort = () => {
  return new Promise((res, rej) => {
    var argv = require("minimist")(process.argv.slice(2));
    if (argv.wsPort) return res(argv.wsPort);
    rej("获取ws端口失败");
  });
};
exports.getWsAddr = () => {
  return new Promise((res, rej) => {
    var argv = require("minimist")(process.argv.slice(2));
    if (argv.wsAddr) return res(argv.wsAddr);
    rej("获取ws端口失败");
  });
};
