// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraOutput1 = document.querySelector("#camera--output-1"),
    cameraOutput2 = document.querySelector("#camera--output-2"),
    cameraOutput3 = document.querySelector("#camera--output-3"),
    cameraOutput4 = document.querySelector("#camera--output-4"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    message = document.querySelector("#message")

var imgs = [];

function setMessage() {
  if (window.innerWidth >= 769) {
    message.innerHTML = "Right click to save a photo!"
  } else {
    console.log("here")
  }
}

// Access the device camera and stream to cameraView
function cameraStart() {
  setMessage();
  navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
  })
  .catch(function(error) {
        console.error("Oops. Something is broken.", error);
  });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
  // to reset if photo session already happened
  if (cameraTrigger.innerHTML == "Restart") {
    imgs = [];
    cameraTrigger.classList.remove("resetbuttonstyle");
    cameraTrigger.classList.add("buttonstyle");
    cameraTrigger.innerHTML = "Start";
    cameraOutput.style.display = "none";
    message.style.display = "none";
  }
  else {
    cameraTrigger.style.display = "none";
    myFunction();
  }
}

function takePhoto() {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  imgs.push(cameraSensor.toDataURL("image/png"));
  myFunction();
}

function myFunction() {
  var minSeconds = 4;
  var maxSeconds = 6;
  var minMilliseconds = minSeconds * 1000;
  var extraMilliseconds = (maxSeconds - minSeconds) * 1000;
  if (imgs.length != 4) {
    setTimeout(takePhoto, (minMilliseconds + Math.random() * (extraMilliseconds)));
  } else {
    endFunction();
  }
}

function endFunction() {
    cameraOutput1.src = imgs[0];
    cameraOutput2.src = imgs[1];
    cameraOutput3.src = imgs[3];
    cameraOutput4.src = imgs[2];
    cameraOutput.style.display = "grid";
    cameraTrigger.innerHTML = "Restart";
    cameraTrigger.classList.remove("buttonstyle");
    cameraTrigger.classList.add("resetbuttonstyle");
    cameraTrigger.style.display = "block";
    message.style.display = "block";
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
