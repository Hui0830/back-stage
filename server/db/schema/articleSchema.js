const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema ({
    userId: Schema.Types.ObjectId,
    userName: String
})
const tagSchema = new Schema({
    id: {
        type: String,
        default: '0'
    },
    name: {
        type: String,
        default: '公司大事记'
    },
})

const articleSchema = new Schema ({
    status: {
        type: Number,
        required:true,
        min: 0,
        max: 1,
    },
    title: {
        type: String,
        default: ''
    },
    time: {
        type: Date,
        default: Date.now(),
    },
    describe: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    reviewNum: {
        type: Number,
        default: 0
    },
    author: authorSchema,
    tag: tagSchema,
})

articleSchema.pre('save', function(next) {
    if(this.isNew){
        // this.index += 1
    }else{
        console.log('notnew')
    }
    next();
})

articleSchema.statics = {
    addArticle: function(pramas) {
        const { status, tag, title, describe, content, author } = pramas;
        return this.create({
            title,
            describe,
            content,
            author,
            tag,
            status,
        })
    },
    // 分页查找用户列表
    findArticleList: async function ({page, pageSize, search = '{"keyWord":"", "tag": 0, "time": ""}'}) {
        const { keyWord, tag, time} = JSON.parse(search);
        const filter = {};
        if(tag && tag != 0) {
            filter['tag'] = tag;
        };
        if(time) {
            filter['time'] = { $gt: new Date(time), $lt: new Date(`${time}-12-30`) }
        }
        const reg = new RegExp(keyWord, 'i');
        
        const query=this.find({
            $or: [
                { title: {$regex : reg} },
                { describe: {$regex : reg}}
            ],
            ...filter
        })
            .select({ content: 0})
            .skip((page-1)*pageSize)
            .limit(pageSize);
        return query
    }, 
}

module.exports = articleSchema;