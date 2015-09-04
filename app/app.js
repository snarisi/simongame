/*global angular, console*/
(function () {
  "use strict";
  var app = angular.module("simonApp", ["gameLogic"]);
  
  app.controller("GameCtrl", ["$scope", "$timeout", "game",
    function ($scope, $timeout, game) {
      $scope.gameOver = false;
      $scope.gameInProgress = false;
      $scope.totalSteps = "";
      $scope.strict = false;

      $scope.toggleStrict = function () {
        if ($scope.strict) {
          $scope.strict = false;
        } else {
          $scope.strict = true;
        }
      };
      
      function newRound() {
        game.addToSequence();
        game.clearAttempt();
        $timeout(function () {
          game.playSequence();
          $scope.totalSteps = game.getSequence().length;
        }, 500);
      }

      function gameOver() {
        console.log("failed");
        $scope.totalSteps = game.getSequence().length - 1;
        $scope.gameOver = true;
        game.clearAttempt();
        game.clearSequence();
      }
      
      $scope.pressButton = function (color) {
        if (!game.sequencePlaying) {
          game.playAudio(color);
          game.addToAttempt(color);
          if (!game.compareAttempt()) {
            if ($scope.strict) {
              gameOver();
            } else {
              $scope.wrongMove = true;
            }
          } else if (game.getAttempt().length === game.getSequence().length) {
            newRound();
          }
        }
      };
      
      $scope.tryAgain = function () {
        $scope.wrongMove = false;
        game.clearAttempt();
        game.playSequence();
      };
      
      $scope.checkColor = function (color) {
        return color === game.getCurrentColor();
      };
      
      $scope.pressStart = function () {
        if (game.getSequence().length === 0) {
          $scope.gameInProgress = true;
          $scope.gameOver = false;
          newRound();
        }
      };
      
      $scope.reset = function () {
        $scope.gameOver = false;
        $scope.gameInProgress = false;
        $scope.totalSteps = "";
        game.clearSequence();
        game.clearAttempt();
      };
      
    }]);
}());