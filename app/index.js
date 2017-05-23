let moment = require('moment');
var stage = new createjs.Stage('main-canvas');
var shape = new createjs.Shape();
shape.graphics.beginFill('red').drawRect(0, 0, 120, 120);
stage.addChild(shape);
var circle = new createjs.Shape();
circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
stage.addChild(circle);

let data = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 15, 7: 19, 8: 17, 9: 14, 10: 13, 11: 18, 12: 15, 13: 18, 14: 17, 15: 17, 16: 17, 17: 11, 18: 19, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0}
let dataMap = (key, index) => {
  let shipments = Object.values(data)[index];
  if (shipments == 0) { return };
  let hour = +key;
  let hourLabel = moment(key, 'h').format('hh:mm a');

  return { 'hour': hour, 'hourLabel': hourLabel, 'shipments': shipments };
};
data = Object.keys(data).map(dataMap).filter(Boolean);
debugger;

var g = new createjs.Graphics();
g.setStrokeStyle(0.5);
g.beginStroke("#000000");
g.beginFill("green");
g.moveTo(0,0).lineTo(20,30);
let newSegment = (x) => g.lineTo(...x);
values.map( v => newSegment(v));
stage.addChild(new createjs.Shape(g));

let newCircle = (x) => {
  var circle = new createjs.Shape()
  circle.graphics.beginFill("Green").drawCircle(...x, 5);
  stage.addChild(circle)
}
values.map( v => newCircle(v));

stage.update();
