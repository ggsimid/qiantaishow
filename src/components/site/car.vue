<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">


                <!--购物车头部-->
                <div class="cart-head clearfix">
                    <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                    <div class="cart-setp">
                        <ul>
                            <li class="first active">
                                <div class="progress">
                                <span>1</span>
                                放进购物车
                                </div>
                            </li>
                            <li>
                            <div class="progress">
                                <span>2</span>
                                填写订单信息
                            </div>
                            </li>

                            <li class="last">
                            <div class="progress">
                                <span>3</span>
                                支付/确认订单
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--购物车头部-->


                <!--商品列表-->
                <div class="cart-box">
                <input id="jsondata" name="jsondata" type="hidden">
                <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                    <tbody>
                    <tr>
                        <th width="48" align="center">
                            <el-switch
                              @change="changeAll"
                              v-model="isAll"
                              on-text="全选"
                              off-text="反选">
                            </el-switch>
                        </th>
                        <th align="left" colspan="2">商品信息</th>
                        <th width="84" align="left">单价</th>
                        <th width="104" align="center">数量</th>
                        <th width="104" align="left">金额(元)</th>
                        <th width="54" align="center">操作</th>
                    </tr>

                    <tr v-if="goodsmessage.length==0">
                        <td colspan="10">
                            <div class="msg-tips">
                                <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                <div class="info">
                                    <strong>购物车没有商品！</strong>
                                    <p>您的购物车为空，<a href="/index.html">马上去购物</a>吧！</p>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <!--商品列表-->
                    <tr v-for="(item,index) in goodsmessage" :key="index">
                        <th width="48" align="center">
                            <el-switch
                              v-model="value[index]"
                              on-text="选中"
                              off-text="取消">
                            </el-switch>
                        </th>

                        <th align="left" colspan="2">
                            <img  width='48' style='display:block; float:left' :src="item.img_url">
                            {{item.title}}
                        </th>
                        <th width="84" align="left">{{item.sell_price}}</th>
                        <th width="104" align="center">
                            <el-button type='success' size='mini' @click='changebcount(item.id,"-")'>-</el-button>
                               {{item.buycount}}
                            <el-button type='success' size='mini' @click='changebcount(item.id,"+")'>+</el-button>

                        </th>
                        <th width="104" align="left">{{item.sell_price*item.buycount}}</th>
                        <th width="54" align="center">
                            <el-button type='success' @click="delectgoods(index,item.id)">删除</el-button>
                        </th>
                    </tr>

                    <tr>
                        <th align="right" colspan="8">
                            已选择商品 <b class="red" id="totalQuantity">{{selletmentAmount.xuanzhongshu}}</b> 件 &nbsp;&nbsp;&nbsp;
                            商品总金额（不含运费）：<span class="red">￥</span><b class="red">{{selletmentAmount.amount}}</b>元
                        </th>
                    </tr>
                </tbody></table>
                </div>
                <!--/商品列表-->


                <!--购物车底部-->
                <div class="cart-foot clearfix">
                    <div class="right-box">
                        <button class="button" >继续购物</button>
                        <router-link to="/site/shopping">
                            <button class="submit" >立即结算</button>
                        </router-link>

                    </div>
                </div>
                <!--购物车底部-->

            </div>
        </div>
        </div>
    </div>
</template>

<script>

import {removeItem,getItem,setItem} from '../../myjs/localStoragefunc.js';

  export default{
    data(){
        return {
            //商品信息,是个数组
            goodsmessage:[],
            //怎么知道我的哪个商品被勾选上呢？商品信息是数据有序的，一行一行排列的，所以使用一个数组去保存每一行商品是否被勾选上！
            value:[],
            //是否全选
            isAll:false
        }
    },
    created(){
        this.getgoodsmessage();
    },


    //watch:{
    //    isAll:function(val,oldval){
            //有个问题：下面的选项改变，会引起isall改变，然后isall改变，又会影响computed改变，所以不能通过watch方法去实现！！要通过点击
            //事件，通过点击事件改变isall，从而改变下面选项。而不是任何时候isall改变都会改变下面选项
     //       if(val){
    //            console.log(this.value);
     //           var _this = this;
      //          this.value.forEach(function(item,index){
      //              _this.value[index] = true;
       //         })
     //       }else{
      //          var _this = this;
      //          this.value.forEach(function(item,index){
      //              _this.value[index] = false;
      //          })
      //      }
      //  }
    //},


    computed:{
        //当选中的value和列表goodsmessage里面的数量改变就会触发计算属性，然后就会反应到总价上！
        selletmentAmount(){
            //同级那些value中哪些是TRUE
            var trueArr = this.value.filter(function(item){return item;});
            //判断下面选项全选中就设置上面的全选
            if( trueArr.length==this.goodsmessage.length ){
                this.isAll = true;
            }else{

                this.isAll = false;
            }



            //计算总价
            var amount = 0;
            //计算商品数
           var xuanzhongshu =0;
            var _this = this;
            this.value.forEach(function(value,index){
                if(value){
                    xuanzhongshu += _this.goodsmessage[index].buycount;
                    amount += _this.goodsmessage[index].sell_price * _this.goodsmessage[index].buycount;
                }
            })

            return {amount:amount,xuanzhongshu:xuanzhongshu};
        }
    },
    methods:{
        //点击修改全选
        changeAll(){
            if(this.isAll){
                var _this = this;
                this.value.forEach(function(value,index){
                    _this.value[index] = true;
                    _this.value.push(false);
                    _this.value.pop();
                });
            }else{
                var _this = this;
                this.value.forEach(function(value,index){
                    _this.value[index] = false;

                    //当计算属性的属性值改变的时候，并不会触发重新计算！
                    _this.value.push(false);
                    _this.value.pop();
                });
            }
        },

        //修改goodsmessage商品数量，同时修改localStorage上
        changebcount(id,fuhao){

            for(var i=0;i<this.goodsmessage.length;i++){
                if(this.goodsmessage[i].id==id){
                    if(fuhao=="+"){
                        this.goodsmessage[i].buycount ++;
                        //修改vuex状态值
                        this.$store.dispatch('changeBuyCount',1);
                        //同时要修改本地存储的商品数量
                        setItem({gid:id,bcount:1});

                    }else if(fuhao=="-"){
                        if(this.goodsmessage[i].buycount>1){

                            this.goodsmessage[i].buycount --;
                            //修改vuex状态值
                            this.$store.dispatch('changeBuyCount',-1);
                            setItem({gid:id,bcount:-1});
                        }
                    }
                }
            }
        },

        //购物车页面出来时候请求获取商品数据
        getgoodsmessage(){
            //site/comment/getshopcargoods/:ids根据商品ID获取商品数据

            var obj = getItem();

            var url = []
            for(var key in obj){
                url.push(key);
            }

            this.$http.get('site/comment/getshopcargoods/'+url.join(',')).then(res=>{
                var allnum = 0;
                //商品ID和对应的商品数量关联起来

                for(var key in obj){

                    for(var i=0;i<res.data.message.length;i++){
                        if(res.data.message[i].id == key){
                            //遍历,当商品id和localstorage里面的ID一致
                            res.data.message[i].buycount=obj[key];
                            allnum += obj[key];
                        }
                    }
                    //把value里面的所有值都是没有选中
                    this.value.push(false);
                }
                this.goodsmessage = res.data.message;

                //同步到vuex,计算总量
                this.$store.dispatch('changeBuyCount',allnum);
            });
        },


        delectgoods(index,delectid){
            //删除value和goodsmessage还有local上面的数据
            this.value.splice(index,1);
            this.goodsmessage.splice(index,1);
            removeItem(delectid);
        }
    }
  }
</script>

<style scoped>

</style>