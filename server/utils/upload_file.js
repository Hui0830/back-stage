
const path = require('path')
const fs = require('fs')


// 写入目录
const mkdirsSync = (dirname) => {
    if (fs.existsSync(dirname)) {
      return true
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
      }
    }
    return false
  }
  
const  getSuffix = (fileName) => {
    return fileName.split('.').pop()
  }
  
  // 重命名
const Rename = (fileName) => {
    return Math.random().toString(16).substr(2) + '.' + getSuffix(fileName)
  }
  // 删除文件
const removeTemImage = (path) => {
    fs.unlink(path, (err) => {
      if (err) {
        throw err
      }
    })
}
  
  // 上传到本地服务器
const  uploadFile = ({file, savePath, fileType}) => {
    const filePath = path.join(savePath, fileType); //创建存放文件夹
    const confirm = mkdirsSync(filePath);
    const fileName = Rename(file.name);
    if (!confirm) {
      return
    }
    return new Promise((resolve, reject) => {
          const reader = fs.createReadStream(file.path)
          const writer = fs.createWriteStream(filePath+'/'+ fileName)
          const stream = reader.pipe(writer);
          stream.on('finish', () => {
              const data = {
                  name: fileName,
                  url: `/resource/${fileType}/${fileName}`,
                  size: file.size,
                  alt: file.name,
                  time: Date.now(),
              }
              resolve(data);
          });
    })
  }

  module.exports = {
    uploadFile,removeTemImage
  }
  