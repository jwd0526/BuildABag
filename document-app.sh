#!/bin/bash
# Puts all app files in a single doc for easy comparison, extra source protection

output_file="app_documentation.txt"

echo "<documents>" > $output_file

echo "<document index=\"1\">" >> $output_file
echo "<source>directory-structure.txt</source>" >> $output_file
echo "<document_content>" >> $output_file

tree -I 'node_modules|.git|.next|build|dist|.turbo|coverage|.vscode' --dirsfirst -a build-a-bag/src/app >> $output_file

echo "</document_content>" >> $output_file
echo "</document>" >> $output_file

counter=2

process_file() {
    local file=$1
    echo "Processing: $file"
    echo "<document index=\"$counter\">" >> $output_file
    echo "<source>$file</source>" >> $output_file
    echo "<document_content>" >> $output_file
    
    cat "$file" >> $output_file
    
    echo "</document_content>" >> $output_file
    echo "</document>" >> $output_file
    
    ((counter++))
}

find build-a-bag/src/app -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.css" -o -name "*.scss" \) -not -path "*/node_modules/*" | while read file; do
    process_file "$file"
done

echo "</documents>" >> $output_file

echo "Documentation has been written to $output_file"