const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');


const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    admin: { type: Boolean, default: 0 },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    rememberToken: { type: String, default: null }
}, {
    timestamps: true
});
//hash password
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, bcrypt.genSaltSync(18), (err, hash) => {
        // Store hash in your password DB.
        if (err) console.log(err)
        this.password = hash;
        next();
    });
})
userSchema.methods.setRememberToken = function (res) {
    const token = uniqueString();
    res.cookie('remember_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 15, httpOnly: true, signed: true
    })
    this.update({ rememberToken: token }, err => {
        if (err) console.log(err)
    })
};
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);

}
module.exports = mongoose.model('User', userSchema);