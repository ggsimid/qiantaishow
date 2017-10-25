<template>
        <div class="section">

            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                            <!--此处声明下面可重复循环-->

                                <li v-for="(item,index) in ginfo.catelist"  :key="index">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p><span v-for="name in item.subcates">{{name.title}}&nbsp;</span></p>

                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="name in item.subcates">{{name.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <ul class="slides">
                                    <div class="block">

                                        <el-carousel >
                                          <el-carousel-item v-for="(item,index) in ginfo.sliderlist" :key="index">
                                            <img height="343"   :src="item.img_url">
                                            <h3>{{ item.title }}</h3>
                                          </el-carousel-item>
                                        </el-carousel>
                                      </div>
                                </ul>

                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!--推荐商品-->
                    <div class="left-220">
                        <ul class="side-img-list" >
                            <li v-for="(item,index) in ginfo.toplist" :key="index">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--/推荐商品-->
                </div>
            </div>

            <!--2.0分页商品展示-->
            <div class="section">
                <div v-for="(item,index) in clist "  :key="index">
                    <!--子类-->
                    <div class="main-tit">
                    <h2>{{item.catetitle}}</h2>
                        <p>                     
                            <a href="/goods/43.html" v-for="(item,index) in item.level2catelist" :key="index">
                                {{item.subcatetitle}}
                            </a>
                   
                            <a href="/goods/40.html">更多<i>+</i></a>
                        </p>
                    </div>
                    <!--/子类-->
                    <div class="wrapper clearfix">
                        <div class="wrap-box">
                            <ul class="img-list">
                             
                                <li  v-for="(item,index) in item.datas">
                                    <a href="/goods/show-91.html">
                                        <div class="img-box">
                                            <img :src="item.img_url">
                                        </div>
                                        <div class="info">
                                            <h3>{{item.artTitle}}</h3>
                                            <p class="price">
                                            <b>{{item.sell_price}}</b>元</p>
                                            <p>
                                                <strong>库存：{{item.stock_quantity}}</strong>
                                                <span>市场价：
                                                <s>{{item.market_price}}</s>
                                                </span>
                                            </p>
                                        </div>
                                    </a>
                                </li>                         
                            </ul>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
</template>

<script>

//当前Vue组件的Vue对象：想要使用Vue，就要写在下面。
  export default{
    data(){
        return {
            ginfo:{},
            //当前页和当前页大小
            pageIndex:1,
            pageSize:10,
            clist:[]
        }
    },
    created(){
        this.getginfo();
        this.getclist();
    },
    methods: {
       // 获取商品的数据
       getginfo(){
           this.$http.get('/site/goods/gettopdata/goods').then(res=>{
           console.log(res.data.message);
                 this.ginfo = res.data.message;

            });
        },
        getclist(){
            this.$http.get('/site/goods/getgoodsgroup')
            .then(res=>{
                this.clist = res.data.message;
                console.log(this.clist);
            });

        }
    }
  }

</script>

<style>
    @import  url('../../../statics/elementuiCss/index.css');
        <!--需要导入饿了么样式，并且修改。 -->
        .el-carousel__item h3 {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 150px;
            margin: 0;
          }

          .el-carousel__item:nth-child(2n) {
             background-color: #99a9bf;
          }

          .el-carousel__item:nth-child(2n+1) {
             background-color: #d3dce6;
          }
          .img-list{
             margin:0 !important;
          }
</style>