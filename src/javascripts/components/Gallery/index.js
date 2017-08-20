'use strict';

import React from 'react';

class Gallery extends React.Component {

    render() {
        let ImagesData = require("../../../data/images.data.js");
        let imageItems = ImagesData.map((imageItem, index) =>
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