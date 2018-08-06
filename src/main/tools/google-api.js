'use strict';

import google from 'google-client-api'
import {apiKey} from 'data/google-api.json'

let _gapi = null;
let _clientLoaded = false;
let _initedClient = null;

function getGapi() {
	return _gapi ? Promise.resolve(_gapi) : new Promise(resolve => {
		google().then(gapi => {
			resolve((_gapi = gapi));
		})
	});
}

function loadClient() {
	return _clientLoaded ? getGapi() : new Promise(resolve => {
		getGapi().then(gapi => {
			gapi.load('client', ()=>{
				_clientLoaded = true;
				resolve(gapi);
			});
		})
	});
}

function initClient() {
	return _initedClient ? Promise.resolve(_initedClient) : new Promise(resolve => {
		loadClient().then(gapi => {
			gapi.client.init({
				apiKey,
			}).then(()=>{
				resolve((_initedClient = gapi.client));
			});
		});
	})
}

const api = {
	client: {
		request(req){
			return new Promise((resolve, reject) => {
				initClient().then(client => {
					client.request(req).then(res => {
						resolve(res);
					}, reason => {
						const err = new Error('Error: ' + reason.result.error.message);
						console.log(err.message);
						reject ? reject(err) : null;
					})
				});
			});
			
		},
		buildRequest(_from, parameters = {}){
			const rootPath = ({})[_from] || (`https://www.googleapis.com/${_from}`);

			let paramsPath = '';
			const parametersKeys = Object.keys(parameters);
			if (parametersKeys.length) {
				paramsPath = '?'+parametersKeys.map(key => key+'='+parameters[key]).join('&');
			}

			return new Promise((resolve, reject) => {
				api.client.request({
					path: `${rootPath}${paramsPath}`
				}).then(res => resolve(res), res => reject(res));
			});
		}
	}
}

module.exports = api;