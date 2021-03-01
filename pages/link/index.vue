<template>
  <div class="link-page-box">
    <div class="link-list-box clear-fix">
      <div class="link-title">
        友情链接
      </div>
      <div :title="item.name" class="link-item float-left" v-for="(item,index) in listLink" :key="index">
        <a :href="item.url" target="_blank">
          <img :src="'http://localhost:2020/portal/image/'+item.logo">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../../api/api';

  export default {
    asyncData() {
      return api.getLinkList().then(result => {
        //console.log(result.data);
        return {
          listLink: result.data
        }
      })
    }
  }
</script>

<style>
  .link-page-box{
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .link-title{
    text-align: center;
    font-size: 20px;
    color: #7f828b;
    margin-bottom: 20px;
  }
  .link-list-box {
    background: #FFffff;
    padding: 20px;

  }

  .link-item img {
    width: 150px;
    height: 57px;
    vertical-align: middle;
  }

  .link-item:hover {
    border: #A612FF 1px solid;
  }

  .link-item {
    border: #dfdfdf 1px solid;
    padding: 10px;
    margin: 10px;
    text-align: center;
    cursor: pointer;
  }
</style>
