let peerConnection

async function startStream() {
    let stream
    try {
        stream = await captureScreen()
    }
    catch {
        console.error("can u js be normal man")
    }
    if (!peerConnection) {
        peerConnection = createPeerConnection();
    }
    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
}

async function viewStream() {
    if (!peerConnection) {
        peerConnection = createPeerConnection()
    }
    if (peerConnection.getTransceivers().length === 0) {
        peerConnection.addTransceiver("video", { direction: "recvonly" })
        peerConnection.addTransceiver("audio", { direction: "recvonly" })
        document.getElementById("streamOffline").style.display = "none"
        document.getElementById("mortStream").style.display = "block"
    }

    await peerNegotiation()
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
        document.getElementById("streamOffline").style.display = "none"
        document.getElementById("mortStream").style.display = "block"
        document.getElementById("mortStream").srcObject = mediaStream
        return mediaStream;
    } catch (ex) {
        console.log("Error occurred", ex);
    }
}


function createServerPeerConnection() //streamer calls this one
{
    const peer = new RTCPeerConnection(servers)

    peer.onnegotiationneeded = () => serverPeerNegotiation()
    peer.onicecandidate = ({ candidate }) => {
        if (candidate && signalingServer.readyState === signalingServer.OPEN) {
            signalingServer.send(JSON.stringify({ target: id, type: 'candidate', payload: candidate }));
        }
    };
    return peer
}

function createClientPeerConnection() //reciever calls this one
{
    const peer = new RTCPeerConnection(servers)

    peer.addTransceiver('video', {
        direction: 'recvonly'
    });
    peer.addTransceiver('audio', {
        direction: 'recvonly'
    });

    peer.onnegotiationneeded = () => peerNegotiation()
    peer.onicecandidate = ({ candidate }) => {
        if (candidate && signalingServer.readyState === signalingServer.OPEN) {
            signalingServer.send(JSON.stringify({ target: id, type: 'candidate', payload: candidate }));
        }
    };
    peer.ontrack = ({ streams }) => {
        console.log("recieved data")
        document.getElementById("mortStream").srcObject = streams[0]
        document.getElementById("mortStream").style.display = "block"
        document.getElementById("streamOffline").style.display = "none"
    }
    return peer
}



async function serverPeerNegotiation() {
    // if(!peerConnection)
    // {
    //     peerConnection = createPeerConnection()
    // }
    // const offer = await peerConnection.createOffer();
    // await peerConnection.setLocalDescription(offer);
    // signalingServer.send(JSON.stringify({ target: id, type: 'offer', payload: offer }));
    if (peerConnection) {
        peerConnection.close()
    }
    peerConnection = createStreamerPeerConnection()
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
        sdp: peer.localDescription
    };

    const { data } = await axios.post('/broadcast', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch(e => console.log(e));
}

async function clientPeerNegotiation() {
    // if(!peerConnection)
    // {
    //     peerConnection = createPeerConnection()
    // }
    // const offer = await peerConnection.createOffer();
    // await peerConnection.setLocalDescription(offer);
    // signalingServer.send(JSON.stringify({ target: id, type: 'offer', payload: offer }));
    const peer = new RTCPeerConnection({ servers })

    peer.ontrack = (e) => handleTrackEvent(e, peer);
    const desc = new webrtc.RTCSessionDescription(body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
        sdp: peer.localDescription
    }

    res.json(payload);

}


let id
signalingServer.onmessage = async (message) => {
    const data = JSON.parse(message.data)
    console.log(data.type)
    switch (data.type) {
        case "init":
            id = data.id
            break;

        case "offer":
            if (!peerConnection) {
                peerConnection = createPeerConnection();
            }
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.payload)); // Ensure remote description is set
            const answer = await peerConnection.createAnswer(); // Create answer only after setting remote description
            await peerConnection.setLocalDescription(answer); // Set the local description
            signalingServer.send(JSON.stringify({ target: data.payload.id, type: 'answer', payload: answer }));
            // signalingServer.send(JSON.stringify({description: peerConnection.localDescription}));
            break;

        case "answer":
            if (!peerConnection) {
                peerConnection = createPeerConnection();
            }
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.payload));
            break;

        case "candidate":
            if (!peerConnection) {
                peerConnection = createPeerConnection();
            }
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.payload));
            break;
    }
}

function toggleBroadcastButton(isVisible)
{
    if(isVisible)
    {
        document.getElementById("broadcastButton").style.display = "flex"
        return
    }
    else
    {
        document.getElementById("broadcastButton").style.display = "none"
    }
}