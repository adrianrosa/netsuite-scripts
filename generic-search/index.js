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

var results = executeSearch('employee', filters, columns, 10);

console.log(results);