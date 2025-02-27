# ByUsi 團隊介紹

[简体中文](README.md) [English](README-en.md) **繁體中文**

## 團隊概覽
ByUsi 是一個專注於開發實用型工具的創新型技術團隊，致力於通過簡潔優雅的解決方案提升用戶體驗。團隊堅持「工具為人服務」的理念，持續探索Web應用開發的創新實踐。

---

## 核心項目矩陣

### 🎯 活躍項目

[![ByUsi/Proxy内网穿透](https://gitee.com/byusi/proxy/widgets/widget_card.svg?colors=4183c4,ffffff,ffffff,e3e9ed,666666,9b9b9b)](https://gitee.com/byusi/proxy)

#### FoxCM 視頻平台
**技術架構**：Python Flask + JSON文件存儲 + Bootstrap  
**核心功能**：  
- 輕量化視頻分享社區架構
- 基於Session的用戶認證系統
- 視頻上傳與管理功能
  ```python
  # 文件上傳邏輯示例
  def upload():
      video_file = request.files['video']
      video_filename = str(uuid.uuid4()) + ext  # 唯一文件名生成
      video_file.save(os.path.join(app.config['UPLOAD_FOLDER'], video_filename))
  ```
- 視頻播放統計與評論互動
- 管理員後台管理系統

**技術亮點**：  
✅ 前端模板引擎渲染  
✅ 播放量實時統計  
✅ 評論點贊互動機制  

**開發狀態**：持續迭代中（當前版本 v1.4）

---

#### 歡愉應用市場
**技術棧**：PHP + Bootstrap + 本地文件存儲  
**核心特性**：  
- 基礎應用展示與下載功能
- 簡易後台管理系統
- 響應式網頁設計

**近期規劃**：  
✔️ 增加用戶評價系統  
✔️ 優化分類檢索功能  

---

### 📦 歸檔項目

#### ByUsi-JYp 雲服務平台
**技術實現**：Python Flask + 本地文件存儲  
**歷史功能**：  
- 基礎文件上傳/下載服務
  ```python
  @app.route('/upload', methods=['POST'])
  def upload():
      uploaded_file = request.files['file']
      file_data = uploaded_file.read()  # 內存暫存上傳
  ```
- 文件ID映射管理系統
- 多線程文件掃描機制
- Bootstrap管理後台

**停更說明**：因團隊資源聚焦戰略，項目已於2024Q11轉入維護模式

---

## 技術生態體系
| 領域        | 核心技術組件                 | 核心特性                  |
|-------------|------------------------------|---------------------------|
| 後端開發    | Python/Flask, PHP            | 輕量級路由設計            |
| 數據存儲    | JSON文件存儲, 本地文件系統   | 快速原型開發              |
| 前端架構    | Bootstrap+jQuery             | 響應式佈局                |
| 部署方案    | 單機部署                     | 快速啟動                  |

---

## 連接我們
📧 **技術支持**：admin@520world.top  
🌐 **官方網站**：[https://www.byusi.cn](https://www.byusi.cn)  
💾 **代碼倉庫**：[gitee.com/byusi](https://gitee.com/byusi)  

---

*文檔版本：v2.1.1 | 更新日期：2025年2月*  
*© 2023-2025 ByUsi 保留所有權利*