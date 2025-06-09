# Inselabenteuer - Electron Build Guide

This guide explains how to package the Inselabenteuer HTML5 game as desktop applications for macOS and Windows using Electron.

## Prerequisites

- Node.js (v14.x or later) and npm
- For icon conversion:
  - macOS: Built-in tools (sips, iconutil)
  - All platforms: ImageMagick (for Windows icon conversion)

## Installation

1. Install Node.js and npm from [nodejs.org](https://nodejs.org/)

2. Install ImageMagick:
   - macOS: `brew install imagemagick`
   - Windows: Download from [imagemagick.org](https://imagemagick.org/script/download.php)

3. Install the project dependencies:
   ```
   npm install
   ```

## Icon Conversion

Convert the PNG icon to the appropriate formats for Windows and macOS:

```
./convert-icons.sh
```

This will create:
- `build/icon.ico` for Windows
- `build/icon.icns` for macOS

## Development

To run the application in development mode:

```
npm start
```

## Building for Distribution

### Build for both platforms (if supported by your OS)
```
npm run build
```

### Build for macOS only
```
npm run build:mac
```

### Build for Windows only
```
npm run build:win
```

## Output Locations

The packaged applications will be in:
- `dist/` - Contains the installer files
- `dist/mac` - macOS application
- `dist/win-unpacked` - Windows unpacked application

## Troubleshooting

- If you encounter errors related to code signing, you may need to configure code signing in the `package.json` file or use the `--publish never` flag.
- For Windows builds on macOS/Linux, you may need additional dependencies. Refer to the [electron-builder documentation](https://www.electron.build/).
