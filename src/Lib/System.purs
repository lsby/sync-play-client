module Lib.System where

import Hby.Task (Task)

foreign import getWsPort :: Task Int

foreign import getWsAddr :: Task String

foreign import getFreePort :: Task Int
