//共用的方法可以封装到自己的JS文件中，然后那个组件要使用就暴露出去！
//local里面的结构key:word,但是word里面还是一个对象{88:1,90:2}属性名是ID号，值是数量
//外面点击添加购物车，就会记录信息。
const key = 'buyGoodsCount';
export function getItem(){
    var gStr =  localStorage.getItem(key);
        //   将字符串转换成js对象
        var obj = JSON.parse(gStr);

        // 判断如果obj为null的话返回一个{}
        if(!obj){
               // 向localStorage中写一个空对象
              localStorage.setItem(key,JSON.stringify('{}'));
               return {};
           }

       return obj;
    }

//外界传入的是{gid:88,bcount:1}
export function setItem(goodsinfo){
    var goodsObj = getItem();
    //判断有没有这个商品
    if(goodsObj[goodsinfo.gid]){
        goodsObj[goodsinfo.gid] = goodsinfo.bcount + goodsObj[goodsinfo.gid];
    }
    else{

        goodsObj[goodsinfo.gid] = goodsinfo.bcount;
    }
    localStorage.setItem(key,JSON.stringify(goodsObj));
}


export function removeItem(goodsid){
    var goodsObj = getItem();
    delete goodsObj[goodsid];
    localStorage.setItem(key,JSON.parse(goodsObj));
}