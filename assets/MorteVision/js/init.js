let unsetHost = "skibidi"
const isDebug = true
if (isDebug) {
    unsetHost = "ws://localhost:8085"
}
const socketServer = unsetHost
const servers = {
    iceServers:[
      {
        urls:
      [
      "stun:stun.l.google.com:19302",
      /*"stun:stun.l.google.com:5349",
      "stun:stun1.l.google.com:3478",
      "stun:stun1.l.google.com:5349",
      "stun:stun2.l.google.com:19302",
      "stun:stun2.l.google.com:5349",
      "stun:stun3.l.google.com:3478",
      "stun:stun3.l.google.com:5349",
      "stun:stun4.l.google.com:19302",
      "stun:stun4.l.google.com:5349"*/],
      },
    ],
    iceCandidatePoolSize:10,
  }

  const signalingServer = new WebSocket(`${socketServer}/socket`)