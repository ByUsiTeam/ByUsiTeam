# ByUsiOAuth系统介绍
- 该系统提供了 **Gitee** 和 **GitHub** 的 **OAuth** 授权简单接口

## Gitee的OAuth
#### Gitee OAuth 介绍（所有返回均使用json）
- 申请身份标识符UUID
  ```url
  https://api.oauth.byusi.cn/rid.php
  ```
- 申请 **Gitee** 的 **OAuth** 界面URL
  ```url
  https://api.oauth.byusi.cn/oauth.php?u=[uuid]
  ```
- 申请查看授权完成后返回数据
  ```url
  https://api.oauth.byusi.cn/api.php?u=[uuid]
  ```

## GitHub的OAuth
#### GitHub OAuth 介绍（所有返回均使用JSON）
- 获取标识UUID
  ```url
  https://api.oauth.byusi.cn/gh/rid.php
  ```
- 获取授权URL
  ```url
  https://api.oauth.byusi.cn/gh/oauth.php?u=[uuid]
  ```
- 查询返回数据
  ```url
  https://api.oauth.byusi.cn/gh/api.php?u=[uuid]
  ```