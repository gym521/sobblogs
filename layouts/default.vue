<template>
  <div id="blog-box">
    <div id="blog-header" class="blog-header clear-fix default-border-radius">
      <div class="logo-box float-left">
        <div class="logo">
          悟空之家
        </div>
      </div>
      <div class="login-tips-text-box float-right">
        <span> <i class="sob_blog sobfingermap">登录</i></span>
        <span> <i class="sob_blog sobmembers-add">注册</i></span>
      </div>
      <div class="navigation-box float-right">
        <NuxtLink to="/">
          <span><i class="sob_blog sobhome"></i>首页</span>
        </NuxtLink>
        <NuxtLink to="/about">
          <span><i class="sob_blog sobabout_line"></i>关于</span>
        </NuxtLink>
        <NuxtLink to="/link">
          <span><i class="sob_blog soblink"></i>友链</span>
        </NuxtLink>
      </div>
      <div class="user-info-box float-right" style="display: none">
        用户信息
      </div>
    </div>
    <Nuxt/>
    <div class="blog-footer">
      <div class="copy-right-box">
        <p>
          Copyright ©
          <a href="https://www.baidu.com" target="_blank">悟空之家</a>
          (2014-2021） 本网站由程序猿(媛)用爱驱动
        </p>
      </div>
      <div>
        <span>关于我们</span>
        |
        <span>联系我们</span>
        |
        <span>友情链接</span>
      </div>

    </div>
  </div>
</template>

<style>

  .default-border-radius {
    border-radius: 4px;
  }

  .navigation-box span:hover, .login-tips-text-box span:hover {
    color: #A612FF;
  }

  .navigation-box span {
    margin-right: 40px;
    color: #737F90;
    font-size: 18px;
    cursor: pointer;
  }

  .navigation-box i {
    font-weight: 600;
  }

  .navigation-box {
    margin-right: 50px;
  }

  .login-tips-text-box span {
    margin-right: 10px;
    cursor: pointer;
  }

  .login-tips-text-box {
    color: #737F90;
    font-size: 16px;
    cursor: pointer;
  }

  .logo {
    margin-left: 10px;
  }

  .logo-box .logo {
    color: #737F90;
    font-size: 24px;
    font-weight: 600;
  }

  a {
    text-decoration: none;
  }

  .copy-right-box {
    margin-bottom: 10px;
  }

  .blog-footer {
    color: #737F90;
    padding-bottom: 30px;
    text-align: center;
  }

  * {
    padding: 0;
    margin: 0;
  }

  .blog-header {
    line-height: 30px;
    background: #Fff;
    margin-top: 20px;
    padding: 10px;
  }

  body {
    background: #F2F2FA;
  }

  #blog-box {
    width: 1140px;
    margin: 0 auto;
  }

  .float-left {
    float: left;
  }

  .float-right {
    float: right;
  }

  .clear-fix {
    overflow: hidden;
    zoom: 1;
  }
</style>
