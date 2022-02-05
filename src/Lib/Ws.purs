module Lib.Ws where

import Hby.Task (Task)
import Lib.Data (WsHard, WsConf)

foreign import getWsHard :: WsConf -> Task WsHard
