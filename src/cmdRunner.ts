import { exec } from "child_process";
import * as vscode from "vscode";
const outputChannel = vscode.window.createOutputChannel("C/C++ Runner");
export function runInPowerShell(fileDirectory: string, executableName: string) {
    const shellCommand = `start powershell -NoExit -Command "& { .\\${executableName}; $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown') | Out-Null }"`;
    
    exec(shellCommand, { cwd: fileDirectory }, (error) => {
        if (error) {
            outputChannel.appendLine(`Gagal menjalankan PowerShell: ${error.message}`);
            vscode.window.showErrorMessage(`Gagal menjalankan PowerShell: ${error.message}`);
        }
    });
}

export function runInCMD(fileDirectory: string, executableName: string) {
    const shellCommand = `start cmd /c ""${executableName}" & pause > nul"`; 
    exec(shellCommand, { cwd: fileDirectory }, (error) => {
        if (error) {
            outputChannel.appendLine(`Gagal menjalankan CMD: ${error.message}`);
            vscode.window.showErrorMessage(`Gagal menjalankan CMD: ${error.message}`);
        }
    });
}
export function stopShellProcesses(callback?: () => void) {
    exec('taskkill /f /t /im powershell.exe', () => {
        exec('taskkill /f /t /im cmd.exe', () => {
            if (callback) {
                callback();
            }
        });
    });
}