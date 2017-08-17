'use strict';

import React from 'react';
import ImagesData from "../../../data/images.data.js";

class Gallery extends React.Component {

    render() {
        const imageItems = ImagesData.map((imageItem, index) =>
            <div className="grid-item" key={index}><img src={imageItem.fileName} /></div>
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