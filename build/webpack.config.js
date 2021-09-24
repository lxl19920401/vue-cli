//webpack.config.js
//引入核心内置模块path,用户获取文件路径等
const path = require("path")

// 用户获取文件路径等
const HtmlWebpackPlugin = require('html-webpack-plugin')
//清理dist
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//引入插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpack = require("webpack");
const vueLoaderPlugin = require("vue-loader/lib/plugin");

const devMode = process.argv.indexOf('--mode=production') === -1;
//导出配置信息
module.exports = {
    /**
     * 设置模式：
     * development开发环境
     * production生产模式
     * 默认值为production
     * 也可以设置为none
     * */
    mode:'development',
    //配置开发服务器
    // devServer:{
    //     //设置端口号
    //     port:10000,
    //     //开启热更新
    //     hot:true,
    //     //告诉服务器内容来源
    //     contentBase:path.join(__dirname, 'dist')
    // },
    /**
     * 设置入口文件路径
     * path.resolve()由相对路径计算出绝对路径
     * __dirname是当前模块的目录名
     * */
    entry:path.resolve(__dirname,'../src/main.js'),
    //多入口
    //多入口文件开发就是设置多个入口文件和输出对应的打包后的文件，要填写多个入口文件就要将entry设置为一个对象,对象里面的属性名就是该入口文件的标识，
    // 属性值就是对于的文件路径，输出时需要在对应的html文件中引入，我们可以通过配置多个htmlwebpackplugin的方式实现。
    // 在htmlwebpackplugin中需要设置filename来设置输出的html文件名，chunk来关联上面entry里面的入口文件
    //
    // 作者：木十八z
    // 链接：https://juejin.cn/post/6991331083962810405
    // 来源：掘金
    // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    // entry:{
    //     // main:path.resolve(__dirname,'../src/main.js'),
    //     // main:["@babel/polyfill",path.resolve(__dirname,'../src/main.js')],
    //     // header:["@babel/polyfill",path.resolve(__dirname,'../src/header.js')],
    // },
    /**
     * 设置输出信息
     */
    output:{
        //输出文件名
        filename:"[name].[hash:8].js",
        //输出文件路径
        path:path.resolve(__dirname,"../dist")
    },
    //配置模块规则
    module:{
        rules:[
            {
                //正则匹配所有.css结尾的文件
                test:/\.css$/i,
                //匹配到之后使用的loader,从有向左解析
                use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
            },
            {
                test:/\.less$/i,
                use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader']
            },
            //处理图片
            {
                //正则匹配图片格式
                test:/\.(jpe?g|png|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            //限制文件大小
                            limit:10240,
                            //超出上面限制之后使用的loader ext是文件本来的扩展名
                            name:'image/[name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            //处理js语法浏览器兼容问题
            {
                test:'/\.js$/',
                use:{
                    loader:'bable-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                },
                //排除依赖下的js
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            },

        ]
    },
    //配置模块如何进行解析
    resolve: {
        // 创建别名
        alias:{
            'vue$':'vue/dist/vue.runtime.esm.js',
            // 设置@引用的地址为根目录下的src
            '@':path.resolve(__dirname,"../src")
        },
        //按顺序解析以下数组后缀名的文件
        extensions:['*','.js','.json','.vue']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../public/index.html'),
            filename: "index.html",
            chunks: ['main'] // 与入口文件对应的模块名
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname,'../public/header.html'),
        //     filename: "header.html",
        //     chunks: ['header'] // 与入口文件对应的模块名
        // }),
        new MiniCssExtractPlugin({
            filename:'[name].[hash:8].css',
            chunkFilename: "[id].css",
        }),
        new vueLoaderPlugin(),
        new CleanWebpackPlugin(),

    ]
}
