import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';

import { fetchAccounts } from 'containers/AccountsPage/ducks/actions';
import { getAccounts, getAccountListStatus } from 'containers/AccountsPage/ducks/selectors';
import { getUserID, getAuthToken } from 'containers/Auth/ducks/selectors';

import Input from 'components/Input';
import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';


export class PassGenForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      domain: '',
      username: '',
    };
  }

  componentDidMount() {
    if(!this.props.accountListStatus.fetched) {
      this.props.fetchAccounts(this.props.userID, this.props.authToken, shortid.generate);
    }
  }

  // Field validation
  validate = () => {
    let errors = [];

    if(this.state.domain.length === 0) {
      errors = errors.concat('Domain is required!');
    }

    if(this.state.username.length === 0) {
      errors = errors.concat('Username is required!');
    }

    return errors;
  }

  // Submit handling
  handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = this.validate();

    if(validationErrors.length !== 0) {
      // TODO
    }
  }

  // Autosuggest input
  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return (
      inputLength === 0
        ? []
        : this.props.accounts.filter(
          account => {
            const val = account.domain.toLowerCase().includes(inputValue);
            return val;
          }
        )
    );
  };

  getSuggestionValue = suggestion => suggestion.domain;

  onDomainChange = (event, { newValue }) => {
    this.setState({
      domain: newValue,
    });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  onSuggestionSelected = (e, { suggestion }) => {
    this.setState({
      username: suggestion.username
    });
  }

  renderSuggestion = suggestion => {
    return (
      <div>
        {`${suggestion.domain} - Username: ${suggestion.username}`}
      </div>
    );
  };

  // Username input
  onUsernameChange = e => {
    this.setState({
      username: e.target.value,
    });
  }

  clearUsername = () => {
    this.setState({ username: '' });
  }

  render() {
    const inputProps = {
      placeholder: 'Domain eingeben',
      value: this.state.domain,
      onChange: this.onDomainChange,
      type: 'search',
    };

    if(this.props.accountListStatus.isLoading) {
      return <LoadingSpinner />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          autoSuggest
          getSuggestionValue={this.getSuggestionValue}
          highlightFirstSuggestion={true}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          renderSuggestion={this.renderSuggestion}
          suggestions={this.state.suggestions}
        />
        <Input
          onFocus={this.clearUsername}
          placeholder="Username eingeben"
          value={this.state.username}
          onChange={this.onUsernameChange}
        />
        <Button submit>Generiere Passwort</Button>
      </form>
    );
  }
}

PassGenForm.propTypes = {
  accountListStatus: PropTypes.object,
  accounts: PropTypes.array,
  authToken: PropTypes.string,
  fetchAccounts: PropTypes.func,
  userID: PropTypes.number,
};

export const mapStateToProps = state => {
  return {
    accounts: getAccounts(state),
    accountListStatus: getAccountListStatus(state),
    userID: getUserID(state),
    authToken: getAuthToken(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchAccounts,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PassGenForm);
