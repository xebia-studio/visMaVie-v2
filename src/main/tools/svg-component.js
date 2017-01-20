module.exports = {
  mixin: {
    methods: {
      /*-------------------------------------------------------*/
      /*-------------------------------------------------------*/

      //Important : In order both to work correctly with webpack
      //and to check if the file exist in xebia-data-loader.js :
      //the path of generated components must be a literal string
      //AND redundant in svgComponent and getSvgComponentBasePath methods
      svgComponent: function (pictoName) {
        try {
          return require('src/generated/components/' + pictoName);
        } catch(error){
          return require('xebia-web-common/generated/components/' + pictoName)
        }
      },
      getSvgComponentBasePath: function () {
        return 'src/generated/components/';
      }

      /*-------------------------------------------------------*/
      /*-------------------------------------------------------*/
      /*-------------------------------------------------------*/
    }
  }
};