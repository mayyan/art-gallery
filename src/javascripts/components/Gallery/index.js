'use strict';

import React from 'react';
import mui from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import FileEditor from '../FileEditor';


class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorized: true,
            fileEditorModalIsOpen: false,
            imageDataInEditing: null
        };
        this.handleDeleteButtonClicked = this.handleDeleteButtonClicked.bind(this);
        this.handleEditButtonClicked = this.handleEditButtonClicked.bind(this);
        this.toggleFileEditorModal = this.toggleFileEditorModal.bind(this);
    }

    componentDidMount() {
        fetch('/services/images/')
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

    handleDeleteButtonClicked(e, imageItem) {
        if (!confirm(`Are you sure to delete ${imageItem.key}?`)) {
            return;
        }

        fetch(`/services/images/${imageItem.key}`, {
            method: 'delete',
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(json => {
            if (json.msg !== 'not authorized') {
                this.setState({authorized: true, imagesData: json});
            } else {
                this.setState({authorized: false});
            }
        })
        .catch((error) => {
            // AHHHH! An Error!
            console.log(error);
        });
    }

    handleEditButtonClicked(e, imageItem) {
        this.toggleFileEditorModal(imageItem);
    }

    toggleFileEditorModal(imageItem) {
        this.setState({
            fileEditorModalIsOpen: !this.state.fileEditorModalIsOpen,
            imageDataInEditing: imageItem
        });
    }

    render() {
        if (!this.state.imagesData) {
            return (
                <div>
                    loading...
                </div>
            );
        }

        let imageItems = this.state.imagesData.map((imageItem, index) =>
            <div className="grid-item" key={imageItem.key} >
                <img src={imageItem.imagePath} />

                {this.state.authorized &&
                <div className='action-panel'>
                    <button className='btn-delete' onClick={(e) => this.handleDeleteButtonClicked(e, imageItem)}><DeleteIcon /></button>
                    <button className='btn-edit' onClick={(e) => this.handleEditButtonClicked(e, imageItem)}><ModeEditIcon /></button>
                </div>
                }

            </div>
        );

        return (
            <div>
                <h1>Hello, {this.props.name}</h1>

                <div className="grid">
                    {imageItems}
                </div>

                <FileEditor 
                    show={this.state.fileEditorModalIsOpen}
                    imageData={this.state.imageDataInEditing}
                    onClose={(e) => this.toggleFileEditorModal(this.state.imageDataInEditing)}>
                </FileEditor>
            </div>
        );
    }
}

export default Gallery;