#!/bin/bash

# save everything to a timestamp report file
logfile=$(date '+%Y%m%d%H%M%S.log');

# system uptime
echo "Uptime:" >> $logfile
uptime >> $logfile

# disk usage of home directory
echo "Disc usage of home directory:" >> $logfile
df -k /home/ >> $logfile

# number of running processes
echo "Number of running processes:" >> $logfile
ps aux --no-heading | wc -l >> $logfile


# current network connections
echo "Current network connections:" >> $logfile
ip -s link show >> $logfile