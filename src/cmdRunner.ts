import { exec } from "child_process";
import * as vscode from "vscode";

const outputChannel = vscode.window.createOutputChannel("C/C++ Runner");

/**
 * Menggunakan powershell.exe untuk membuka program di jendela terpisah dan menahannya.
 */
export function runInPowerShell(fileDirectory: string, executableName: string) {
    // Command PowerShell: -NoExit menjaga jendela tetap terbuka, Read-Host meniru pause.
    const shellCommand = `start powershell -NoExit -Command "& { .\\${executableName}; Write-Host ''; Write-Host 'Tekan ENTER untuk melanjutkan...' -ForegroundColor Yellow; Read-Host | Out-Null }"`;
    
    exec(shellCommand, { cwd: fileDirectory }, (error) => {
        if (error) {
            outputChannel.appendLine(`Gagal menjalankan PowerShell: ${error.message}`);
            vscode.window.showErrorMessage(`Gagal menjalankan PowerShell: ${error.message}`);
        }
    });
}

/**
 * Menggunakan cmd.exe untuk membuka program di jendela terpisah dan menahannya.
 */
export function runInCMD(fileDirectory: string, executableName: string) {
    // Command CMD: start cmd /c menjalankan executable dan menahan jendela dengan 'pause'
    const shellCommand = `start cmd /c ""${executableName}" & pause"`;
    
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
    // Kill PowerShell processes
    exec('taskkill /f /t /im powershell.exe', () => {
        // Setelah PowerShell dikill, kill juga CMD.
        exec('taskkill /f /t /im cmd.exe', () => {
            // Panggil callback setelah keduanya selesai (untuk restart)
            if (callback) {
                callback();
            }
        });
    });
}