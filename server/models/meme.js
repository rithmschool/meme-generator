var mongoose = require("mongoose");

var memeSchema = new mongoose.Schema({
  top: {
    type: String,
    required: true
  },
  bottom: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, {
  timestamps: true
});

memeSchema.pre('remove', function(next){
  var self = this
  db.User.findById(this.user).then(function(user){
    user.memes.remove(self.id);
    user.save().then(function(e){
      next()
    });
  });
});

var Meme = mongoose.model('Meme', memeSchema);
module.exports = Meme;
