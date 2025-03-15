# OpenJuOS应用开发
  - 适用于 **ProperOS** 与 **JuOS**

## 声明
  1. 禁止开发违反中国法律或当国法律的应用，一切责任由自主承担
  2. **OpenJuOS** 应用开发需要了解 **HTML5** , **JavaScript** 和 **iApp v3** 的相关知识，请尽量学习
  3. 在申请上架 OpenJuOS 应用时需要有礼貌，否则将无法上架应用到相关应用商店

## 应用开发需要的基本工具
  1. 文本编辑器（用于编辑基本的文本，电脑推荐使用 **[VS Code](https://code.visualstudio.com/)**，手机推荐使用 **[MT管理器](http://mt2.cn)**）
  2. 压缩工具（用于应用打包，电脑推荐使用 **[7-zip](https://www.7-zip.org/)** ，手机推荐使用 **[MT管理器](http://mt2.cn)**）

## 基本安装索引
1. **OpenJuOS** 的安装索引为 `InstallAppLog.f` 这个文件，在其中标明了应用名，应用包名，应用图标等信息，以下是基本语法
```text
# 声明应用名
AppM=Demo=AppM
# 声明应用包名，其中最顶头需要包含 %g
AppLj=%gcn.byusi.demo=AppLj
# 声明应用图标（使用的是安装包相对路径）
AppTb=icon.png=AppTb
```
- 扩展，在 **InstallAppLog.f** 的固定语法中包含一个标签，该标签可以让 OpenJuOS 在加载应用时自动访问固定的 URL
  ```text
  AppUrlJr=https://foxcm.byusi.cn=AppUrlJr
  ```

这是一个应用包的安装索引文件的基本语法
2. **src** 文件夹是应用源码文件夹，其中 **index.html** 文件是不可缺少的，否则无法正常启动应用

## 联系开发者
- 联系邮箱：[admin@520world.top](mailto:admin@520world.top)
> 申请应用上架应用市场参考
> ```text
> 主题：申请上架应用到 [JuOS 或者 ProperOS 或者 全平台]
> 应用名：
> 应用分类：
> 应用图标：[URL]
> 应用宣传图：[URL]，[必须5张]
> 应用简介：
> 应用开发者：
> 应用下载链接：[URL]
> ```