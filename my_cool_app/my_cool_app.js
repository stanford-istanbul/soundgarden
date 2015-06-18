var blues = ['a', 'c', 'd', 'eb', 'f', 'g'];
function playSound(note) {
            if (blues.indexOf(note) == -1) {
                return;
            }
            var audio = new Audio('sounds/'+note+'.wav');
         console.log(audio);
        audio.play();
}
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    },

  });
    Template.task.events({
  "click .delete": function () {
      console.log(this);
  }
});
    Template.task.onRendered(function () {
        console.log('party');
        console.log(this.data.text);
  playSound(this.data.text);
});
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      
      Router.route('/items', {where: 'server'}).post(function(){
          console.log('u made a push');
		        Tasks.insert({
      			    text: this.request.body.note,
      			    createdAt: new Date() // current time
    		    });
          console.log(this.request.body.note);
          this.response.end('done'+this.request.body.note+'\n');
            // update Item Function
      });
//      WebApp.connectHandlers.stack.splice(0,0,{
//        route: '/items',
//        handle: function(req, res, next) {
//            if(req.method === 'POST') {
//                console.log('u made a push');
//		        Tasks.insert({
//      			    text: 'a new thing',
//      			    createdAt: new Date() // current time
//    		    });
//                
//                // Listen for deploy information
//                // Insert info to DB
//            }
//            next();
//        },
//      });
    // code to run on server at startup
  });
}
