(function(){
  'use strict';
  var indexX   = 0,
      indexY   = 0,
      middleX  = 0,
      middleY  = 0,
      ringX    = 0,
      ringY    = 0,
      frame,
      appWidth = 1260,
      appHeight= 640;

  function setup() {
    createCanvas(appWidth, appHeight);
  }

  function draw() {
    background(127, 219, 255);

    // save off initial state
    push();

    // The first branch starts at the
    // bottom of the window.
    var theta1 = map(indexX, 0, width, 0, PI/2),
        theta2 = map(indexY, 0, height, 0, PI/2);
    translate(width * 0.25, height);
    stroke(0, 0, 255);
    //branch(160,6);
    branch(140, theta1, theta2);
    pop();

    push();
    theta1 = map(middleX, 0, width, 0, PI/2);
    theta2 = map(middleY, 0, height, 0, PI/2);
    translate(width * 0.5, height);
    stroke(0, 255, 0);
    //branch(160,6);
    branch(140, theta1, theta2);
    pop();

    push();
    theta1 = map(ringX, 0, width, 0, PI/2);
    theta2 = map(ringY, 0, height, 0, PI/2);
    translate(width * 0.75, height);
    stroke(255, 0, 0);
    //branch(160,6);
    branch(140, theta1, theta2);
    pop();
  }

  // Each branch now receives
  // its length as an argument.
  //function branch(len, thick) {
  function branch(len, thetaX, thetaY) {
    //if (thick > 1){
    //strokeWeight(thick);
    //}
    //else{
    //  strokeWeight(1);
    //}
    line(0, 0, 0, -len);
    translate(0, -len);

    // Each branch’s length
    // shrinks by two-thirds.
    len *= 0.66;
    //thick -= 1;

    if (len > 2) {
      push();
      rotate(thetaX);
      // Subsequent calls to branch()
      // include the length argument.
      //branch(len,thick);
      branch(len, thetaX, thetaY);
      pop();

      push();
      rotate(-thetaY);
      //branch(len,thick);
      branch(len, thetaX, thetaY);
      pop();
    }

   // else{
  //    c = color(0, 255, 0);
  //    fill(c);
  //    ellipse(0,0,3,7);
  //  }
  }

  Leap.loop({
    frame: function(frame){
      var iBox = frame.interactionBox,
          leapPoint,
          normalizedPoint;
      // console.log('ibox', iBox);
      if(frame.hands[0]){
        var hand = frame.hands[0],
            fingers = hand.fingers.filter(function(f){
              return f.type === 1 || f.type === 2 || f.type === 3;
            });
        fingers.forEach(function(f){
          switch(f.type){
            case 1:
              leapPoint = f.tipPosition;
              normalizedPoint = iBox.normalizePoint(leapPoint, true);
              indexX = normalizedPoint[0] * appWidth;
              indexY = (1 - normalizedPoint[1]) * appHeight;
              break;
            case 2:
              leapPoint = f.tipPosition;
              normalizedPoint = iBox.normalizePoint(leapPoint, true);
              middleX = normalizedPoint[0] * appWidth;
              middleY = (1 - normalizedPoint[1]) * appHeight;
              break;
            case 3:
              leapPoint = f.tipPosition;
              normalizedPoint = iBox.normalizePoint(leapPoint, true);
              ringX = normalizedPoint[0] * appWidth;
              ringY = (1 - normalizedPoint[1]) * appHeight;
              break;
          }
        });
      };
      // document.getElementById('leap-output').innerHtml = '';
    },
    hand: function(hand){
    }
  });

  window.setup = setup;
  window.draw = draw;
})();
