module Lib.Ws.SetOnWsMsg (setOnWsMsg) where

import Prelude
import Hby.Task (Task, throw)
import Lib.Data (RawObj, WsCmd(..), WsHard)

foreign import _setOnWsMsg :: WsHard -> (RawObj -> Task Unit) -> Task Unit

setOnWsMsg :: WsHard -> (WsCmd -> Task Unit) -> Task Unit
setOnWsMsg ws f = _setOnWsMsg ws ff
  where
  ff obj = case obj of
    { cmd: "play", data: _ } -> f PlayCmd
    { cmd: "stop", data: _ } -> f StopCmd
    { cmd: "goto", data: t } -> f $ GotoCmd t
    { cmd: c, data: _ } -> throw $ "意外的命令:" <> c
