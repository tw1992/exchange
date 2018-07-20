<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <!--<a :href="slides[nowIndex].href">-->
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].photo" @click="clickImg(nowIndex)">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].photo">
        </transition>
      <!--</a>-->
    </div>
    <ul class="slide-pages">
      <span class="dot" v-for="(item,index) in slides" :class="{on: index === nowIndex,notOn:index !== nowIndex}" @click="goto(index)"></span>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      slides: {
        type: Array,
        default: []
      },
      inv: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        nowIndex: 0,
        isShow: true
      }
    },
    computed: {
      prevIndex () {
        if (this.nowIndex === 0) {
          return this.slides.length - 1
        }
        else {
          return this.nowIndex - 1
        }
      },
      nextIndex () {
        if (this.nowIndex === this.slides.length - 1) {
          return 0
        }
        else {
          return this.nowIndex + 1
        }
      }
    },
    methods: {
      goto (index) {
        this.isShow = false
        setTimeout(() => {
          this.isShow = true
          this.nowIndex = index
        }, 10)
      },
      runInv () {
        this.invId = setInterval(() => {
          this.goto(this.nextIndex)
        }, this.inv)
      },
      clearInv () {
        clearInterval(this.invId)
      },
      clickImg(nowIndex){
        this.$emit('imgIndex', nowIndex);
      }
    },
    mounted () {
      this.runInv();
    }

  }
</script>

<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }
  .slide-trans-enter {
    transform: translateX(100%);
  }
  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-100%);
  }
  .slide-show {
    position: relative;
    margin: 0 auto;
    /*width: 700px;*/
    width: 100%;
    height: 400px;
    /*overflow: hidden;*/
    /*border: 3px solid #333;*/
  }
  .slide-show h2 {
    position: absolute;
    width: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    margin: 0;
    height: 32px;
    padding-left: 15px;
  }
  .slide-img {
    width: 100%;
  }
  .slide-img img {
    width: 100%;
    /*height: 100%;*/
    height: 400px;
    position: absolute;
    top: 0;
    display: block;
  }
  .slide-pages {
    position: absolute;
    bottom: 29px;
    left:50%;
    /*margin-bottom: 5px;*/
    /*right: 15px;*/
  }
  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
  }
  /*.slide-pages li .on {*/
    /*color: deeppink;*/
    /*text-decoration: underline;*/
  /*}*/
  .on{
    background: rgba(0,0,0,0.20);
  }
  .notOn{
    background: #FFFFFF;
  }
  .dot{
    display: inline-block;
    width:14px;
    height:14px;
    /*background: red;*/
    border-radius: 50%;
    margin-right: 16.5px;
  }
</style>
