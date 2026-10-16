#!/usr/bin/env bash
set -euo pipefail
repo='Tech-GLM/Punto-Saber-GLM'
project_dir="$(cd -- "$(dirname -- "$0")" && pwd)"
command -v gh >/dev/null || { echo 'Install GitHub CLI from https://cli.github.com and run this script again.'; exit 1; }
command -v git >/dev/null || { echo 'Git is required.'; exit 1; }
gh auth status >/dev/null 2>&1 || gh auth login
gh auth setup-git
task_temp="$(mktemp -d)"
trap 'rm -rf "$task_temp"' EXIT
gh repo clone "$repo" "$task_temp/repository"
(tar -C "$project_dir" --exclude='.git' --exclude='*.zip' -cf - .) | tar -C "$task_temp/repository" -xf -
cd "$task_temp/repository"
if ! git config user.name >/dev/null; then git config user.name "$(gh api user --jq '.login')"; fi
if ! git config user.email >/dev/null; then
 github_login="$(gh api user --jq '.login')"
 github_id="$(gh api user --jq '.id')"
 git config user.email "${github_id}+${github_login}@users.noreply.github.com"
fi
if command -v node >/dev/null; then node --test tests/*.test.mjs; fi
git add .
if ! git diff --cached --quiet; then
 git commit -m 'Complete Punto platform and historical question library'
 git push origin main
fi
if gh api "repos/$repo/pages" >"$task_temp/pages.json" 2>"$task_temp/pages-error.txt"; then
 gh api --method PUT "repos/$repo/pages" -f 'source[branch]=main' -f 'source[path]=/' >/dev/null
elif grep -q 'HTTP 404' "$task_temp/pages-error.txt"; then
 gh api --method POST "repos/$repo/pages" -f 'source[branch]=main' -f 'source[path]=/' >/dev/null
else
 cat "$task_temp/pages-error.txt"
 echo 'Files were pushed. Enable Pages in repository Settings > Pages > main > / (root).'
 exit 1
fi
echo 'GitHub Pages is configured. Allow a few minutes for the first deployment.'
gh api "repos/$repo/pages" --jq '.html_url'
