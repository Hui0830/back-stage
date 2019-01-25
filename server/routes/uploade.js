const path = require('path'),
    {uploadFile,removeTemImage} = require('../utils/upload_file'),
    qiniu = require('../utils/qiniu');

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
        const savePath = path.join(__dirname,`../../dist/resource/`);

        // 上传图片到服务器
        const result = await uploadFile({
            file,
            savePath,
            fileType: 'images'
        })
        const imgPath = path.join(__dirname, `../../dist/${result.url}`);
        //上传到七牛
        const resQiniu = await qiniu.putFile(imgPath, `images/${result.time}-${result.name}`);
        //上存到七牛之后 删除原来的缓存图片
        removeTemImage(imgPath);
        const createModelOption = {
            name: result.name,
            url:  resQiniu.url,
            size: result.size,
            alt: result.name,
            time: result.time,
            tag,
        }
        const promise = imagesModel.create({...createModelOption});
        const resData = await promise.then((doc) => doc)
        return resData !== null ? ctx.send({...resData,promise}, '图片上传成功') : ctx.sendError(responseCode.UN_KNOWN, '图片上传失败');
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
                result = await imagesModel.find({...select}).limit(parseInt(pageSize,10)).sort({_id: -1, time: -1});
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
        const result = await imagesModel.findByIdAndDelete({_id});
        console.log(result);
        const qiniuRes = await qiniu.deleteFile(result.url);
        console.log(qiniuRes);
        return result !== null ? ctx.send(result, '图片已删除') : ctx.sendError(responseCode.UN_KNOWN, '图片删除失败');
  }
}

