import React, { Component } from 'react'
import DatePicker from 'material-ui/DatePicker';
const defaultDate = new Date();
class DateField extends Component {
    constructor(props){
        super(props);

        
    }
    handleChange(event,date){
        console.log('date',date)

        // let momentDate = moment(date);
        // let year = momentDate.year();
        // let month = momentDate.month();
        // let day = momentDate.date();
        // console.log(year)
        // let Date = new Date(year,month,day);
        // console.log(Date)
        let newDate = Date.parse(date);
        this.props.updateDate(newDate)
    }
    render () {
        return (
            <DatePicker onChange={this.handleChange.bind(this)}
             hintText="Date" autoOk={true} defaultDate={defaultDate} />
        )
    }
}

export default DateField