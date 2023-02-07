const mongoose = require('mongoose');

const privateMessageSchema = new mongoose.Schema({
    to_user:{
        type: 'string',
        required: true
    },
    message:{
        type: 'string',
        required: true
    },
    from_user:{
        type: 'string',
        required: true
    },
    
    date_sent:{
        type: 'Date'
    }

})
privateMessageSchema.pre('save', (next) => {
    let now = Date.now();
    if(!this.date_sent){
        this.date_sent = now
    }
    next();
})

const PrivateMessage = mongoose.model('PrivateMessage', privateMessageSchema);
module.exports = PrivateMessage;