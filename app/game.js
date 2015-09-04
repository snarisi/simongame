/*global angular, console, $interval, Audio*/
(function () {
  "use strict";
  var app = angular.module("gameLogic", []);
  
  app.factory("game", ["$timeout",
    function ($timeout) {
      var game = {},
        sequence = "",
        attempt = "",
        currentColor = "",
        redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
        blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
        greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
        yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
      game.sequencePlaying = true;

      function randomColor() {
        var num = Math.floor(Math.random() * 4);
        if (num === 0) {
          return "G";
        } else if (num === 1) {
          return "R";
        } else if (num === 2) {
          return "B";
        } else {
          return "Y";
        }
      }
      
      game.playAudio = function (color) {
        switch (color) {
        case "R":
          redSound.play();
          break;
        case "B":
          blueSound.play();
          break;
        case "G":
          greenSound.play();
          break;
        case "Y":
          yellowSound.play();
          break;
        }
      };

      game.playSequence = function () {
        //TODO: make sure there is a pause in between each color change
        var i = 0,
          speed = 1000;
        game.sequencePlaying = true;
        
        if (sequence.length >= 5) {
          speed = 800;
        } else if (sequence.length >= 9) {
          speed = 600;
        } else if (sequence.length >= 13) {
          speed = 400;
        }

        function colorIter() {
          var arr = sequence.split('');
          currentColor = "";
          $timeout(function () {
            if (i < arr.length) {
              currentColor = arr[i];
              game.playAudio(currentColor);
              $timeout(function () {
                i += 1;
                colorIter();
              }, speed * 0.6);
            } else {
              game.sequencePlaying = false;
            }
          }, (speed * 0.4));
        }
        colorIter(0);
      };

      game.addToSequence = function () {
        sequence += randomColor();
      };

      game.clearSequence = function () {
        sequence = "";
      };

      game.addToAttempt = function (color) {
        attempt += color;
      };

      game.clearAttempt = function () {
        attempt = "";
      };
      
      game.getCurrentColor = function () {
        return currentColor;
      };
      
      game.compareAttempt = function () {
        var part = sequence.split('').slice(0, attempt.length).join('');
        console.log(part);
        console.log(attempt);
        return part === attempt;
      };
      
      game.getAttempt = function () {
        return attempt;
      };
      
      game.getSequence = function () {
        return sequence;
      };

      return game;
    }]);
}());