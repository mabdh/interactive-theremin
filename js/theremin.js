
var video = document.querySelector('video');
var notesPos = [0, 82, 159, 238, 313, 390, 468, 544];
var noteY = [420, 360, 300, 240, 180, 120, 60, 0, 420, 360, 300, 240, 180, 120, 60, 0];
var timeOut, lastImageData;
  var canvasSource;
  var canvasDest;
var contextSource;
var contextDest;
var soundContext,oscillator,gainOscillator;
var notes = [];
var osctype = ["sine", "square", "sawtooth", "triangle"];

// document.getElementById('snapshot').onclick = function() {
//     //var video = document.querySelector('video');
//     //var canvas = document.getElementById('canvas');
//     contextDest = canvasDest.getContext('2d');
//     contextDest.drawImage(video,0,0);
// }

$( document ).ready(function() {
  initVideo();
  initAudio();
  selectWaveListener();
});

function selectWaveListener() {
    $( "#selectwave" ).change(function() {
      console.log($(this).attr("value"));
      oscillator.type = osctype[$(this).attr("value")];
    });
    //console.log("WAVEFORM : " + e);
    //console.log(n[e]);
    //oscillator.type = n[e]
}

// Instantiate Video
function initVideo(){
  canvasSource = document.getElementById("canvassource");
  canvasDest = document.getElementById("canvas");
  contextSource = canvasSource.getContext('2d');
  contextDest = canvasDest.getContext('2d');
  contextSource.translate(canvasSource.width, 0);
contextSource.scale(-1, 1);
  console.log( "ready!" );
    //navigator.mediaDevices.getUserMedia(constraints).
    //    then(handleSuccess).catch(handleError);

    if(navigator.webkitGetUserMedia!=null) {
        var options = {
            video:true,
            audio:true
        };

        //request webcam access
        navigator.webkitGetUserMedia(options,
            function(stream) {
                //get the video tag
                //var video = document.querySelector('video');
                //turn the stream into a magic URL
                video.src = window.URL.createObjectURL(stream);
            },
            function(e) {
                console.log("error happened");
            }
        );
    }

    update();

}


// Draw video to canvas
function drawVideo() {
  	contextSource.drawImage(video, 0, 0, video.width, video.height);
}

// Update every 60 times per second
function update() {
	drawVideo();
	blend();
	checkAreas();
	timeOut = setTimeout(update, 1000/60);
}

// Check blob
function checkAreas() {
  var e = 80;
  for (var r = 0; r < 16; ++r) {
    var blendedData;
      if (r < 8) {
          blendedData = contextDest.getImageData(0, noteY[r], canvasDest.width / 8, canvasDest.height / 8)
      } else {
          blendedData = contextDest.getImageData(520, noteY[r], canvasDest.width / 8, canvasDest.height / 8)
      }
      var i = 0;
      var avg = 0;

      // loop over the pixels
      while (i < blendedData.data.length * .25) {
          // averaging between channel
          avg += (blendedData.data[r * 4] + blendedData.data[i * 4 + 1] + blendedData.data[i * 4 + 2]) / 3;
          ++i

      }
      avg = Math.round(avg / (blendedData.data.length * .25));
      //console.log(avg);
      if (avg > 50) {
          playSound(r)
      } else {}
  }

}

// Blending
function blend() {
	var width = canvasSource.width;
	var height = canvasSource.height;
	// get webcam image data
	var sourceData = contextSource.getImageData(0, 0, width, height);
	// create an image if the previous image doesn’t exist
	if (!lastImageData) lastImageData = contextSource.getImageData(0, 0, width, height);
	// create a ImageData instance to receive the blended result
	var blendedData = contextSource.createImageData(width, height);
	// blend the 2 images
	differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
	// draw the result in a canvas
	contextDest.putImageData(blendedData, 0, 0);
	// store the current webcam image
	lastImageData = sourceData;
}

// Utilities function
function difference(target, data1, data2) {
	// blend mode difference
	if (data1.length != data2.length) return null;
	var i = 0;
	while (i < (data1.length * 0.25)) {
		target[4*i] = data1[4*i] == 0 ? 0 : fastAbs(data1[4*i] - data2[4*i]);
		target[4*i+1] = data1[4*i+1] == 0 ? 0 : fastAbs(data1[4*i+1] - data2[4*i+1]);
		target[4*i+2] = data1[4*i+2] == 0 ? 0 : fastAbs(data1[4*i+2] - data2[4*i+2]);
		target[4*i+3] = 0xFF;
		++i;
	}
}

function fastAbs(value) {
	// equivalent to Math.abs();
	return (value ^ (value >> 31)) - (value >> 31);
}

function threshold(value) {
	return (value > 0x15) ? 0xFF : 0;
}

function differenceAccuracy(target, data1, data2) {
	if (data1.length != data2.length) return null;
	var i = 0;
	while (i < (data1.length * 0.25)) {
		var average1 = (data1[4*i] + data1[4*i+1] + data1[4*i+2]) / 3;
		var average2 = (data2[4*i] + data2[4*i+1] + data2[4*i+2]) / 3;
		var diff = threshold(fastAbs(average1 - average2));
		target[4*i] = diff;
		target[4*i+1] = diff;
		target[4*i+2] = diff;
		target[4*i+3] = 0xFF;
		++i;
	}
}

// audio
var AudioContext = (
  window.AudioContext ||
  window.webkitAudioContext ||
  null
);
function initAudio() {
  if (!AudioContext) {
    alert("AudioContext not supported!");
  }
  else {
    loadSounds();
  }
}

function loadSounds() {
    if ("AudioContext" in window) {
        soundContext = new AudioContext
    } else {
        soundContext = new window.AudioContext || window.webkitAudioContext || null;
    }
    oscillator = soundContext.createOscillator();
    gainOscillator = soundContext.createGain();
    gainOscillator.gain.value = 0;
    oscillator.connect(gainOscillator);
    gainOscillator.connect(soundContext.destination);
    //S(c); // oscillator type
    //alert("Turn your volume down to the minimum value first because this theremin will produce sound at maximum level at the first time it is started");
    oscillator.start(1);
}

function playSound(e) {
  //console.log(e)
    var t = 10;
    switch (e + 1) {
        case 1:
            gainOscillator.gain.value = 0 * t;
            document.getElementById("vol").innerHTML = "0";
            break;
        case 2:
            gainOscillator.gain.value = 1 / 8 * t;
            document.getElementById("vol").innerHTML = "1";
            break;
        case 3:
            gainOscillator.gain.value = 3 / 8 * t;
            document.getElementById("vol").innerHTML = "2";
            break;
        case 4:
            gainOscillator.gain.value = 4 / 8 * t;
            document.getElementById("vol").innerHTML = "3";
            break;
        case 5:
            gainOscillator.gain.value = 5 / 8 * t;
            document.getElementById("vol").innerHTML = "4";
            break;
        case 6:
            gainOscillator.gain.value = 6 / 8 * t;
            document.getElementById("vol").innerHTML = "5";
            break;
        case 7:
            gainOscillator.gain.value = 7 / 8 * t;
            document.getElementById("vol").innerHTML = "6";
            break;
        case 8:
            gainOscillator.gain.value = t;
            document.getElementById("vol").innerHTML = "7";
            break;
        case 9:
            oscillator.frequency.value = 261.63;
            document.getElementById("chord").innerHTML = "C4";
            break;
        case 10:
            oscillator.frequency.value = 293.66;
            document.getElementById("chord").innerHTML = "D4";
            break;
        case 11:
            oscillator.frequency.value = 329.63;
            document.getElementById("chord").innerHTML = "E4";
            break;
        case 12:
            oscillator.frequency.value = 349.23;
            document.getElementById("chord").innerHTML = "F4";
            break;
        case 13:
            oscillator.frequency.value = 392;
            document.getElementById("chord").innerHTML = "G4";
            break;
        case 14:
            oscillator.frequency.value = 440;
            document.getElementById("chord").innerHTML = "A4";
            break;
        case 15:
            oscillator.frequency.value = 493.88;
            document.getElementById("chord").innerHTML = "B4";
            break;
        case 16:
            oscillator.frequency.value = 523.25;
            document.getElementById("chord").innerHTML = "C5";
            break;
        default:
            oscillator.frequency.value = 0
    }
}
