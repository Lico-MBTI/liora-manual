/* ===================================================
   common.js - 共通JavaScript（ハンバーガー・モーダル・アコーディオン統合版）
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
     2. リオラ Official Links モーダル開閉制御
  --------------------------------------------------- */
  const profileCardBtn = document.getElementById('profileCardBtn');
  const modalOverlay = document.getElementById('lioraModalOverlay');
  const modalCloseBtn = document.getElementById('lioraModalCloseBtn');

  if (profileCardBtn && modalOverlay) {
    // モーダルを開く処理
    profileCardBtn.addEventListener('click', () => {
      // スマホのハンバーガーメニューが開いている場合は閉じる
      if (sidebar) {
        sidebar.classList.remove('active');
      }
      modalOverlay.classList.add('is-open');
      modalOverlay.setAttribute('aria-hidden', 'false');
    });

    // 閉じる（✕ボタン）
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('is-open');
        modalOverlay.setAttribute('aria-hidden', 'true');
      });
    }

    // 閉じる（背景オーバーレイタップ）
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('is-open');
        modalOverlay.setAttribute('aria-hidden', 'true');
      }
    });

    // 閉じる（Escキーを押したとき）
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
        modalOverlay.classList.remove('is-open');
        modalOverlay.setAttribute('aria-hidden', 'true');
      }
    });
  }

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
     4. 「説明をたたむ」ボタン制御
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
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollPosition > targetPosition) {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }
});