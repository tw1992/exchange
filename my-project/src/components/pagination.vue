<template>
  <nav :class="{'center':classStyle,'center-right':!classStyle}" v-if="total>0">
    <ul class="pagination">
      <li :class="{'disabled': data1 == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
      <li :class="{'disabled': data1 == 1}"><a href="javascript:;" @click="setCurrent(data1 - 1)"> 上一页 </a></li>
      <li v-for="p in grouplist" :class="{'active': data1 == p.val}"><a href="javascript:;" @click="setCurrent(p.val)">
        {{ p.text }} </a></li>
      <li :class="{'disabled': data1 == page}"><a href="javascript:;" @click="setCurrent(data1 + 1)"> 下一页</a></li>
      <li :class="{'disabled': data1 == page}"><a href="javascript:;" @click="setCurrent(page)"> 尾页 </a></li>
    </ul>
  </nav>
</template>
<script>
  export default{
    props: {
      total: {            // 数据总条数
        type: Number,
        default: 0
      },
      display: {            // 每页显示条数
        type: Number,
        default: 1
      },
      current: {            // 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {        // 分页条数 -- 奇数
        type: Number,
        default: 4,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      },
      classStyle:{   //样式控制  是居中还是偏右  默认居中
        type:Boolean,
        default:true
      }
    },
    data(){
      return {
        data1: this.current
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.display);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.data1;
        if (len <= this.pagegroup) {
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          }
          ;
          return temp;
        }
        while (len--) {
          temp.push(this.page - len);
        }
        ;
        var idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.data1 > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.data1 > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.data1 < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    },
    methods: {
      setCurrent: function (idx) {
        if (this.data1 != idx && idx > 0 && idx < this.page + 1) {
          this.data1 = idx;
          this.$emit('pagechange', this.data1);
        }
      }
    }
  }
</script>

<style>
  .center{
    text-align: center;
  }
  .center-right{
    float: right;
  }
  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px
  }

  .pagination > li {
    display: inline
  }

  .pagination > li > a, .pagination > li > span {
    position: relative;
    float: left;
    padding: 5px 11px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #696969;
    text-decoration: none;
    background: #E1E1E1;
    margin:0 2.5px;
    border-radius: 1px;
  }
  .pagination > li:first-child > a, .pagination > li:first-child > span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px
  }

  .pagination > li:last-child > a, .pagination > li:last-child > span {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px
  }
  .pagination > li > a:focus, .pagination > li > a:hover, .pagination > li > span:focus, .pagination > li > span:hover {
    z-index: 2;
    color: #23527c;
    background-color: #eee;
    border-color: #ddd
  }
  .pagination > .active > a, .pagination > .active > a:focus, .pagination > .active > a:hover, .pagination > .active > span, .pagination > .active > span:focus, .pagination > .active > span:hover {
    z-index: 3;
    color: #fff;
    cursor: default;
    background: #C8B297;
  }
  .pagination > .disabled > a, .pagination > .disabled > a:focus, .pagination > .disabled > a:hover, .pagination > .disabled > span, .pagination > .disabled > span:focus, .pagination > .disabled > span:hover {
    color: #777;
    cursor: not-allowed;
    background: #E1E1E1;
    border-color: #ddd
  }
  .pagination-lg > li > a, .pagination-lg > li > span {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333
  }
  .pagination-lg > li:first-child > a, .pagination-lg > li:first-child > span {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px
  }
  .pagination-lg > li:last-child > a, .pagination-lg > li:last-child > span {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px
  }
  .pagination-sm > li > a, .pagination-sm > li > span {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5
  }
  .pagination-sm > li:first-child > a, .pagination-sm > li:first-child > span {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px
  }
  .pagination-sm > li:last-child > a, .pagination-sm > li:last-child > span {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px
  }
</style>
