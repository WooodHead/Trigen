/**
  * User registration page
  *
  * @namespace Register
  */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as selectors from './ducks/selectors';

import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';

import Wrapper from './Wrapper';
import RegisterForm from './RegisterForm';
import FormDivider from './FormDivider';

import { registerSubmit } from './ducks/actions';


export class Register extends Component {
  handleSubmit = values => {
    this.props.registerSubmit(values);
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    return (
      this.props.hasRegistered || this.props.isLoggedIn
        ? (
          <Redirect to={from} />
        ) : (
            <Wrapper>
              <RegisterForm onSubmit={this.handleSubmit} />
              {
                this.props.isLoading &&
                  <LoadingSpinner />
              }
              <FormDivider>Schon registriert?</FormDivider>
              <Button to="/login" secondary>Anmelden</Button>
            </Wrapper>
        )
    );
  }
}

Register.propTypes = {
  registerSubmit: PropTypes.func.isRequired,
  location: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  hasRegistered: PropTypes.bool,
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    registerSubmit,
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    hasRegistered: selectors.getRegistered(state),
    isLoggedIn: selectors.getLoggedIn(state),
    isLoading: selectors.getLoadingState(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
