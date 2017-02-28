const { kebabCase } = require('lodash');

const annonces = [
'Lead Tech',
'Expert',
'Développeur',
'Coding Architect',
'Coach',
'Studio Team Leader',
'Scrum Master'
];

module.exports = annonces.map((jobKey) => kebabCase(jobKey));
