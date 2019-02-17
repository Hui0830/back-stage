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
    // 修改
    putArticle: function(pramas) {
        const { articleId ,status, tag, title, describe, content, author } = pramas;
        return this.findByIdAndUpdate(
            {_id: articleId},
            {status,tag, title,content,describe, time: new Date(),author}
        );

    },
    // 分页查找文章列表
    findArticleList: async function ({page, pageSize, filter}) {
        return this.find({
            ...filter
        })
            .select({ content: 0})
            .skip((page-1)*pageSize)
            .limit(pageSize);
    }, 
}

module.exports = articleSchema;