import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// action
import { fetchUserRequests, fetchAllRequests } from '../../actions/requests';
import { deleteUserRequest } from '../../actions/request';

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state ={};

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { fetchUserRequests, fetchAllRequests, auth: { user: { user } } } = this.props;

    if (user.isadmin) {
      return fetchAllRequests()
    }

    return fetchUserRequests();
  }

  handleDelete(event) {
    const { currentTarget: { value: requestId } } = event;

    const { 
      deleteUserRequest,
      history,
      fetchUserRequests
    } = this.props;

    swal({
      title: "Are you sure?",
      text: "If you click 'OK', this request will be removed from your list",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        deleteUserRequest(requestId);
        history.push('/requests');
        fetchUserRequests();
      }
    });
  }



  render() {
    const { requests, auth: { user: { user } } } = this.props;
    if (requests && requests.loading) {
      return (
        <div className='loading-spinner'>
          <i className='fa fa-3x fa-spinner fa-spin' />
        </div>
      )
    }

    const { requests: { data, message } } = requests;


    return (
      <div className="signUp">
        <div className="header">
          <div className="container">
            { user.isadmin ?  <h1>All Requests</h1> : <h1>My Requests</h1> }
            <p id="status-message">
              { message }
            </p>
          </div>
        </div>

        <div className="table-body">
          <table id="requests-table">
            <thead>
              <tr>
                { user.isadmin ? <th scope="col"> User ID</th> : null }
                { user.isadmin ? <th scope="col"> Name </th> : null }
                <th scope="col"> Product </th>
                <th scope="col">Request Type</th>
                <th scope="col">Status</th>
                <th scope="col">Details</th>
                { !user.isadmin ? <th scope="col">Cancel</th> : null }
              </tr>
            </thead>
            <tbody id="table-body">
              {data && data.map(request => {
                const { requestid, product, requesttype, requeststatus, userid, firstname, lastname } = request;
                return (
                  <tr key={requestid}>
                    { user.isadmin ?  <td data-label="User ID">{userid}</td> : null }
                    { user.isadmin ?  <td data-label="Name">{ firstname + ' ' + lastname }</td> : null }
                    <td data-label="Product">{product}</td>
                    <td data-label="Request Type">{requesttype}</td>
                    <td data-label="Status">{requeststatus}</td>
                    <td data-label="Details">
                      <Link className="btn btn-details" to={`/request/${requestid}`}> details </Link>
                    </td>
                    { 
                      !user.isadmin ? 
                        <td data-label="Cancel">
                          <button className="btn btn-delete" 
                            disabled={requeststatus !== "pending" ? "disabled" : ''}
                            onClick={ this.handleDelete }
                            value={ requestid }
                          > 
                            delete
                          </button>
                        </td> : null
                    }
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
  fetchUserRequests: PropTypes.func.isRequired,
  fetchAllRequests: PropTypes.func.isRequired,
  deleteUserRequest: PropTypes.func.isRequired,
  requests: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  requests: state.requests,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchUserRequests, fetchAllRequests, deleteUserRequest })(Requests);