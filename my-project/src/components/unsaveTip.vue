<template>
    <div class="tip content-center" :style="marginbutton">
        <div>
          {{title}}
        </div>
        <div>
          {{content}}
        </div>
    </div>
</template>
<script>
    export default{
        props:{
          margintop:{
            type: Number,
            default: 0,
          },
          marginbott:{
            type:Number,
            default:30
          }
        },
        data(){
            return {
              content: '风险提示  数字货币交易具有极高的风险（预挖、暴涨暴跌、庄家操控、团队解散、技术缺陷等），据国家五部委《关于防范比特币风险的通知 》，币加数字资产兑换平台为数字货币的爱好者提供一个自由的网上兑换平台，对币的投资价值不承担任何审查、担保、赔偿的责任，如果您不能接受，请不要进行交易！谢谢！',
              title:'风险提示',
              marginbutton:{marginBottom:this.marginbott + 'px',marginTop:this.margintop+'px'}
            }
        }
    }
</script>
<style scoped>
  .tip{
    border: 1px solid #CCCCCC;
    padding:13px 16px 16px 16px;
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    color: #21201A;
    letter-spacing: 0;
    line-height: 20px;
  }
  .tip > div:nth-of-type(1){
    font-size: 14px;
    color: #AA9882;
    margin-bottom: 17px;
  }
</style>
