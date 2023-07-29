#!/bin/bash

# Function to check if an item should be ignored
should_ignore() {
    local item="$1"
    # Add the file or directory paths you want to ignore here
    # For example, to ignore a file named "example.txt" and a directory named "temp":
    [ "$item" = "example.txt" ] || [ "$item" = "node_modules" ]
}

print_file_structure() {
    local dir_path="$1"
    local indent="$2"
    
    if [ ! -d "$dir_path" ]; then
        echo "Directory does not exist."
        return
    fi

    for item in $(ls -A "$dir_path"); do
        item_path="$dir_path/$item"
        if [ -f "$item_path" ] && ! should_ignore "$item"; then
            echo "$indent- $item"
        elif [ -d "$item_path" ] && ! should_ignore "$item"; then
            echo "$indent+ $item/"
            print_file_structure "$item_path" "$indent  "
        fi
    done
}

# Main script execution starts here
read -p "Enter the directory path: " directory_path
print_file_structure "$directory_path" ""
