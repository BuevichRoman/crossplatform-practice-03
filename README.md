# crossplatform-practice-03

**Дисциплина:** Кросс-платформенная разработка
**Работа:** Практическая работа №3 «Практикум работы с фреймворком Electron»
**Студент:** Буевич Р. Р., группа ТРПО23-1
**Вариант:** 2 — панель «Информация о системе» (os.platform, os.arch, os.cpus, os.totalmem)

## Запуск

```bash
npm install
npm start        # запуск приложения
npm run dist     # сборка дистрибутива под текущую ОС (папка dist/)
```

## Файлы

- `main.js` — главный процесс: окно, обработчики IPC `list-dir` и `system-info`
- `preload.js` — безопасный мост `window.api` через `contextBridge`
- `renderer.js`, `index.html`, `styles.css` — интерфейс
- `report/` — отчёт
