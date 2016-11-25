# visMaVie-v2
Rewriting of the website http://vismavie.xebia.fr
To collaborate follow the steps:

## Environments
- [Main](http://xebia-vis-ma-vie--master.s3-website.eu-central-1.amazonaws.com)
- [Integration](http://xebia-vis-ma-vie--integ.s3-website.eu-central-1.amazonaws.com)
- [Dev](http://xebia-vis-ma-vie--dev.s3-website.eu-central-1.amazonaws.com)

## To collaborate

### Clone the repository
```console
git clone https://github.com/xebia-studio/visMaVie-v2
```
### Install dependencies
```console
npm install
```
### Build in development mode
```console
npm run build:dev
```
### Or, build in production mode
```console
npm run build:prod
```
### Start the app with webpack dev server
```console
npm run start:dev
```
### To launch the tests:
```console
npm run phantom --> on a terminal to launch phantomjs
npm run test --> on another terminal to launch the tests
```
### Deploy
### On master
```console
npm run deploy:master
```
### On integ
```console
npm run deploy:integ
```
### On dev
```console
npm run deploy:dev
```

