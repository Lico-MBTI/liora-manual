/* ===================================================
   functions.js - システム構造（8つの心理機能UI）専用
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const soContainer = document.getElementById('soContainer');
  const soPlateList = document.getElementById('soPlateList');
  const soSwitchBtn = document.getElementById('soSwitchBtn');
  const soBtnText = document.getElementById('soBtnText');

  const soChipIcon = document.getElementById('soChipIcon');
  const soChipCategory = document.getElementById('soChipCategory');
  const soChipTitle = document.getElementById('soChipTitle');
  const soChipDesc = document.getElementById('soChipDesc');

  if (!soPlateList) return; // 該当要素がないページではスキップ

  // データ定義（表・裏）
  const frontFunctions = [
    { key: 'ne', code: '主機能', name: 'Ne 外向的直観', title: '外向的直観', level: 'Lv.MAX（常時フル稼働）', percent: '100%', desc: 'わずかな会話から無限のアイデアと可能性を爆発させるメインエンジン。予測不能で高速なトーク展開を生み出す思考ドライブ。' },
    { key: 'ti', code: '補助機能', name: 'Ti 内向的論理', title: '内向的論理', level: 'Lv.5（高度最適化）', percent: '85%', desc: '散らばる情報や矛盾を瞬時に解剖・構造化し、冷徹かつ正確に言語化する分析エンジン。' },
    { key: 'fe', code: '第三機能', name: 'Fe 外向的情感', title: '外向的情感', level: 'Lv.3（エンタメ制御）', percent: '50%', desc: '毒舌や煽りに見えて、実は「場の空気」やリスナーの反応を冷徹に計算し、エンタメとして成立させるバランスリミッター。' },
    { key: 'si', code: '劣等機能', name: 'Si 内向的感覚', title: '内向的感覚', level: 'Lv.1（苦手・暴走注意）', percent: '15%', desc: '同じ展開の繰り返しや形式的なルーティンを極度に嫌う。変化のない環境下では著しくエネルギーを消費する脆弱性。' }
  ];

  const shadowFunctions = [
    { key: 'ni', code: '第5機能', name: 'Ni 内向的直観', title: '内向的直観', level: 'Lv.4（超感度センサー）', percent: '70%', desc: '相手の隠された意図やロジックの破綻を一瞬で検出する「潜在スキャン」。表面上の誤魔化しは一切通用しない。' },
    { key: 'te', code: '第6機能', name: 'Te 外向的論理', title: '外向的論理', level: 'Lv.4（潜在火力高）', percent: '75%', desc: '議論が噛み合わない時、圧倒的な実績と数字の暴力で相手をぐうの音も出なくさせる無意識の鎮圧火力。' },
    { key: 'fi', code: '第7機能', name: 'Fi 内向的情感', title: '内向的情感', level: 'Lv.0（盲点・不可視）', percent: '0%', desc: '【弱点】自分や他人の「個人的な感情論」の取り扱い不全。ロジックのないお気持ちで詰められるとフリーズする。' },
    { key: 'se', code: '第8機能', name: 'Se 外向的感覚', title: '外向的感覚', level: 'Lv.2（緊急時暴走）', percent: '30%', desc: '【限界突破】極限状態においてすべての理論計算を破棄し、目の前の現実に対して破天荒な行動に突入する隠し仕様。' }
  ];

  let isShadowMode = false;

  // プレート生成関数
  function renderPlates(dataList) {
    soPlateList.innerHTML = '';
    dataList.forEach((item, index) => {
      const plate = document.createElement('div');
      plate.className = `so-plate ${index === 0 ? 'active' : ''}`;
      plate.innerHTML = `
        <div class="so-plate-main">
          <span class="so-plate-code">${item.code}</span>
          <span class="so-plate-name">${item.name}</span>
        </div>
        <span style="color: rgba(255,255,255,0.4); font-size: 0.8rem;">➔</span>
      `;

      plate.addEventListener('click', () => {
        document.querySelectorAll('.so-plate').forEach(p => p.classList.remove('active'));
        plate.classList.add('active');
        updateDetail(item);
		  
		// ▼ スマホの横スライドパレット時に、選択したチップへ自動スクロールする処理を追加
        if (window.innerWidth <= 768) {
          plate.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });

      soPlateList.appendChild(plate);
    });

    // 初期選択（1件目）
    updateDetail(dataList[0]);
  }

// 詳細パネルの更新（ふわっとフェード ＋ ゲージ伸長連動版）
  function updateDetail(item) {
    const detailPanel = document.getElementById('soDetailPanel');
    const valEl = document.querySelector('.so-status-val');
    const barEl = document.querySelector('.so-status-bar i');

    if (!detailPanel || !soChipIcon) return;

    // 1. まずパネルをふわっと消す
    detailPanel.classList.add('is-changing');

    // 2. パネルが消え切るタイミング（200ms後）で中身を更新＆ゲージを0%にセット
    setTimeout(() => {
      // テキスト・情報の更新
	soChipIcon.textContent = item.key.charAt(0).toUpperCase() + item.key.slice(1).toLowerCase();     
	soChipCategory.textContent = item.code; // 「主機能」「補助機能」等のみをすっきり表示

// 見出し（<h2 class="section-title">）も裏表の切り替えと連動させる場合:
const modeTitleEl = document.querySelector('.manual-section .section-title');
if (modeTitleEl) {
  modeTitleEl.textContent = isShadowMode ? '隠し性能（無意識機能）' : '基本性能（意識機能）';
}
      soChipTitle.textContent = item.title;
      soChipDesc.textContent = item.desc;
      if (valEl) valEl.textContent = item.level;

      // 見えない状態でゲージを0%にセット
      if (barEl) {
        barEl.style.transition = 'none'; // リセット時はアニメーションを切る
        barEl.style.width = '0%';
      }

      // 3. パネルをふわっと表示させる
      detailPanel.classList.remove('is-changing');

      // 4. パネルが表示されてからゲージを伸び始めさせる
      setTimeout(() => {
        if (barEl) {
          barEl.style.transition = 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'; // アニメーション復活
          barEl.style.width = item.percent;
        }
      }, 100);

    }, 200);
  }

// 表・裏モード切替
  if (soSwitchBtn) {
    soSwitchBtn.addEventListener('click', () => {
      isShadowMode = !isShadowMode;
      
      if (isShadowMode) {
        soContainer.classList.add('is-shadow');
        if (soBtnText) soBtnText.textContent = '〈〈　基本性能（意識機能）';
        renderPlates(shadowFunctions);
      } else {
        soContainer.classList.remove('is-shadow');
        if (soBtnText) soBtnText.textContent = '隠し性能（無意識機能） 〉〉';
        renderPlates(frontFunctions);
      }

      // ★ スマホ表示時（768px以下）のみ、見出しの位置へスムーズスクロール
      if (window.innerWidth <= 768) {
        const modeTitleEl = document.querySelector('.manual-section .section-title');
        if (modeTitleEl) {
          // 固定ヘッダー（約60px）の被りを考慮して少し余裕を持って位置調整
          const headerOffset = 70;
          const elementPosition = modeTitleEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }
  // 初期実行
  renderPlates(frontFunctions);
	
});