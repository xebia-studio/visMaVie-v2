//Example of a filter that will uppercase the items filtered
let ExampleFilter = function () {
  return function(items) {
    return items.map( item => {
      if(typeof item == 'string'){
        return item.toUpperCase();
      }
    });
  }
};

export default ExampleFilter;