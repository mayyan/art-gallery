'use strict';

import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class UploadForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            imageDate: moment(),
            imageCategory: 'other',
            imageFile: null,
            uploadStatus: ''
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
        this.handleUploadError = this.handleUploadError.bind(this);
    }

    handleDateChange(date) {
        this.setState({
            imageDate: date
        });
    }

    handleCategoryChange(e) {
        this.setState({
            imageCategory: e.target.value
        });
    }

    handleFileChange(e) {
        this.setState({
            imageFile: e.target.files[0]
        });
    }

    handleUploadSuccess(data, textStatus, jqXHR) {
        this.setState({
            uploadStatus: `OK: ${JSON.stringify(jqXHR.responseJSON.msg)}`
        });
    }   

    handleUploadError(jqXHR, textStatus, errorThrown) {
        this.setState({
            uploadStatus: `Error: ${JSON.stringify(jqXHR.responseJSON.msg)}`
        })
    }

    handleSubmit(e) {
        e.stopPropagation();
        e.preventDefault();

        let imageDate = this.state.imageDate.format('YYYY-MM-DD');
        let imageCategory = this.state.imageCategory;
        let inputFile = this.state.imageFile;

        var formData = new FormData();
        formData.append('imageDate', imageDate);
        formData.append('imageCategory', imageCategory);
        formData.append('inputFile', inputFile);

        $.ajax({
            url: '/services/images/',
            dataType: 'json',
            cache: false,
            method: 'post',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            data: formData,
            success: this.handleUploadSuccess,
            error: this.handleUploadError
        });
    }

    render() {
        return (
            <div className='mod-UploadForm'>
                <form ref='uploadForm' 
                        id='uploadForm' 
                        action='#' 
                        method='post' 
                        encType="multipart/form-data">

                    {/* date picker */}
                    <div className="form-group">
                        <label htmlFor="imageDate">Date</label>
                        <DatePicker 
                            name="imageDate"
                            dateFormat="YYYY-MM-DD"
                            todayButton={"Today"}
                            placeholderText="YYYY-MM-DD"
                            selected={this.state.imageDate} 
                            onChange={this.handleDateChange} />
                    </div>
      
                    {/* category */}
                    <div className="form-group">
                        <label htmlFor="imageCategory">Category</label>
                        <select className="form-control" 
                                id="imageCategory" 
                                name="imageCategory" 
                                defaultValue='other'
                                onChange={this.handleCategoryChange}>
                            <option value="academic">Academic</option>
                            <option value="animation">Animation</option>
                            <option value="comic">Comic</option>
                            <option value="sketch">Sketch</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* file selector */}
                    <div className="form-group">
                        <label htmlFor="inputFile">File input</label>
                        <input type="file" 
                            id="inputFile" 
                            name="inputFile" 
                            onChange={this.handleFileChange} />
                        <p className="help-block">png, jpg, ...</p>
                    </div>

                    <button type="button" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
                </form>

                <div id="uploadStatus">{this.state.uploadStatus}</div>

                <div className="preview"></div>
            </div>
        );
    }
}

export default UploadForm;