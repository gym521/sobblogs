<template>
  <div class="index-page-box clear-fix">
    <div class="index-left-part default-border-radius float-left">
      <div class="user-avatar">
        <img :src="userInfo.avatar">
      </div>
      <div class="user-name">
        <span v-text="userInfo.name"></span>
      </div>
      <div class="user-sign">
        <span v-text="userInfo.sign"></span>
      </div>
      <div class="left-user-self-links">
        <span class="sob_blog sobwechat"></span>
        <span class="sob_blog sobgithub"></span>
        <span class="sob_blog sobbilibili-line"></span>
      </div>
      <div class="left-category-box">
        <div
          :class="currentCategoryId===item.id?'category-item-ative default-border-radius':'category-item default-border-radius'"
          v-for="(item,index) in categories" :key="index">
          <span v-text="item.categorName" @click="listArticleByCategoryId(item)"></span>
        </div>
      </div>

    </div>
    <div class="index-center-part float-left">
      <div class="loop-box">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="(item,index) in loops" :key="index">
            <img :src="item.imageUrl" style="object-fit: cover">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="top-articles-box" v-loading="isLoading">
        <div class="top-article-item default-border-radius clear-fix" v-for="(item,index) in topArticleResult"
             :key="index">
          <div class="article-left float-left">
            <div class="top-article-title">
              <span class="top-tips">置顶</span>
              <span class="top-title">{{item.title}}</span>
            </div>
            <div class="top-article-summary">
              <p>
                {{item.summary}}
                <span>...</span>
                <span class="read-more">阅读全文</span>
              </p>
            </div>
            <div class="top-labels">
              <el-tag
                size="mini"
                v-for="(tag,tagIndex) in item.labels"
                :key="tagIndex"
                effect="plain">
                {{tag}}
              </el-tag>
            </div>
          </div>
          <div class="article-right float-right">
            <div class="top-article-cover">
              <img :src="'http://localhost:2020/portal/image/'+item.cover">
            </div>
          </div>
        </div>
        <div class="top-article-item default-border-radius clear-fix"
             v-for="(item,index) in ArticleResult"
             :key="index">
          <div class="article-left float-left">
            <div class="top-article-title">
              <span class="top-title">{{item.title}}</span>
            </div>
            <div class="top-article-summary">
              <p>
                {{item.summary}}
                <span>...</span>
                <span class="read-more">阅读全文</span>
              </p>
            </div>
            <div class="top-labels">
              <el-tag
                size="mini"
                v-for="(tag,tagIndex) in item.labels"
                :key="tagIndex"
                effect="plain">
                {{tag}}
              </el-tag>
            </div>
          </div>
          <div class="article-right float-right">
            <div class="top-article-cover">
              <img :src="'http://localhost:2020/portal/image/'+item.cover">
            </div>
          </div>
        </div>
      </div>
      <div class="article-page-navigation-bar">
        <el-pagination
          class="user-list-page-navigation-bor"
          background
          @current-change="onPageChange"
          :current-page="pageNavigation.currentPage"
          :page-size="pageNavigation.pageSize"
          layout="prev, pager, next"
          :total="pageNavigation.totalCount">
        </el-pagination>
      </div>
    </div>
    <div class="index-right-part float-left">
      <div class="right-card">
        <div class="card-title">
          内容搜索
        </div>
        <div class="card-content">
          <el-input
            @keyup.enter.native="toSearchPage"
            size="medium"
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            v-model="keyword">
          </el-input>
        </div>
      </div>
      <div class="right-card">
        <div class="card-title">
          热门标签
        </div>
        <div class="card-content">
          <div class="label-list-box">
            <wordcloud
              :data="defaultWords"
              nameKey="name"
              valueKey="count"
              :fontSize="fontSize"
              :rotate="rotate"
              :margin="margin"
              :showTooltip="false"
              :wordClick="wordClickHandler">
            </wordcloud>
          </div>
        </div>
      </div>
      <div class="right-card">
        <div class="card-title">
          公众号
        </div>
        <div class="wechat-subscription">
          <img src="https://img-bss.csdn.net/1614217997711.png">
        </div>
      </div>
      <div class="taobao-loop">
        <TaobaoLoop>

        </TaobaoLoop>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../api/api';

  export default {
    data() {
      return {
        fontSize: [10, 30],
        margin: {top: 0, right: 0, bottom: 0, left: 0},
        rotate: {from: -10, to: 10, numOfOrientation: 20},
        isLoading: false,
        keyword: '',
        tagkeyword: '',
        defaultWords: [],
        currentCategoryId: ''
      }
    },
    mounted() {
      //获取标签
      this.listLabels();
    },
    methods: {
      //搜索页
      toSearchPage() {
        this.keyword = this.keyword.trim();
        //内容为空直接返回
        if (this.keyword === '') {
          return;
        }
        //跳转到搜索页面
        location.href = '/search/' + encodeURIComponent(this.keyword);
      },
      //文章结果处理
      handleArticleResult(result) {
        if (result.code === api.success_code) {
          this.ArticleResult = result.data.conernts;
          //翻页回顶部
          let topHeader = document.getElementById('blog-header');
          if (topHeader) {
            topHeader.scrollIntoView({
              block: 'start',
              behavior: 'smooth'
            })
          }
          //处理页码
          this.pageNavigation.currentPage = result.data.currentPage;
          this.pageNavigation.totalCount = result.data.totalCount;
          this.pageNavigation.pageSize = result.data.pageSize;
        } else {
          this.$message.error(result.message);
        }
        this.isLoading = false;
      },
      //分类点击事件
      listArticleByCategoryId(item) {
        if (this.currentCategoryId === item.id) {
          return;
        }
        this.isLoading = true;
        //重置页码
        this.pageNavigation.currentPage = 1;
        this.currentCategoryId = item.id;
        //请求数据
        api.getArticle(this.currentCategoryId, this.pageNavigation.currentPage, this.pageNavigation.pageSize).then(result => {
          if (result.code === api.success_code) {
            //处理结果
            this.handleArticleResult(result);
          }
        })
      },
      //获取标签
      listLabels() {
        api.getLabels(10).then(result => {
          if (result.code === api.success_code) {
            this.defaultWords = result.data.content;
          }
        })
      },
      wordClickHandler() {

      },
      onPageChange(page) {
        //获取文章列表加载当前页的内容
        this.isLoading = true;
        api.getArticle(this.currentCategoryId, page, this.pageNavigation.pageSize).then(result => {
          this.handleArticleResult(result);
        })
      }
    },
    async asyncData({params}) {
      let userInfoResult = await api.getAdminInfo();
      let categoriesResult = await api.getCategories();
      let loopsResult = await api.getLoops();
      let topArticleResult = await api.getTopArticle();
      //服务器渲染
      let ArticleResult = await api.getArticle('', 1, 5);

      //全部分类
      let tempCategories = [];
      tempCategories.push({
        categorName: '全部分类',
        id: ''
      })
      tempCategories = tempCategories.concat(categoriesResult.data)
      let pageNavigation = {
        currentPage: ArticleResult.data.currentPage,
        totalCount: ArticleResult.data.totalCount,
        pageSize: ArticleResult.data.pageSize
      };
      return {
        userInfo: userInfoResult.data,
        categories: tempCategories,
        loops: loopsResult.data,
        topArticleResult: topArticleResult.data,
        ArticleResult: ArticleResult.data.conernts,
        pageNavigation: pageNavigation

      }
    }
  }
</script>

<style>
  .wechat-subscription img {
    width: 180px;
    height: 180px;
    object-fit: cover;
  }

  .wordCloud .text {
    cursor: pointer;
  }

  .label-list-box .wordCloud {
    height: 150px;
  }

  .label-list-box {
    height: 150px;
  }

  .card-content {
    margin-top: 20px;
  }

  .right-card {
    padding: 10px;
    background: #FFffff;
    margin-top: 10px;
    border-radius: 4px;
  }

  .right-card .card-title {
    font-size: 13px;
    color: #999999;
    margin-bottom: 10px;
  }

  .article-page-navigation-bar {
    text-align: center;
  }

  .article-page-navigation-bar .el-pagination.is-background .el-pager li {
    background-color: #FFffff;
  }

  .top-labels .el-tag--medium {
    height: 22px;
    line-height: 22px;
  }

  .top-labels .el-tag {
    margin-right: 5px;
    cursor: pointer;
  }

  .top-labels {
    margin-top: 10px;
  }

  .read-more:hover {
    color: #ff4500;
  }

  .read-more {
    color: #999999;
    border-radius: 4px;
    padding: 3px;
    cursor: pointer;
    font-size: 13px;
  }

  .top-article-summary {
    margin-top: 15px;
    color: #909399;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-width: 500px;
  }

  .top-article-item {
    margin-bottom: 10px;
    background: #FFffff;
    padding: 5px;
  }

  .top-article-title {
    margin-top: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-width: 500px;
  }

  .top-article-title .top-tips {
    background: #ff4500;
    padding: 3px 10px;
    color: #FFffff;
    border-radius: 4px;
    vertical-align: middle;
    font-size: 12px;
  }

  .top-article-title .top-title {
    font-size: 20px;
    color: #303133;
    vertical-align: middle;
  }

  .top-articles-box {
    margin-top: 10px;
  }

  .top-article-cover img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
  }

  .loop-box {
    padding: 5px;
    background: #FFffff;
  }

  .loop-box img {
    width: 100%;
    height: 300px;
    border-radius: 4px;
  }

  .left-category-box .category-item:hover,
  .left-category-box .category-item-ative {
    background: #F5F5F5;
    color: #A612FF !important;
  }

  .left-category-box .category-item,
  .left-category-box .category-item-ative {
    padding: 10px 5px;
    cursor: pointer;
    font-size: 15px;
    color: #606266;
    margin-left: 10px;
    margin-right: 10px;
  }

  .left-category-box {
    text-align: center;
    margin-top: 10px;
  }

  .left-user-self-links span:hover {
    color: #606060;
  }

  .left-user-self-links {
    text-align: center;
    margin-top: 20px;
  }

  .left-user-self-links span {
    margin-left: 15px;
    margin-right: 15px;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;

  }

  .index-left-part .user-sign {
    margin-top: 20px;
    font-size: 15px;
    color: #CACACA;
  }

  .index-left-part .user-name {
    margin-top: 15px;
    font-size: 20px;
    color: #606060;
  }

  .index-left-part {
    text-align: center;
    margin-top: 10px;
  }

  .index-left-part .user-avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-top: 10px;
  }

  .index-page-box {

    margin-bottom: 20px;
  }

  .index-left-part {
    margin-right: 10px;
    background: #FFffff;
    width: 200px;
    height: 480px;
  }

  .index-right-part {
    margin-left: 10px;

  }

  .index-right-part {
    width: 200px;
  }

  .index-center-part {
    width: 720px;
    margin-top: 10px;
  }
</style>
