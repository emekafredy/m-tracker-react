import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// action
import { createNewRequest } from '../../actions/createRequest';


export class CreateRequest extends Component {
  constructor() {
    super();
    this.state = {
      product: 'laptop',
      requestType: 'maintenance',
      issue: '',
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.request.request.success) {
      this.props.history.push('/requests');
    }
    if (nextProps.errors.errors) {
      this.setState({ errors: nextProps.errors.errors })
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    const { createNewRequest, request } = this.props;
    
    const newRequest = {
      product: this.state.product,
      requestType: this.state.requestType,
      issue: this.state.issue,
    }

    createNewRequest(newRequest);
  }



  render() {
    const { errors } = this.state;
    return (
      <div className="signUp">
        <div className="header">
          <div className="container">
            <h1>New Request</h1>
          </div>
        </div>

        <div className="container">
        <div className="back">
          <Link className="btn btn-back" to="/requests">
            <i className="fa fa-arrow-left"></i> Back to requests
          </Link>
        </div>

        <div className="card">
          <div className="title">
            Add Request
          </div>
          <form onSubmit={ this.handleSubmit }>
            <div className="form">
              <label>Product</label>
              <select name="product" value={ this.state.product } onChange={ this.handleChange } id="my-product">
                <option value="laptop">laptop</option>
                <option value="monitor">monitor</option>
                <option value="chair">chair</option>
                <option value="desk">desk</option>
                <option value="charger">charger</option>
                <option value="headphone">headphone</option>
              </select>
            </div>
            { errors.product ? (<div className="error-message">{ errors.product }</div>) : '' }

            <div className="form">
              <label>Request Type</label>
              <select name="requestType" value={ this.state.requestType } onChange={ this.handleChange }>
                <option value="maintenance">maintenance</option>
                <option value="repair">repair</option>
                <option value="replace">replace</option>
              </select>
            </div>
            { errors.requestType ? (<div className="error-message">{ errors.requestType }</div>) : '' }


            <div className="form">
              <label htmlFor="type">Issue</label>
              <textarea name="issue" value={this.state.issue} onChange={ this.handleChange } />
            </div>
            { errors.Issue ? (<div className="error-message">{ errors.Issue }</div>) : '' }

            <input type="submit" value="submit" className="btn btn-back" id="create-request"/>
          </form>
        </div>
      </div>

      </div>
    )
  }
}

CreateRequest.propTypes = {
  createNewRequest: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  request: state.request,
  errors: state.errors,
});

export default connect(mapStateToProps, { createNewRequest })(withRouter(CreateRequest));