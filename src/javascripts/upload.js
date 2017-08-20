'use strict';

// Bootstrap IE10 viewport hack for Surface/desktop Windows 8 bug
import '../stylesheets/ie10-viewport-bug-workaround.css';

import '../stylesheets/upload_style.less';

import React from 'react';
import UploadForm from './components/UploadForm';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <UploadForm />,
    document.getElementById('uploadForm')
);

(function() {

    // alert('upload page js');
    
}());

// Bootstrap IE10 viewport hack for Surface/desktop Windows 8 bug
import './ie10-viewport-bug-workaround.js'