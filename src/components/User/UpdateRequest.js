import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { fetchUserSingleRequest } from '../../actions/request';
import { updateUserRequest } from '../../actions/updateRequest';
import { fetchAllRequests } from '../../actions/requests';

class UpdateRequest extends Component {
  constructor() {
    super();
    this.state = {
      product: '',
      requestType: '',
      issue: '',
      errors: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    const { 
      fetchUserSingleRequest,
      match: { params: { requestId: searchTerm } },
    } = this.props;

    fetchUserSingleRequest(searchTerm);
  }

  componentWillReceiveProps(nextProps) {
    const { singleRequest: { singleRequest: { data } } } = nextProps;

    const product = data && data[0].product ? data[0].product : '';
    const requestType = data && data[0].requesttype ? data[0].requesttype : '';
    const issue = data && data[0].issue ? data[0].issue : '';

    this.setState({
      product,
      requestType,
      issue,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleUpdate (event) {
    event.preventDefault();

    const { 
      updateUserRequest,
      match: { params: { requestId: searchTerm } },
      fetchAllRequests,
      history
    } = this.props;
    
    const update = {
      product: this.state.product,
      requestType: this.state.requestType,
      issue: this.state.issue,
    }
    

    updateUserRequest(searchTerm, update).then((res) => {
      if (res.data && res.data.success === true) {
        const { singleRequest: { singleRequest: { data } } } = this.props;
        history.push(`/request/${data[0].requestid}`);
        return;
      }

      this.setState({ errors: 'You have a similar request that has not been processed' })
    });
  }

  render() {
    const { errors, product, requestType, issue } = this.state;
    return (
      <div className="signUp">
        <div className="header">
          <div className="container">
            <h1>Update Request</h1>
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
            <form onSubmit={ this.handleUpdate }>
              <div className="form">
                <label>Product</label>
                <select name="product" value={ product } onChange={ this.handleChange }>
                  <option value="laptop">laptop</option>
                  <option value="monitor">monitor</option>
                  <option value="chair">chair</option>
                  <option value="desk">desk</option>
                  <option value="charger">charger</option>
                  <option value="headphone">headphone</option>
                </select>
              </div>

              <div className="form">
                <label>Request Type</label>
                <select name="requestType" value={ requestType } onChange={ this.handleChange }>
                  <option value="maintenance">maintenance</option>
                  <option value="repair">repair</option>
                  <option value="replace">replace</option>
                </select>
              </div>


              <div className="form">
                <label htmlFor="type">Issue</label>
                <textarea name="issue" value={issue} onChange={ this.handleChange } />
              </div>
              { errors ? (<div className="error-message">{ errors }</div>) : '' }

              <input type="submit" value="submit" className="btn btn-back" />
            </form>
          </div>
        </div>

      </div>
    )
  }
}

UpdateRequest.propTypes = {
  fetchUserSingleRequest: PropTypes.func.isRequired,
  updateUserRequest: PropTypes.func.isRequired,
  fetchAllRequests: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  singleRequest: state.singleRequest,
  requestUpdate: state.requestUpdate,
  auth: state.auth,
});

export default connect(mapStateToProps, { 
  fetchUserSingleRequest, 
  updateUserRequest,
  fetchAllRequests
})(UpdateRequest);