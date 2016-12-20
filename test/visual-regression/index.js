/*
DRAFT
This is a prototype for visual regression testing process
the idea is to take each component, mount them in a dom then 
take a screenshot then compare with the last validate shot
*/

'use strict';

var path = require('path');
var fs = require('fs');

var webpack = require("webpack");
var webpackMerge = require('webpack-merge');
var webpackProdConfig = require('../../build/webpack.prod.conf.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var _ = require('lodash');
var mkdirp = require('mkdirp');
var rmdir = require('rmdir');

var express = require('express');
var Pageres = require('pageres');
var BlinkDiff = require('blink-diff');


console.log('Visual regression testing');

var basePort = 3000;

var dorothea = function(){
	
	var componentsDirectoryPath = path.join(__dirname, '../../src/main/components');
	var testFileTempDirectory = path.join(__dirname, 'temp');

	var shotDestination = path.join(__dirname, 'rendering');
	var bootFile = path.join(__dirname, 'boot');

	var devicesList = ['1024x768', '480x320'];

	var components = {
		App: {
			states:[
				{
					title: "Hello world !!!",
					type: "good"
				},
				{
					title: "Hello kitty !!!",
					type: "bad"
				}
			]
		}
	};

	var getBootContent = function(data, state, stateIndex) {
		var componentPath = path.join(componentsDirectoryPath, data.name+'.vue');

		var fileContent = fs.readFileSync(componentPath, {encoding: 'utf-8'});

		var componentProps = _.map(state, function (value, key) {
			return  _.isBoolean(value) ? (value ? key : '')
			: key+'='+(_.isNumber(value) ? value : '"'+value+'"');
		}).join(' ');

		return {
			title: data.name + ' ' + stateIndex,
			"import-component": 'components/'+data.name,
			"component-name": data.name,
			"component-props": componentProps
		};
	};

	_.forEach(components, function(component, name){
		console.log('Testing component '+name);

		
		var compRenderPath = path.join(shotDestination, name);

		var data = _.assign({}, _.isObject(component.data) ? component.data : {}, {
			name: name
		});

		_.forEach(component.states, function(state, index) {
			console.log('	Testing state '+index);
			var currentPort = basePort++;

			var bootContent = getBootContent(data, state, index);
			var bootHTML = fs.readFileSync(bootFile+'.html', {encoding: 'utf-8'});
			var bootJS = fs.readFileSync(bootFile+'.js', {encoding: 'utf-8'});

			for(var key in bootContent){
				var marker = '##dorothea('+key+')##';
				while(bootHTML.indexOf(marker) >= 0){
					bootHTML = bootHTML.replace(marker, bootContent[key]);
				}

				while(bootJS.indexOf(marker) >= 0){
					bootJS = bootJS.replace(marker, bootContent[key]);
				}
			}

			var bootSaveName = name+'-'+index;
			var directoryName = path.join(testFileTempDirectory, bootSaveName);

			mkdirp(path.join(directoryName, 'build'), function() {
				fs.writeFileSync(path.join(directoryName, 'index.html'), bootHTML, {encoding: 'utf-8'});
				fs.writeFileSync(path.join(directoryName, 'index.js'), bootJS, {encoding: 'utf-8'});
				
				var webpackConfig = webpackMerge(webpackProdConfig, {
					entry: {
						app: path.join(directoryName, 'index.js')
					},
					output: {
						path: path.join(directoryName, 'build')
					}
				});

				var newPlugins = [];

				_.forEach(webpackConfig.plugins, function(plugin) {
					if(!(plugin instanceof HtmlWebpackPlugin)){
						newPlugins.push(plugin);
					}
				});

				newPlugins.push(
					new HtmlWebpackPlugin({
				      filename: 'index.html',
				      template: path.join(directoryName, 'index.html'),
				      inject: true,
				      minify: {
				        removeComments: true,
				        collapseWhitespace: true,
				        removeAttributeQuotes: true
				        // more options:
				        // https://github.com/kangax/html-minifier#options-quick-reference
				      },
				      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
				      chunksSortMode: 'dependency'
				    })
				);

				webpackConfig.plugins = newPlugins;

				var compiler = webpack(webpackConfig);

				compiler.run(function(err, stats) {
					if (err) throw err;
					
					var app = express();

					app.use('/', express.static(path.join(directoryName, 'build') + '/'));
					 
					var server = app.listen(currentPort, function() {
						var address = 'localhost:'+currentPort;
						console.log('rendering server ready for '+bootSaveName+' at '+address);

						var finalShotDestination = path.join(shotDestination, name, 'state-'+index);

						mkdirp(finalShotDestination, function () {
							var currentTimestamp = Date.now();
							var pageres = new Pageres({
								delay: 2,
								filename: "<%= size %>-"+currentTimestamp
							})
							.src(address, devicesList)
							.dest(finalShotDestination)
							.run().then(function () {
								console.log('Shot done');
								server.close();
								console.log('server stopped at '+address);

								rmdir(directoryName, function (err) {
									//if (err) throw err;

									compareWithLast(path.join(shotDestination, name, 'state-'+index), currentTimestamp, devicesList);
								});
							});
						});
					});
				});
			});
		});		
	})
};

dorothea();

function getLastValidate(directory){
	if(fs.existsSync(path.join(directory, 'status.json'))){
		var status = require(path.join(directory, 'status.json'));

		return status.referenceShot;
	}

	return null;
}

function compareWithLast(directory, currentTimestamp, resolutionsList) {
	var last = getLastValidate(directory); 
	var noChange = true;
	var needValidation = false;

	if (last === null) {
		//throw new Error('No referenceShot defined for '+directory);
		//return;
		/*fs.writeFileSync(path.join(directory, 'status.json'), JSON.stringify({
			referenceShot: currentTimestamp
		}), {encoding: 'utf-8'});*/

		needValidation = true;
		step2();
	}
	else{	
		console.log('hello needValidation', last);
		
		Promise.all(_.map(resolutionsList, function (size) {
			return new Promise(function (resolve, reject) {
				var diff = new BlinkDiff({
				    imageAPath: path.join(directory, size+'-'+currentTimestamp+'.png'), // Use file-path
				    imageBPath: path.join(directory, size+'-'+last+'.png'),

				    thresholdType: BlinkDiff.THRESHOLD_PIXEL,
				    threshold: 0.00
				});

				diff.run(function (error, result) {
				   if (error) {
				      reject(error);
				   } else {
				      console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
				      console.log('Found ' + result.differences + ' differences.');

				      if(diff.hasPassed(result.code)){
				      	needValidation = false;
				      }
				      else{
				      	needValidation = true;
				      }

				      resolve();
				   }
				});
			});
		})).then(function () {
			step2();
		}).catch(function (err) {
			throw err;
		});
	}

	function step2(){
		if (needValidation) {
			noChange = false;
		}

		if(noChange){
			var renderPath = directory;

			Promise.all(_.map(resolutionsList, function (size) {
				return new Promise(function (resolve, reject) {
					fs.unlink(path.join(directory, size+'-'+currentTimestamp+'.png'), function (err) {
						if (err) {reject(err);}
						resolve();
					});
				});
			})).then(function () {
				console.log('no change remove done')
			}).catch(function (err) {
				throw err;
			});
		}
		else{
			throw new Error('Difference detected');
		}
	}
}