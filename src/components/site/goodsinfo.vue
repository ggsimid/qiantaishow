<template>
    <div class="tmpl">
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
        <div class="wrapper clearfix">
        <div class="wrap-box">
        <!--页面左边-->
        <div class="left-925">
        <div class="goods-box clearfix">

        <!--商品图片-->
        <div class="pic-box">
            <!--
                1.0 去查找对应的JQ插件
                2.0 下载JQ插件文件，到项目的今天资源里的JQ插件库文件夹中。
                3.0 看结构和JS代码，把相关的结构写进模板里。
                4.0 引进JS代码和CSS代码。
                    @import url('../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
                    导入jquery插件文件:
                    import '../../../statics/site/js/jqplugins/imgzoom/magnifier.js';
                    CSS代码在组件的style引入。JQ在组件的script引入，写在export外面。
                5.0 适当做出修改,并且初始化。
            -->
            <div class="magnifier" id="magnifier1">
                <div class="magnifier-container">
                    <div class="images-cover">
                    </div>
                    <!--当前图片显示容器-->
                    <div class="move-view"></div>
                    <!--跟随鼠标移动的盒子-->
                    </div>
                    <div class="magnifier-assembly">
                    <div class="magnifier-btn">
                            <span class="magnifier-btn-left">&lt;</span>
                            <span class="magnifier-btn-right">&gt;</span>
                        </div>
                        <!--按钮组-->
                        <div class="magnifier-line">
                            <ul class="clearfix animation03">
                                <li v-for='(item,index) in ginfo.imglist' :key="item.id">
                                    <div class="small-img">
                                        <img :src="item.original_path" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!--缩略图-->
                    </div>
                <div class="magnifier-view"></div>
                <!--经过放大的图片显示容器-->
            </div>
        </div>
        <!--/商品图片-->

        <!--商品信息-->
        <div class="goods-spec">
            <h1 v-text="ginfo.goodsinfo.title"></h1>
            <p class="subtitle" v-text="ginfo.goodsinfo.sub_title"></p>
        <div class="spec-box">
            <dl>
                <dt>货号</dt>
                <dd id="commodityGoodsNo" v-text="ginfo.goodsinfo.goods_no"></dd>
            </dl>
            <dl>
                <dt>市场价</dt>
                <dd>
                    <s id="commodityMarketPrice"  v-text="ginfo.goodsinfo.market_price"></s>
                </dd>
            </dl>
            <dl>
                <dt>销售价</dt>
                <dd>
                    <em class="price" id="commoditySellPrice"  v-text="ginfo.goodsinfo.sell_price"></em>
                </dd>
            </dl>
        </div>

        <div class="spec-box">
            <dl>
                <dt>购买数量</dt>
                <dd>
                    <div class="stock-box">
                        <input id="commodityChannelId" type="hidden" value="2">
                        <input id="commodityArticleId" type="hidden" value="98">
                        <input id="commodityGoodsId" type="hidden" value="0">
                        <input id="commoditySelectNum" type="text" maxlength="9" value="1" maxvalue="10" onkeydown="return checkNumber(event);">
                        <a class="add" onclick="addCartNum(1);">+</a>
                        <a class="remove" onclick="addCartNum(-1);">-</a>
                    </div>
                    <span class="stock-txt">
                            库存
                            <em id="commodityStockNum"   v-text="ginfo.goodsinfo.stock_quantity" ></em>件
                    </span>
                 </dd>
            </dl>
            <dl>
                <dd>
                    <div class="btn-buy" id="buyButton">
                        <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                        <button class="add" onclick="cartAdd(this,'/',0,'/cart.html');">加入购物车</button>
                    </div>
                </dd>
            </dl>
        </div>
        </div>
        <!--/商品信息-->
        </div>

        <div id="goodsTabs" class="goods-tab bg-wrap">
            <!--选项卡-->
            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                <ul>
                    <li>
                        <a v-bind="{class:isContent?'selected':''}"  href="javascript:;"  @click='changeIsContent(true)'>商品介绍</a>
                    </li>
                    <li>
                        <a href="javascript:;"  v-bind="{class:!isContent?'selected':''}"  @click='changeIsContent(false)'>商品评论</a>
                    </li>
                </ul>
            </div>
            <!--/选项卡-->



        <!--选项卡的内容 和 选项内容要对应-->
        <div  class="tab-content entry"  v-if="isContent" >
            <!-- 展示商品内容 -->

            <span v-html="ginfo.goodsinfo.content"></span>
        </div>

        <div class="tab-content" v-if="!isContent" >
            <!--网友评论-->
            <div class="comment-box">
                <!--上传评论-->
                <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                    <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">

                    <div class="editor">
                        <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！">

                        </textarea>
                        <span class="Validform_checktip"></span></div>

                    <div class="subcon">

                        <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">

                        <span class="Validform_checktip"></span></div>
                    </div>
                </form>
                <ul id="commentList" class="list-box">
                    <!--查看评论区-->
                    <p v-if='pinglun.length<0' style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧!</p>

                    <li  v-for="(item,index)  in pinglun"  :key="index">
                        <div class="avatar-box">
                            <i class="iconfont icon-user-full"></i>
                        </div>
                        <div class="inner-box">
                            <div class="info">
                                <span>{{item.user_name}}</span>
                                <span>{{item.add_time}}</span>
                            </div>
                            <p>{{item.content}}</p>
                        </div>
                    </li>

                </ul>
                <!--放置页码-->
                <div class="page-box" style="margin:5px 0 0 62px">
                    <!--关联data中的数据，是data控制组件的显示，但是如果组件想影响data中数据，那么要通过size-change和****-->
                    <div class="block">
          
                        <el-pagination
                          @size-change="SizeChange"
                          @current-change="indexChange"
                          :current-page="pageIndex"
                          :page-sizes="[5,10,20,30]"
                          :page-size="pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="totalcount">
                        </el-pagination>
                      </div>
                </div>
                <!--/放置页码-->
            </div>

            <!--/网友评论-->
        </div>

        </div>

        </div>
        <!--/页面左边-->



        <!--页面右边-->
        <div class="left-220">
            <div class="bg-wrap nobg">
                <div class="sidebar-box">
                    <h4>推荐商品</h4>
                    <ul class="side-img-list">
                    <li v-for='(item,index) in ginfo.hotgoodslist' :key="index">
                        <div class="img-box">
                             <label>{{index+1}}</label>
                            <img :src="item.img_url">
                        </div>
                        <!--如何刷新本页面？路由一样，但是参数不一样-->
                        <router-link  v-bind="{to:'/site/goodsinfo/'+item.id}">
                            <div class="txt-box">
                                {{item.title}}
                                <span>{{item.add_time | datefmt("YYYY-MM-DD")}}</span>
                            </div>
                        </router-link>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--/页面右边-->


    </div>
    </div>
    </div>


    </div>
</template>

<script>

import  '../../../statics/site/js/jqplugins/imgzoom/magnifier.js';

//因为是异步获取，所以不能在这里设置初始化
//(function() {
    //$('#magnifier1').imgzoon({magnifier:'#magnifier1'});
//});

  export default{
    data(){
        return{
            ginfo:{},
            //MVC，所以样式什么控制都要想到数据
            isContent:true,
            pageIndex:1,
            pageSize:5,
            totalcount:0,
            //获取评论信息
            pinglun:[],
            // 控制tab的切换
            changeIsContent(iscontent){
                this.isContent = iscontent;
            }
        }
    },
    created(){
        this.getinfo();
        this.getPinglun();
    },
    watch:{
          // 当url的参数的发生改变的时候，会触发这个watch的重新执行。观察的不一定是data里面的数据!
          '$route':function(){
                // 当触发了这个方法就重新获取到最新的数据，因为修改了M，所以V也跟着改变
                this.getinfo();

           }
    },
    methods:{
        //当页码和页容量改变时候，会执行函数，通过传入的值.
        SizeChange(val){
            this.pageSize = val;
            this.getPinglun();
        },
        indexChange(val){
            this.pageIndex = val;
            this.getPinglun();
        },
        //根据ID和分页页数和页码获取评论
        getPinglun(){
            var goodsid = this.$route.params.goodsid;
            this.$http.get('/site/comment/getbypage/goods/'+goodsid+'?pageIndex='+this.pageIndex+'&pageSize='+this.pageSize)
            .then(res=>{
                this.pinglun = res.data.message;
                this.totalcount = res.data.totalcount;
                console.log(res);
            })
        },
        //根据商品ID获取商品信息
        getinfo(){

            var goodsid = this.$route.params.goodsid;
            this.$http.get('/site/goods/getgoodsinfo/'+goodsid).then(res=>{

                this.ginfo = res.data.message;
                // 等图片数据加载回来以后再去执行插件的初始化操作
                    setTimeout(()=>{
                     $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
                 },100);
            });
        }
    }
  }

</script>

<style>
    @import url('../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
</style>