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
    Template.task.events({
  "click .delete": function () {
      //Tasks.remove({});
  }
});
    Template.task.onRendered(function () {
        console.log('party');
        console.log(this.data.text);
  playSound(this.data.text);
});
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      
      Router.route('/music', {where: 'server'}).post(function(){
		        Tasks.insert({
      			    text: this.request.body.note,
      			    createdAt: new Date() // current time
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
