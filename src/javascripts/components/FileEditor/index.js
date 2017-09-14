'use strict';

import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class FileEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageData: null,
            show: false,
            saveStatus: ''
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSaveButtonClicked = this.handleSaveButtonClicked.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.imageData === nextProps.imageData &&
            this.props.show === nextProps.show) {
            return false;
        }

        this.setState({
            imageData: nextProps.imageData,
            show: nextProps.show
        })
        return true;
    }

    handleDateChange(date) {
        let newImageData = this.state.imageData;
        newImageData.imageDate = date;
        this.setState({imageData: newImageData});
    }

    handleCategoryChange(e) {
        let newImageData = this.state.imageData;
        newImageData.imageCategory = $('#imageCategory').val();
        this.setState({imageData: newImageData});
    }

    handleSaveButtonClicked(e) {
        fetch(`/services/images/${this.state.imageData.key}`, {
            method: 'put',
            credentials: 'same-origin',  
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(this.state.imageData)
        })
        .then(response => response.json())
        .then(json => {
            if (json.msg) {
                this.setState({
                    saveStatus: json.msg
                });
            } else {
                this.setState({saveStatus: 'Successfully saved.', imagesData: json});
            }
        })
        .catch((error) => {
            // AHHHH! An Error!
            console.log(error);
        });
    }

    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
        };

        const thumbnailStyle = {
            width: '30%'
        };

        let formBody = null;
        if (this.state.imageData) {
            formBody = (
                <form ref='editForm' 
                        id='editForm' 
                        action='#' 
                        method='post' >

                    <input type='hidden' name='key' value={this.state.imageData.key} />
                    <input type='hidden' name='key' value={this.state.imageData.imagePath} />

                    <img src={this.state.imageData.imagePath} style={thumbnailStyle} />

                    {/* date picker */}
                    <div className="form-group">
                        <label htmlFor="imageDate">Date</label>
                        <DatePicker 
                            name="imageDate"
                            dateFormat="YYYY-MM-DD"
                            todayButton={"Today"}
                            placeholderText="YYYY-MM-DD"
                            selected={moment(this.state.imageData.imageDate)} 
                            onChange={this.handleDateChange} />
                    </div>
      
                    {/* category */}
                    <div className="form-group">
                        <label htmlFor="imageCategory">Category</label>
                        <select className="form-control" 
                                id="imageCategory" 
                                name="imageCategory" 
                                defaultValue={this.state.imageData.imageCategory}
                                onChange={this.handleCategoryChange}>
                            <option value="academic">Academic</option>
                            <option value="animation">Animation</option>
                            <option value="comic">Comic</option>
                            <option value="sketch">Sketch</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </form>
            );
        }

        return (
            <div style={backdropStyle}>
                <div style={modalStyle}>
                    {formBody}

                    {this.state.saveStatus != '' &&
                    <div id="saveStatus">{this.state.saveStatus}</div>
                    }

                    <div className="footer">
                        <button onClick={this.handleSaveButtonClicked}>
                            Save
                        </button>
                        <button onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileEditor;