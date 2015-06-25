var blues = ['a', 'c', 'd', 'eb', 'g'];
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

  Template.task.onRendered(function () {
     playSound(this.data.text);
   });
    
  Router.route('/', function () {
     this.render(Template);
  });
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      
      Router.route('/music', {where: 'server'}).post(function(){
		        Tasks.insert({
      			    text: this.request.body.note,
      			    date: new Date(), // current time
                    name: this.request.body.name,
                    ip: this.request.connection.remoteAddress
    		    });
          this.response.end('done'+this.request.body.note+'\n');
            // update Item Function
      });
      
      Router.route('/removeAll', {where: 'server'}).post(function(){
          console.log('removing all entries');
          Tasks.remove({});
          this.response.end('Removed all\n');
            // update Item Function
      });

    // code to run on server at startup
  });
}
