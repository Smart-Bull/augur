import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { augurSdk } from 'services/augursdk';
import { AppState } from 'appStore';
import { refreshUserOpenOrders } from 'modules/markets/actions/market-trading-history-management';
import { updateLoginAccount } from 'modules/account/actions/login-account';
import { AppStatus } from 'modules/app/store/app-status';

export const loadAccountOpenOrders = () => async (
  dispatch: ThunkDispatch<void, any, Action>,
  getState: () => AppState
) => {
  const {
    loginAccount: { mixedCaseAddress: account },
    universe: { id: universe },
  } = AppStatus.get();
  const Augur = augurSdk.get();
  const userOpenOrders = await Augur.getUserOpenOrders({
    universe,
    account,
  });
  dispatch(refreshUserOpenOrders(userOpenOrders.orders));
  if (userOpenOrders.totalOpenOrdersFrozenFunds) {
    dispatch(
      updateLoginAccount({
        totalOpenOrdersFrozenFunds: userOpenOrders.totalOpenOrdersFrozenFunds,
      })
    );
    AppStatus.actions.updateLoginAccount({
      totalOpenOrdersFrozenFunds: userOpenOrders.totalOpenOrdersFrozenFunds,
    });
  }
};
