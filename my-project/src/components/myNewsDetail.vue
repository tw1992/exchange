<template>
    <div class="newsDetail content-center">
        <h4 style="text-align: center;">{{content.title}}</h4>
        <div style="text-align: center;margin-bottom: 20px;">{{content.add_time | time}}</div>
        <p style="text-align: left;text-indent:32px;" v-html="content.content">

        </p>
        <div style="position: absolute;bottom: 30px;">
          <el-button type="primary" size="mini" @click="goBace">返回</el-button>
          <el-button type="primary" size="mini" @click="delateItem">删除</el-button>
          <el-button type="primary" size="mini" @click="next" :disabled="disable">下一条</el-button>
        </div>
    </div>
</template>
<style>
  .newsDetail{
    min-height: 600px;
    margin:36px auto;
    border:1px solid #ddd;
    padding:30px 20px;
    position: relative;
    box-sizing: border-box;
  }
</style>
<script>
export default{
  data(){
    return {
      nextId:this.$route.params.id,
      content:{},
      disable:false,
      time:''
    }
  },
  watch:{
    '$route':function(newVlaue,oldValue){
      if(oldValue){
        this.currentNews()
      }
    }
  },
  methods:{
    goBace(){
      this.$router.push({name:'myNews'})
    },
    delateItem(){
      var that = this;
      that.interFace('delete_message',{message_id:that.$route.params.id}).then(function(res){
        that.$router.push({name:'myNews'})
      })
    },
    currentNews(){
      var that = this;
      this.interFace('sysmessage_find',{
        id:that.nextId,
        type:0
      }).then(function(res){
        console.log(res)
        that.content = res.sysmessage;

        that.interFace('sysmessage',{
          list:0,
          value:1
        }).then(function(res){
          if(res.no_select>0){
            sessionStorage.setItem('noReadNews',1);
            that.$store.state.noReadNews = true;
          }else{
            sessionStorage.setItem('noReadNews',0);
            that.$store.state.noReadNews = false;
          }
        })


        if(!res.next){
          console.log(res.next)
          that.disable = true;
         return;
        }
        that.nextId = res.next.id;
      })
    },
    next(){
      var that = this
      this.$router.push({name:'myNewsDetail',params: { id: that.nextId }})
    }
  },
  created(){
    this.currentNews(this.$route.params.id)
  }
}
</script>
