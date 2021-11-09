---
title: "Cgroups"
---

Cgroups или Control Groups — это механизм ограничения ресурсов ОС для процесса(ов).

Посмотреть доступные подсистемы для конфигурации:
```bash
ls /sys/fs/cgroup/
```

Для работы с cgexec нужен пакет cgroup-tools. Запустить процесс в выбранной контрольной группе:
```bash
cgexec -g <subsystem:group_name> <command>
```

Например, ограничим потребление памяти для gunicorn до 300 мегабайт:
```bash
mkdir /sys/fs/cgroup/memory/group0
echo 300M > /sys/fs/cgroup/memory/group0/memory.limit_in_bytes
cgexec -g memory:group0 gunicorn -b 0.0.0.0 app:app
```
