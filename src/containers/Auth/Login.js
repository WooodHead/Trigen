import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';

import LoginForm from './LoginForm';
import FormDivider from './FormDivider';
import Wrapper from './Wrapper';

import { loginSubmit } from './ducks/actions';
import { getLoadingState } from './ducks/selectors';


export class Login extends Component {
  handleSubmit = values => {
    this.props.loginSubmit(values);
  }

  render() {
    return (
      <Wrapper>
        <LoginForm onSubmit={this.handleSubmit} />
        <FormDivider>Noch keinen Account?</FormDivider>
        {
          this.props.isLoading &&
            <LoadingSpinner />
        }
        <Button to="/register" secondary>Registrieren</Button>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  loginSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    isLoading: getLoadingState(state),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loginSubmit,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
