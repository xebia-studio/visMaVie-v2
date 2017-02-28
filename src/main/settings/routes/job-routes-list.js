import { keys, kebabCase } from 'lodash';

import annonces from 'data/nous-rejoindre/annonces.yaml';

module.exports = keys(annonces).map((jobKey) => kebabCase(jobKey));
