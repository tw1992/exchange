<template>
    <div>
      <div>
        <span>照片要求：</span>
        <span class="require">
          大小不超过2M、信息清晰、证件在手心里且不能自拍反向、jpg／png格式
        </span>
      </div>
      <div style="margin: 14px 0 28px 0;">
        完成高级认证后，每月充值额度为20万人民币，可提币
      </div>
      <div class="photoImg">
        <div>
          <div style="background-image: url('/exchange/static/js/img/idCard1.png');width: 248px;height: 248px;" @click="clickImg">
            <img :src="idhead || idheadImg" alt="" style="display: block;width: 100%;height: 100%;">
          </div>
          <input type="file" style="display: none;" ref="avatarInput" accept="image/jpg,image/png,image/jpeg" name="" @change="changeImgInput">
        </div>
        <div style="vertical-align: top;">
          <div>
            <ul class="imgList">
              <li><img src="/exchange/static/js/img/idCard2.png" alt=""></li>
              <li><img src="/exchange/static/js/img/idCard3.png" alt=""></li>
              <li><img src="/exchange/static/js/img/idCard4.png" alt=""></li>
            </ul>
            <span class="sureStyle">
              <el-button type="primary" @click="edit" :disabled="cerDisable || superstatus == 1">
                确认提交
              </el-button>
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default{
      props:{
        superstatus:{
          default:0
        },
        idhead:'',
        lowerStatus:{
          default:0
        }
      },
      data(){
          return {
            cerDisable:true,
            idheadImg:this.idhead
          }
      },
      methods:{
        clickImg(){
          if(!this.lowerStatus){
            this.$notify({
              title: '请先完成初级认证',
              type: 'warning'
            });
            return
          }
          if(this.superstatus){
            return;
          }else{
            this.$refs.avatarInput.click()
          }
        },
        changeImgInput(){
          if(this.$refs.avatarInput.files.length){
            var file = this.$refs.avatarInput.files[0];
            var reader = new FileReader();
            var that = this;
            if((file.size/1024*1000)/1000 > 2048){
              that.$notify.error({
                title: '图片大小超过2M'
              });
              return;
            };
            if(file.type != 'image/png'&& file.type != 'image/jpg' && file.type != 'image/jpeg'){
              console.log(file.type)
              that.$notify.error({
                title: '不符合所需的图片格式'
              });
              return;
            }
            reader.readAsDataURL(file);
            that.showPre = true;
            reader.onload = function() {
              that.idheadImg =  reader.result;
              setTimeout(function(){
                that.$refs.avatarInput.style.backgroundImage = 'url(' + reader.result + ')';
              })
            }
            this.cerDisable = false;
          }

        },
        edit() {
          // 上传身份证照片
          if (this.$refs.avatarInput.files.length !== 0) {
            var that = this;
            var file = this.$refs.avatarInput.files[0];
            var reader = new FileReader();
            if((file.size/1024*1000)/1000 > 2048){
              that.$notify.error({
                title: '图片大小超过2M'
              });
              return;
            };
            if(file.type != 'image/png'&& file.type != 'image/jpg' && file.type != 'image/jpeg'){
              console.log(file.type)
              that.$notify.error({
                title: '不符合所需的图片格式'
              });
              return
            }
            this.cerDisable = true;
            reader.readAsDataURL(file);
            reader.onload = function() {
              that.interFace('user_check_last',{'idhead':reader.result}).then(function(res){
                that.cerDisable = false;
                that.$notify({
                  title: '图片上传成功',
                  type: 'success'
                });
                that.$emit('statusSupCheck','高级认证审核中');
              })
            }
          }
        },
      }
    }
</script>
<style scoped>
  .require{
    color: #FF0D2A;
  }
  .photoImg{
    position: relative;
  }
  .photoImg>div{
    display: inline-block;
  }
  .imgList>li{
    display: inline-block;
    width: 120px;
    height: 120px;
    margin-left: 20px;
  }
  .imgList img{
    width: 100%;
    height: 100%;
  }
  .trueImg{
    width:248px;
    height: 248px;
  }
  .sureStyle button{
    position: absolute;
    right: 0;
    bottom: 0;
    padding-top:0;
    padding-bottom: 0px;
    /*background: #6C5E4D;*/
    /*border-radius: 3px;*/
    border:none;
    outline:none;
    width:160px;
    height: 30px;
    /*color: #999999;*/
  }
  .el-button--primary.is-disabled, .el-button--primary.is-disabled:active, .el-button--primary.is-disabled:focus, .el-button--primary.is-disabled:hover{
    color: #999999;
    background: #4E4C4A;
    border-color:#4E4C4A;
  }
</style>
