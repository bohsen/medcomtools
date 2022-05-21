import * as assert from 'assert';
import { after, before } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { isMedComFile } from '../../common';

const patientXml = `<Patient>
<CivilRegistrationNumber>0808970007</CivilRegistrationNumber>
<PersonSurnameName>Olesen</PersonSurnameName>
<PersonGivenName>Ole</PersonGivenName>
<StreetName>Nørregade 3</StreetName>
<DistrictName>Aalborg</DistrictName>
<PostCodeIdentifier>9000</PostCodeIdentifier>
<TelephoneSubscriberIdentifier>22222222 - mega lang teks</TelephoneSubscriberIdentifier>
</Patient>`;

suite('Extension Test Suite', () => {

    after(() => {
        vscode.window.showInformationMessage('All tests done!');
    });

    test('Common isMedcomFile', () => {
        // let document: vscode.TextDocument = {};
        // assert.strictEqual(isMedComFile(document), true);
        assert.fail();
    });

    test('Sample test', () => {
        assert.fail();

    });

});
