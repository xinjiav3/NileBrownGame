const servers = {
  iceServers:[
    {
      urls:
    [
    "stun:stun.l.google.com:19302",
    "stun:stun.l.google.com:5349",
    "stun:stun1.l.google.com:3478",
    "stun:stun1.l.google.com:5349",
    "stun:stun2.l.google.com:19302",
    "stun:stun2.l.google.com:5349",
    "stun:stun3.l.google.com:3478",
    "stun:stun3.l.google.com:5349",
    "stun:stun4.l.google.com:19302",
    "stun:stun4.l.google.com:5349"],
    },
  ],
  iceCandidatePoolSize:10,
}

const signalingServer = new WebSocket("ws://localhost:8085/socket")
let peerConnection;
    let id;

    signalingServer.onmessage = async (message) => {
      const data = JSON.parse(message.data);

      if (data.type === 'init') {
        id = data.id;
      } else if (data.type === 'offer') {
        await createPeerConnection();
        await peerConnection.setRemoteDescription(data.payload);
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        signalingServer.send(JSON.stringify({ target: data.payload.id, type: 'answer', payload: answer }));
      } else if (data.type === 'answer') {
        await peerConnection.setRemoteDescription(data.payload);
      } else if (data.type === 'candidate') {
        await peerConnection.addIceCandidate(data.payload);
      }
    };

    async function createPeerConnection() {
      peerConnection = new RTCPeerConnection(servers);
      peerConnection.onicecandidate = ({ candidate }) => {
        if (candidate) {
          signalingServer.send(JSON.stringify({ target: id, type: 'candidate', payload: candidate }));
        }
      };

      peerConnection.ontrack = (event) => {
        document.getElementById('remoteVideo').srcObject = event.streams[0];
        console.log(event.streams[0])
      };

      
    }

    async function startVideo()
    {
      const stream = await captureScreen();
      document.getElementById('localVideo').srcObject = stream;
      console.log(stream)
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
    }

    async function startCall() {
      await createPeerConnection();
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      signalingServer.send(JSON.stringify({ target: id, type: 'offer', payload: offer }));
    }

    async function captureScreen() {
      let mediaStream = null;
      try {
          mediaStream = await navigator.mediaDevices.getDisplayMedia({
              video: {
                  cursor: "always"
              },
              audio: true
          });
          return mediaStream;
      } catch (ex) {
          console.log("Error occurred", ex);
      }
  }

    // startCall();