var gridNumberOfColumns = 28;
var gridUsefulWidth = 1400;

var gridSectionNumberOfColumns = 24;
var gridContainerNumberOfColumns = 16;
var gridCompactContainerNumberOfColumns = 12;

/*--------------*/

var gridColumnWidth = gridUsefulWidth / gridNumberOfColumns;

/*--------------*/

module.exports = {
    _namespace: 'layout',
    gridNumberOfColumns: gridNumberOfColumns,
    gridUsefulWidth: gridUsefulWidth,
    gridSectionNumberOfColumns: gridSectionNumberOfColumns,
    gridContainerNumberOfColumns: gridContainerNumberOfColumns,
    gridCompactContainerNumberOfColumns: gridCompactContainerNumberOfColumns,
    gridColumnWidth: gridColumnWidth
}
