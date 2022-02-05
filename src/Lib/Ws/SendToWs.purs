module Lib.Ws.SendToWs (sendToWs) where

import Prelude
import Hby.Task (Task)
import Lib.Data (RawObj, WsCmd(..), WsHard)

foreign import _sendToWs :: WsHard -> RawObj -> Task Unit

sendToWs :: WsHard -> WsCmd -> Task Unit
sendToWs ws cmd = case cmd of
  PlayCmd -> _sendToWs ws { cmd: "play", data: 0 }
  StopCmd -> _sendToWs ws { cmd: "stop", data: 0 }
  GotoCmd t -> _sendToWs ws { cmd: "goto", data: t }
