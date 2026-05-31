const App = {
  currentRoute: '/tools',
  contentEl: null,
  navItems: null,

  init() {
    this.contentEl = document.getElementById('content');
    this.navItems = document.querySelectorAll('.nav-item');
    this.setupNavigation();
    this.handleRoute();
    window.addEventListener('popstate', () => this.handleRoute());
  },

  setupNavigation() {
    this.navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const route = item.dataset.route;
        this.navigate(route);
      });
    });
  },

  navigate(route) {
    window.history.pushState(null, '', route);
    this.handleRoute();
  },

  handleRoute() {
    const path = window.location.pathname;
    this.currentRoute = path;

    this.updateNavigation();

    if (path === '/about') {
      this.renderAbout();
    } else if (path === '/tools/sxy') {
      this.renderSxy();
    } else if (path === '/tools/lj') {
      this.renderLj();
    } else {
      this.renderDashboard();
    }
  },

  updateNavigation() {
    const activeRoute = this.currentRoute.startsWith('/about') ? '/about' : '/tools';
    this.navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.route === activeRoute);
    });
  },

  renderDashboard() {
    this.contentEl.innerHTML = `
      <div class="card">
        <h2>工具列表</h2>
        <p>选择一个工具，快速进入对应功能。</p>
      </div>

      <div class="card tool-card">
        <a href="/tools/sxy" class="tool-card-inner" onclick="event.preventDefault(); App.navigate('/tools/sxy')">
          <div class="tool-card-header">
            <div class="tool-icon">荀</div>
            <div class="tool-info">
              <h3>神荀彧</h3>
              <p>奇兵 / 正兵快速决策</p>
              <span class="brief">按场面选锦囊后，一键做战术判断。</span>
            </div>
            <span class="arrow-icon">›</span>
          </div>
          <div class="tool-card-footer">
            <span class="chip-tag">对局中高频</span>
            <span class="enter-text">点击进入</span>
          </div>
        </a>
      </div>

      <div class="card tool-card">
        <a href="/tools/lj" class="tool-card-inner" onclick="event.preventDefault(); App.navigate('/tools/lj')">
          <div class="tool-card-header">
            <div class="tool-icon">傕</div>
            <div class="tool-info">
              <h3>李傕</h3>
              <p>概率加权随机判定</p>
              <span class="brief">输入三段概率后执行单次随机结果。</span>
            </div>
            <span class="arrow-icon">›</span>
          </div>
          <div class="tool-card-footer">
            <span class="chip-tag">概率工具</span>
            <span class="enter-text">点击进入</span>
          </div>
        </a>
      </div>

      <div class="card">
        <p style="color: var(--text-secondary); font-size: 0.92rem;">
          新增工具时，只需在配置里追加一项即可自动渲染。
        </p>
      </div>
    `;
  },

  renderAbout() {
    this.contentEl.innerHTML = `
      <div class="card">
        <div style="display: flex; align-items: flex-start; gap: 10px;">
          <span style="color: var(--primary); font-size: 20px;">ℹ</span>
          <div>
            <h2>关于本工具</h2>
            <p style="margin-top: 6px; line-height: 1.7;">
              这是一个面向三国杀对局辅助的轻量工具集，目标是让常用判定更快、更直观。
              当前包含神荀彧与李傕相关工具，后续会继续新增。
            </p>
          </div>
        </div>
        <div class="chip-list">
          <span class="chip" style="color: var(--primary); border-color: var(--primary);">纯前端实现</span>
          <span class="chip" style="color: var(--primary); border-color: var(--primary);">移动端优先</span>
          <span class="chip">零依赖</span>
        </div>
      </div>

      <div class="feature-list">
        <div class="card">
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <div class="feature-text">
              <h3>快速操作</h3>
              <p>针对高频决策场景做简化，打开即可使用。</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="feature-item">
            <div class="feature-icon">🔒</div>
            <div class="feature-text">
              <h3>纯本地逻辑</h3>
              <p>判定逻辑在前端执行，不依赖外部服务。</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="feature-item">
            <div class="feature-icon">✨</div>
            <div class="feature-text">
              <h3>持续扩展</h3>
              <p>后续会补充更多武将与机制相关工具。</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderSxy() {
    SxyTool.render(this.contentEl);
  },

  renderLj() {
    LijueTool.render(this.contentEl);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
