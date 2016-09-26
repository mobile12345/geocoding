(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "Company Number",
            alias: "Company Number",
            dataType: tableau.dataTypeEnum.string
		}, {
			id: "Loc Company Name",
            alias: "Loc Company Name",
            dataType: tableau.dataTypeEnum.string
        }, {
			id: "Account Type",
            alias: "Account Type",
            dataType: tableau.dataTypeEnum.string
        }, {
			id: "Street",
            alias: "Street",
            dataType: tableau.dataTypeEnum.string
        }, {
			id: "City",
            alias: "City",
            dataType: tableau.dataTypeEnum.string
        }, {
			id: "Zip Code",
            alias: "Zip Code",
            dataType: tableau.dataTypeEnum.string
        }, {
			id: "Country",
            alias: "Country",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "lat",
            alias: "latitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "lon",
            alias: "longitude",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "headquarters_coordinates",                
            alias: "Coordinates of the headquarters and holdings",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://rawgit.com/mobile12345/geocoding/master/headquarters.json", function(resp) {
            var cust = resp.customers,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = cust.length; i < len; i++) {
                tableData.push({
				"Company Number": cust[i].'Company Number',
				"Loc Company Name": cust[i].'Loc Company Name',
				"Account Type": cust[i].'Account Type',
				"Loc Street": cust[i].'Loc Street',
				"Loc City": cust[i].'Loc City',
				"Loc Zip Code": cust[i].'Loc Zip Code',
				"Loc Country": cust[i].'Loc Country',
				"longitude": cust[i].lon,
                "latitude": cust[i].lat,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Headquarters Coordinates"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();