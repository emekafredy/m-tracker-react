import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// action
import { fetchRequests } from '../../actions/requests';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state ={};
  }

  componentDidMount() {
    const { fetchRequests } = this.props;
    fetchRequests();
  }



  render() {
    const { requests } = this.props;
  
    if (requests && requests.loading) {
      return (
        <div className='loading-spinner'>
          <i className='fa fa-3x fa-spinner fa-spin' />
        </div>
      )
    }

    const { requests: { data, message } } = requests;
    // console.log('REQS', requests)


    return (
      <div className="signUp">
        <div className="header">
          <div className="container">
            <h1>My Requests</h1>
            <p id="status-message">
              { message }
            </p>
          </div>
        </div>

        <div className="table-body">
          <table id="requests-table">
            <thead>
              <tr>
                <th scope="col"> Product </th>
                <th scope="col">Request Type</th>
                <th scope="col">Status</th>
                <th scope="col">Details</th>
                <th scope="col">Cancel</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {data && data.map(request => {
                const { requestid, product, requesttype, requeststatus } = request;
                return (
                  <tr key={requestid}>
                    <td data-label="Product">{product}</td>
                    <td data-label="Request Type">{requesttype}</td>
                    <td data-label="Status">{requeststatus}</td>
                    <td data-label="Details">
                      <button className="btn btn-details"> details </button>
                    </td>
                    <td data-label="Cancel">
                      <button className="btn btn-delete"> delete </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

Requests.propTypes = {
  fetchRequests: PropTypes.func.isRequired,
  requests: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  requests: state.requests
});

export default connect(mapStateToProps, { fetchRequests })(Requests);