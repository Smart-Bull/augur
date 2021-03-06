import logError from 'utils/log-error';
import { NodeStyleCallback } from 'modules/types';
import { augurSdk } from 'services/augursdk';
import { AppStatus } from 'modules/app/store/app-status';

export const loadMarketOrderBook = (
  marketId: string,
  callback: NodeStyleCallback = logError
) => async () => {
  if (marketId == null) {
    return callback('must specify market ID');
  }
  const { loginAccount: { address: account } } = AppStatus.get();
  const augur = augurSdk.get();
  const expirationCutoffSeconds = await augur.getGasConfirmEstimate();
  let params = account
    ? { marketId, account, expirationCutoffSeconds, ignoreCrossOrders: true }
    : { marketId, ignoreCrossOrders: true };
  const Augur = augurSdk.get();
  const marketOrderBook = await Augur.getMarketOrderBook(params);
  callback(null, marketOrderBook);
  return {orderBook: marketOrderBook};
};
