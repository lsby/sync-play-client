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

exports.getFreePort = () => {
  return new Promise((res, rej) => {
    var net = require("net");

    var n = 0;
    function f() {
      var p = Math.floor(Math.random() * (65535 - 1024 + 1) + 1024);
      var server = net.createServer().listen(p);

      server.on("listening", function () {
        server.close();
        res(p);
      });

      server.on("error", function (err) {
        n++;
        if (n >= 10) return rej("获取可用端口失败");
        f();
      });
    }
    f();
  });
};
