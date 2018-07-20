<template>
    <div>
        <div class="about">
            <p>
              {{title}}
            </p>
            <div v-html="content" class="aboutContent">

            </div>
        </div>
    </div>
</template>
<style>
  .about{
    width: 1000px;
    margin:36px auto 30px;
    border: 1px solid #ddd;
    padding:0 30px 20px;
    min-height: 1000px;
  }
  .about>p{
    padding: 20px 0;
    text-align: center;
  }
  .aboutContent>p{
    text-indent:28px!important;
  }
</style>
<script>
  export default{
    data(){
        return {
          content:'',
          id:this.$route.params.id,
          title:''
        }
    },
    watch:{
      '$route':{
        handler: function(newValue,oldValue){
          if(oldValue){
            this.requireAbout(newValue)
          }
        },
        deep: true
      }
    },
    methods:{
      changeId(){
        this.requireAbout()
      },
      requireAbout(newValue,oldValue){
        var that = this;
        that.interFace('bottom_find',{page_id:newValue.params.id}).then(function(res){
          console.log(res)
          that.content = res.content;
          that.title = res.title;
        })
      }
    },
    created(){
      this.requireAbout(this.$route)
    }
  }
</script>
