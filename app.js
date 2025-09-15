document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  if (!intro) return;

  const DURATION = 3000;

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
    if (t1) clearTimeout(t1);
    if (t2) clearTimeout(t2);

    intro.setAttribute('aria-hidden', 'true');
    intro.style.pointerEvents = 'none';

 
    void intro.offsetWidth;

    intro.classList.add('hidden');

    const removeAfterTransition = (/*e*/) => {
      intro.removeEventListener('transitionend', removeAfterTransition);
      hardRemove();
    };

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

  document.documentElement.style.overflow = 'hidden';

  s
  t1 = setTimeout(finish, DURATION);
  t2 = setTimeout(finish, MAX_WAIT);
  
  let start = performance.now();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      const elapsed = performance.now() - start;
      if (elapsed >= DURATION) finish();
    }
  }, { passive: true });
});

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  if (!intro) return;

  document.documentElement.style.overflow = 'hidden';

  setTimeout(() => {
    intro.classList.add('hidden');
    setTimeout(() => {
      if (intro.parentNode) intro.parentNode.removeChild(intro);
      document.documentElement.style.overflow = '';
    }, 700);
  }, 3000);
});

