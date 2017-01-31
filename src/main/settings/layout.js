const gridNumberOfColumns = 30;
const gridUsefulWidth = 1400;
const usefulWidth = 1400;
const gutter = 20;

const gridSectionNumberOfColumns = 26;
const gridContainerNumberOfColumns = 30;
const gridCompactContainerNumberOfColumns = 12;

/*--------------*/

const gridColumnWidth = gridUsefulWidth / gridNumberOfColumns;

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
