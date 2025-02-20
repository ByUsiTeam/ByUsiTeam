# ByUsi 团队介绍

**简体中文** [English](README-en.md) [繁体中文](README-zh-uf.md)

## 团队概览
ByUsi 是一个专注于开发实用型工具的创新型技术团队，致力于通过简洁优雅的解决方案提升用户体验。团队坚持「工具为人服务」的理念，持续探索Web应用开发的创新实践。

---

## 核心项目矩阵

### 🎯 活跃项目

[![ByUsi/Proxy内网穿透](https://gitee.com/byusi/proxy/widgets/widget_card.svg?colors=4183c4,ffffff,ffffff,e3e9ed,666666,9b9b9b)](https://gitee.com/byusi/proxy)

#### FoxCM 视频平台
**技术架构**：Python Flask + JSON文件存储 + Bootstrap  
**核心功能**：  
- 轻量化视频分享社区架构
- 基于Session的用户认证系统
- 视频上传与管理功能
  ```python
  # 文件上传逻辑示例
  def upload():
      video_file = request.files['video']
      video_filename = str(uuid.uuid4()) + ext  # 唯一文件名生成
      video_file.save(os.path.join(app.config['UPLOAD_FOLDER'], video_filename))
  ```
- 视频播放统计与评论互动
- 管理员后台管理系统

**技术亮点**：  
✅ 前端模板引擎渲染  
✅ 播放量实时统计  
✅ 评论点赞互动机制  

**开发状态**：持续迭代中（当前版本 v1.4）

---

#### 欢愉应用市场
**技术栈**：PHP + Bootstrap + 本地文件存储  
**核心特性**：  
- 基础应用展示与下载功能
- 简易后台管理系统
- 响应式网页设计

**近期规划**：  
✔️ 增加用户评价系统  
✔️ 优化分类检索功能  

---

### 📦 归档项目

#### ByUsi-JYp 云服务平台
**技术实现**：Python Flask + 本地文件存储  
**历史功能**：  
- 基础文件上传/下载服务
  ```python
  @app.route('/upload', methods=['POST'])
  def upload():
      uploaded_file = request.files['file']
      file_data = uploaded_file.read()  # 内存暂存上传
  ```
- 文件ID映射管理系统
- 多线程文件扫描机制
- Bootstrap管理后台

**停更说明**：因团队资源聚焦战略，项目已于2024Q11转入维护模式

---

## 技术生态体系
| 领域        | 核心技术组件                 | 核心特性                  |
|-------------|------------------------------|--------------------------|
| 后端开发    | Python/Flask, PHP            | 轻量级路由设计            |
| 数据存储    | JSON文件存储, 本地文件系统   | 快速原型开发              |
| 前端架构    | Bootstrap+jQuery             | 响应式布局                |
| 部署方案    | 单机部署                     | 快速启动                  |

---

## 连接我们
📧 **技术支持**：admin@520world.top  
🌐 **官方网站**：[https://www.byusi.cn](https://www.byusi.cn)  
💾 **代码仓库**：[gitee.com/byusi](https://gitee.com/byusi)  

---

*文档版本：v2.1.1 | 更新日期：2025年2月*  
*© 2023-2025 ByUsi 保留所有权利*