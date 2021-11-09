---
title: "Как увеличить размер диска на виртуалке Ubuntu"
---

Ага, на жестком диске на машине в облаке закончилось место.
В панели управления увеличил размер, но ничего не поменялось и очень грустно?

Не беда! Размер раздела в легко поменять на самом деле.
Рассмотрим на примере Ubuntu 18.04. Рассмотрим на примере:
диск был увеличен с 50GB до 200GB.

Внимение! Сначала надо сделать бэкап! Да и команды ниже я написал для себя,
не повторяйте дома, в проде, нигде не повторяйте!

Нам понадобится:
```bash
sudo apt-get install -y gparted
```

1. Посмотрим разделы в `fdisk`
```sh
ubuntu@foobar:~$ sudo fdisk -l
GPT PMBR size mismatch (104857599 != 419430399) will be corrected by w(rite).
Disk /dev/vda: 200 GiB, 214748364800 bytes, 419430400 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 0E34F2CF-E596-4CC5-A048-72442450EF39

Device      Start       End   Sectors  Size Type
/dev/vda1  227328 104857566 104630239 49.9G Linux filesystem
/dev/vda14   2048     10239      8192    4M BIOS boot
/dev/vda15  10240    227327    217088  106M EFI System

Partition table entries are not in disk order.
```
Видим, что раздел `/dev/vda1` 49.9G, а диск `/dev/vda` имеет
размер 200G — страшно.

Запустим parted, натравив на него жесткий диск
(Disk из вывода команды `fdisk`), в нашем случае — `/dev/vda`.
```sh
ubuntu@foobar:~$ sudo parted /dev/vda
GNU Parted 3.2
Using /dev/vda
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted) print
Warning: Not all of the space available to /dev/vda appears to be used, you can fix the GPT to use all of the space (an extra 314572800 blocks) or continue with
the current setting?
Fix/Ignore? Fix
Model: Virtio Block Device (virtblk)
Disk /dev/vda: 215GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name  Flags
14      1049kB  5243kB  4194kB                     bios_grub
15      5243kB  116MB   111MB   fat32              boot, esp
 1      116MB   53.7GB  53.6GB  ext4

(parted) resizepart
Partition number? 1
Warning: Partition /dev/vda1 is being used. Are you sure you want to continue?
Yes/No? yes
End?  [53.7GB]? 215GB
(parted) quit
Information: You may need to update /etc/fstab.
```
Скармливаем resize2fs изменяемый раздел:
```sh
ubuntu@foobar:~$ sudo resize2fs /dev/vda1
resize2fs 1.44.1 (24-Mar-2018)
Filesystem at /dev/vda1 is mounted on /; on-line resizing required
old_desc_blocks = 7, new_desc_blocks = 25
The filesystem on /dev/vda1 is now 52400379 (4k) blocks long.
```
Смотрим разделы — диск /dev/vda1 стал больше :)
```sh
ubuntu@foobar:~$ df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            2.0G     0  2.0G   0% /dev
tmpfs           395M   41M  355M  11% /run
/dev/vda1       194G   49G  146G  25% /
tmpfs           2.0G     0  2.0G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           2.0G     0  2.0G   0% /sys/fs/cgroup
/dev/vda15      105M  3.4M  102M   4% /boot/efi
tmpfs           395M     0  395M   0% /run/user/1000
```
