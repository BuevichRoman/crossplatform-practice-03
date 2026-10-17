const list = document.getElementById('list');
const info = document.getElementById('info');

document.getElementById('show').addEventListener('click', async () => {
  const entries = await window.api.listDir('.');
  list.innerHTML = '';
  entries
    .sort((a, b) => b.isDir - a.isDir || a.name.localeCompare(b.name))
    .forEach(e => {
      const li = document.createElement('li');
      li.textContent = (e.isDir ? '📁 ' : '📄 ') + e.name;
      if (e.isDir) li.className = 'dir';
      list.appendChild(li);
    });
});

document.getElementById('sysinfo').addEventListener('click', async () => {
  const s = await window.api.systemInfo();
  info.innerHTML = `
    <tr><th>Платформа</th><td>${s.platform}</td></tr>
    <tr><th>Архитектура</th><td>${s.arch}</td></tr>
    <tr><th>Ядер процессора</th><td>${s.cpus} (${s.cpuModel})</td></tr>
    <tr><th>Оперативная память</th><td>${s.totalMemGb} ГБ</td></tr>`;
});
