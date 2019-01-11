const articleModel = require('./db/models/articleModel');
const imagesClassModel = require('./db/models/imagesClassModel');

class ArticleTest {
    async create (num = 20, status = 0){
        const author = {
            userId: '5c2f75b6ae83ef448f81d2cd',
            userName: 'test'
        };
        const data = [];
        for(let i = 0; i < num; i++) {
            const title = '深圳星婴美公司文章测试数据' + i;
            const describe = '12月19日，由华润万家江苏党委和苏州工业园区星澄学校党支部共建的“校企携手、共赢未来”系列活动拉开序幕。来自星澄学校三年级的30位学生们在3位教师的带领下走进华润万家苏州工业园区店，给商店区增添了活';
            const content = `<h2 style={textAlign: "center"}>测试内容test-${i}</h2>`;
            data.push({title, describe, content, author, status, tag: {}})
        }
        const result =  await articleModel.create(data, (err, doc) => {
            if(err) {
                console.log(err)
            } else {
                console.log('创建数据成功')
            }
        })
        console.log(result);
        return result;
    }
    
    async delete(){
        const reg = new RegExp('深圳星婴美公司文章测试数据', 'i');
        const data = await articleModel.deleteMany({title: {$regex: reg}}, (err,doc) => {
            if(err) {
                console.log(err)
            } else {
                console.log('删除测试数据成功')
            }
        })
        return data;
    }
}

export const articleTest = new ArticleTest();

// images
class ImagesClass{
    async createClass() {
        const data = [
            {
                name: '装修',
                key: 'decorate',
                leaf: [
                    {
                        name: '首页',
                        key: 'decorate_home'
                    },
                    {
                        name: '文章',
                        key: 'decorate_article'
                    },
                ]
            },
            {
                name: '商品',
                key: 'product',
                leaf: [
                    {
                        name: '灯具',
                        key: 'product_lamp'
                    },
                    {
                        name: '床幔',
                        key: 'product_bed'
                    },
                ]
            }
        ];
        const result =  await imagesClassModel.create(data, (err, doc) => {
            if(err) {
                console.log(err)
            } else {
                console.log('创建数据成功')
            }
        })
        console.log(result);
        return result;
    }
}
export const imagesClass = new ImagesClass();
