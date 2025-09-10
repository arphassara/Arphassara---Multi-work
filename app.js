// Intro: แสดง Bubble Reveal ~3s แล้วถอดจาก DOM (มี fallback/escape)
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  if (!intro) return;

  const DURATION = 3000;  // ระยะเวลาที่อยากให้แสดง (ms)

  let finished = false;
  let t1 = null, t2 = null;

  const restoreScroll = () => {
    // เคยปิดไว้ตอนโชว์ intro
    document.documentElement.style.overflow = '';
  };

  const hardRemove = () => {
    try {
      if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
    } finally {
      restoreScroll();
    }
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    // ล้าง timer กันยิงซ้ำ
    if (t1) clearTimeout(t1);
    if (t2) clearTimeout(t2);

    // ซ่อนแบบมีทรานซิชัน + ปิดการคลิกทันที
    intro.setAttribute('aria-hidden', 'true');
    intro.style.pointerEvents = 'none';

    // บังคับ reflow เพื่อให้ transition ทำงานชัวร์
    // (ถ้า CSS มี .hidden { opacity:0; transition:opacity .7s; } )
    void intro.offsetWidth;

    intro.classList.add('hidden');

    const removeAfterTransition = (/*e*/) => {
      intro.removeEventListener('transitionend', removeAfterTransition);
      hardRemove();
    };

    // ถ้าไฟล์ CSS มี transition ให้รอ transitionend, ถ้าไม่มีก็ fallback 700ms
    let transitioned = false;
    const transitionTimeout = setTimeout(() => {
      if (!transitioned) hardRemove();
    }, 700);

    intro.addEventListener('transitionend', () => {
      transitioned = true;
      clearTimeout(transitionTimeout);
      removeAfterTransition();
    });
  };

  // ระหว่างโชว์ intro ปิดสกรอลล์ไว้
  document.documentElement.style.overflow = 'hidden';

  s
  // ตั้งเวลาปกติ + กันพลาดสุดท้าย
  t1 = setTimeout(finish, DURATION);
  t2 = setTimeout(finish, MAX_WAIT);

  // ถ้าแท็บกลับมาโฟกัสแล้วเลยเวลา DURATION ไปมาก ให้ปิดทันที
  let start = performance.now();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      const elapsed = performance.now() - start;
      if (elapsed >= DURATION) finish();
    }
  }, { passive: true });
});
/* Intro script */
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  if (!intro) return;

  document.documentElement.style.overflow = 'hidden';

  setTimeout(() => {
    intro.classList.add('hidden');
    setTimeout(() => {
      if (intro.parentNode) intro.parentNode.removeChild(intro);
      document.documentElement.style.overflow = '';
    }, 700); // ให้ตรงกับ transition CSS
  }, 3000);
});
