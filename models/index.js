const User = require('./User');
const event = require('/Event')
// const goal = require('/Goal')



// event belongs to user
event.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Post.hasMany(Comment, {
//   foreignKey: 'postId',
//   onDelete: 'CASCADE'
// });

User.hasMany(event, {
  foreignKey: 'eventId',
  onDelete: 'CASCADE'
});


// Comment.belongsTo(User, {
//   foreignKey: 'userId',
//   onDelete: 'CASCADE'
// });

module.exports = {
  User,
  Event
//   Post
};