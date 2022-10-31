var browser = (function () {
  var test = function (regexp) {
    return regexp.test(navigator.userAgent);
  };
  switch (true) {
    case test(/edg/i):
      return "Microsoft Edge";
    case test(/trident/i):
      return "Microsoft Internet Explorer";
    case test(/firefox|fxios/i):
      return "Mozilla Firefox";
    case test(/opr\//i):
      return "Opera";
    case test(/ucbrowser/i):
      return "UC Browser";
    case test(/samsungbrowser/i):
      return "Samsung Browser";
    case test(/chrome|chromium|crios/i):
      return "Google Chrome";
    case test(/safari/i):
      return "Apple Safari";
    default:
      return "Other";
  }
})();

if (browser == "Apple Safari") {
  importScripts("../dist/ARToolkitNFT.js");
} else {
  importScripts("../dist/ARToolkitNFT_simd.js");
}
// Import OneEuroFilter class into the worker.
importScripts("./one-euro-filter.js");

self.onmessage = function (e) {
  var msg = e.data;
  switch (msg.type) {
    case "load": {
      load(msg);
      return;
    }
    case "process": {
      next = msg.imagedata;
      process();
    }
  }
};

var next = null;
var ar = null;
var markerResult = null;
var marker1, marker2, marker3;

// initialize the OneEuroFilter
this.filterMinCF = 0.001;
this.filterBeta = 1000;
const filter = new OneEuroFilter({minCutOff: this.filterMinCF, beta: this.filterBeta})

function load(msg) {
  console.debug("Loading marker at: ", msg.marker);

  var onLoad = function (arController) {
    ar = arController;
    var cameraMatrix = ar.getCameraMatrix();

    ar.addEventListener("getNFTMarker", function (ev) {
      filter.reset();
      var mat = filter.filter(Date.now(), ev.data.matrixGL_RH);
      markerResult = {
        type: "found",
        index: JSON.stringify(ev.data.index),
        matrixGL_RH: JSON.stringify(mat),
      };
    });

    ar.loadNFTMarkers(msg.marker, function (ids) {
      for (var i = 0; i < ids.length; i++) {
        ar.trackNFTMarkerId(i);
      }
      marker1 = ar.getNFTData(ar.id, 0);
      marker2 = ar.getNFTData(ar.id, 1);
      marker3 = ar.getNFTData(ar.id, 2);
      postMessage({
        type: "markerInfos",
        marker1: marker1,
        marker2: marker2,
        marker3: marker3,
      });
      console.log("loadNFTMarker -> ", ids);
      postMessage({ type: "endLoading", end: true });
    }).catch(function (err) {
      console.log("Error in loading marker on Worker", err);
    });

    postMessage({ type: "loaded", proj: JSON.stringify(cameraMatrix) });
  };

  var onError = function (error) {
    console.error(error);
  };

  console.debug("Loading camera at:", msg.camera_para);

  // we cannot pass the entire ARControllerNFT, so we re-create one inside the Worker, starting from camera_param
  ARToolkitNFT.ARControllerNFT.initWithDimensions(
    msg.pw,
    msg.ph,
    msg.camera_para
  )
    .then(onLoad)
    .catch(onError);
}

function process() {
  markerResult = null;

  if (ar && ar.process) {
    ar.process(next);
  }

  if (markerResult) {
    postMessage(markerResult);
  } else {
    postMessage({ type: "not found" });
  }

  next = null;
}
