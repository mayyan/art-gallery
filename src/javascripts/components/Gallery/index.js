'use strict';

import React from 'react';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // let imagesData = require("../../../data/images.data.js");
        fetch('/data/images.data.js')
        .then(response => {
            return response.json();
        })
        .then(json => {
            this.setState({imagesData: json});

            // apply masonry layout
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
        })
        .catch((error) => {
            // AHHHH! An Error!
            console.log(error);
        });
    }

    componentWillUnmount() {
    }

    render() {
        if (!this.state) {
            return (
                <div>
                    loading...
                </div>
            );
        }

        let imageItems = this.state.imagesData.map((imageItem, index) =>
            <div className="grid-item" key={index}><img src={imageItem.imagePath} /></div>
        );

        return (
            <div>
                <h1>Hello, {this.props.name}</h1>

                <div className="grid">
                    {imageItems}
                </div>
            </div>
        );
    }
}

export default Gallery;