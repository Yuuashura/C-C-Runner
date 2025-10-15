import { exec, spawnSync } from "child_process";
import { basename, dirname, extname } from "path";
import * as vscode from "vscode";
import { runInCMD, runInPowerShell, stopShellProcesses } from "./cmdRunner";

// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log("C Runner is now active!");
    const outputChannel = vscode.window.createOutputChannel("C/C++ Runner");
    const compilerPath = 'C:\\mingw64\\bin';

    if (!process.env.path?.includes(compilerPath)) {
        process.env.path += compilerPath + ';';
    }

    const run = async () => {
        outputChannel.clear();
        let document;
        
        for (let textEditor of vscode.window.visibleTextEditors) {
            const fileName = textEditor.document?.fileName || "";
            if (extname(fileName) === '.c' || extname(fileName) === '.cpp') {
                document = textEditor.document;
            }
        }
        
        const fileName = document?.fileName || "";
        if (!fileName) {
            vscode.window.showErrorMessage("Tidak ada file .c atau .cpp yang terbuka.");
            return;
        }

        vscode.commands.executeCommand("setContext", "cpp-runner.running", true);
        await document?.save();
        
        const fileBaseName = basename(fileName);
        const fileBaseNameWithoutExt = basename(fileName, extname(fileName));
        const fileDirectory = dirname(fileName);
        
        let compiler;
        if (document?.languageId === 'c') {
            compiler = 'gcc';
        } else {
            compiler = 'g++';
        }

        // --- PROSES KOMPILASI ---
        const compileProcess = spawnSync(
            `${compiler} "${fileBaseName}" -o "${fileBaseNameWithoutExt}.exe"`,
            { cwd: fileDirectory, shell: true, encoding: "utf-8" }
        );
        
        for (let output of compileProcess.output) {
            if (output) {
                outputChannel.appendLine(output);
            }
        }

        if (compileProcess.status === 0) {
            vscode.window.showInformationMessage(
                `${fileBaseName} compiled successfully.`
            );

            // --- BACA KONFIGURASI DAN PANGGIL FUNGSI RUN YANG TEPAT ---
            const config = vscode.workspace.getConfiguration('cpp-runner');
            const shellToUse = config.get<string>('executionShell');
            const executableName = `${fileBaseNameWithoutExt}.exe`;
            
            if (shellToUse === 'PowerShell') {
                runInPowerShell(fileDirectory, executableName);
            } else { // CMD
                runInCMD(fileDirectory, executableName);
            }
            
            vscode.commands.executeCommand("setContext", "cpp-runner.running", false);
            
            vscode.window.showInformationMessage(
                `${executableName} executed successfully in ${shellToUse}.`
            );

        } else {
            // Kompilasi Gagal
            outputChannel.show();
            vscode.window.showErrorMessage("Compilation failed. Check C/C++ Runner output channel.");
            vscode.commands.executeCommand("setContext", "cpp-runner.running", false);
        }
    };

    const runDisposable = vscode.commands.registerCommand("cpp-runner.run", run);

    // --- BLOK STOP ---
    const stopDisposable = vscode.commands.registerCommand("cpp-runner.stop", () => {
        stopShellProcesses(() => {
             vscode.window.showInformationMessage('Proses eksekusi berhasil dihentikan.');
        });
        vscode.commands.executeCommand("setContext", "cpp-runner.running", false);
    });

    // --- BLOK RESTART ---
    const restartDisposable = vscode.commands.registerCommand("cpp-runner.restart", async () => {
        // Hentikan dulu, lalu jalankan setelah proses kill selesai
        stopShellProcesses(() => {
            // Beri sedikit waktu untuk memastikan jendela konsol ditutup
            setTimeout(run, 500); 
        });
    });

    // --- BLOK UNTUK MEMBUKA SETTINGS ---
    const openSettingsDisposable = vscode.commands.registerCommand("cpp-runner.openSettings", () => {
        // Command ini membuka Settings UI dan otomatis memfilter dengan kata kunci 'cpp-runner'
        vscode.commands.executeCommand('workbench.action.openSettings', 'cpp-runner');
    });

    context.subscriptions.push(runDisposable);
    context.subscriptions.push(stopDisposable);
    context.subscriptions.push(restartDisposable);
    context.subscriptions.push(openSettingsDisposable);
}

export function deactivate() { }