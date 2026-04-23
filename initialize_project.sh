#!/bin/bash
# ---------------------------------------------
# Template Project Renamer (Interactive Version)
# Author: Ali Arabshahi (ElmeDade)
# Description:
#   Interactive script for renaming full-stack template
#   Replaces `hoboc.ir`, `Hoboc`, and `hoboc`
#   Handles Django + Next.js + Docker stack safely.
# ---------------------------------------------

set -e

# --- 1️⃣ Ask for inputs ---
echo "=========================================="
echo "🚀 Fullstack Template Setup Script"
echo "=========================================="
read -rp "Enter project name (example: robot): " project_name
read -rp "Enter domain name (example: easytg.ir): " domain_name
echo "------------------------------------------"

# --- 2️⃣ Normalize inputs ---
project_lower=$(echo "$project_name" | tr '[:upper:]' '[:lower:]')
project_upper=$(echo "$project_name" | tr '[:lower:]' '[:upper:]')
project_capitalized="$(echo "${project_lower:0:1}" | tr '[:lower:]' '[:upper:]')${project_lower:1}"
domain_lower=$(echo "$domain_name" | tr '[:upper:]' '[:lower:]')

# --- 3️⃣ Summary ---
echo "🔧 Project Details:"
echo "   • Lowercase   → $project_lower"
echo "   • Capitalized → $project_capitalized"
echo "   • Uppercase   → $project_upper"
echo "   • Domain      → $domain_lower"
echo "------------------------------------------"

# Confirm inputs
read -rp "Proceed with these values? (y/n): " confirm
if [[ "$confirm" != "y" ]]; then
  echo "🚫 Operation cancelled."
  exit 0
fi

# --- 4️⃣ Rename backend module folder ---
if [ -d "backend/src/hoboc" ]; then
  echo "📁 Renaming backend/src/hoboc → backend/src/$project_lower"
  mv backend/src/hoboc backend/src/"$project_lower"
else
  echo "⚠️  Warning: backend/src/hoboc not found, skipping."
fi

# --- 5️⃣ Collect files for replacement ---
echo "🔍 Collecting text files..."
find . -type f \
  ! -path "*/.git/*" \
  ! -path "*/node_modules/*" \
  ! -path "*/__pycache__/*" \
  ! -path "*/media/*" \
  ! -path "*/static/*" \
  ! -path "*/frontend/src/public/*" \
  ! -name "*.ico" \
  ! -name "*.png" \
  ! -name "*.jpg" \
  ! -name "*.jpeg" \
  ! -name "*.webp" \
  ! -name "*.svg" \
  ! -name "*.pdf" \
  ! -name "*.ttf" \
  ! -name "*.woff" \
  ! -name "*.woff2" \
  ! -name "initialize_project.sh" \
  > __filelist.txt

total=$(wc -l < __filelist.txt)
echo "🧩 Found $total text-based files to process."
echo "------------------------------------------"

# --- 6️⃣ Replacement order (strict sequence) ---
# 1. hoboc.ir → <domain_lower>
# 2. Hoboc → <project_capitalized>
# 3. hoboc → <project_lower>

echo "1️⃣ Replacing 'hoboc.ir' → '$domain_lower'..."
while IFS= read -r file; do
  if grep -q "hoboc.ir" "$file"; then
    sed -i.bak "s/hoboc\.ir/$domain_lower/g" "$file" && rm -f "$file.bak"
  fi
done < __filelist.txt

echo "2️⃣ Replacing 'Hoboc' → '$project_capitalized'..."
while IFS= read -r file; do
  if grep -q "Hoboc" "$file"; then
    sed -i.bak "s/Hoboc/$project_capitalized/g" "$file" && rm -f "$file.bak"
  fi
done < __filelist.txt

echo "3️⃣ Replacing 'hoboc' → '$project_lower'..."
while IFS= read -r file; do
  if grep -q "hoboc" "$file"; then
    sed -i.bak "s/hoboc/$project_lower/g" "$file" && rm -f "$file.bak"
  fi
done < __filelist.txt

# --- 7️⃣ Cleanup ---
rm -f __filelist.txt

echo "✅ All replacements done!"
echo "🎉 Template successfully converted to project: $project_capitalized ($domain_lower)"
