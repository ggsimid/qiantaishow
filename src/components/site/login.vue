<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
            <div class="section">
                <div class="wrapper">
                    <div class="bg-wrap">
                        <div class="nav-tit">
                            <a class="selected" href="javascript:;">账户登录</a>
                            <i>|</i>
                            <a href="/register.html">免费注册</a>
                        </div>

                        <form  class="login-box" >
                            <div class="input-box">
                                <input  v-model="user_name"  type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                            </div>
                            <div class="input-box">
                                <input  v-model="password"   placeholder="输入登录密码" maxlength="16">
                            </div>
                            <div class="btn-box">
                                <input   type="button"  value="立即登录"  @click='login'>
                            </div>


                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  export default{
    data(){
        return {
            password:'',
            user_name:''
        }
    },
    methods:{
        login(){
            this.$http.post('/site/account/login',{"user_name":this.user_name,"password":this.password}).then(res=>{
                if(res.data.status==0){

                    this.$message.success(res.data.message);

                    var fromRouter = localStorage.getItem('fromRouter')
                    this.$router.push({path : '/site/'+fromRouter});

                }else{
                    this.$message.error(res.data.message);
                }
            })
        }
    }
  }
</script>

<style scoped>

</style>