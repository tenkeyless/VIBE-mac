nativefier \
--name "VIBE" \
"https://vibe.naver.com" \
--icon "vibe_icon.png" \
--single-instance \
--title-bar-style 'hiddenInset' \
--inject vibe_script.js \
--inject vibe_drag.css \
--tray \
--background-color "#000000" \
--global-shortcuts vibe_shortcuts_media.json \
--disable-dev-tools
