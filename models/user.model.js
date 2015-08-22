var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['cliente', 'admin'],
        default: 'cliente'
    }
});

//  Método estatico para buscar por username
userSchema.statics.findByUserName = function (username, cb) {
    this.model('user').findOne({username: username}, cb);
};

userSchema.methods.isAdmin = function () {
    return (this.rol == 'admin');
    // `this` would be [property]
}

module.exports = mongoose.model('user', userSchema);
