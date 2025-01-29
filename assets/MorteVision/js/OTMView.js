socket.on("viewAcceptServer", function (data) {
    viewAcceptServer(data)
})

let globalPeer

async function consume() {
    const peer = new RTCPeerConnection(servers)
    peer.ontrack = ({ streams }) => {
        document.getElementById("mortStream").srcObject = streams[0]
        document.getElementById("mortStream").style.display = "block"
        document.getElementById("streamOffline").style.display = "none"
    }
    // peer.onnegotiationneeded = () => consumeNegotiation(peer)
    peer.addTransceiver("video", { direction: "recvonly" })
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    globalPeer = peer
    let payload =
    {
        message:"test",
        type: "offer",
        sdp: offer.sdp
    }
    socket.emit("viewOfferClient", payload)
}

async function viewAcceptServer(data) {
    let remotedesc = new RTCSessionDescription()
    remotedesc.sdp = data["sdp"]
    remotedesc.type = data["type"]
    globalPeer.onicecandidate = (e) => console.log(e.candidate)
    globalPeer.setRemoteDescription(remotedesc)

    peer.onnegotiationneeded = async (e) => {

    };
}

