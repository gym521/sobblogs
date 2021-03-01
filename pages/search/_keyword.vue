<template>
  <div class="search-box">
    搜索结果页面
  </div>
</template>
<script>
export default {
  asyncData({params}){
    console.log(params.keyword);
  }
}
</script>
<style>

</style>
