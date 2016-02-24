import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import PropertyGrid from './PropertyGrid';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.getAllProperties();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var propertyNodes = this.state.properties.map((property, index) => {
      return (
        <PropertyGrid property={property} />
      );
    });

    return (
      <div className='container'>
        <h3 className='text-center'>All Properties</h3>
        <div className='row'>
          {propertyNodes}
        </div>
      </div>
    );
  }
}

export default Home;
