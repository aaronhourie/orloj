var width = 0;

$(document).ready(function() {

  //resizes the simulation space based on initial screen size.
  resizeCanvas();

  // initiates the planets
  drawPlanets(); 

  // For that chic, modern look
  $("#simSpace").fadeIn(1000);

  // Updates in real time. Unfortunately it's pretty much impossible to tell.
  setInterval(drawPlanets, 10);
});


function resizeCanvas() {

  // Sets the canvas size to be 66% of the screen. 
  width = $(window).width()/1.5;
  
  // The canvas is square.
  $(simSpace).attr("width", width);
  $(simSpace).attr("height", width);
}

function drawPlanets(){

  // Updates the clock
  $("#time").text(getTimeString());
  var canvas = document.getElementById("simSpace");
  var ctx = canvas.getContext("2d"); 

  // Fills the background each time so planets don't leave a trail.
  ctx.fillStyle = "#000";
  ctx.fillRect(0,0,width,width);

  // Draws the planets :D
  drawSol(canvas, ctx);
  drawMercury(canvas, ctx);
  drawVenus(canvas, ctx);
  drawEarth(canvas, ctx);
  drawMars(canvas, ctx);
  drawJupiter(canvas, ctx);
  drawSaturn(canvas, ctx);
  drawUranus(canvas, ctx);
  drawNeptune(canvas, ctx);
}


// Draws the sun. This function doesn't do much because the sun 
// is the center of this model.
function drawSol(canvas, ctx){

  ctx.fillStyle = "#FFCC00";
  ctx.beginPath();
  ctx.arc((width/2), (width/2), (width/100), 0, (2*Math.PI), false);
  ctx.fill();
}

// All planet functions have the same parameters, and draw their
// according planet.
function drawMercury(canvas, ctx){

  // Hands off hard-coded orbital information. SEE: getAngle()
  var angle = getAngle(1429444800000, 7600530240);
  
  // This is due to Mercury's elliptical orbit.
  var offsetX = (width/2 - width/200);
  var offsetY = (width/2);
  
  // For more or less eccentric orbits, these numbers would be the same.
  var x = offsetX + ((width/40) * Math.cos(angle));
  var y = offsetY + ((width/35) * Math.sin(angle));

  // Drawing and color instructions.
  ctx.fillStyle = "#666";
  ctx.beginPath();
  ctx.arc(x, y, (width/1000), 0, (2*Math.PI), false);
  ctx.fill();
}

function drawVenus(canvas, ctx){

  var angle = getAngle(1427068800000, 19414166400);

  var offsetX = (width/2);
  var offsetY = (width/2);
  
  var x = offsetX + ((width/20) * Math.cos(angle));
  var y = offsetY + ((width/20) * Math.sin(angle));

  ctx.fillStyle = "#FF9933";
  ctx.beginPath();
  ctx.arc(x, y, (width/750), 0, (2*Math.PI), false);
  ctx.fill();
}

function drawEarth(canvas, ctx){

  var angle = getAngle(1419206400000, 31558118400); 
  
  var offsetX = (width/2);
  var offsetY = (width/2);
  
  var x = offsetX + ((width/13) * Math.cos(angle));
  var y = offsetY + ((width/13) * Math.sin(angle));

  ctx.fillStyle = "#0066FF";
  ctx.beginPath();
  ctx.arc(x, y, (width/745), 0, (2*Math.PI), false);
  ctx.fill();
}

function drawMars(canvas, ctx){

  var angle = getAngle(1435881600000, 59354294400); 
  
  var offsetX = (width/2);
  var offsetY = (width/2 + width/200);
  
  var x = offsetX + ((width/9) * Math.cos(angle));
  var y = offsetY + ((width/10) * Math.sin(angle));

  ctx.fillStyle = "#EE2200";
  ctx.beginPath();
  ctx.arc(x, y, (width/850), 0, (2*Math.PI), false);
  ctx.fill();
}

function drawJupiter(canvas, ctx){

  var angle = getAngle(1377561600000, 374335776000); 
  
  var offsetX = (width/2);
  var offsetY = (width/2);
  
  var x = offsetX + ((width/4) * Math.cos(angle));
  var y = offsetY + ((width/4) * Math.sin(angle));

  ctx.fillStyle = "#FFCC80";
  ctx.beginPath();
  ctx.arc(x, y, (width/190), 0, (2*Math.PI), false);
  ctx.fill();
}

function drawSaturn(canvas, ctx){

  var angle = getAngle(1046476800000, 929596608000); 
  
  var offsetX = (width/2);
  var offsetY = (width/2);
  
  var x = offsetX + ((width/3.2) * Math.cos(angle));
  var y = offsetY + ((width/3.2) * Math.sin(angle));

  ctx.fillStyle = "#FFCC00";
  ctx.beginPath();
  ctx.arc(x, y, (width/350), 0, (2*Math.PI), false);
  ctx.fill();
}

function drawUranus(canvas, ctx){

  var angle = getLongAngle(1.6, 2651369760000); 
  
  var offsetX = (width/2);
  var offsetY = (width/2);
  
  var x = offsetX + ((width/2.2) * Math.cos(angle));
  var y = offsetY + ((width/2.2) * Math.sin(angle));

  ctx.fillStyle = "#CCFFFF";
  ctx.beginPath();
  ctx.arc(x, y, (width/550), 0, (2*Math.PI), false);
  ctx.fill();
}

function drawNeptune(canvas, ctx){

  var angle = getLongAngle(2.6,5200420000000); 
  
  var offsetX = (width/2);
  var offsetY = (width/2);
  
  var x = offsetX + ((width/2.0) * Math.cos(angle));
  var y = offsetY + ((width/2.0) * Math.sin(angle));

  ctx.fillStyle = "#0000CC";
  ctx.beginPath();
  ctx.arc(x, y, (width/600), 0, (2*Math.PI), false);
  ctx.fill();
}

/* The first argument is the "offset" to an arbitrarily chosen point
 * in the orbit. This is to ensure all planets orbit at their correct
 * positions.
 * The second argument is the orbital period. This is the length of a 
 * "year" on the planet in milliseconds.
 *
 * Returns the parameter angle in radians.
 */
function getAngle(offsetTime, orbitalPeriod){

  var date = new Date();
  // Applies the offset.
  var orbitTime = (date.getTime()-offsetTime) % orbitalPeriod;
  // returns the parameter angle in radians.
  return orbitTime * (2*Math.PI / orbitalPeriod);
}

/* This function works mostly the same, except it takes a direct
 * angle amount in radians for the offset. This is because more
 * distant planets have orbits that are longer than most computers
 * have existed for!
 */

function getLongAngle(offsetAngle, orbitalPeriod){

  var date = new Date();
  var orbitTime = date.getTime();
  // tacks on the offset angle at the end.
  return (orbitTime * (2*Math.PI / orbitalPeriod)) + offsetAngle;
}

// Returns a formatted time string.
function getTimeString(){

  var date = new Date();
  var month = getMonthName(date.getMonth());
  
  return month.concat(" ", date.getDate(), ", ", date.getFullYear(),
                      " - ", date.getHours(), ":", date.getMinutes(),
                      ":", date.getSeconds()); 
  
}

// Returns the abbreviated month name.
function getMonthName(month){

  switch (month) {
    case 0: return "Jan"; break;
    case 1: return "Feb"; break;
    case 2: return "Mar"; break;
    case 3: return "Apr"; break;
    case 4: return "May"; break;
    case 5: return "June"; break;
    case 6: return "July"; break;
    case 7: return "Aug"; break;
    case 8: return "Sept"; break;
    case 9: return "Oct"; break;
    case 10: return "Nov"; break;
    case 11: return "Dec"; break;
  }
  return "An error has occured! Please try again later.";
}
