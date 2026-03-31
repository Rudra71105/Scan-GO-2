// ok so this is the main scanning logic
// honestly took me a while to figure out camera stuff 💀

const videoEl = document.getElementById("preview");
let scannerActive = false;

// idk if we need this flag but keeping it for now
let lastResult = null;

function startCam() {
    // trying to access camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            videoEl.srcObject = stream;
            videoEl.setAttribute("playsinline", true); // for iOS (saw this online)
            videoEl.play();

            scannerActive = true;
            tick(); // start scanning loop
        })
        .catch(function(err) {
            console.log("camera error??", err);
        });
}

// main loop (not super optimized but works)
function tick() {
    if (!scannerActive) return;

    if (videoEl.readyState === videoEl.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.height = videoEl.videoHeight;
        canvas.width = videoEl.videoWidth;

        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const code = jsQR(imgData.data, canvas.width, canvas.height);

        if (code) {
            // avoid spamming same result again and again
            if (lastResult !== code.data) {
                console.log("QR Found:", code.data);
                lastResult = code.data;

                showResult(code.data);
            }
        }
    }

    // not sure if requestAnimationFrame is best but ok
    requestAnimationFrame(tick);
}

function showResult(data) {
    const output = document.getElementById("output");

    // just dumping result for now
    output.innerText = data;

    // maybe later add copy button or something
}

// start camera automatically (maybe not best UX tbh)
startCam();