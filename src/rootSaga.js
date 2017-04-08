/**
  * Root saga combining all application sagas
  */
import authSaga from 'containers/Auth/ducks/sagas';
import accountsSaga from 'containers/AccountsPage/ducks/sagas';
import passwordGenSaga from 'containers/PasswordGenerator/ducks/sagas';
import slotPurchaseSaga from 'containers/PricingPage/ducks/sagas';


export default function *() {
  yield [
    authSaga(),
    accountsSaga(),
    passwordGenSaga(),
    slotPurchaseSaga(),
  ];
}
