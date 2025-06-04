# Linux

## Welcome Agent
Description: Welcome to DevClub CTF! Your first mission is simple - find the flag hidden in plain sight. SSH into the challenge server and look around your home directory.

**Approach**
ssh into the server using the command `ssh ctfuser@3.7.66.170 -p 2201`.
Enter the password of the server which is "ctfpassword".
Use the command `ls` to list all the files.
`cat` the `flag.txt` file to get the flag.


## Hidden in the crowd
Description: Often times spies like to hide in the crowd, can you find the spy here?

**Approach**
1. `ssh` using the same approach as in the previous problem using the port 2210.
2. Use `ls -la` to list all the files (including the hidden ones), there is a file named `.flag`.
3. `cat .flag` to get the flag.
Alternatively
I used `grep -ri "CTF` to get the flag after ssh into the server.


## Log Explores
Description: The flag is present in the log file, but it is too large to open in a text editor, can you find it anyway? Execute the downloaded file to generate the log file

**Approach**
We are provided with a logGen file which is an executable.
But executing this program creates a 16gb log file which is not easily readable using general commands like tail, cat etc..
So, I tried `grep -aEo 'CTF\{[^}]+\} log.txt`, a regex search for the flag in the log file, and luckily got the flag.


## Process Hunter
Description: A suspicious process is running on the system. Find it and extract the flag from the process arguments.

**Approach**
`ssh` using the same approach as in the earlier problems using the port 2220.
Use `ps -aux` to list all the processes including their commands.
The flag is written in the name of the command in the PID 1.


## Locked Vault
Description: Can you find the flag from this vault? To unpack the files search how to unpack tar.gz files.

**Approach**
First extract the gunzip file using `gunzip LockedVault.tar.gz` and then `tar --extract --file="LockedVault.tar"`.
`cd` into the LockedVault folder.
Use `chmod 777 step step1.sh step2.sh step3.sh`
Execute them one by one, and use the passwords from earlier steps to unlock the next one.
On step 3, you will get the flag.


## Dumpster Diver
Description: The flag is somewhere in the program's memory, but it never gets printed. Maybe there's a way to peek into what it's holding onto...

**Approach**
We have been give a `program` executable.
First execute the `program` and open a new terminal session.
Run `gdb ./program`.
Add a breakpoint using `break decrypt_flag`.
Restart the program using `run`
When the break point is reached, run the decrypt_flag command using `call decrypt_flag()`.
Dump the core using `gcore flag_dump.core`.
Now use strings to convert the flag_dump.core to readable format and grep for the flag. (`cat flag_dump.core | strings | grep "CTF"`)


## Git gud

**Approach**
We have been given a directory containing a `.git` folder, meaning it should be git repo.
Since there is no file visible directly containing the flag, I checked for the commit history.
There is a commit with message `sensitive file added` after which there is `flag removed`.
So using `git --reset <commit-id>` and going to that commit reveals the flag.

## Bring Back from the Dead

**Approach**
First I tried mounting the `challenge.img` file, using `sudo mkdir /mnt/challenge && sudo mount -o loop challenge.img /mnt/challenge`.
Then searching in that path led to nowhere as the flag was deleted.
So I explored on the internet, and got to know about `foremost` tool. Using `foremost -i challenge.img -o recovered_data`.
It created a recovered_data folder which includes the flag as png.
Alternate approach is to use a hex editor to remove all unnecessary zeros before the png headers.


## Binary Directory

**Approach**
After extracting the archive, I explorer some of the files and got to know some of them contained zeros and some contain ones (fewer ones).
So, I used `grep -r "1"` to get all the paths containing 1. Then I piped it to `sort` to get it sorted.
The path contained sequences of zeros and ones, removing all the slashes gave me sequences of 8-bit binary numbers.
Converting that to ASCII gave me the flag.

## Event digger

**Approach**
First converting the string from base64 to decimal gave me the sequence of numbers. Some of them are ASCII characters.
For rest of them I used the js-event codes as given in the hint to find the hidden characters after which I arrived on the flag.