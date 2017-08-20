'use strict';

import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class UploadForm extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            imageDate: moment()
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({
            imageDate: date
        });
    }

    render() {
        return (
            <form ref='uploadForm' 
                    id='uploadForm' 
                    action='/upload' 
                    method='post' 
                    encType="multipart/form-data">

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
  
                <div className="form-group">
                    <label htmlFor="imageCategory">Category</label>
                    <select className="form-control" id="imageCategory" name="imageCategory">
                        <option value="academic">Academic</option>
                        <option value="animation">Animation</option>
                        <option value="comic">Comic</option>
                        <option value="sketch">Sketch</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="inputFile">File input</label>
                    <input type="file" id="inputFile" name="inputFile" />
                    <p className="help-block">png, jpg, ...</p>
                </div>

                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        );
    }
}

export default UploadForm;