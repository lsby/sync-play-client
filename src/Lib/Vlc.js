exports.getVlcHand = (conf) => () => {
  var hand = null;
  return new Promise((res, rej) => {
    if (hand) return res(hand);
    var { exec } = require("child_process");
    var path = require("path");
    var pwd = require("uuid").v4();
    exec(
      path.resolve(
        __dirname,
        `../../VLC/vlc.exe -I qt --extraintf=http --http-host=127.0.0.1 --http-port=${conf.port} --http-password=${pwd}`
      ),
      (err) => {
        if (err) return rej(err);
      }
    );
    hand = { port: conf.port, pwd: pwd };
    res(hand);
  });
};
exports.getVlcTime = (hand) => () => {
  return new Promise((res, rej) => {
    getVlcXml(hand.port, hand.pwd).then((s) => {
      try {
        var t = s.match("<time>(.*?)</time>")[1];
        res(t);
      } catch (e) {
        res(0);
      }
    });
  });
};
exports.setOnVlcPlay = (hand) => (task) => () => {
  return new Promise((res, rej) => {
    var lastSt = null;
    setInterval(() => {
      getVlcXml(hand.port, hand.pwd).then((s) => {
        var st = s.match("<state>(.*?)</state>")[1];
        if (lastSt != st && st == "playing") task();
        lastSt = st;
      });
    }, 500);
    res();
  });
};
exports.setOnVlcStop = (hand) => (task) => () => {
  return new Promise((res, rej) => {
    var lastSt = null;
    setInterval(() => {
      getVlcXml(hand.port, hand.pwd).then((s) => {
        var st = s.match("<state>(.*?)</state>")[1];
        if (lastSt != st && st == "paused") task();
        lastSt = st;
      });
    }, 500);
    res();
  });
};
exports.setOnVlcGoto = (hand) => (f) => () => {
  return new Promise((res, rej) => {
    var lastTime = null;
    setInterval(() => {
      getVlcXml(hand.port, hand.pwd).then((s) => {
        var nowTime = s.match("<time>(.*?)</time>")[1];
        if (lastTime != null && Math.abs(nowTime - lastTime) > 1) f(nowTime)();
        lastTime = nowTime;
      });
    }, 500);
    res();
  });
};
exports.execVlcPlay = (hand) => () => {
  return new Promise((res, rej) => {
    getVlcXml(hand.port, hand.pwd).then((s) => {
      var st = s.match("<state>(.*?)</state>")[1];
      if (st == "paused") sendPause(hand.port, hand.pwd);
      res();
    });
  });
};
exports.execVlcStop = (hand) => () => {
  return new Promise((res, rej) => {
    getVlcXml(hand.port, hand.pwd).then((s) => {
      var st = s.match("<state>(.*?)</state>")[1];
      if (st == "playing") sendPause(hand.port, hand.pwd);
      res();
    });
  });
};
exports.execVlcGoto = (hand) => (time) => () => {
  return new Promise((res, rej) => {
    goto(hand.port, hand.pwd, time);
    res();
  });
};

function sendPause(port, pwd) {
  var fetch = require("node-fetch");
  var Base64 = require("js-base64");
  fetch(`http://127.0.0.1:${port}/requests/status.xml?command=pl_pause`, {
    headers: {
      authorization: `Basic ${Base64.encode(":" + pwd)}`,
    },
    body: undefined,
    method: "GET",
  });
}

function getVlcXml(port, pwd) {
  var fetch = require("node-fetch");
  var Base64 = require("js-base64");
  return fetch(`http://127.0.0.1:${port}/requests/status.xml`, {
    headers: {
      authorization: `Basic ${Base64.encode(":" + pwd)}`,
    },
    body: undefined,
    method: "GET",
  }).then((a) => a.text());
}
function goto(port, pwd, time) {
  var fetch = require("node-fetch");
  var Base64 = require("js-base64");
  return fetch(
    `http://127.0.0.1:${port}/requests/status.xml?command=seek&val=${formatSeconds(
      time
    )}`,
    {
      headers: {
        authorization: `Basic ${Base64.encode(":" + pwd)}`,
      },
      method: "GET",
    }
  );
}
function formatSeconds(value) {
  var theTime = parseInt(value); // 秒
  var theTime1 = 0; // 分
  var theTime2 = 0; // 小时
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  var result = "" + parseInt(theTime) + "S";
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "M" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "H" + result;
  }
  return result;
}
