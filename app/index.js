const NUMBER_OF_WORK_HOURS = 11;
const MARGIN = 5;

let moment = require('moment');
let stage = new createjs.Stage('main-canvas');
stage.regX = -0.5;
stage.regY = -0.5;

(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

function mapRange(in_min, in_max, out_min, out_max, value) {
  return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const rawData = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 15, 7: 19, 8: 17, 9: 14, 10: 13, 11: 18, 12: 15, 13: 18, 14: 8, 15: 4, 16: 3, 17: 11, 18: 19, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0}
let dataMap = (key, index) => {
  let shipments = Object.values(rawData)[index];
  if (shipments == 0) { return };
  let hour = +key;
  let hourLabel = moment(key, 'h').format('hh:mm a');

  return { 'hour': hour, 'hourLabel': hourLabel, 'shipments': shipments };
};
const mappedData = Object.keys(rawData).map(dataMap).filter(Boolean);
const minShipments = Math.min(...mappedData.map(x => x.shipments));
const maxShipments = Math.max(...mappedData.map(x => x.shipments))

let addLine = (from, to, stage) => {
  let g = new createjs.Graphics();
  g.setStrokeStyle(1);
  g.beginStroke("#666666");
  g.beginFill("green");
  g.moveTo(...from).lineTo(...to);
  stage.addChild(new createjs.Shape(g));
}

let addCircle = (point, radius, stage) => {
  var circle = new createjs.Shape()
  circle.graphics.beginFill("Green").drawCircle(...point, radius);
  stage.addChild(circle)
}

let freshCanvas = (width, height, stage, container) => {
  stage.removeAllChildren();
  container.innerHTML=`<canvas id='main-canvas' width='${width}' height='${height}'></canvas>`;
  stage.canvas = document.getElementById("main-canvas");
}

let draw = () => {
  let container = document.getElementById("canvas-container");
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  let step = width / NUMBER_OF_WORK_HOURS;
  var points = [];

  freshCanvas(width, height, stage, container);

  for (var i = 0; i < NUMBER_OF_WORK_HOURS; i ++) {
    let newY = mapRange(minShipments, maxShipments, height - MARGIN, MARGIN, mappedData[i].shipments);
    let newX = parseInt(i * step + MARGIN);
    let newPoint = [newX, newY];

    points.push(newPoint);
  }

  for (let p of points) { addLine([p[0], 0],[p[0], height], stage); }

  var previousPoint;
  for (let p of points) {
    if (previousPoint) { addLine(previousPoint, p, stage) }
    previousPoint = p;
  }

  for (let p of points) { addCircle(p, 5, stage); }

  stage.update();
}

window.addEventListener("optimizedResize", draw);
draw();
