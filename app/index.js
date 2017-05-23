let moment = require('moment');
let stage = new createjs.Stage('main-canvas');

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

const rawData = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 15, 7: 19, 8: 17, 9: 14, 10: 13, 11: 18, 12: 15, 13: 18, 14: 17, 15: 17, 16: 17, 17: 11, 18: 19, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0}
let dataMap = (key, index) => {
  let shipments = Object.values(rawData)[index];
  if (shipments == 0) { return };
  let hour = +key;
  let hourLabel = moment(key, 'h').format('hh:mm a');

  return { 'hour': hour, 'hourLabel': hourLabel, 'shipments': shipments };
};
const mappedData = Object.keys(rawData).map(dataMap).filter(Boolean);

let addLine = (from, to, stage) => {
  let g = new createjs.Graphics();
  g.setStrokeStyle(0.5);
  g.beginStroke("#000000");
  g.beginFill("green");
  g.moveTo(...from).lineTo(...to);
  stage.addChild(new createjs.Shape(g));
}

let addCircle = (x, y, radius, stage) => {
  var circle = new createjs.Shape()
  circle.graphics.beginFill("Green").drawCircle(x, y, radius);
  stage.addChild(circle)
}

let draw = () => {
  let container = document.getElementById("canvas-container");
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  stage.canvas.width = width;
  stage.canvas.height = height;
  addCircle(50,50,10,stage);
  console.log(width);
  stage.update();
}
window.addEventListener("optimizedResize", draw);
