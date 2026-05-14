[README.md](https://github.com/user-attachments/files/27754108/README.md)
# Orange Arc - Windows Desktop Version

This is the standalone Windows Desktop version of the Orange Arc Progress Tracker, built with Electron.

## 🚀 How to Run & Build (.exe)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### 2. Setup
Open your terminal (CMD or PowerShell) in this folder and run:
```bash
npm install
```

### 3. Run in Development Mode
To run the app as a desktop window while you work:
```bash
npm run electron:dev
```

### 4. Build the Windows Executable (.exe)
To create a standalone `.exe` file that you can install or share:
```bash
npm run electron:build
```
Once finished, the installer will be located in the `dist` folder.

## ✨ Features
- **Standalone Window**: Runs as a separate desktop application.
- **Custom Icon**: Featuring the Orange Arc branding.
- **No Browser Required**: Works independently of Chrome or Edge.
- **Auto-Installer**: Generates a professional Windows installer (NSIS).

Enjoy your desktop tracking experience!
