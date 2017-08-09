function executeSearch(recordType, filtersObj, columnsObj, limit){

    var filters = getFilters(filtersObj);
    var columns = getColumns(columnsObj);
    var search = nlapiCreateSearch(recordType, filters, columns);
    var resultset = search.runSearch();
    var searchid = 0;
    var columnsResults = search.getColumns();
    var dataResult = [];

    do {

        var resultslice = resultset.getResults(searchid, limit < 1000 ? limit : searchid + 1000);

        for (var rs in resultslice) {

            dataResult.push(getObjectResult(resultslice[rs], columnsObj, columnsResults));		

           	yieldScript(nlapiGetContext());

        	searchid++;
        }

    } while (resultslice.length >= 1000 && searchid < limit);

    return dataResult;
}

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

function getObjectResult(obj, columns, columnsNS){
    
   var objResult = {};

   for(var i = 0; i < columns.length; i++){
   
      objResult[columns[i].display] = obj.getValue(columnsNS[i]);
   }

   return objResult;
}

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