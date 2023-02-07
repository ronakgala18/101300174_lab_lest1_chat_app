const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required: true
    },
    firstName:{
        type: 'string',
        required: true
    },
    lastName:{
        type: 'string',
    },
    password:{
        type: 'password',
        required: true
    },
    createon:{
        type: 'Date'
    }

})
userSchema.pre('save', (next) => {
    let now = Date.now();
    if(!this.createon){
        this.createon = now
    }
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;