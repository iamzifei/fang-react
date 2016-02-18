import React from 'react';
import AddPropertyStore from '../stores/AddPropertyStore';
import AddPropertyActions from '../actions/AddPropertyActions';

class AddProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = AddPropertyStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AddPropertyStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AddPropertyStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        var name = this.state.name.trim();
        var gender = this.state.gender;

        if (!name) {
            AddPropertyActions.invalidName();
            this.refs.nameTextField.getDOMNode().focus();
        }

        if (!gender) {
            AddPropertyActions.invalidGender();
        }

        if (name && gender) {
            AddPropertyActions.AddProperty(name, gender);
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row flipInX animated'>
                    <div className='col-sm-8'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Add Character</div>
                            <div className='panel-body'>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className={'form-group ' + this.state.nameValidationState}>
                                        <label className='control-label'>Character Name</label>
                                        <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                                               onChange={AddPropertyActions.updateName} autoFocus/>
                                        <span className='help-block'>{this.state.helpBlock}</span>
                                    </div>
                                    <div className={'form-group ' + this.state.genderValidationState}>
                                        <div className='radio radio-inline'>
                                            <input type='radio' name='gender' id='female' value='Female' checked={this.state.gender === 'Female'}
                                                   onChange={AddPropertyActions.updateGender}/>
                                            <label htmlFor='female'>Female</label>
                                        </div>
                                        <div className='radio radio-inline'>
                                            <input type='radio' name='gender' id='male' value='Male' checked={this.state.gender === 'Male'}
                                                   onChange={AddPropertyActions.updateGender}/>
                                            <label htmlFor='male'>Male</label>
                                        </div>
                                    </div>
                                    <button type='submit' className='btn btn-primary'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProperty;
