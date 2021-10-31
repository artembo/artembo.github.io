---
title: "OOM Killer в Linux"
---

Out-of-memory Killer - это механизм ядра Linux, который убивает процесс, имеющий
худший (самый большой) oom_score. OOM Killer запускается при записи любой программы
в выделенную область витруальной памяти, при отсутствии свободной физической памяти.

Посмотреть oom_score процесса:
```bash
cat /proc/<PID>/oom_score
```

Настроить oom_score процесса:
```bash
echo +100 > /proc/<PID>/oom_score_adj
echo -10000 > /proc/<PID>/oom_score_adj
```

Оключить OOM Killer:
```bash
echo 1 > /proc/sys/vm/panic_on_oom
```

OOM Killer может удалить процесс не с максимальным потреблением памяти.
Чтобы удалять только процессы, которые вызывают OOM, нужно изменить соответствующую
настройку:
```bash
echo 1 > /proc/sys/vm/oom_kill_allocating_task
```

Запустить OOM Killer принудительно:
```bash
echo f > /proc/sysrq-trigger
```
При этом oom killer убъет процесс с худшим oom_score не зависимо от oom_kill_allocating_task.
