var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var nl2br = require('nl2br');
var report = require('@alexistessier/report');

var svgComponentBasePath = path.join(
  './',
  require('./src/main/tools/svg-component').mixin.methods.getSvgComponentBasePath()
);

var commonSvgComponentBasePath = './node_modules/xebia-web-common/generated/components/';

function loaderError(message){
  report('error', 'xebia-data-loader error: '+message);
  throw new Error(message);
}

function formatDate(value) {
  var dateMonthMatchingTable  = {
    '01': 'Jan',
    '02': 'Fév',
    '03': 'Mar',
    '04': 'Avr',
    '05': 'Mai',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aoû',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Déc'
  };

  if (_.isString(value)) {
    var date = value.split('/');

    if(date.length === 3 && date[0].length === 2 && date[1].length === 2 && date[2].length === 4){

      return {
        day : date[0],
        month: dateMonthMatchingTable[date[1]] || date[1],
        year: date[2]
      }
    }
  }

  loaderError('A date_ data must be a string with the format dd//mm/yyyy');
}

function formatSVG(value) {
  var svgComponentNormalizeName = function (name) {
    return _.upperFirst(_.camelCase(name));
  }

  if(_.isString(value)){
    var componentName = svgComponentNormalizeName(value);

    if(!fs.existsSync(path.join(svgComponentBasePath, componentName+'.vue'))
        && !fs.existsSync(path.join(commonSvgComponentBasePath, componentName+'.vue'))){
      loaderError('Impossible to find the svg "'+value+'" in the assets/svg');
    }

    return componentName;
  }

  if(_.isArray(value)){
    return _.map(value, formatSVG);
  }

  if(_.isObject(value)){
    return _.mapValues(value, formatSVG);
  }

  loaderError('An svg_ data only can be a String, an Array of String or an Object with valid svg values');
}

function formatContent(value) {
  if (_.isString(value)) {
    _value = _.trim(value);

    return {
      isText: true,
      content: nl2br(_value)
    };
  }

  if(_.isArray(value)){
    return {
      isList: true,
      content: _.map(value, function (val) {
        return formatContent(val);
      })
    };
  }

  if(_.isObject(value)){
    if (value.url && value.label) {
      return {
        isLink: true,
        content: value
      }
    }

    if (value.absolute_url && value.label) {
      value.url = value.absolute_url;

      return {
        isLink: true,
        isAbsolute: true,
        content: value
      }
    }
  }

  loaderError('An content_ data only can be a String (text) of Object (like link) or nested Arrays (list)');
}

function formatBlock(value) {
  if(_.isArray(value)){
    return _.map(value, formatContent);
  }

  loaderError('An block_ data only can be an Array of String (paragraph) of Object (like link) or nested Arrays (list)');
}

function formatObject(data) {
  return _.mapValues(data, function (value, key) {
    if (key.indexOf('svg_') === 0) {
      return formatSVG(value);
    }

    if (key.indexOf('block_') === 0) {
      return formatBlock(value);
    }

    if (key.indexOf('content_') === 0) {
      return formatContent(value);
    }

    if (key.indexOf('date_') === 0) {
      return formatDate(value);
    }

    if (_.isObject(value) && value.svg_picto) {
      return formatObject(value);
    }

    return value;
  });
}

module.exports = function xebiaDataLoader(source) {
  this.cacheable();
  var error = null;

  try{
    var _jsonText = source.substring(source.indexOf('{'), source.lastIndexOf('}') + 1);

    var data = formatObject(JSON.parse(_jsonText));
  }
  catch(err){
    error = err;
  }

  return error ? error : 'module.exports = ' + JSON.stringify(data) + ';'
}