NumbersList = new Mongo.Collection('numbers');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  // numbers start at 0
  Session.setDefault('number1', 1);
  Session.setDefault('number2', 2);
  Session.setDefault('number3', 3);
  Session.setDefault('number4', 4);

  console.log("AYY LMAO");

  Template.hello.helpers({
    counter: function () {
      console.log("getting counter");
      return Session.get('counter');
    }
  });

  // HELLO TEMPLATE
  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      console.log("incremented counter");
      Session.set('counter', Session.get('counter') + 1);
    }
  });


  Template.numbers.events({
    'submit .getNumbers' : function () {
      // Prevent default browser form submit
      console.log("obtaining numbers now!");
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

      Meteor.call('hello_world');
      Meteor.call('performCalculations',n1, n2, n3, n4, 10);

      console.log("should be done on server side!");
    }
  });

  Template.numbers.helpers({
    'num1' : function() {
      console.log('hey1');
      return Session.get('number1');
    },

    'num2' : function() {
      console.log('hey2');
      return Session.get('number2');
    },

    'num3' : function() {
      console.log('hey3');
      return Session.get('number3');
    },

    'num4' : function() {
      console.log('hey4');
      return Session.get('number4');
    },

    'equations' : function() {
      console.log('equations');
      return "Ayy lmao";
    },

    equations: [
      { eqn: "This is equation 1" },
      { eqn: "This is equation 2" },
      { eqn: "This is equation 3" }
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods ({
    'performCalculations' : function(n1, n2, n3, n4, g) {
      var exec = Npm.require('child_process').exec;
      var Fiber = Npm.require('fibers');
      var pyprogram = "python3 ../../../../../train_game.py " 
                        + String(n1) + " " 
                        + String(n2) + " "
                        + String(n3) + " "
                        + String(n4) + " "
                        + String(g);
      
      new Fiber(function(){
        exec(pyprogram, function (error, stdout, stderr) {
          // console.log("stdout: ");
          console.log(stdout);
          // console.log("errors: ");
          // console.log(stderr);
          // console.log('GO BACK TO CHROME CONSOLE AND CHECK NOW!');
        });
      }).run();

    },


    'hello_world' : function() {
      console.log("Hello world!!!");
    }


  });

}