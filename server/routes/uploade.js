const path = require('path'),
    fs = require('fs');

const { getRouterApi }  = require('../common/api_menu'),
    imagesClassModel = require('../db/models/imagesClassModel'),
    { responseCode } = require('../common/const'),
    imagesModel = require('../db/models/imagesModel');

export default {
    [getRouterApi('img_classes_get')]: async (ctx) => {
        const result = await imagesClassModel.find();
        return result !== null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN);
    },
    [getRouterApi('img_classes_put')]: async (ctx) => {
        const { key, name, parentId } = ctx.request.body;
        let result = null;
        if(parentId && parentId != key) {
            result = await imagesClassModel.updateLeaf({id: key, parentId,name})
        } else {
            result = await imagesClassModel.update({_id:key}, { name });
        }
        return result !== null ? ctx.send(null, '图片分类修改成功') : ctx.sendError(responseCode.UN_KNOWN, '图片分类修改失败');

    },
    [getRouterApi('img_classes_delete')]: async (ctx) => {
        const { key, parentId } = ctx.query;
        let result;
        if(parentId && parentId != key) {
            result = await imagesClassModel.deleteLeaf({id: key, parentId});
        } else {
            result = await imagesClassModel.findOneAndDelete({_id:key},{_id: 1});
        }
        return result !== null ? ctx.send(null, '图片分类删除成功') : ctx.sendError(responseCode.UN_KNOWN, '图片分类修改失败');

    },
    [getRouterApi('img_classes_add')]: async(ctx) => {
        const { name, parentId } = ctx.request.body;
        let result = null;
        if(parentId) {
            result = await imagesClassModel.addLeaf({parentId, name})
        } else {
            result =  await imagesClassModel.create({name})
        }
        return result !== null ? ctx.send(result, '图片分类创建成功') : ctx.sendError(responseCode.UN_KNOWN, '图片分类创建失败');
    },
    [getRouterApi('uploade_img')]: async (ctx, next) => {
        const file =  ctx.request.files.file;
        const { tag } = ctx.request.body;
        const savePath = path.join(__dirname,`../../dist/resource/${file.name}`);
        const reader = fs.createReadStream(file.path)
        const writer = fs.createWriteStream(savePath)
        const pro = new Promise( (resolve, reject) => {
            var stream = reader.pipe(writer);
            stream.on('finish', function () {
                const data = {
                    name: file.name,
                    url: `/resource/${file.name}`,
                    size: file.size,
                    alt: file.name,
                    tag
                }
                resolve(data);
            });
        })
        const result = await pro;
        const promise = imagesModel.create({...result});
        const resData = await promise.then((doc) => doc)
        return resData !== null ? ctx.send(resData, '图片上传成功') : ctx.sendError(responseCode.UN_KNOWN, '图片上传失败');
      },
      [getRouterApi('img_list')]: async (ctx) => {
            const { tag,pageSize = 4,_id } = ctx.query;
            let select = {},total = 0;
            let result = null;
            (tag !== 'all') && (select.tag = tag);
            await imagesModel.count({...select}, (err, count) => {
                total = count;
            });
            if(_id) {
                result = await imagesModel.find({...select, _id: {$lt: _id}}).limit(parseInt(pageSize,10)).sort({_id: -1});
            } else {
                result = await imagesModel.find({...select}).limit(parseInt(pageSize,10)).sort({_id: -1});
            }
            return result !== null ? ctx.send({images: result, pageSize, tag,total}) : ctx.sendError(responseCode.UN_KNOWN, '图片获取失败');

      },
      [getRouterApi('get_img_info')]: async (ctx) => {
            const { _id } = ctx.query;
            const result = await imagesModel.findById(_id, 'name alt tag');
            return result !==null ? ctx.send(result) : ctx.sendError(responseCode.UN_KNOWN);
      },
      [getRouterApi('put_img')]: async (ctx) => {
            const { tag, name, alt, _id } = ctx.request.body;
            const result = await imagesModel.findByIdAndUpdate(_id, {tag, name, alt});
            return result !== null ? ctx.send(result, '图片信息已修改') : ctx.sendError(responseCode.UN_KNOWN, '图片信息修改失败');
      },
      [getRouterApi('delete_img')]: async (ctx) => {
        const { _id } = ctx.query;
        const result = await imagesModel.deleteOne({_id});
        return result !== null ? ctx.send(result, '图片已删除') : ctx.sendError(responseCode.UN_KNOWN, '图片删除失败');
  }
}

