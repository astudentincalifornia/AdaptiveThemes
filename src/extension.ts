import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			'adaptiveTheme',
			new AdaptiveSidebarProvider(context)
		)
	);
	const disposable = vscode.commands.registerCommand('adaptivethemes.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from SomeAdaptiveThemes!');
	});
	context.subscriptions.push(disposable);
}

class AdaptiveSidebarProvider implements vscode.WebviewViewProvider{
	public static readonly viewType = '';

	constructor(private context: vscode.ExtensionContext) {}

	resolveWebviewView(webviewView: vscode.WebviewView, 
		context: vscode.WebviewViewResolveContext, 
		token: vscode.CancellationToken){
			webviewView.webview.options = {
				enableScripts: true,
			};
			webviewView.webview.html = this.getHtmlForWebview();
			webviewView.webview.onDidReceiveMessage((message) => {
				if (message.command === 'switchTheme') {
					vscode.workspace.getConfiguration("workbench").update(
						"workbench.colorTheme",
						"Abyss",
						vscode.ConfigurationTarget.Global
					);
				}
			}
			);
	}

	getHtmlForWebview(): string {
		return /* html */ `
			<!DOCTYPE html>
			<html lang="en">
			<body>
				<h2>Adaptive Theme Control</h2>
				<button onclick="acquireVsCodeApi().postMessage({ command: 'switchTheme' })">
        		  Switch Theme
        		</button>
			</body>
			</html>
		`;
	}


}

export function deactivate() {}
