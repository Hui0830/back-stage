const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    url: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    tag: {
        type: String,
        default: 'all'
    },
    alt: {
        type: String,
        default: '星婴美'
    },
    size: Number,
    time: {
        type: Date,
        default: Date.now()
    }
})

// 图片分类
const imgLeafSchema = new Schema({
    name: {
        type: String,
        default: ''
    }
})
const imgClassSchema = new Schema({
    name: {
        type: String,
        default: '',
    },
    leaf: [imgLeafSchema]
})
imgClassSchema.statics = {
    addLeaf: async function({parentId, name}) {
        const LeafModel =  mongoose.model('leaf',imgLeafSchema);
        const leaf = new LeafModel({name});
        const result = await this.findById(parentId, null, (err, doc) => {
            console.log(doc.leaf);
            (doc !== null) && doc.leaf.push(leaf);
            doc.save(err => {
                if(err) {
                    console.log('add images class leaf err:', err)
                } else {
                    console.log('add images class leaf success');
                }
            })
        })
        return result !== null ? leaf : result;
    },
    deleteLeaf: function({id,parentId}) {
        return this.findById(parentId, null, (err, doc) => {
            if(err) {
                console.log('find id error')
            }
            if(doc !== null) {
                doc.leaf = doc.leaf.filter(v => {
                    return v._id != id;
                });
            }
            doc.save(err => {
                if(err) {
                    console.log('delete images class leaf err:', err)
                } else {
                    console.log('delete images class leaf success');
                }
            })
        })
    },
    updateLeaf: function({id, parentId, name}) {
        return this.findById(parentId, null, (err, doc) => {
            if(err) {
                console.log('find id error')
            }
            if(doc !== null) {
                doc.leaf = doc.leaf.map(v => {
                    (v._id == id) && (v.name = name);
                    return v;
                });
            }
            doc.save(err => {
                if(err) {
                    console.log('put images class leaf err:', err)
                } else {
                    console.log('put images class leaf success');
                }
            })
        })
    }
}

exports.imgClassSchema = imgClassSchema;
exports.imagesSchema = imagesSchema;