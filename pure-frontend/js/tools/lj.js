const LijueTool = {
  values: { partA: '', partB: '', partC: '' },
  result: null,
  visible: false,
  hideTimer: null,

  presets: [
    { label: '均衡', values: { partA: '34', partB: '33', partC: '33' } },
    { label: '稳健', values: { partA: '50', partB: '30', partC: '20' } },
    { label: '激进', values: { partA: '20', partB: '20', partC: '60' } }
  ],

  resultLabels: ['羊袭', '狗袭', '狼袭'],

  render(container) {
    const numA = this.parseWeight(this.values.partA);
    const numB = this.parseWeight(this.values.partB);
    const numC = this.parseWeight(this.values.partC);
    const currentSum = numA + numB + numC;
    const isAllFilled = this.values.partA !== '' && this.values.partB !== '' && this.values.partC !== '';
    const isValid = isAllFilled && currentSum === 100;
    const diff = 100 - currentSum;

    container.innerHTML = `
      <button class="back-btn" onclick="App.navigate('/tools')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        返回工具列表
      </button>

      <div class="card">
        <h2>李傕概率判定</h2>
        <p style="margin-top: 6px;">输入三个结果概率（总和需为 100），再执行随机判定。</p>
        <div class="preset-list">
          ${this.presets.map(p => `
            <button class="btn btn-secondary btn-small lj-preset" data-preset='${JSON.stringify(p.values)}'>${p.label}</button>
          `).join('')}
          <button class="btn btn-text btn-small lj-clear">清空</button>
        </div>
      </div>

      <div class="card">
        <div class="input-group">
          <input type="number" class="text-field ${currentSum > 100 ? 'error' : ''}" 
            placeholder="0 伤害 - 羊袭 (%)" 
            value="${this.values.partA}" 
            data-key="partA"
            min="0" max="100" step="0.01"
            inputmode="decimal">
          
          <input type="number" class="text-field ${currentSum > 100 ? 'error' : ''}" 
            placeholder="1 伤害 - 狗袭 (%)" 
            value="${this.values.partB}" 
            data-key="partB"
            min="0" max="100" step="0.01"
            inputmode="decimal">
          
          <input type="number" class="text-field ${currentSum > 100 ? 'error' : ''}" 
            placeholder="2 伤害 - 狼袭 (%)" 
            value="${this.values.partC}" 
            data-key="partC"
            min="0" max="100" step="0.01"
            inputmode="decimal">

          ${isValid 
            ? '<div class="alert alert-success">总和为 100%，可以开始判定。</div>'
            : `<div class="alert ${currentSum > 100 ? 'alert-error' : 'alert-warning'}">
                当前总和: <strong>${currentSum}%</strong>
                ${!isAllFilled ? '（请先填完三个输入项）' : ''}
                ${isAllFilled && currentSum < 100 ? `（还差 ${diff}%）` : ''}
                ${isAllFilled && currentSum > 100 ? `（超出 ${Math.abs(diff)}%）` : ''}
              </div>`
          }

          <div>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;">概率分布</p>
            <div class="prob-bar" role="img" aria-label="当前三段概率分布">
              <div class="prob-segment" style="width: ${numA}%; min-width: ${numA > 0 ? '6px' : '0'}; background: #0F766E;"></div>
              <div class="prob-segment" style="width: ${numB}%; min-width: ${numB > 0 ? '6px' : '0'}; background: #B45309;"></div>
              <div class="prob-segment" style="width: ${numC}%; min-width: ${numC > 0 ? '6px' : '0'}; background: #64748B;"></div>
            </div>
            <div class="prob-labels">
              <span class="prob-label">羊袭 ${numA}%</span>
              <span class="prob-label">狗袭 ${numB}%</span>
              <span class="prob-label">狼袭 ${numC}%</span>
            </div>
          </div>

          <button class="btn btn-primary btn-full lj-generate" ${!isValid ? 'disabled' : ''}>
            执行随机判定
          </button>
        </div>
      </div>

      ${this.visible && this.result ? `
        <div class="card result-card">
          <div class="result-content">
            <span class="result-label">本次结果</span>
            <div class="result-value">${this.result}</div>
          </div>
        </div>
      ` : ''}
    `;

    this.bindEvents();
  },

  bindEvents() {
    document.querySelectorAll('.lj-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = JSON.parse(btn.dataset.preset);
        this.values = { ...preset };
        this.refresh();
      });
    });

    document.querySelector('.lj-clear')?.addEventListener('click', () => {
      this.values = { partA: '', partB: '', partC: '' };
      this.result = null;
      this.visible = false;
      this.refresh();
    });

    document.querySelectorAll('.text-field').forEach(input => {
      input.addEventListener('input', (e) => {
        const key = e.target.dataset.key;
        const value = e.target.value;
        
        if (value === '' || /^\d{0,3}(\.\d{0,2})?$/.test(value)) {
          this.values[key] = value;
          this.refresh();
        }
      });
    });

    document.querySelector('.lj-generate')?.addEventListener('click', () => {
      this.generate();
    });
  },

  parseWeight(value) {
    const parsed = parseFloat(value);
    if (!isFinite(parsed) || parsed < 0) return 0;
    return Math.min(parsed, 100);
  },

  generate() {
    const numA = this.parseWeight(this.values.partA);
    const numB = this.parseWeight(this.values.partB);
    const numC = this.parseWeight(this.values.partC);

    const randomVal = Math.random() * 100;
    let finalResult;

    if (randomVal < numA) {
      finalResult = 0;
    } else if (randomVal < numA + numB) {
      finalResult = 1;
    } else {
      finalResult = 2;
    }

    this.result = this.resultLabels[finalResult];
    this.visible = true;
    this.refresh();

    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.visible = false;
      this.refresh();
    }, 2200);
  },

  refresh() {
    const content = document.getElementById('content');
    this.render(content);
  }
};
