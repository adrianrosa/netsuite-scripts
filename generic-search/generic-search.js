/* Search pagination with limit and offset for any record.
 * The result data will be returned into an array of objects. The properties from each object will be determined by the param 'columnsObj'.
 * @param {string} recordType: type of the record to search
 * @param {array} filtersObj: array of objects with filters
 * @param {array} columnsObj: array of objects with columns
 * @param {int} limit: by default is 1000
 * @param {int} offset: by default is 0
 * @returns {array}
*/
function executeSearch(recordType, filtersObj, columnsObj, limit, offset){

    var filters = getFilters(filtersObj);
    var columns = getColumns(columnsObj);
    var search = nlapiCreateSearch(recordType, filters, columns);
    var resultset = search.runSearch();
    var searchid = offset ? offset : 0;
    var searchLimit = (limit && limit < 1000) ? (limit + searchid) : 1000;
    var dataResult = [];

    do {

        var resultslice = resultset.getResults(searchid, searchLimit);

        for (var rs in resultslice) {

            dataResult.push(getObjectResult(resultslice[rs], columnsObj, columns));

           	yieldScript(nlapiGetContext());

        	searchid++;
        }

    } while (searchid < searchLimit);

    return dataResult;
}

/* Return an array with the Netsuite columns object (nlobjSearchColumn).
 * @param {array} columnsObj: objects with the column data
 * @returns {array}
*/
function getColumns(columnsObj){
	
	var columns = new Array(),
	    column = null;

	for(var index in columnsObj){
	
		column = new nlobjSearchColumn(columnsObj[index].fldName, columnsObj[index].fldJoin, columnsObj[index].summary);

		if(columnsObj[index].formula)
			column.setFormula(columnsObj[index].formula);

		if(columnsObj[index].sort)
			column.setSort(columnsObj[index].sort);

		columns.push(column);		
	}

	return columns;
}

/* Return an array with the Netsuite filters object (nlobjFilterColumn).
 * @param {array} filtersObj: objects with the filter data
 * @returns {array}
*/
function getFilters(filtersObj){
	
	var filters = new Array(),
        filter = null;

	for(var index in filtersObj){
	
		filter = new nlobjSearchFilter(filtersObj[index].fldName, filtersObj[index].fldJoin, filtersObj[index].operator, filtersObj[index].fldValue, filtersObj[index].fldValue2)

        if(filtersObj[index].formula)
            filter.setFormula(filtersObj[index].formula);

        filters.push(filter);
	}

	return filters;
}

/* Return an object with the result data mapped by property 'display' from the param 'columns'.
 * @param {nlobjSearchResultSet} obj: this object contains the result data
 * @param {array} columns: of objects, is required for the property 'display'
 * @param {array} columnsNS: of nlobjSearchColumn
 * @returns {object}
*/
function getObjectResult(obj, columns, columnsNS){
    
   var objResult = {};

   for(var i = 0; i < columns.length; i++){
   
      objResult[columns[i].display] = obj.getValue(columnsNS[i]);
   }

   return objResult;
}

/* If the script needs to reload process units (less than 1000) this method will do it.
 * @param {nlobjContext} context: object to check units remaining
 * @returns {undefined}
*/
function yieldScript(context) {

    if (context.getRemainingUsage() < 1000) {

        var stateMain = nlapiYieldScript();

        if (stateMain.status == 'FAILURE') {

            nlapiLogExecution("ERROR", "Generic Search running", "Exiting: Reason = " + stateMain.reason + " / Size = " + stateMain.size);
            throw "Failed to yield script";
        }
        else if (stateMain.status == 'RESUME')
            nlapiLogExecution("DEBUG", "Generic Search running" + stateMain.reason + ". Size = " + stateMain.size);
    }
}