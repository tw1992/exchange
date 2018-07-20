<template>
    <div>
      <countCenterRigHeader>
        <div>
          邀请好友
        </div>
      </countCenterRigHeader>
      <div class="invate">
        <certifytitle :title="title">
          <span style="color: red;">
            您的邀请码是：{{num}}
          </span>
        </certifytitle>
        <div style="margin: 10px 0;">
          <input type="text" id="biao1" v-model="value" class="copy-content" readonly>
        </div>
        <div class="invateBut">
          <el-button type="primary" @click="copy">复制链接</el-button>
          <!--<button type="button" class="copeUrl" @click="copy">复制链接</button>-->
        </div>
      </div>

    </div>
</template>
<style scoped>
  .invate{
    padding:26px 30px;
  }
  #biao1{
    width: 100%;
    box-sizing: border-box;
    background: #353535;
    border:none;
    outline: none;
    height:40px;
    color: #FFFFFF;
    padding-left:10px;
  }
  .invateBut{
    text-align: center;
  }
  .invateBut button{
    width:160px;
    height: 30px;
    padding:0;
  }
</style>
<script>
  import countCenterRigHeader from '../common/countCenterRigHeader.vue';
  import certifytitle from '../common/certifyTitle.vue';
    export default{
      data(){
          return {
            title:'复制以下内容发送给你的朋友',
            num:'',
            value:''
          }
      },
      created(){
        var that = this;
        this.interFace('invite',{}).then(function(res){
          that.num = res.invite_id;
          that.value = window.location.protocol +'//'+ window.location.host + '/exchange/#/register/'+that.num;
        })
      },
      methods:{
        copy(){
          if(this.value){
            var Url2=document.getElementById("biao1");
            Url2.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            this.$notify({
              title: '复制成功',
              type: 'success'
            });
          }else{
            this.$notify.error({
              title: '复制失败',
              type: 'warning'
            });
          }
        },
      },
      components:{
        countCenterRigHeader,certifytitle
      }
    }
</script>
