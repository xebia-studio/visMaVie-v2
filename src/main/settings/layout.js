var gridNumberOfColumns = 30;
var gridUsefulWidth = 1400;
const usefulWidth = 1400;
var gutter = 20;

var gridSectionNumberOfColumns = 26;
var gridContainerNumberOfColumns = 30;
var gridCompactContainerNumberOfColumns = 12;

/*--------------*/

var gridColumnWidth = gridUsefulWidth / gridNumberOfColumns;

/*--------------*/

module.exports = {
  _namespace: 'layout',
  gridNumberOfColumns: gridNumberOfColumns,
  gridUsefulWidth: gridUsefulWidth,
  usefulWidth: usefulWidth,
  gutter: gutter,
  gridSectionNumberOfColumns: gridSectionNumberOfColumns,
  gridContainerNumberOfColumns: gridContainerNumberOfColumns,
  gridCompactContainerNumberOfColumns: gridCompactContainerNumberOfColumns,
  gridColumnWidth: gridColumnWidth
};
