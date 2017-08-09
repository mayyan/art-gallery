'use strict';

import '../stylesheets/normalize.css';
import '../stylesheets/index_style.less';

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