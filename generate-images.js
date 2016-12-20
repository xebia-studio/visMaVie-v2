var path = require('path');
var _ = require('lodash');

/*----------------------------*/

var SvgComponentGenerator = require('./svg-component-generator');

var inputPath = path.join(__dirname, 'src/main/assets/images/svg');

var svgGen = new SvgComponentGenerator({
	inputPath: inputPath,
	classAttributeString: 'className',
	attributesToRemove: ['id', 'xmlns', 'height', 'width'],
	toolsOutputPath: path.join(__dirname, 'src/generated/tools/svgComponent.styl'),
	outputPath: path.join(__dirname, './src/generated/components'),
	sizeAliases: require(path.join(inputPath, 'size-aliases.js')),
	fileContentTransformMethod: function (name, content) {
		var componentName = _.upperFirst(_.camelCase(name));
		var componentContent = [
			"<template>",
			content,
			"</template>",
			"<script>",
			"export default {",
			"name: '"+componentName+"'",
			"}",
			"</script>",
			"<style>",
			"</style>"
		].join('\n');

		return [{
			name: componentName+'.vue',
			content: componentContent
		}]
	}
});

svgGen.run();

/*----------------------------*/