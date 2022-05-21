import * as vscode from 'vscode';

/**
 * Identify if the vscode document contains a valid MedCom message
 * @param vsCodeDocument The vscode document object to check.
 * @returns Returns true if a MedCom file is detected, otherwise returns false
 */
export function isMedComFile(vsCodeDocument: vscode.TextDocument) : boolean {
	if (vsCodeDocument) {
		if (vsCodeDocument.languageId === "xml") {
			return true;
		}
		var allText = vsCodeDocument.getText();
		// var medcomHeaderRegex = new RegExp("(^MSH\\" + delimiters.FIELD + ")|(^FHS\\" + delimiters.FIELD + ")|(^BHS\\" + delimiters.FIELD + ")", "i");
		var medcomHeaderRegex = new RegExp("");

		if (medcomHeaderRegex.test(allText)) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
}

export function anonymize(vsCodeDocument: string) : boolean {
	return false;
}