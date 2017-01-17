var gridNumberOfColumns = 28;
var gridUsefulWidth = usefulWidth = 1400;
var gutter = 20;

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
  usefulWidth: usefulWidth,
  gutter: gutter,
  gridSectionNumberOfColumns: gridSectionNumberOfColumns,
  gridContainerNumberOfColumns: gridContainerNumberOfColumns,
  gridCompactContainerNumberOfColumns: gridCompactContainerNumberOfColumns,
  gridColumnWidth: gridColumnWidth
};
