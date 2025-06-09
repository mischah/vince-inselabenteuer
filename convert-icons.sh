# This is a shell script to convert the PNG icon to ICO and ICNS formats
# You'll need imagemagick installed on your system
# Convert PNG to ICO (Windows)
convert -background transparent "/Users/vince/Documents/Programmieren/open-world/graphics/icon.png" -define icon:auto-resize=256,128,64,48,32,16 "/Users/vince/Documents/Programmieren/open-world/build/icon.ico"

# Convert PNG to ICNS (macOS)
# First convert to .iconset
mkdir -p "/Users/vince/Documents/Programmieren/open-world/build/icon.iconset"
sips -z 16 16 "/Users/vince/Documents/Programmieren/open-world/graphics/icon.png" --out "/Users/vince/Documents/Programmieren/open-world/build/icon.iconset/icon_16x16.png"
sips -z 32 32 "/Users/vince/Documents/Programmieren/open-world/graphics/icon.png" --out "/Users/vince/Documents/Programmieren/open-world/build/icon.iconset/icon_32x32.png"
sips -z 64 64 "/Users/vince/Documents/Programmieren/open-world/graphics/icon.png" --out "/Users/vince/Documents/Programmieren/open-world/build/icon.iconset/icon_64x64.png"
sips -z 128 128 "/Users/vince/Documents/Programmieren/open-world/graphics/icon.png" --out "/Users/vince/Documents/Programmieren/open-world/build/icon.iconset/icon_128x128.png"
sips -z 256 256 "/Users/vince/Documents/Programmieren/open-world/graphics/icon.png" --out "/Users/vince/Documents/Programmieren/open-world/build/icon.iconset/icon_256x256.png"
sips -z 512 512 "/Users/vince/Documents/Programmieren/open-world/graphics/icon.png" --out "/Users/vince/Documents/Programmieren/open-world/build/icon.iconset/icon_512x512.png"
sips -z 1024 1024 "/Users/vince/Documents/Programmieren/open-world/graphics/icon.png" --out "/Users/vince/Documents/Programmieren/open-world/build/icon.iconset/icon_1024x1024.png"

# Convert .iconset to .icns
iconutil -c icns "/Users/vince/Documents/Programmieren/open-world/build/icon.iconset" -o "/Users/vince/Documents/Programmieren/open-world/build/icon.icns"

# Clean up temporary iconset directory
rm -r "/Users/vince/Documents/Programmieren/open-world/build/icon.iconset"

echo "Icon conversion completed!"
