# ByUsi Team Introduction

[简体中文](README.mf) **English** [繁体中文](README-zh-uf.md)

## Team Overview
ByUsi is an innovative technology team focused on developing practical tools, dedicated to enhancing user experience through simple and elegant solutions. Adhering to the philosophy of "tools serving people," the team continues to explore innovative practices in web application development.

---

## Core Project Matrix

[![ByUsi/Proxy内网穿透](https://gitee.com/byusi/proxy/widgets/widget_card.svg?colors=4183c4,ffffff,ffffff,e3e9ed,666666,9b9b9b)](https://gitee.com/byusi/proxy)

### 🎯 Active Projects

#### FoxCM Video Platform
**Technical Architecture**: Python Flask + JSON File Storage + Bootstrap  
**Core Features**:  
- Lightweight video-sharing community architecture  
- Session-based user authentication system  
- Video upload and management functionality  
  ```python
  # File upload logic example
  def upload():
      video_file = request.files['video']
      video_filename = str(uuid.uuid4()) + ext  # Unique filename generation
      video_file.save(os.path.join(app.config['UPLOAD_FOLDER'], video_filename))
  ```
- Video playback statistics and comment interaction  
- Admin backend management system  

**Technical Highlights**:  
✅ Frontend template engine rendering  
✅ Real-time playback statistics  
✅ Comment and like interaction mechanism  

**Development Status**: Continuously iterating (current version v1.4)  

---

#### Joyful App Market
**Tech Stack**: PHP + Bootstrap + Local File Storage  
**Core Features**:  
- Basic app display and download functionality  
- Simple backend management system  
- Responsive web design  

**Upcoming Plans**:  
✔️ Add user rating system  
✔️ Optimize category search functionality  

---

### 📦 Archived Projects

#### ByUsi-JYp Cloud Service Platform
**Technical Implementation**: Python Flask + Local File Storage  
**Historical Features**:  
- Basic file upload/download service  
  ```python
  @app.route('/upload', methods=['POST'])
  def upload():
      uploaded_file = request.files['file']
      file_data = uploaded_file.read()  # In-memory temporary storage
  ```
- File ID mapping management system  
- Multi-threaded file scanning mechanism  
- Bootstrap admin backend  

**Discontinuation Reason**: Due to team resource focus strategy, the project entered maintenance mode in Q11 2024.  

---

## Technology Ecosystem
| Domain         | Core Technical Components     | Core Features             |
|----------------|------------------------------|--------------------------|
| Backend        | Python/Flask, PHP            | Lightweight routing design|
| Data Storage   | JSON file storage, local file system | Rapid prototyping        |
| Frontend       | Bootstrap + jQuery           | Responsive layout         |
| Deployment     | Single-machine deployment    | Quick startup             |

---

## Contact Us
📧 **Technical Support**: admin@520world.top  
🌐 **Official Website**: [https://www.byusi.cn](https://www.byusi.cn)  
💾 **Code Repository**: [gitee.com/byusi](https://gitee.com/byusi)  

---

*Document Version: v2.1.1 | Update Date: February 2025*  
*© 2023-2025 ByUsi. All rights reserved.*