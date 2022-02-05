module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Hby.Task (Task, liftEffect, runTask_)
import Lib.Data (VlcHand, WsCmd(..))
import Lib.System (getVlcPort, getWsAddr, getWsPort)
import Lib.Vlc (execVlcGoto, execVlcPlay, execVlcStop, getVlcHand, getVlcTime, setOnVlcGoto, setOnVlcPlay, setOnVlcStop)
import Lib.Ws (getWsHard)
import Lib.Ws.SendToWs (sendToWs)
import Lib.Ws.SetOnWsMsg (setOnWsMsg)

main :: Effect Unit
main =
  runTask_ do
    vlcPort <- getVlcPort
    liftEffect $ log "已获得vlc端口"
    wsAddr <- getWsAddr
    liftEffect $ log "已获得ws地址"
    wsPort <- getWsPort
    liftEffect $ log "已获得ws端口"
    vlcHand <- getVlcHand { port: vlcPort }
    liftEffect $ log "已获得vlc句柄"
    wsHand <- getWsHard { addr: wsAddr, port: wsPort }
    liftEffect $ log "已获得ws句柄"
    setOnVlcPlay vlcHand do
      t <- getVlcTime vlcHand
      liftEffect $ log $ "将跳转消息推送给服务器:" <> show t
      sendToWs wsHand $ GotoCmd t
      liftEffect $ log "将播放消息推送给服务器"
      sendToWs wsHand PlayCmd
    setOnVlcStop vlcHand do
      liftEffect $ log "将暂停消息推送给服务器"
      sendToWs wsHand StopCmd
    setOnVlcGoto vlcHand \t -> do
      liftEffect $ log $ "将跳转消息推送给服务器:" <> show t
      sendToWs wsHand $ GotoCmd t
    setOnWsMsg wsHand $ onWsMsg vlcHand
  where
  onWsMsg :: VlcHand -> WsCmd -> Task Unit
  onWsMsg vlcHand cmd = do
    liftEffect $ log $ "收到服务器消息:" <> show cmd
    case cmd of
      PlayCmd -> do
        liftEffect $ log $ "执行播放动作"
        execVlcPlay vlcHand
      StopCmd -> do
        liftEffect $ log $ "执行暂停动作"
        execVlcStop vlcHand
      GotoCmd t -> do
        liftEffect $ log $ "执行跳转动作到:" <> show t
        execVlcGoto vlcHand t
