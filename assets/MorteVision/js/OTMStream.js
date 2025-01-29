let videoStreamGlobal

async function broadcast() {
    const stream = await captureScreen();
    mediaStreamCloseOnly = videoStreamGlobal
    document.getElementById("mortStream").srcObject = stream;
    socket.emit("streamReady")
}

socket.on("viewOfferServer", function (data) {
    viewOfferServer(data)
})

async function viewOfferServer(data) {
    const peer = new RTCPeerConnection(servers);
    let remotedesc = new RTCSessionDescription()
    remotedesc.sdp = data["sdp"]
    remotedesc.type = data["type"]
    peer.onicecandidate = (e) => console.log(e.candidate)
    peer.setRemoteDescription(remotedesc)
    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)
    let payload =
    {
        type: "answer",
        sdp: answer.sdp,
        target: data["uid"]
    }
    socket.emit("viewAcceptClient", payload)

    peer.onnegotiationneeded = async (e) => {

    };
}

async function captureScreen() {
    let mediaStream = null;
    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: "always"
            },
            audio: false
        }); //get user video and audio as a media stream
        document.getElementById("streamOffline").style.display = "none"
        document.getElementById("mortStream").style.display = "block"
        document.getElementById("mortStream").srcObject = mediaStream
        if (document.getElementById("endBroadcastButton").style.display == "none") {
            document.getElementById("endBroadcastButton").style.display = "flex"
            document.getElementById("broadcastButton").style.display = "none"
        }
        return mediaStream;
    } catch (ex) {
        console.log("Error occurred", ex);
        document.getElementById("endBroadcastButton").style.display = "none"
    }
}