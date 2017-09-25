// Search Employees  -------------------------------------------------------------------------------------------------------------------------------
var recordsPerPage = 10;
var page = 1;

var filters = [
                {fldName: 'isinactive', fldJoin: null, operator: 'is', fldValue: 'F', fldValue2: null, formula: null}, 
                {fldName: 'fax', fldJoin: null, operator: 'isempty', fldValue: null, fldValue2: null, formula: null},
                {fldName: 'formulatext', fldJoin: null, operator: 'startswith', fldValue: 'ad', fldValue2: null, formula: 'SUBSTR({entityid}, 3)'},
                {fldName: 'isinactive', fldJoin: 'subsidiary', operator: 'is', fldValue: 'F', fldValue2: null, formula: null}
              ];

var columns = [
                {fldName: 'internalid', fldJoin: null, summary: null, formula: null, sort: true, display: 'id'}, 
                {fldName: 'entityid', fldJoin: null, summary: null, formula: null, sort: false, display: 'name'},
                {fldName: 'legalname', fldJoin: 'subsidiary', summary: null, formula: null, sort: false, display: 'subsidiary'},
                {fldName: 'formulatext', fldJoin: null, summary: null, formula: 'LENGTH({entityid})', sort: false, display: 'lengthName'}
              ];

var results = executeSearch('employee', filters, columns, recordsPerPage, page);

console.log(results);
// --------------------------------------------------------------------------------------------------------------------------------------------------

// Search Sales Orders ------------------------------------------------------------------------------------------------------------------------------
var recordsPerPage2 = 20;
var page2 = 2;

var filters2 = [
                {fldName: 'subsidiary', fldJoin: null, operator: 'is', fldValue: 2, fldValue2: null, formula: null},
                {fldName: 'mainline', fldJoin: null, operator: 'is', fldValue: 'T', fldValue2: null, formula: null}
               ];

var columns2 = [
                {fldName: 'internalid', fldJoin: null, summary: null, formula: null, sort: true, display: 'id'},
                {fldName: 'tranid', fldJoin: null, summary: null, formula: null, sort: false, display: 'nroNS'},
                {fldName: 'trandate', fldJoin: null, summary: null, formula: null, sort: true, display: 'date'},
                {fldName: 'firstname', fldJoin: 'customer', summary: null, formula: null, sort: false, display: 'customer_firstname'},
                {fldName: 'lastname', fldJoin: 'customer', summary: null, formula: null, sort: false, display: 'customer_lastname'},
                {fldName: 'email', fldJoin: 'customer', summary: null, formula: null, sort: false, display: 'customer_email'}
              ];

var results2 = executeSearch('salesorder', filters2, columns2, recordsPerPage2, page2);

console.log(results2);
// --------------------------------------------------------------------------------------------------------------------------------------------------
