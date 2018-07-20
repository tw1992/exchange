<template>
  <div>
    <contenthead :step="[false,true,true,true]" :stepIndex="0"></contenthead>
    <div class="content-content boxSize">
      <certifytitle title="初级认证：">
        <span :class="{'colorred':!status,'colorwhite':status}">{{statusPrimary}}</span>
      </certifytitle>
      <form action="" class="formStyle">
        <label>
          <span class="labelPre">姓&nbsp;&nbsp;&nbsp;名</span>
          <span class="statu1" v-if="status">{{name}}</span>
          <input type="text" v-if="!status" class="printIn boxSize" autocomplete="off" v-model="name" @input="inputChange('name')"/>
        </label>
        <div>
          <label>
            <span class="labelPre">身份证</span>
            <span class="statu1" v-if="status">{{identity}}</span>
            <input type="text" v-if="!status" autocomplete="off" class="printIn boxSize" v-model="identity" @input="inputChange('identity')"/>
          </label>
          <span class="submitLower">
            <el-button type="primary" :disabled="disable" v-if="!status" @click="submit">确认提交</el-button>
          </span>
        </div>
      </form>
      <certifytitle title="高级认证：">
        <span :class="{'colorred':status != 3,'colorwhite':status == 3}">{{statusSup}}</span>
      </certifytitle>
      <div class="photoStyle">
        <photo :superstatus="superstatus" :lowerStatus="lowerStatus" v-if="status != 3" @statusSupCheck="statusSupCheck" :idhead="idhead"></photo>
      </div>
    </div>
  </div>

</template>
<script>
  import contenthead from '../common/countCenRigHeadCertify.vue';
  import certifytitle from '../common/certifyTitle.vue';
  import photo from '../common/photo.vue';
  export default{
    data(){
      return {
        statusPrimary:'',
        statusSup:'未完成高级认证',
        disable:true,
        name:'',
        identity:'',
        status:0,   //stauts 1：初级通过   3：都通过  2：冻结   4：初级通过  高级没有通过审核中    0：都没有通过
        superstatus:0,  //0是没有提交   1是审核中
        idhead:'',
        lowerStatus:0   //0表示没有提交   1表示通过
      }
    },
    components: {
      contenthead,certifytitle,photo
    },
    methods:{
      statusSupCheck(data){
        console.log(data)
        this.statusSup = data;
      },
      inputChange(){
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        this.disable = true;
        if(this.name && this.identity && reg.test(this.identity)){
          this.disable = false;
        }
      },
      submit(){
        var that = this;
        this.interFace('user_check_first',{name:that.name,idcard:that.identity}).then(function(res){
          console.log(res);
          that.statusPrimary = '初级认证通过';
          that.userType()
        })
      },
      userType(){
        var that = this;
        this.interFace('user_type').then(function(res){
          that.status = res.status*1;
          if(res.status == 1){   //初级认证成功
            that.statusPrimary = '初级认证通过';
            that.lowerStatus = 1
            that.identity = res.idcard;
            that.name = res.name;
            that.superstatus = 0;
            if(res.check_type == 1){  //高级认证审核中
              that.statusSup = '高级认证审核中';
              that.status = 4;
              that.superstatus = 1;
              that.idhead = res.idhead;
            }else if(res.check_type == 2){
              that.statusSup = '高级认证审核没有通过';
              that.superstatus = 0;
            }
          }else if(res.status == 3){   //初级和高级认证成功
            that.statusSup = '高级认证通过';
            that.lowerStatus = 1
            that.statusPrimary = '初级认证通过';
            that.identity = res.idcard;
            that.name = res.name;
          }else if(res.status == 2){   //用户冻结
            that.$router.push({name:'login'})
          }else if(!that.status){   //初级高级都没有通过
            that.superstatus = 0;
            that.lowerStatus = 0;
            that.interFace('bottom',{}).then(function(res){
              that.statusPrimary = '未完成初级认证(特别提醒：香港、台湾及海外用户需要联系客服电话／企业QQ：'+res.config.server_qq+'协助处理)'
            })
          }
        })
      }
    },
    created(){
      this.userType();
    }
  }
</script>
<style>
  .boxSize{
    box-sizing: border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
  }
  .content-content{
    width:100%;
    background: #2C2B27;
    padding:29px 28px 68px 37px;
    color: #FFFFFF;
  }
  .colorred{
    color: #FF0D2A;
  }
  .colorwhite{
    color: #FFFFFF;
  }
  .labelPre{
    width:73px;
    text-align: center;
    display: inline-block;
  }
  .printIn{
    width:300px;
    height:30px;
    background: #FFFFFF;
    border: 1px solid #999999;
    border-radius: 3px;
    outline: none;
    margin-bottom: 10px;
    padding-left: 10px;
  }
  .formStyle{
    margin-top: 28px;
    margin-bottom: 48px;
  }
  .submitLower button{
    width: 160px;
    height: 30px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding:0;
    float: right;
  }
  .disalbeInput{
    color: #999999;
  }
  .albeInput{
    color: #FFFFFF;
  }
  .photoStyle{
    margin: 32px 12px 0px;
  }
  .statu1{
    width:300px;
    height:30px;
    display: inline-block;
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
</style>
