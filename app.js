(function () {
    'use strict';

    var editedDataRows = {};
    createTable('example');
    $('#showEdited').on('click', function () {
        var editedRows = Object.keys(editedDataRows).map(function (value) {
            return editedDataRows[value];
        });
        alert(editedRows);
    });

    $('#reset').on('click', function () {
        destroyTable('example');
        createTable('example');
    })
    function createTable(tableId) {
        var columns = [{
            "title": "S.No"
        }, {
            "title": "Name"
        }, {
            "title": "Position"
        }, {
            "title": "Office"
        }, {
            "title": "Extn."
        }, {
            "title": "Start date"
        }, {
            "title": "Salary"
        }];
        return $('#' + tableId).DataTable({
            'ajax': 'https://api.myjson.com/bins/1us28',
            'columns': columns,
            'drawCallback': function (dtSettings) {
                var tableElement = $(dtSettings.oInstance);
                var tableInstance = $(dtSettings.oInstance).DataTable();
                $(tableElement.find('td')).editable(function (value, jeSettings) {
                    // {row: , column: , columnVisible: }
                    var rowColIndex = tableInstance.cell(this).index();
                    var rowData = tableInstance.row($(this).closest('tr')).data().slice(0);
                    rowData[rowColIndex.column] = value;
                    editedDataRows[rowColIndex.row] = rowData;
                    return value
                });
            }
        });
    }

    function destroyTable(tableId) {
        $('#' + tableId).DataTable().destroy();
        $('#' + tableId).empty();
    }
} ());