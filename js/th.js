(function() {
        function e() {
            return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)
        }

        function w() {
            if (!v) {
                alert("AudioContext not supported!")
            } else {
                x()
            }
            document.getElementById("selectwave").addEventListener("change", E, !1)
        }

        function E() {
            S(c)
        }

        function S(e) {
            var t = e.value,
                n = l ? [0, 1, 2, 3] : ["sine", "square", "sawtooth", "triangle"];
            console.log(e.value);
            console.log(n[t]);
            oscillator.type = n[t]
        }

        function x() {
            if ("webkitAudioContext" in window) {
                d = new webkitAudioContext
            } else {
                d = new v
            }
            oscillator = d.createOscillator();
            gOsc = d.createGain();
            gOsc.gain.value = 0;
            oscillator.connect(gOsc);
            gOsc.connect(d.destination);
            S(c);
            alert("Turn your volume down to the minimum value first because this theremin will produce sound at maximum level at the first time it is started");
            oscillator.start(1);
            T()
        }

        function T() {
            k()
        }

        function N(e) {
            var t = 10;
            switch (e + 1) {
                case 1:
                    gOsc.gain.value = 0 * t;
                    document.getElementById("vol").innerHTML = "0";
                    break;
                case 2:
                    gOsc.gain.value = 1 / 8 * t;
                    document.getElementById("vol").innerHTML = "1";
                    break;
                case 3:
                    gOsc.gain.value = 3 / 8 * t;
                    document.getElementById("vol").innerHTML = "2";
                    break;
                case 4:
                    gOsc.gain.value = 4 / 8 * t;
                    document.getElementById("vol").innerHTML = "3";
                    break;
                case 5:
                    gOsc.gain.value = 5 / 8 * t;
                    document.getElementById("vol").innerHTML = "4";
                    break;
                case 6:
                    gOsc.gain.value = 6 / 8 * t;
                    document.getElementById("vol").innerHTML = "5";
                    break;
                case 7:
                    gOsc.gain.value = 7 / 8 * t;
                    document.getElementById("vol").innerHTML = "6";
                    break;
                case 8:
                    gOsc.gain.value = t;
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

        function C() {
            gOsc.gain.value = 0
        }

        function k() {
            C();
            L()
        }

        function L() {
            A();
            _();
            j();
            o = setTimeout(L, 1e3 / 60)
        }

        function A() {
            if (window.typebr == 2) {
                window.contextSource.drawImage(n, 0, 0, n.width, n.height)
            } else if (window.typebr == 3) {
                window.contextSource.drawImage(n, 0, 0, n.videoWidth, n.videoHeight)
            }
            M();
            if (y == 10) {
                O()
            }
            if (y == 50) {
                O()
            }
            if (y == 90) {
                O()
            }
            y++
        }

        function O() {
            var e = a.toDataURL("image/png");

            function M() {
                window.contextSource.moveTo(80, 0);
                window.contextSource.lineTo(80, 480);
                window.contextSource.stroke();
                window.contextSource.moveTo(0, 60);
                window.contextSource.lineTo(80, 60);
                window.contextSource.stroke();
                window.contextSource.moveTo(0, 120);
                window.contextSource.lineTo(80, 120);
                window.contextSource.stroke();
                window.contextSource.moveTo(0, 180);
                window.contextSource.lineTo(80, 180);
                window.contextSource.stroke();
                window.contextSource.moveTo(0, 240);
                window.contextSource.lineTo(80, 240);
                window.contextSource.stroke();
                window.contextSource.moveTo(0, 300);
                window.contextSource.lineTo(80, 300);
                window.contextSource.stroke();
                window.contextSource.moveTo(0, 360);
                window.contextSource.lineTo(80, 360);
                window.contextSource.stroke();
                window.contextSource.moveTo(0, 420);
                window.contextSource.lineTo(80, 420);
                window.contextSource.stroke();
                window.contextSource.moveTo(560, 0);
                window.contextSource.lineTo(560, 480);
                window.contextSource.stroke();
                window.contextSource.moveTo(560, 60);
                window.contextSource.lineTo(640, 60);
                window.contextSource.stroke();
                window.contextSource.moveTo(560, 120);
                window.contextSource.lineTo(640, 120);
                window.contextSource.stroke();
                window.contextSource.moveTo(560, 180);
                window.contextSource.lineTo(640, 180);
                window.contextSource.stroke();
                window.contextSource.moveTo(560, 240);
                window.contextSource.lineTo(640, 240);
                window.contextSource.stroke();
                window.contextSource.moveTo(560, 300);
                window.contextSource.lineTo(640, 300);
                window.contextSource.stroke();
                window.contextSource.moveTo(560, 360);
                window.contextSource.lineTo(640, 360);
                window.contextSource.stroke();
                window.contextSource.moveTo(560, 420);
                window.contextSource.lineTo(640, 420);
                window.contextSource.stroke()
            }

            function _() {
                var e = a.width;
                var t = a.height;
                var n = contextSource.getImageData(0, 0, e, t);
                if (!u) u = contextSource.getImageData(0, 0, e, t);
                var r = contextSource.createImageData(e, t);
                B(r.data, n.data, u.data);
                calcData = r;
                p.putImageData(r, 0, 0);
                u = n
            }

            function D(e) {
                return (e ^ e >> 31) - (e >> 31)
            }

            function P(e) {
                return e > 21 ? 255 : 0
            }

            function H(e, t, n) {
                if (t.length != n.length) return null;
                var r = 0;
                while (r < t.length * .25) {
                    e[4 * r] = t[4 * r] == 0 ? 0 : D(t[4 * r] - n[4 * r]);
                    e[4 * r + 1] = t[4 * r + 1] == 0 ? 0 : D(t[4 * r + 1] - n[4 * r + 1]);
                    e[4 * r + 2] = t[4 * r + 2] == 0 ? 0 : D(t[4 * r + 2] - n[4 * r + 2]);
                    e[4 * r + 3] = 255;
                    ++r
                }
            }

            function B(e, t, n) {
                if (t.length != n.length) return null;
                var r = 0;
                while (r < t.length * .25) {
                    var i = (t[4 * r] + t[4 * r + 1] + t[4 * r + 2]) / 3;
                    var s = (n[4 * r] + n[4 * r + 1] + n[4 * r + 2]) / 3;
                    var o = P(D(i - s));
                    e[4 * r] = o;
                    e[4 * r + 1] = o;
                    e[4 * r + 2] = o;
                    e[4 * r + 3] = 255;
                    ++r
                }
            }

            function j() {
                var e = 80;
                for (var t = 0; t < 16; ++t) {
                    if (t < 8) {
                        var n = p.getImageData(0, m[t], a.width / 8, a.height / 8)
                    } else {
                        var n = p.getImageData(520, m[t], a.width / 8, a.height / 8)
                    }
                    var r = 0;
                    var i = 0;
                    while (r < n.data.length * .25) {
                        i += (n.data[r * 4] + n.data[r * 4 + 1] + n.data[r * 4 + 2]) / 3;
                        ++r
                    }
                    i = Math.round(i / (n.data.length * .25));
                    if (i > 10) {
                        N(t)
                    } else {}
                }
            }
            if (e()) {} else {
                alert("this feature is not supported in your browser, use the latest google chrome on your desktop browser instead")
            }
            var t = function(e) {
                alert("camera error!", e)
            };
            var n = document.querySelector("video");
            var r;
            var i;
            var s = window.URL || window.webkitURL;
            navigator.getUserMedia = navigator.getUserMedia || navigator.msGetUserMedia;
            var o, u;
            var a = document.getElementById("canvassource");
            var f = document.getElementById("canvasdest");
            var l = navigator.userAgent.indexOf("Safari") !== -1;
            var c = document.getElementById("selectwave");
            var h = c.options[c.selectedIndex];
            window.contextSource = a.getContext("2d");
            var p = f.getContext("2d");
            var d;
            if (navigator.getUserMedia) {
                window.typebr = 1;
                navigator.getUserMedia({
                    audio: false,
                    video: true
                }, function(e) {
                    if (navigator.mozGetUserMedia) {
                        n.mozSrcObject = e
                    } else {
                        window.URL.createObjectURL(e);
                        n.src = s ? s.createObjectURL(e) : e
                    }
                    n.onloadedmetadata = function(t) {
                        i = e
                    }
                }, t)
            } else if (navigator.webkitGetUserMedia) {
                window.typebr = 2;
                navigator.webkitGetUserMedia({
                    audio: false,
                    video: true
                }, function(e) {
                    if (window.URL) {
                        n.src = window.webkitURL.createObjectURL(e)
                    } else if (navigator.mozGetUserMedia) {
                        n.mozSrcObject = e
                    } else {
                        n.src = e
                    }
                    i = e;
                    w()
                }, t)
            } else if (navigator.mozGetUserMedia) {
                window.typebr = 3;
                navigator.mozGetUserMedia({
                    video: true,
                    audio: false
                }, function(e) {
                    if (navigator.mozGetUserMedia) {
                        n.mozSrcObject = e
                    } else {
                        var t = window.URL || window.webkitURL;
                        n.src = t ? t.createObjectURL(e) : e
                    }
                    n.play();
                    w()
                }, function(e) {
                    console.log("An error occured! " + e)
                })
            } else {}
            var v = window.AudioContext || window.webkitAudioContext || null;
            var m = [420, 360, 300, 240, 180, 120, 60, 0, 420, 360, 300, 240, 180, 120, 60, 0];
            window.contextSource.translate(a.width, 0);
            window.contextSource.scale(-1, 1);
            var g = 5;
            var y = 0;
            var b
        })()
