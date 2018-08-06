'use strict';

const fastclick = require('fastclick');

import {domReady} from '@alexistessier/dom';

domReady(()=>{
    fastclick.attach(document.body);
});