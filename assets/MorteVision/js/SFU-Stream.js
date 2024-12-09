async function streamerInit() {
    const stream = await captureScreen();
    document.getElementById("mortStream").srcObject = stream;
    const peer = streamerCreatePeer();
    stream.getTracks().forEach(track => peer.addTrack(track, stream));
}

function streamerCreatePeer() {
    const peer = new RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.stunprotocol.org"
            }
        ]
    });
    peer.onnegotiationneeded = () => streamerNegotiation(peer);

    return peer;
}

async function streamerNegotiation(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
        sdp: peer.localDescription
    };

    fetch(rtcServer+"/webrtc/broadcast",
        {
            method:"POST",
            body:JSON.stringify(payload)
        }).then(response => {
            if(response.ok)
            {
                return response.json()
            }
            throw new Error("consume endpoint failure");
        }).then(data =>{
            if(data["error"])
            {
                console.error(data["error"])
                return
            }
            const desc = new RTCSessionDescription(data["sdp"]);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        })
}

async function captureScreen() {
    let mediaStream = null;
    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: "always"
            },
            audio: true
        }); //get user video and audio as a media stream
        document.getElementById("streamOffline").style.display = "none"
        document.getElementById("mortStream").style.display = "block"
        document.getElementById("mortStream").srcObject = mediaStream
        return mediaStream;
    } catch (ex) {
        console.log("Error occurred", ex);
    }
}