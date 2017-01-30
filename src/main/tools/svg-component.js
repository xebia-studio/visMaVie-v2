import _ from 'lodash';

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
        const componentName = _.upperFirst(_.camelCase(pictoName));
        try {
          return require('src/generated/components/' + componentName);
        } catch(error){
          return require('xebia-web-common/generated/components/' + componentName)
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