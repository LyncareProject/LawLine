const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.token = require("./token.model");
db.role = require("./role.model");
db.counsel = require("./counsel.model");
db.comment = require("./comment.model");
db.forward = require("./forward.model");
db.authNumber = require("./authNumber.model");
db.request = require("./request.model");
db.chat = require("./chat.model");
db.room = require("./room.model");

module.exports = db;