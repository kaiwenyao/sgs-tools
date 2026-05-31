const SxyTool = {
  selectedScrolls: [],
  selectedOption: null,

  scrollList: [
    { id: 1, name: '顺手牵羊' },
    { id: 2, name: '过河拆桥' },
    { id: 3, name: '五谷丰登' },
    { id: 4, name: '无中生有' },
    { id: 5, name: '决斗' },
    { id: 6, name: '南蛮入侵' },
    { id: 7, name: '万箭齐发' },
    { id: 8, name: '闪电' },
    { id: 9, name: '桃园结义' },
    { id: 10, name: '无懈可击' },
    { id: 11, name: '借刀杀人' },
    { id: 12, name: '乐不思蜀' },
    { id: 13, name: '兵粮寸断' },
    { id: 14, name: '铁索连环' },
    { id: 15, name: '火攻' }
  ],

  optionList: [
    { id: 1, name: '奇兵', description: '偏向先手压制' },
    { id: 2, name: '正兵', description: '偏向稳健应对' }
  ],

  render(container) {
    this.bindEvents = this.bindEvents.bind(this);
    this.toggleScroll = this.toggleScroll.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.clearAll = this.clearAll.bind(this);

    container.innerHTML = `
      <button class="back-btn" onclick="App.navigate('/tools')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        返回工具列表
      </button>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <div>
            <h2>神荀彧判定</h2>
            <p style="margin-top: 6px;">先勾选场上锦囊，再选择奇兵或正兵。</p>
          </div>
          <button class="btn btn-secondary btn-small" id="sxy-clear" ${this.selectedScrolls.length === 0 && this.selectedOption === null ? 'disabled' : ''}>清空</button>
        </div>
        <div class="chip-list">
          <span class="chip" style="color: var(--primary); border-color: var(--primary);">已选锦囊 ${this.selectedScrolls.length}</span>
          <span class="chip">当前应对：${this.getSelectedOptionLabel()}</span>
        </div>
      </div>

      <div class="card">
        <div class="section-title">
          <h3>锦囊列表</h3>
          <span class="chip">${this.scrollList.length} 项</span>
        </div>
        <div class="scroll-grid">
          ${this.scrollList.map(item => `
            <button class="scroll-btn ${this.selectedScrolls.includes(item.id) ? 'active' : ''}" data-id="${item.id}">
              ${item.name}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom: 10px;">应对方式</h3>
        <div class="option-grid">
          ${this.optionList.map(item => `
            <button class="option-btn ${item.id === this.selectedOption ? 'active' : ''}" data-id="${item.id}">
              <span class="option-name">${item.name}</span>
              <span class="option-desc">${item.description}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <p style="color: var(--text-secondary); line-height: 1.65;">
          已选锦囊：${this.getSelectedScrollText()}
        </p>
      </div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    document.getElementById('sxy-clear')?.addEventListener('click', () => this.clearAll());

    document.querySelectorAll('.scroll-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        this.toggleScroll(id);
      });
    });

    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        this.selectOption(id);
      });
    });
  },

  toggleScroll(id) {
    if (this.selectedScrolls.includes(id)) {
      this.selectedScrolls = this.selectedScrolls.filter(i => i !== id);
    } else {
      this.selectedScrolls.push(id);
    }
    this.refresh();
  },

  selectOption(id) {
    this.selectedOption = id;
    this.refresh();
  },

  clearAll() {
    this.selectedScrolls = [];
    this.selectedOption = null;
    this.refresh();
  },

  refresh() {
    const content = document.getElementById('content');
    this.render(content);
  },

  getSelectedScrollText() {
    if (this.selectedScrolls.length === 0) {
      return '当前未选择锦囊。';
    }
    return this.scrollList
      .filter(item => this.selectedScrolls.includes(item.id))
      .map(item => item.name)
      .join('、');
  },

  getSelectedOptionLabel() {
    return this.optionList.find(item => item.id === this.selectedOption)?.name ?? '未选择';
  }
};
