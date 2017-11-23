#### 扩展weui.js,实现电商网站加入购物车时对商品型号,数量的选择功能组件
![Alt text](https://github.com/NothinkingGao/weui.js-productOption/tree/master/Screenshots/1.png)
#### 使用方法
1. 安装weui.js
```
git clone https://github.com/Tencent/weui.js.git
cd weui.js

```
2.切换到weui.js组件目录
```
cd weui.js/src
```
3.下载组件
```
git clone git@github.com:NothinkingGao/weui.js-productOption.git
```
4.在weui.js中注册,打开src/weui.js文件,加入如下两行
```

import productSelect from './weui.js-productOption/productSelect';

export default {
    productSelect
};
```
5.编译,运行
```
cnpm install
cnpm start
```