const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    /**
     * status:消息状态
     *  0: 已读，
     *  1: 未读；
     * type：消息类型
     *  0: 系统消息，
     *  1: 用户消息
     */
const NewSchema = new Schema({
    firstName: {
        type: String,
        default: '',
        required: true,
    },
    lastName: {
        type: String,
        default: '',
        required: true,
    },
    status: {
        type: String,
        default: '1'
    },
    type: {
        type: String,
        default: '0'
    },
    time: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        default: ''
    },
    mail: {
        type: String,
        default: '',
        required: true,
    },
    tel: {
        type: String,
        default: '',
        required: true
    }
})

module.exports = mongoose.model('news', NewSchema);