var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:qqliwenhui199608@localhost:27017/admin',{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connect seccess')
//   var kittySchema = mongoose.Schema({
//     name: String
//   });

// kittySchema.methods.speak = function () {
//     var greeting = this.name
//       ? "Meow name is " + this.name
//       : "I don't have a name";
//     console.log(greeting);
//   }
// var Kitten = mongoose.model('Kitten', kittySchema);
// var felyne = new Kitten({ name: 'Felyne' });
// felyne.speak(); // "Meow name is felyne"
// felyne.save(function (err, felyne) {
//     if (err) return console.error(err);
//     felyne.speak();
//   });
//   Kitten.find(function (err, kittens) {
//     if (err) return console.error(err);
//     console.log(kittens);
//   })
});
