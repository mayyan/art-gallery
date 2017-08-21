'use strict';

import React from 'react';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let imagesData = require("../../../data/images.data.js");
        this.setState({imagesData: imagesData});
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