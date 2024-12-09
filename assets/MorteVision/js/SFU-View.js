async function consumerInit() {
    const peer = await consumerCreatePeer()
    peer.addTransceiver("video", { direction: "recvonly" })
    peer.addTransceiver("audio", { direction: "recvonly" })
}

async function consumerCreatePeer() {
    const peer = new RTCPeerConnection(servers)
    peer.ontrack = consumerTrackHandler
    peer.onnegotiationneeded = () => consumeNegotiation(peer)
    return peer
}

async function consumeNegotiation(peer) {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    const payload = {
        sdp: peer.localDescription
    }
    fetch(rtcServer + "/webrtc/consume",
        {
            method: "POST",
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("consume endpoint failure");
        }).then(data => {
            if (data["error"]) {
                console.error(data["error"])
                return
            }
            const desc = new RTCSessionDescription(data["sdp"]);
            peer.setRemoteDescription(desc).catch(e => console.log(e));
        })
}

async function consumerTrackHandler(e) {
    document.getElementById("mortStream").srcObject = e.streams[0]
}