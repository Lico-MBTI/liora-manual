/* ===================================================
   main.js - 共通JavaScript（ハンバーガー・アコーディオン・サイドオーダーUI）
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. ハンバーガーメニュー制御 ---
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar = document.getElementById('sidebar');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (hamburgerBtn && sidebar) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.remove('active');
      }
    });
  });

  // --- 2. 全セクション アコーディオン開閉制御 ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const section = header.closest('.accordion-section');
      if (section) {
        section.classList.toggle('is-open');
      }
    });
  });

  // --- 3. サイド・オーダー風 心理機能UI制御 ---
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
    { key: 'ne', code: '主機能', name: 'Ne 外向的直観', title: '外向的直観', level: 'Lv.MAX（完全掌握）', percent: '100%', desc: '会話の端々から無限のネタや可能性を打ち上げるメインエンジン。予測不能でスピーディーなトーク展開の源泉。' },
    { key: 'ti', code: '補助機能', name: 'Ti 内向的論理', title: '内向的論理', level: 'Lv.5（熟練）', percent: '85%', desc: 'Neで広げた膨大なアイデアや状況を一瞬で構造化し、冷徹かつ正確に言語化・分析する思考回路。' },
    { key: 'fe', code: '第三機能', name: 'Fe 外向的情感', title: '外向的情感', level: 'Lv.3（調整可能）', percent: '50%', desc: '毒舌や煽りに見えて、実はプロレスが成立する「場の空気」やリスナーの反応を巧みに計算して出力するエンタメ調整弁。' },
    { key: 'si', code: '劣等機能', name: 'Si 内向的感覚', title: '内向的感覚', level: 'Lv.1（苦手・暴走注意）', percent: '15%', desc: '同じ展開の繰り返しや過去の形式的な縛りを極度に嫌う。変化のない環境では急激にエネルギーを消費する。' }
  ];

  const shadowFunctions = [
    { key: 'ni', code: '第5機能', name: 'Ni 内向的直観', title: '内向的直観', level: 'Lv.4（無意識の鋭さ）', percent: '70%', desc: '相手の隠された意図や誤魔化しを感性的に一瞬で見抜く「陰の確信」。ストレートな誤魔化しは通用しない。' },
    { key: 'te', code: '第6機能', name: 'Te 外向的論理', title: '外向的論理', level: 'Lv.4（潜在火力高）', percent: '75%', desc: '議論が噛み合わない時、圧倒的な結果・事実・実績を提示して場の議論を強制終了させる無意識の力。' },
    { key: 'fi', code: '第7機能', name: 'Fi 内向的情感', title: '内向的情感', level: 'Lv.0（盲点・不可視）', percent: '0%', desc: '【弱点】個人的なお気持ちや感情論の処理不全。「自分がどう感じたか」で詰められると処理エラーを起こす。' },
    { key: 'se', code: '第8機能', name: 'Se 外向的感覚', title: '外向的感覚', level: 'Lv.2（緊急時暴走）', percent: '30%', desc: '【破滅衝動】極度のストレスや土壇場において、すべての計算を投げ打って破天荒な行動に走る隠し仕様。' }
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
      });

      soPlateList.appendChild(plate);
    });

    // 初期選択（1件目）
    updateDetail(dataList[0]);
  }

  // 詳細パネルの更新
  function updateDetail(item) {
    if (!soChipIcon) return;
    soChipIcon.textContent = item.key.toUpperCase();
    soChipCategory.textContent = `${item.code} / ${isShadowMode ? '無意識・影' : '意識機能'}`;
    soChipTitle.textContent = item.title;
    soChipDesc.textContent = item.desc;

    // ステータスレベルテキスト＆メーターバーの連動更新
    const valEl = document.querySelector('.so-status-val');
    const barEl = document.querySelector('.so-status-bar i');

    if (valEl) valEl.textContent = item.level;
    if (barEl) barEl.style.width = item.percent;
  }

  // 表・裏モード切替
  if (soSwitchBtn) {
    soSwitchBtn.addEventListener('click', () => {
      isShadowMode = !isShadowMode;
      
      if (isShadowMode) {
        soContainer.classList.add('is-shadow');
        if (soBtnText) soBtnText.textContent = '↵ 表スペック';
        renderPlates(shadowFunctions);
      } else {
        soContainer.classList.remove('is-shadow');
        if (soBtnText) soBtnText.textContent = '裏スペック ➔';
        renderPlates(frontFunctions);
      }
    });
  }

  // 初期実行
  renderPlates(frontFunctions);
});