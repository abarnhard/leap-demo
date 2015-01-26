(function(){
  'use strict';

  function setup() {
    createCanvas(1260, 640);
  }

  function draw() {
    background(127, 219, 255);

    var theta1 = map(mouseX, 0, width, 0, PI/2),
        theta2 = map(mouseY, 0, height, 0, PI/2);

    push();
    // The first branch starts at the
    // bottom of the window.
    translate(width/2, height);
    stroke(0, 31, 63);
    //branch(160,6);
    branch(140, theta1, theta2);

    pop()
    translate(width/4, height);
    stroke(0);
    //branch(160,6);
    branch(140, theta1, theta2);

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
  window.setup = setup;
  window.draw = draw;
})();
