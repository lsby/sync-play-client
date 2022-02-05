module Lib.Vlc where

import Prelude
import Hby.Task (Task)
import Lib.Data (Time, VlcConf, VlcHand)

foreign import getVlcHand :: VlcConf -> Task VlcHand

foreign import getVlcTime :: VlcHand -> Task Time

foreign import setOnVlcPlay :: VlcHand -> Task Unit -> Task Unit

foreign import setOnVlcStop :: VlcHand -> Task Unit -> Task Unit

foreign import setOnVlcGoto :: VlcHand -> (Time -> Task Unit) -> Task Unit

foreign import execVlcPlay :: VlcHand -> Task Unit

foreign import execVlcStop :: VlcHand -> Task Unit

foreign import execVlcGoto :: VlcHand -> Time -> Task Unit
