(() => {
  "use strict";

  // 1) Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2) Mobile menu toggle
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const mobilePanel = document.querySelector("[data-mobile-panel]");

  const closeMobilePanel = () => {
    if (!mobilePanel) return;
    mobilePanel.hidden = true;
    menuBtn?.setAttribute("aria-expanded", "false");
  };

  const toggleMobilePanel = () => {
    if (!mobilePanel) return;
    const willOpen = mobilePanel.hidden === true;
    mobilePanel.hidden = !willOpen;
    menuBtn?.setAttribute("aria-expanded", willOpen ? "true" : "false");
  };

  if (menuBtn && mobilePanel) {
    menuBtn.addEventListener("click", toggleMobilePanel);

    // ปิดเมนูเมื่อคลิกลิงก์ในเมนูมือถือ
    mobilePanel.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches && target.matches("a")) closeMobilePanel();
    });

    // ปิดเมนูเมื่อกด ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobilePanel();
    });

    // ปิดเมนูเมื่อคลิกนอกพื้นที่
    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!t) return;
      const clickedInside =
        mobilePanel.contains(t) || menuBtn.contains(t);
      if (!clickedInside) closeMobilePanel();
    });
  }

  // 3) Active nav highlight (ใช้ href เทียบกับชื่อไฟล์ปัจจุบัน)
  const currentFile = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === currentFile) a.classList.add("active");
  });

  // 4) Timeline interaction (history.html)
  const detailTitle = document.querySelector("[data-detail-title]");
  const detailText = document.querySelector("[data-detail-text]");
  const events = document.querySelectorAll("[data-t-event]");

  const selectEvent = (el) => {
    if (!el || !detailTitle || !detailText) return;
    events.forEach((x) => x.classList.remove("active"));
    el.classList.add("active");
    detailTitle.textContent = el.getAttribute("data-title") || "ช่วงเวลาที่เลือก";
    detailText.textContent =
      el.getAttribute("data-detail") || "ไม่มีรายละเอียดเพิ่มเติม";
  };

  if (events.length && detailTitle && detailText) {
    events.forEach((ev) => {
      ev.addEventListener("click", () => selectEvent(ev));
      ev.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectEvent(ev);
        }
      });
    });

    // เลือกอันแรกอัตโนมัติ (ถ้าต้องการ)
    selectEvent(events[0]);
  }
})();
