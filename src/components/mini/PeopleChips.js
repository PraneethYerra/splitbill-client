import React from 'react';
import Chip from 'material-ui/Chip';
class PeopleChips extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {chipData: 
          this.props.people
      };
        this.styles = {
          chip: {
            margin: 4,
          },
          wrapper: {
            display: 'flex',
            flexWrap: 'wrap',
          },
        };
      }
    
      // handleRequestDelete = (key) => {

      //   this.chipData = this.state.chipData;
      //   const chipToDelete = key;
      //   this.chipData.splice(chipToDelete, 1);
      //   this.setState({chipData: this.chipData});
      //   this.props.updatePeopleData(this.chipData,chipToDelete);

      // };
      handleRequestDelete = (key) => {
                let IndexToDelete = key;
                // this.chipData = this.state.chipData;
                // const chipToDelete = key;
                // this.chipData.splice(chipToDelete, 1);
                // this.setState({chipData: this.chipData});
                this.props.updatePeopleData(IndexToDelete);
        
              };
    
      renderChip(data,key) {
        if(data){
        return (
          <Chip
            key={key}
            onRequestDelete={() => this.handleRequestDelete(key)}
            style={this.styles.chip}
          >
            {data}
          </Chip>
        );
      }
      }
    
      render() {
        return (
          <div style={this.styles.wrapper}>
            <Chip style={this.styles.chip}>you</Chip> 
            { 
              this.props.people.map(this.renderChip, this)
            }
          </div>
        );
      }
    }
    export default PeopleChips