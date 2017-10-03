import React, { Component } from 'react'
import DatePicker from 'material-ui/DatePicker';
const defaultDate = new Date();
class DateField extends Component {
    constructor(props){
        super(props);

        
    }
    render () {
        return (
            <DatePicker hintText="Date" autoOk={true} defaultDate={defaultDate} />
        )
    }
}

export default DateField