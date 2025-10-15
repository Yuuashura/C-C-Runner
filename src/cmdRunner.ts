import { exec } from "child_process";
import * as vscode from "vscode";

const outputChannel = vscode.window.createOutputChannel("C/C++ Runner");

/**
 * Menggunakan powershell.exe untuk membuka program di jendela terpisah dan menahannya secara DIAM-DIAM.
 */
export function runInPowerShell(fileDirectory: string, executableName: string) {
    // FIX: Menggunakan ReadKey() untuk menahan jendela secara diam-diam tanpa mencetak pesan prompt.
    const shellCommand = `start powershell -NoExit -Command "& { .\\${executableName}; $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown') | Out-Null }"`;
    
    exec(shellCommand, { cwd: fileDirectory }, (error) => {
        if (error) {
            outputChannel.appendLine(`Gagal menjalankan PowerShell: ${error.message}`);
            vscode.window.showErrorMessage(`Gagal menjalankan PowerShell: ${error.message}`);
        }
    });
}

/**
 * Menggunakan cmd.exe untuk membuka program di jendela terpisah dan menahannya secara DIAM-DIAM.
 */
export function runInCMD(fileDirectory: string, executableName: string) {
    // FIX: Menggunakan 'pause > nul' untuk menahan jendela CMD secara diam-diam.
    const shellCommand = `start cmd /c ""${executableName}" & pause > nul"`; 
    
    exec(shellCommand, { cwd: fileDirectory }, (error) => {
        if (error) {
            outputChannel.appendLine(`Gagal menjalankan CMD: ${error.message}`);
            vscode.window.showErrorMessage(`Gagal menjalankan CMD: ${error.message}`);
        }
    });
}

/**
 * Menghentikan semua proses shell (CMD dan PowerShell) yang mungkin sedang menjalankan program.
 */
export function stopShellProcesses(callback?: () => void) {
    exec('taskkill /f /t /im powershell.exe', () => {
        exec('taskkill /f /t /im cmd.exe', () => {
            if (callback) {
                callback();
            }
        });
    });
}