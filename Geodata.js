(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "latitude",
            alias: "latitude",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "longitude",
            alias: "longitude",
            dataType: tableau.dataTypeEnum.float
		}, {
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "Koordinaten",                
            alias: "Coordinates from the Google geocoding API",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://rawgit.com/mobile12345/geocoding/master/data.json", function(resp) {
            var addr = resp.addresses,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = addr.length; i < len; i++) {
                tableData.push({
			"id": addr[i].id,
                	"longitude": addr[i].lon,
                    	"latitude": addr[i].lat
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
            tableau.connectionName = "Coordinates"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
