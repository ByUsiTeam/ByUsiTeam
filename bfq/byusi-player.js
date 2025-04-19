// byusi-player.js
// ByUsi Video Player Core Module
// Copyright © ByUsi. All Rights Reserved.
// 官网: https://www.byusi.cn
// 文档: https://help.byusi.cn

class ByUsiPlayer {
  constructor(containerId = 'byusiPlayer') {
    // 核心初始化
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error('[ByUsi Player] Container element not found');
      return;
    }

    this.video = this.container.querySelector('.byusi-video');
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.controlsVisible = true;
    this.controlsTimeout = null;
    this.lastTouchTime = 0;
    this.lastVolume = 1;
    this.isDragging = false;
    this.touchStartX = 0;
    this.touchStartTime = 0;

    // 初始化流程
    this.initConfig();
    this.initElements();
    this.bindEvents();
    this.initPlayerState();
    this.initGestures();
    this.initKeyboardControls();
    this.initFullscreenListener();
  }

  /* 初始化配置 */
  initConfig() {
    const hexToRgb = hex => {
      const bigint = parseInt(hex.replace('#', ''), 16);
      return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
    };

    this.config = {
      src: this.container.dataset.src || '',
      autoplay: this.parseBoolean(this.container.dataset.autoplay),
      loop: this.parseBoolean(this.container.dataset.loop),
      muted: this.parseBoolean(this.container.dataset.muted),
      primaryColor: getComputedStyle(this.container)
        .getPropertyValue('--primary-color')
        .trim() || '#00ff88',
      autoHideControls: this.parseBoolean(this.container.dataset.autoHide, true),
      hideDelay: parseInt(this.container.dataset.hideDelay) || 3000,
      allowKeyboard: this.parseBoolean(this.container.dataset.keyboard, true),
      allowPIP: this.parseBoolean(this.container.dataset.pip, true),
      volumeStep: parseFloat(this.container.dataset.volumeStep) || 0.1
    };

    this.container.style.setProperty('--primary-rgb', hexToRgb(this.config.primaryColor));
  }

  /* 初始化元素引用 */
  initElements() {
    this.elements = {
      controlsContainer: this.container.querySelector('.byusi-controls-container'),
      playBtn: this.container.querySelector('[data-action="play"]'),
      muteBtn: this.container.querySelector('[data-action="mute"]'),
      progressBar: this.container.querySelector('.byusi-progress-bar'),
      progressFilled: this.container.querySelector('.byusi-progress-filled'),
      volumeSlider: this.container.querySelector('.byusi-volume-slider'),
      currentTime: this.container.querySelector('.byusi-current-time'),
      duration: this.container.querySelector('.byusi-duration'),
      loading: this.container.querySelector('.byusi-loading'),
      pipBtn: this.container.querySelector('[data-action="pip"]'),
      fullscreenBtn: this.container.querySelector('[data-action="fullscreen"]'),
      copyright: this.container.querySelector('.byusi-copyright')
    };

    if (!document.pictureInPictureEnabled) {
      this.elements.pipBtn.style.display = 'none';
    }
  }

  /* 初始化播放器状态 */
  initPlayerState() {
    // 应用初始配置
    this.video.src = this.config.src;
    this.video.autoplay = this.config.autoplay;
    this.video.loop = this.config.loop;
    this.video.muted = this.config.muted;
    this.video.volume = this.config.muted ? 0 : 1;

    // 同步控件状态
    this.elements.volumeSlider.value = this.video.volume;
    this.updateMuteState();
    this.updateDuration();
  }

  /* 事件绑定 */
  bindEvents() {
    // 视频事件
    this.video.addEventListener('timeupdate', () => this.updateProgress());
    this.video.addEventListener('loadedmetadata', () => this.updateDuration());
    this.video.addEventListener('waiting', () => this.showLoading(true));
    this.video.addEventListener('playing', () => this.showLoading(false));
    this.video.addEventListener('ended', () => this.handleVideoEnd());
    this.video.addEventListener('volumechange', () => this.handleVolumeChange());

    // 控件事件
    this.elements.playBtn.addEventListener('click', () => this.togglePlay());
    this.elements.muteBtn.addEventListener('click', () => this.toggleMute());
    this.elements.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    this.elements.pipBtn.addEventListener('click', () => this.togglePiP());
    this.elements.volumeSlider.addEventListener('input', e => this.setVolume(e.target.value));

    // 进度条事件
    this.elements.progressBar.addEventListener('mousedown', e => this.startDrag(e));
    document.addEventListener('mousemove', e => this.handleDrag(e));
    document.addEventListener('mouseup', () => this.endDrag());
    this.elements.progressBar.addEventListener('touchstart', e => this.startDrag(e.touches[0]));
    document.addEventListener('touchmove', e => this.handleDrag(e.touches[0]));
    document.addEventListener('touchend', () => this.endDrag());

    // 容器事件
    this.container.addEventListener('click', e => this.handleContainerClick(e));
    this.container.addEventListener('dblclick', () => this.toggleFullscreen());
    this.container.addEventListener('mousemove', () => this.resetAutoHide());
    this.container.addEventListener('touchstart', e => this.handleTouchStart(e));
    this.container.addEventListener('touchend', e => this.handleTouchEnd(e));
  }

  /* 容器点击处理 */
  handleContainerClick(e) {
    if (e.target.closest('.byusi-controls-container')) return;
    this.toggleControls();
  }

  /* 控件显隐逻辑 */
  toggleControls(force) {
    this.controlsVisible = force ?? !this.controlsVisible;
    this.elements.controlsContainer.classList.toggle('controls-hidden', !this.controlsVisible);
    this.elements.copyright.style.opacity = this.controlsVisible ? 1 : 0;
    this.resetAutoHide();
  }

  /* 自动隐藏控制 */
  resetAutoHide() {
    clearTimeout(this.controlsTimeout);
    if (this.controlsVisible && this.config.autoHideControls) {
      this.controlsTimeout = setTimeout(() => {
        this.toggleControls(false);
      }, this.config.hideDelay);
    }
  }

  /* 手势控制 */
  initGestures() {
    if (!this.isMobile) return;

    // 双击切换全屏
    this.container.addEventListener('touchend', e => {
      const now = Date.now();
      if (now - this.lastTouchTime < 300) {
        this.toggleFullscreen();
        this.lastTouchTime = 0;
      } else {
        this.lastTouchTime = now;
      }
    });
  }

  /* 播放控制 */
  togglePlay() {
    this.video.paused ? this.play() : this.pause();
  }

  play() {
    this.video.play()
      .then(() => {
        this.elements.playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
      })
      .catch(error => this.showToast(`播放失败: ${error.message}`));
  }

  pause() {
    this.video.pause();
    this.elements.playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
  }

  /* 音量控制 */
  setVolume(volume) {
    volume = Math.min(1, Math.max(0, volume));
    this.video.volume = volume;
    this.elements.volumeSlider.value = volume;
    this.lastVolume = volume;
    this.updateMuteState();
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    if (!this.video.muted && this.video.volume === 0) {
      this.setVolume(this.lastVolume);
    }
    this.updateMuteState();
  }

  updateMuteState() {
    const isMuted = this.video.muted || this.video.volume === 0;
    this.elements.muteBtn.innerHTML = isMuted ? 
      '<i class="bi bi-volume-mute-fill"></i>' : 
      '<i class="bi bi-volume-up-fill"></i>';
  }

  /* 进度控制 */
  startDrag(e) {
    this.isDragging = true;
    this.handleDrag(e);
  }

  handleDrag(e) {
    if (!this.isDragging) return;
    
    const rect = this.elements.progressBar.getBoundingClientRect();
    let pos = (e.clientX - rect.left) / rect.width;
    pos = Math.min(1, Math.max(0, pos));
    this.video.currentTime = pos * this.video.duration;
  }

  endDrag() {
    this.isDragging = false;
  }

  seekRelative(seconds) {
    this.video.currentTime = Math.min(
      Math.max(0, this.video.currentTime + seconds),
      this.video.duration
    );
  }

  updateProgress() {
    if (this.isDragging) return;
    
    const progress = (this.video.currentTime / this.video.duration) * 100;
    this.elements.progressFilled.style.width = `${progress}%`;
    this.elements.currentTime.textContent = this.formatTime(this.video.currentTime);
  }

  /* 全屏控制 */
  async toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await this.container.requestFullscreen();
        this.toggleControls(true); // 全屏时强制显示控件
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      this.showToast('全屏模式不可用');
    }
  }

  /* 画中画控制 */
  async togglePiP() {
    try {
      if (this.video !== document.pictureInPictureElement) {
        await this.video.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      this.showToast('画中画不可用: ' + error.message);
    }
  }

  /* 键盘控制 */
  initKeyboardControls() {
    if (!this.config.allowKeyboard) return;

    document.addEventListener('keydown', e => {
      if (document.activeElement.tagName === 'INPUT') return;

      switch(e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          this.togglePlay();
          break;
        case 'arrowleft':
          this.seekRelative(-5);
          break;
        case 'arrowright':
          this.seekRelative(5);
          break;
        case 'm':
          this.toggleMute();
          break;
        case 'f':
          this.toggleFullscreen();
          break;
        case 'escape':
          if (document.fullscreenElement) document.exitFullscreen();
          break;
        case 'arrowup':
          this.setVolume(Math.min(1, this.video.volume + this.config.volumeStep));
          break;
        case 'arrowdown':
          this.setVolume(Math.max(0, this.video.volume - this.config.volumeStep));
          break;
      }
    });
  }

  /* 全屏状态监听 */
  initFullscreenListener() {
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        this.container.classList.add('fullscreen');
        this.toggleControls(true);
      } else {
        this.container.classList.remove('fullscreen');
      }
    });
  }

  /* 工具方法 */
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  parseBoolean(value, defaultValue = false) {
    if (typeof value === 'undefined') return defaultValue;
    return value === 'true' || value === true;
  }

  showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'byusi-toast';
    toast.textContent = message;
    
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.85)',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: '25px',
      fontSize: '14px',
      zIndex: 10000,
      whiteSpace: 'nowrap',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
      animation: 'toast-fade 0.3s ease'
    });

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toast-fade 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, duration - 300);
  }

  updateDuration() {
    this.elements.duration.textContent = this.formatTime(this.video.duration);
  }

  showLoading(show) {
    this.elements.loading.style.display = show ? 'block' : 'none';
  }

  handleVideoEnd() {
    this.elements.playBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
    if (this.config.loop) this.toggleControls(true);
  }

  handleVolumeChange() {
    this.elements.volumeSlider.value = this.video.volume;
    this.updateMuteState();
  }

  /* 销毁方法 */
  destroy() {
    this.video.pause();
    this.video.removeAttribute('src');
    this.video.load();

    // 移除事件监听
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.endDrag);
    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('touchend', this.endDrag);

    // 移除DOM元素
    this.container.remove();
  }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.byusi-container').forEach(container => {
    new ByUsiPlayer(container.id);
  });
});

// CSS动画定义
const style = document.createElement('style');
style.textContent = `
  @keyframes toast-fade {
    from { opacity: 0; transform: translate(-50%, 20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }
`;
document.head.appendChild(style);

// 模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ByUsiPlayer;
}