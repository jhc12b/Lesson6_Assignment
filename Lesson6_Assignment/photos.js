/*   
    Program Name:  Photo Gallery Application
    Author: Jeffrey Cespedes
    Date:   7/8/15
    Filename: photos.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrder = [1,2,3,4,5];
var figureCount = 3;

//function populateFigures() {
/* add src values to img elements based on order specified in photoOrder array */
function populateFigures() {
    var filename;
    var currentFig;
    if (figureCount === 3) {
    for (var i = 1; i < 4; i++) {
        filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
        currentFig = document.getElementsByTagName("img")[i - 1];
        currentFig.src = filename;
    }
 } else {
     for (var i = 1; i < 5; i++) {
         filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
         currentFig = document.getElementsByTagName("img")[i];
         currentFig.src = filename; 
     }
 }
    
}//end of populationFigures()  
    

/* shift all images one figure to the left, and change values in photoOrder array to match  */

function rightArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] + 1) === 6) {
         photoOrder[i] = 1;
      } else {
         photoOrder[i] += 1;
      }
      populateFigures();
   }
}

/* shift all images one figure to the right, and change values in photoOrder array to match  */
function leftArrow() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] - 1) === 0) {
         photoOrder[i] = 5;
      } else {
         photoOrder[i] -= 1;
      }
      populateFigures();
   }
}
// create event listeners for left arrow, right arrow, and center figure element
function previewFive() {
    var articleEl = document.getElementsByTagName("article")[0];
    
    //create figure and img elements for fifth image
    var lastFigure = document.createElement("figure");
    lastFigure.id = "fig5";
    lastFigure.style.zIndex = "5";
    lastFigure.style.position = "absolute";
    lastFigure.style.right = "45px";
    lastFigure.style.top = "67px";
    
    //articleEl.insertBefore(lastFigure, document.getElementById("rightArrow"));
    var lastImage = document.createElement("img");
    lastImage.width = "240";
    lastImage.height = "135";
    
    lastFigure.appendChild(lastImage);
    articleEl.appendChild(lastFigure);
    
    //clone figure element for fifth image and edit to be first image
    var firstFigure = lastFigure.cloneNode(true);
    firstFigure.id = "fig1";
    firstFigure.style.right = "";
    firstFigure.style.left = "45px";
    articleEl.insertBefore(firstFigure, document.getElementById("fig2"));
    
    //add appropriate src values to two new img elements
    document.getElementsByTagName("img")[0].src = "images/IMG_0" + photoOrder[0] + "sm.jpg";
    document.getElementsByTagName("img")[4].src = "images/IMG_0" + photoOrder[4] + "sm.jpg";
    
    figureCount = 5;
}



/* open center figure in separate window */
function zoomFig() {
    var zoomWindow = window.open("zoom.htm", "zoomwin", "width=960,height=600");   
}// end of zoomFig function
/* create event listeners for left arrow, right arrow, and center figure element */
function createEventListener() {
    var leftarrow = document.getElementById("leftarrow");
    
    if (leftarrow.addEventListener) {
        leftarrow.addEventListener("click", leftArrow, false);
    } else if (leftarrow.attachEvent) {
        leftarrow.attachEvent("onclick", leftArrow);
    }
    
    var rightarrow = document.getElementById("rightarrow");
    
    if (rightarrow.addEventListener) {
        rightarrow.addEventListener("click", rightArrow, false);
    } else if (rightarrow.attachEvent) {
        rightarrow.attachEvent("onclick", rightArrow);
    }
    
    var mainFig = document.getElementsByTagName("img")[1];
    
    if (mainFig.addEventListener) {
        mainFig.addEventListener("click", zoomFig, false);
    }
     else if (mainFig.attachEvent){
        mainFig.attachEvent("onclick", zoomFig);
    }
    
    var showAllButton = document.querySelector("#fiveButton p");
    
    if (showAllButton.addEventListener) {
        showAllButton.addEventListener("click", previewFive,false);
    } else if (showAllButton.attachEvent) {
        showAllButton.attachEvent("onclick", previewFive);
    }
}//end of createEventListeners function
     
    
/* create event listeners and populate image elements */
function setUpPage() {
   createEventListener();
   populateFigures();
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false); 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}