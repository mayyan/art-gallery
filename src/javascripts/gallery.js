'use strict';

// Bootstrap IE10 viewport hack for Surface/desktop Windows 8 bug
import '../stylesheets/ie10-viewport-bug-workaround.css';

import '../stylesheets/gallery_style.less';

(function() {

    var grid = $('.grid').masonry({
        // options
        "itemSelector": ".grid-item", 
        "columnWidth": 300,
        "gutter": 10
    });

    // layout Masonry after each image loads
    grid.imagesLoaded().progress( function() {
        grid.masonry('layout');
    });
    
}());

// Bootstrap IE10 viewport hack for Surface/desktop Windows 8 bug
import './ie10-viewport-bug-workaround.js'