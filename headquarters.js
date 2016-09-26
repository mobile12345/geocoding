(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            	id: "Company_Number",
            	alias: "Company Number",
            	dataType: tableau.dataTypeEnum.string
	}, {
		id: "Loc_Company_Name",
            	alias: "Loc Company Name",
            	dataType: tableau.dataTypeEnum.string
        }, {
		id: "Account_Type",
            	alias: "Account Type",
            	dataType: tableau.dataTypeEnum.string
        }, {
		id: "Loc_Street",
            	alias: "Street",
            	dataType: tableau.dataTypeEnum.string
        }, {
		id: "Loc_City",
            	alias: "City",
            	dataType: tableau.dataTypeEnum.string
        }, {
		id: "Loc_Zip_Code",
            	alias: "Zip Code",
            	dataType: tableau.dataTypeEnum.string
        }, {
		id: "Loc_Country",
            	alias: "Country",
            	dataType: tableau.dataTypeEnum.string
        }, {
            id: "Latitude",
            alias: "latitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "Longitude",
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
			"Company_Number": cust[i].Company_Number,
			"Loc_Company_Name": cust[i].Loc_Company_Name,
			"Account_Type": cust[i].Account_Type,
			"Loc_Street": cust[i].Loc_Street,
			"Loc_City": cust[i].Loc_City,
			"Loc_Zip_Code": cust[i].Loc_Zip_Code,
			"Loc_Country": cust[i].Loc_Country,
			"Longitude": cust[i].longitude,
                	"Latitude": cust[i].latitude,
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
