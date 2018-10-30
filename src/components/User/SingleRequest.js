import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// action
import { fetchSingleRequest, fetchUserSingleRequest } from '../../actions/request';
import { processRequest } from '../../actions/processRequest';
import { fetchAllRequests } from '../../actions/requests';

class SingleRequest extends Component {
  constructor(props) {
    super(props);
    this.state ={};

    this.handleProcess = this.handleProcess.bind(this);
    this.handleApproval = this.handleApproval.bind(this);
    this.handleDisapproval = this.handleDisapproval.bind(this);
    this.handleResolution = this.handleResolution.bind(this);
  }

  componentDidMount() {
    const { 
      fetchSingleRequest,
      fetchUserSingleRequest,
      auth: { user: { user } },
      match: { params: { requestId: searchTerm } },
    } = this.props;

    if (user.isadmin) {
      return fetchSingleRequest(searchTerm)
    }

    return fetchUserSingleRequest(searchTerm);
  }

  handleProcess(status) {
    const { 
      processRequest,
      auth: { user: { user } },
      match: { params: { requestId: searchTerm } },
      history,
      fetchAllRequests
    } = this.props;

    processRequest(searchTerm, status);
    history.push('/requests');
    fetchAllRequests();
  }

  handleApproval() {
    const { singleRequest: { singleRequest: { data } } } = this.props;

    if (data && data[0].requeststatus === 'pending') {
      this.handleProcess('approve')
    }
  }

  handleDisapproval() {
    const { singleRequest: { singleRequest: { data } } } = this.props;

    if (data && data[0].requeststatus === 'pending') {
      this.handleProcess('disapprove')
    }
  }

  handleResolution() {
    const { singleRequest: { singleRequest: { data } } } = this.props;

    if (data && data[0].requeststatus === 'approved') {
      this.handleProcess('resolve')
    }
  }



  render() {
    const { 
      singleRequest,
      auth: { user: { user } }
    } = this.props;

    if (singleRequest && singleRequest.loading) {
      return (
        <div className='loading-spinner'>
          <i className='fa fa-3x fa-spinner fa-spin' />
        </div>
      )
    }

    const { singleRequest: { data } } = singleRequest;

    return (
      <div className="signUp">
        <div className="header">
          <div className="container">
            {user.isadmin ? <h1 className="h1-bottom">{ data && data[0].firstname }'s request</h1> :
              <h1 className="h1-bottom">My request</h1> }
          </div>
          <div className="back">
            <Link className="btn btn-back" to="/requests">
              <i className="fa fa-arrow-left"></i> Back to requests
            </Link>
          </div>
        </div>

        <div className="details-card">
          <div className="wrapper">
            <div className="column">
              <div>
                <img src={ data && data[0].imageurl } alt="" className="single-req-img"/>
              </div>
            </div>
            <div className="column">
              <p className="para"> <label>Request ID</label> : <span> { data && data[0].requestid } </span></p>
              <p className="para"> <label>Product</label> : <span>{ data && data[0].product }</span></p><br/>
              <p className="para"> <label>Request Date</label> : <span>{ data && data[0].requestdate }</span></p>
              <p className="para"> <label>Request type</label> : <span>{ data && data[0].requesttype }</span></p>
              <p className="para"> <label>Isssue</label>: <br/> <span> { data && data[0].issue } </span></p>
              <p className="para"> <label>Request status</label> : <span>{ data && data[0].requeststatus }</span></p>
              {
                data && data[0].requeststatus === 'approved' ?
                <p className="para"> <label>Approved Date</label> : 
                  <span>{ data && data[0].approvedat }
                </span></p> : null
              }

              {
                data && data[0].requeststatus === 'disapproved' ?
                <p className="para"> <label>Approved Date</label> : 
                  <span>{ data && data[0].disapprovedat }
                </span></p> : null
              }

              {
                data && data[0].requeststatus === 'resolved' ?
                <p className="para"> <label>Approved Date</label> : 
                  <span>{ data && data[0].resolvedat }
                </span></p> : null
              }
              <div className="btn-div float-right">
                {
                  !user.isadmin ? 
                  <Link className="btn btn-details btn-margin" to={`/request/${data && data[0].requestid}/edit`}>
                    <i className="fa fa-pencil-square-o"></i> Edit Request
                  </Link> : null
                }
                {
                  data && data[0].requeststatus === 'pending' && !user.isadmin ?
                  <button className="btn btn-delete">
                    <i className="fa fa-close"></i> Delete
                  </button> : null
                }
                {
                  data && data[0].requeststatus === 'pending' && user.isadmin ?
                  <button className="btn btn-details btn-margin" onClick={ this.handleApproval }>
                    <i className="fa fa-thumbs-up"></i> Approve
                  </button> : null
                }
                {
                  data && data[0].requeststatus === 'pending' && user.isadmin ?
                  <button className="btn btn-delete" onClick={ this.handleDisapproval }>
                    <i className="fa fa-thumbs-down"></i> Disapprove
                  </button> : null
                }
                {
                  data && data[0].requeststatus === 'approved' && user.isadmin ?
                  <button className="btn resolve-btn" onClick={ this.handleResolution }>
                    <i className="fa fa-check"></i> Check as resolved
                  </button> : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SingleRequest.propTypes = {
  fetchSingleRequest: PropTypes.func.isRequired,
  fetchUserSingleRequest: PropTypes.func.isRequired,
  processRequest: PropTypes.func.isRequired,
  fetchAllRequests: PropTypes.func.isRequired,
  singleRequest: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  singleRequest: state.singleRequest,
  auth: state.auth,
  processed: state. processed
});

export default connect(mapStateToProps, { 
  fetchSingleRequest, 
  fetchUserSingleRequest, 
  processRequest, 
  fetchAllRequests 
})(SingleRequest);