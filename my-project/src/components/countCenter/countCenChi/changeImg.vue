<template>
    <div>
      <countCenterRigHeader>
        <div style="color: #FFFFFF;">
          头像更换
        </div>
      </countCenterRigHeader>
      <div class="invate">
        <certifytitle>
          <span style="color: #FFFFFF;">
              支持jpg、png、bmp格式的图片，且小于2M
          </span>
        </certifytitle>
        <div class="upLoadImg">
          <el-button type="primary" @click="upload">上传头像</el-button>
          <input  name="file" type="file" accept="image/png,image/gif,image/jpeg,image/bmp" style="display: none" ref="fileInput" @change="changeImage($event)"/>
        </div>
        <div>
          <div class="uploadarrow" @click="upload">
            <img src="../../../assets/img/uploadArrow.png" alt="">
          </div>
          <div id="preview" v-if="showPre">
              <p>头像预览</p>
              <div class="setImg" ref="previewImg">
                <!--<img :src="imgDataUrl" v-if="imgDataUrl">-->
              </div>
              <p>头像尺寸</p>
          </div>
        </div>
        <div class="upLoadImg">
          <el-button type="primary" :disabled="save" @click="saveImg">保存</el-button>
        </div>
        <div class="upLoadImg">
          <el-button type="primary" :disabled="cancel" @click="cancelSave">取消</el-button>
        </div>
      </div>
      <div>
      </div>
    </div>
</template>
<script>
import countCenterRigHeader from '../common/countCenterRigHeader.vue';

import certifytitle from '../common/certifyTitle.vue';
export default{
  data(){
    return {
      save:true,
      cancel:false,
      showPre:false,
      idhead:''
    }
  },
  methods:{
    saveImg(){
      var that = this;

      that.interFace('user_head',{'head':that.idhead}).then(function(res){
        console.log(res);
        that.$notify({
          title: '提示',
          message: '上传成功',
          offset: 100,
          duration:2000
        });
        console.log(that.$store)
        that.$store.dispatch('user_find')
      })
    },
    cancelSave(){
      var that = this;
      if(that.$refs.previewImg){
        that.$refs.previewImg.style.backgroundImage = 'url(' + ')';
      }
    },
    changeImage(){
      var that = this;
      var file = this.$refs.fileInput.files[0];
      var reader = new FileReader();
      if((file.size/1024*1000)/1000 > 2048){
        console.log(file.size)
        that.$notify.error({
          title: '图片大小超过2M'
        });
        return
      };
      if(file.type != 'image/png'&& file.type != 'image/jpg' && file.type != 'image/jpeg' && file.type !='image/bmp'){
        that.$notify.error({
          title: '不符合所需的图片格式'
        });
        return
      }
//      this.cerDisable = true;


      reader.readAsDataURL(file);
      that.showPre = true;
      reader.onload = function() {
        that.idhead =  reader.result
        setTimeout(function(){
          that.$refs.previewImg.style.backgroundImage = 'url(' + reader.result + ')';
          that.$refs.previewImg.style.backgroundSize = '100% 100%';
          that.$refs.previewImg.style.backgroundRepeat = 'noRepeat';
        })
        that.save = false;
      }
    },
    upload(){
      this.$refs.fileInput.click()
    }
  },
  components:{
    countCenterRigHeader,certifytitle,
//    'my-upload': myUpload
  }
}
</script>
<style>
  .invate{
    padding:26px 30px;
  }
  .upLoadImg{
    margin:15px 0;
  }
  .upLoadImg button{
    width:160px;
    height: 30px;
    line-height: 30px;
    padding:0;
  }
  .uploadarrow{
    width:300px;
    height: 300px;
    display: inline-block;
    background: #353535;
    text-align: center;
    line-height: 300px;
    padding-top: 54px;
    box-sizing: border-box;
  }
  #preview{
    display: inline-block;
    color: #FFFFFF;
    vertical-align: top;
    margin-left: 50px;
  }
  #preview p:nth-of-type(1){
    padding-bottom:18px;
  }
  #preview p:nth-of-type(2){
    padding-top:10px;
  }
  .setImg{
    width: 200px;
    height: 200px;
    background: #EEEEEE;
  }
</style>
