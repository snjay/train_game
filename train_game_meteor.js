NumbersList = new Mongo.Collection('numbers');
ResultsList = new Mongo.Collection('equation_results');

var found;

if (Meteor.isClient) {

  // numbers start at 1
  //Session.setDefault('number1', 1);
  //Session.setDefault('number2', 1);
  //Session.setDefault('number3', 1);
  //Session.setDefault('number4', 1);

  // console.log("AYY LMAO");

  Template.numbers.events({
    'submit .getNumbers' : function () {
      console.log("obtaining numbers now!");
      found = true;
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var n1 = event.target.num1.value;
      var n2 = event.target.num2.value;
      var n3 = event.target.num3.value;
      var n4 = event.target.num4.value;

      console.log(n1); console.log(n2);
      console.log(n3); console.log(n4);

      // Set respective values
      Session.set('number1', n1); Session.set('number2', n2);
      Session.set('number3', n3); Session.set('number4', n4);

      // debugging
      console.log("check server console!");

      found = true;
      Meteor.call('performCalculations',n1, n2, n3, n4, 10);

      console.log("should be done on server side!");
    }
  });

  Template.numbers.helpers({
    'num1' : function() {
      // console.log('hey1');
      return Session.get('number1');
    },

    'num2' : function() {
      // console.log('hey2');
      return Session.get('number2');
    },

    'num3' : function() {
      // console.log('hey3');
      return Session.get('number3');
    },

    'num4' : function() {
      // console.log('hey4');
      return Session.get('number4');
    },

    'equations' : function() {
      console.log('equations');
      // return "Ayy lmao";
    },

    'results' : function() {
      return ResultsList.find({});
    },

    'foundNumbers' : function() {
      return true;
    }

  });

}

// SERVER SIDE
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    NumbersList.remove({});
    ResultsList.remove({});
  });

  Meteor.methods ({
    'performCalculations' : function(n1, n2, n3, n4, g) {
      NumbersList.remove({});
      ResultsList.remove({});
      var exec = Npm.require('child_process').exec;
      var Fiber = Npm.require('fibers');
      // Dodgemaster_4000 right here
      var pyprogram = "python3 ../../../../../train_game.py " 
                        + String(n1) + " " 
                        + String(n2) + " "
                        + String(n3) + " "
                        + String(n4) + " "
                        + String(g);
      
      found = true;
      // Fiber environment allows us to bind environment
      new Fiber (function() {
        exec(pyprogram, Meteor.bindEnvironment (function (error, stdout, stderr) {
          console.log("splitting...");
          results = stdout.split("\n");
          // remove last element
          results.pop();
          console.log(results);
          for (x in results) {
              ResultsList.insert({
                eqn: results[x]
              });
            //console.log(results[x]);
          }
          console.log("done!");
        }, function () {
          console.log('Failed to bind environment - no results');
          found = false;
        }));
      }).run();
    },

    'hello_world' : function() {
      console.log("Hello world!!!");
    }
  });
}