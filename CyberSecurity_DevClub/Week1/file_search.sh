# Takes a directory path as argument (done)
# Finds all .log files modified in the last 7 days (done)
# Counts total lines in these files (done)
# Outputs a summary report (done)

logfiles=$(find $1 -name "*.log" -mtime -7)

total_lines=0
for item in $logfiles
do
    # echo $(wc -l < $item)
    total_lines=$(($total_lines+$(wc -l < $item)))
    echo "File: $item, Lines: $(wc -l < $item)"
done
echo "Total lines: $total_lines"