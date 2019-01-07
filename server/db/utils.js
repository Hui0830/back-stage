// 分页
export const paging = (model,id, limit) => {
    if (id) {
        return model.find({'_id': {"$lt": id}})
            .limit(limit)
            .sort({'_id':-1})
        }else {
            return model.find({})
            .limit(limit)
            .sort({'_id':-1})
        }
}