const mongoose = require('mongoose');

const groupMessageSchema = new mongoose.Schema({
    room:{
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
groupMessageSchema.pre('save', (next) => {
    let now = Date.now();
    if(!this.date_sent){
        this.date_sent = now
    }
    next();
})

const GroupMessage = mongoose.model('GroupMessage', groupMessageSchema);
module.exports = GroupMessage;