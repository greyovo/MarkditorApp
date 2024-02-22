# Markditor

<p align="center" style="margin-bottom:10px">
  <img src="./assets/logo.png" width="128px" />
  <br>
  English | <a href="./README.zh-CN.md">简体中文</a>
</p>

Yet another WYSIWYG Markdown editor written in TypeScript and Tauri. Aims to be an open-source alternative to Typora.

> **[Markditor]** = **[Mark]** down + e **[ditor]**. 
> Supports Windows 10 / 11 by now.

> ⚠️ WIP. Be careful if you want to edit your important documents. 

## Technology Stack

- React
- **Tauri** (preferred) / Electron
- Vditor (A forked version, see [here](https://github.com/greyovo/vditor))
- Zustand
- Radix-UI
- Tailwind CSS
- Vite

## Download

Go to [releases](https://github.com/greyovo/MarkditorApp/releases) page.

## Project Architecture

```
├─build           // Build assets used by electron-builder
├─dist            // Web contents build output
├─dist-electron   // Electron prebuilt files
├─electron        // Electron main process
├─public          // Public files to be used in HTML
├─release         // Electron build output
├─shared          // Shared types definitions between renderer and main processes
├─src             // Front-end sources
│  ├─assets       // Static assets, i.e., fonts
│  ├─components   // Global components
│  ├─feat         // Feature modules
│  ├─ipc          // IPC communication
│  ├─store        // Zustand stores and business logics
│  ├─types        // Global type definitions
│  └─utils        // Utility functions
└─src-tauri       // Tauri backend process and build output
```

## Development

> Note: Markditor is initially made with Electron, **but currently Tauri is preferred.** So far Electron is still in development but has some unimplemented Platform API. See `electron/main/handler`. Electron backend may be deprecated in the future.
> 
> By encapsulating IPC communication (see `shared/platform_api.d.ts` and `src/ipc`), Markditor can be easily migrated to other backends such as Tauri.

Install dependencies:

```bash
npm install
```

Run in dev mode:

```bash
# Run with Tauri (preferred)
npm run dev:tauri

# Run with Electron
npm run dev:electron
```

Build product:

```bash
# Build with Tauri (preferred)
npm run build:tauri

# Build with Electron
npm run build:electron
```
