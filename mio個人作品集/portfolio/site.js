const menuButton = document.querySelector('#menuButton');
const mainNav = document.querySelector('#mainNav');

menuButton?.addEventListener('click', () => {
  const opened = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.innerHTML = opened ? '關閉 <span aria-hidden="true">×</span>' : '選單 <span aria-hidden="true">☰</span>';
});

mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.innerHTML = '選單 <span aria-hidden="true">☰</span>';
}));

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#inquiryForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const fields = event.currentTarget.elements;
  const message = [
    'Mio，你好：',
    `我是 ${fields.visitorName.value.trim()}。`,
    `合作方向：${fields.topic.value}`,
    `想做的事：${fields.message.value.trim()}`,
  ].join('\n');

  document.querySelector('#summary').value = message;
  document.querySelector('#inquiryResult').hidden = false;
  document.querySelector('#copyStatus').textContent = '';
  document.querySelector('#inquiryResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.querySelector('#copyMessage')?.addEventListener('click', async () => {
  const summary = document.querySelector('#summary');
  try {
    await navigator.clipboard.writeText(summary.value);
    document.querySelector('#copyStatus').textContent = '已複製';
  } catch {
    summary.select();
    document.querySelector('#copyStatus').textContent = '已選取文字，請手動複製';
  }
});
