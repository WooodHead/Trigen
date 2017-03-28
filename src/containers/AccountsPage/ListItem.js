/**
  * A ListItem component which is connected to the application store.
  * Can be edited, canceld, saved and deleted and also has a changeHandler attached
  * to the respective input fields.
  */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Li from 'components/Li';
import Input from './Input';
import AccountControls from './AccountControls';

import {
  cancelEdit,
  deleteAccount,
  editAccount,
  handleAccountChange,
  saveAccount,
} from './ducks/actions';
import { makeGetEditedAccount } from './ducks/selectors';


export const RestyledLi = styled(Li)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 485px;
`;
export const DomainSpan = styled.span``;
export const UserNameSpan = styled.span``;

export class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  editItem = () => {
    this.props.editAccount(this.props.fakeID, this.props.account);
  }

  cancelEdit = () => {
    this.props.cancelEdit(this.props.fakeID);
  }

  deleteItem = () => {
    this.props.deleteAccount(this.props.fakeID);
  }

  saveItem = () => {
    this.props.saveAccount(this.props.EditedAccount);
  }

  handleChange = (e) => {
    this.props.handleAccountChange(this.props.fakeID, e.target);
  }

  render() {
    let account = this.props.account;

    if(account.edit) {
      account = this.props.EditedAccount ? this.props.EditedAccount : account;
    }
    console.log(account.edit);

    return (
      <RestyledLi>
        {
          account.edit
            ? ([
              <Input
                name="domain"
                onChange={this.handleChange}
                placeholder="Domain"
                type="text"
                value={account.domain}
              />,
              <Input
                name="username"
                onChange={this.handleChange}
                placeholder="username"
                type="text"
                value={account.username}
                user={true}
              />
            ]) : ([
                <DomainSpan>{account.domain}</DomainSpan>,
                <UserNameSpan>{account.username}</UserNameSpan>
              ])
        }
        <AccountControls
          edit={account.edit}
          save={this.saveItem}
          cancel={this.cancelEdit}
          editItem={this.editItem}
          delete={this.deleteItem}
        />
      </RestyledLi>
    );
  }
}

ListItem.propTypes = {
  EditedAccount: PropTypes.object,
  account: PropTypes.object,
  cancelEdit: PropTypes.func,
  deleteAccount: PropTypes.func,
  editAccount: PropTypes.func,
  fakeID: PropTypes.string,
  handleAccountChange: PropTypes.func,
  saveAccount: PropTypes.func,
};

const makeMapStateToProps = () => {
  const mapStateToProps = (state, ownProps) => {
    const getEditedAccount = makeGetEditedAccount();
    return {
      EditedAccount: getEditedAccount(state, ownProps),
    };
  };

  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    cancelEdit,
    deleteAccount,
    editAccount,
    handleAccountChange,
    saveAccount,
  }, dispatch);
};

export default connect(makeMapStateToProps, mapDispatchToProps)(ListItem);
