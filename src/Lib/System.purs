module Lib.System where

import Hby.Task (Task)

foreign import getVlcPort :: Task Int

foreign import getWsPort :: Task Int

foreign import getWsAddr :: Task String
