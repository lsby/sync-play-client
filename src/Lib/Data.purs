module Lib.Data where

import Prelude

type Time
  = Int

foreign import data WsHard :: Type

data WsCmd
  = PlayCmd
  | StopCmd
  | GotoCmd Time

instance wsCmd_Show :: Show WsCmd where
  show a = case a of
    PlayCmd -> "play"
    StopCmd -> "stop"
    GotoCmd t -> "goto " <> show t

type RawObj
  = { cmd :: String, data :: Time }

foreign import data VlcHand :: Type

type WsConf
  = { addr :: String
    , port :: Int
    }

type VlcConf
  = { port :: Int
    }
