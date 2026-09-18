/* ===================================================
   common.js - 共通JavaScript（ハンバーガー・メニュー・アコーディオン統合版）
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. モバイルハンバーガーメニュー制御（全画面モーダル＆✕ボタン対応）
  --------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebar = document.getElementById('sidebar');
  const navLinks = document.querySelectorAll('.nav-menu a');

  // ☰ ボタンで開く
  if (hamburgerBtn && sidebar) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
    });
  }

  // ✕ ボタンで閉じる
  if (sidebarCloseBtn && sidebar) {
    sidebarCloseBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  }

  // 全画面背景部分をタップしても閉じる処理
  if (sidebar) {
    sidebar.addEventListener('click', (e) => {
      if (e.target === sidebar) {
        sidebar.classList.remove('active');
      }
    });
  }

  // メニュー項目をタップしたら自動で閉じる
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.remove('active');
      }
    });
  });

  /* ---------------------------------------------------
     2. ナビゲーション active クラス自動判定
  --------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ---------------------------------------------------
     3. アコーディオン共通制御（ヘッダータップ時のトグル）
  --------------------------------------------------- */
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const section = header.closest('.accordion-section');
      if (section) {
        section.classList.toggle('is-open');
      }
    });
  });

  /* ---------------------------------------------------
     4. 「説明をたたむ」ボタン制御（PC/スマホでスクロール位置を最適化）
  --------------------------------------------------- */
  const aboutCloseBtn = document.getElementById('aboutAccordionCloseBtn');

  if (aboutCloseBtn) {
    aboutCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      const section = aboutCloseBtn.closest('.accordion-section');
      if (section) {
        section.classList.remove('is-open');

        const isMobile = window.innerWidth <= 768;
        const mobileHeader = document.querySelector('.mobile-header');
        
        let offset = 20;

        if (isMobile) {
          const headerHeight = mobileHeader ? mobileHeader.offsetHeight : 60;
          offset = headerHeight + 20;
        }

        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

});