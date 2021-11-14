---
title: "Мониторинг нагрузки на жесткие диски в Linux"
---

Есть несколько способов получить информацию о жестких дисках в Linux.

`fdisk -l` — показывает информацию о физических дисках и разделах

```bash
Disk /dev/vda: 20 GiB, 21474836480 bytes, 41943040 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x3f334b8e

Device     Boot Start      End  Sectors Size Id Type
/dev/vda1  *     2048 41943006 41940959  20G 83 Linux
```

`lshw -c disk` — с помощью lshw можно получить данные о всех устройствах,
в удобном структурированном формате. Список классов устройств есть в
документации к [lshw](https://ezix.org/project/wiki/HardwareLiSter#Deviceclasses).

```bash
  *-virtio2
       description: Virtual I/O device
       physical id: 0
       bus info: virtio@2
       logical name: /dev/vda
       size: 20GiB (21GB)
       capabilities: partitioned partitioned:dos
       configuration: driver=virtio_blk logicalsectorsize=512 sectorsize=512 signature=3f334b8e
```

`lsblk` — информация о жестких дисках, разделах и точках монтирования

```bash
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
vda    252:0    0   20G  0 disk
`-vda1 252:1    0   20G  0 part /
```

`iostat` из пакета `sysstat`
`iostat -d vda -x` — данные по нагрузке на жесткий диск

```bash
Linux 4.18.0-305.7.1.el8_4.x86_64 (centos-basic-1-1-20gb.novalocal)   11/13/2021  _x86_64_  (1 CPU)

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
vda              0.01    0.26      0.15      3.86     0.00     0.24   1.07  47.82   18.75    4.66   0.00    19.71    15.01   2.84   0.08
```

`fio` — Flexibli I/O tester
`fio --cmdhelp` — вывод списка доступных параметров. Их можно задать в
параметрах при запуске `fio` или в job-файле. `fio test.job`

Пример job–файла:

```
[global]
bs=4k
iodepth=128
latency_target=0.25
runtime=5
rw=randread
random_generator=lfsr
direct=1
ioengine=libaio
# 99.9% of IOs must be below the target
latency_percentile=99.9

[device]
filename=/dev/vdb
```

## Мониторинг нагрузки I/O

`iotop` — "top" для процессов с данными по операциям i/o.

```bash
Total DISK READ :       0.00 B/s | Total DISK WRITE :    1603.26 M/s
Actual DISK READ:       0.00 B/s | Actual DISK WRITE:    1603.26 M/s
  TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND
 3865 be/4 root        0.00 B/s 1603.26 M/s  0.00 % 80.56 % fio new-fio.job
    1 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % init
    2 be/4 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [kthreadd]
    4 be/0 root        0.00 B/s    0.00 B/s  0.00 %  0.00 % [kworker/0:0H]
    ...
```
