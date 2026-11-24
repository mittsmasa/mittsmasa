set -C
printf 'slug: '
read -r slug
case "$slug" in
  '' | *[!abcdefghijklmnopqrstuvwxyz0123456789-]*)
    echo "slug は英小文字と数字とハイフンだけにします: $slug" >&2
    exit 1
    ;;
esac
for f in "content/drafts/$slug.md" "content/posts/$slug.md"; do
  if [ -e "$f" ]; then
    echo "すでにあります: $f" >&2
    exit 1
  fi
done
f="content/drafts/$slug.md"
printf -- '---\ntitle: \ndate: %s\n---\n\n' "$(date +%F)" > "$f" && open -a Zed "$f"
