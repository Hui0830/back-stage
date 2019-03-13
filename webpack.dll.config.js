const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        // 将React相关模块放入一个动态链接库
        react: ['react','react-dom','react-router-dom','react-loadable'],
        // librarys: ['wangeditor','antd'],
        // antd: ['antd'],
        utils: ['axios','js-cookie','wangeditor']
    },
    output: {
        filename: '[name]-dll.js',
        path: path.resolve(__dirname, 'dll'),
        // 存放动态链接库的全局变量名，加上_dll_防止全局变量冲突
        library: '_dll_[name]'
    },
    // 动态链接库的全局变量名称，需要可output.library中保持一致，也是输出的manifest.json文件中name的字段值
    // 如react.manifest.json字段中存在"name":"_dll_react"
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dll', '[name].manifest.json')
        }),
        new cleanWebpackPlugin('dll',{
            root: path.resolve(__dirname, './'),
            verbose: true,
            dry: false
        })
    ]
    
}