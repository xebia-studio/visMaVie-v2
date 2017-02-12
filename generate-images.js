const path = require('path');
const _ = require('lodash');

/*----------------------------*/

const SvgComponentGenerator = require('./svg-component-generator');

const inputPath = path.join(__dirname, 'src/main/assets/images/svg');

const svgGen = new SvgComponentGenerator({
	inputPath: inputPath,
	classAttributeString: 'className',
	attributesToRemove: ['id', 'xmlns', 'height', 'width'],
	toolsOutputPath: path.join(__dirname, 'src/generated/tools/svgComponent.styl'),
	outputPath: path.join(__dirname, './src/generated/components'),
	sizeAliases: require(path.join(inputPath, 'size-aliases.js')),
	fileContentTransformMethod: function (name, content) {
		const componentName = _.upperFirst(_.camelCase(name));
		const componentContent = [
			'<template>',
			content,
			'</template>',
			'<script>',
			'export default {',
			'name: \''+componentName+'\'',
			'}',
			'</script>',
			'<style>',
			'</style>'
		].join('\n');

		return [{
			name: componentName+'.vue',
			content: componentContent
		}];
	}
});

svgGen.run();

/*----------------------------*/
