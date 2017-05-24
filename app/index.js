const NUMBER_OF_WORK_HOURS = 11;
const MARGIN = 10;

let moment = require('moment');
let stage = new createjs.Stage('main-canvas');
let domElements = [];
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
  let hourLabel = moment(key, 'h').format('h a');

  return { 'hour': hour, 'hourLabel': hourLabel, 'shipments': shipments };
};
const mappedData = Object.keys(rawData).map(dataMap).filter(Boolean);
const minShipments = Math.min(...mappedData.map(x => x.shipments));
const maxShipments = Math.max(...mappedData.map(x => x.shipments))

let addLine = (from, to, stroke, stage) => {
  let g = new createjs.Graphics();
  g.setStrokeStyle(stroke);
  g.beginStroke("#666666");
  g.moveTo(...from).lineTo(...to);
  stage.addChild(new createjs.Shape(g));
}

let addCircle = (point, radius, stage) => {
  var circle = new createjs.Shape()
  circle.graphics.beginFill("#9BC988").drawCircle(...point, radius);
  stage.addChild(circle)
}

let newBottomAxisTic = (i, x, y, container) => {
  var span = document.createElement('span')
  span.innerHTML = mappedData[i].hourLabel;
  span.id = `label-${i}`;
  container.prepend(span);
  let domElement = new createjs.DOMElement(span);
  domElement.x = x - (span.offsetWidth / 2);
  domElement.y = y;
  stage.addChild(domElement);
  return domElement;
}

let freshCanvas = (width, height, stage) => {
  stage.removeAllChildren();
  for (let el of domElements) {
    el.htmlElement.parentNode.removeChild(el.htmlElement);
  }
  domElements = []
  stage.canvas.width = width;
  stage.canvas.height = height;
}

let draw = () => {
  let container = document.getElementById("canvas-container");
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  let step = width / NUMBER_OF_WORK_HOURS;
  var points = [];

  freshCanvas(width, height, stage);

  for (var i = 0; i < NUMBER_OF_WORK_HOURS; i ++) {
    let newY = mapRange(minShipments, maxShipments, height - MARGIN, MARGIN, mappedData[i].shipments);
    let newX = parseInt(i * step + MARGIN);
    points.push([newX, newY]);
    domElements.push(newBottomAxisTic(i, newX, height, container));
  }

  for (let p of points) { addLine([p[0], 0],[p[0], height], 1, stage); }

  var previousPoint;
  for (let p of points) {
    if (previousPoint) { addLine(previousPoint, p, 3, stage) }
    previousPoint = p;
  }

  for (let p of points) { addCircle(p, 7, stage); }

  stage.update();
}

window.addEventListener("optimizedResize", draw);
draw();
