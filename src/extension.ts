// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { isNullOrUndefined } from 'util';
import * as vscode from 'vscode';
import { isMedComFile } from './common';
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

interface Patient {
	CivilRegistrationNumber?: string;
	AlternativeIdentifier?: string;
	PersonSurnameName: string;
	PersonGivenName: string;
	StreetName?: string;
	PostCodeIdentifier?: number;
	DistrictName?: string
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "medcomtools" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('medcomtools.maskIdentifiers', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		// Get the active text editor
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			if (!isMedComFile(document)) {
				vscode.window.showInformationMessage('Document not a MedCom document');
				return;
			}

			let xmlString = editor.document.getText();

			let parserOptions = {
				ignoreDeclaration: true,
				numberParseOptions: {
					leadingZeros: true
				}
			};
			let parser = new XMLParser(parserOptions);
			let jsonObj = parser.parse(xmlString);

			anonymize(jsonObj);

			let builder = new XMLBuilder({
				format: true
			});

			let xmlDataStr = '<?xml version="1.0" encoding="iso-8859-1" standalone="no"?>\n' + builder.build(jsonObj);

			console.log(xmlDataStr);

			//Creating a new range with startLine, startCharacter & endLine, endCharacter.
			let invalidRange = new vscode.Range(0, 0, editor.document.lineCount, 0);

			// To ensure that above range is completely contained in this document.
			let validFullRange = editor.document.validateRange(invalidRange);

			editor.edit(editBuilder => {
				editBuilder.replace(validFullRange, xmlDataStr);
			}).then(err => console.log(err));
		}
	});

	context.subscriptions.push(disposable);
}

function anonymize(jsonObj: any) {
	let patient: Patient = jsonObj.Emessage.XrayRequest.Patient;
	console.log(patient.CivilRegistrationNumber);
	if (patient.CivilRegistrationNumber !== undefined) {
		jsonObj.Emessage.XrayRequest.Patient.CivilRegistrationNumber = "0101701234";
	}
	if (patient.AlternativeIdentifier !== undefined) {
		jsonObj.Emessage.XrayRequest.Patient.AlternativeIdentifier = "0101701234";
	}
	if (patient.PersonSurnameName !== undefined) {
		jsonObj.Emessage.XrayRequest.Patient.PersonSurnameName = "Sørensen";
	}
	if (patient.PersonGivenName !== undefined) {
		jsonObj.Emessage.XrayRequest.Patient.PersonGivenName = "Søren";
	}
	if (patient.StreetName !== undefined) {
		jsonObj.Emessage.XrayRequest.Patient.StreetName = "Testvej Allé 42";
	}
	if (patient.DistrictName !== undefined) {
		jsonObj.Emessage.XrayRequest.Patient.DistrictName = "Aalborg";
	}
	if (patient.PostCodeIdentifier !== undefined) {
		jsonObj.Emessage.XrayRequest.Patient.PostCodeIdentifier = 9000;
	}
}

// this method is called when your extension is deactivated
export function deactivate() { }
