import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { MarketCard } from 'modules/market-cards/market-card';
import { toggleFavorite } from 'modules/markets/actions/update-favorites';
import { hasStakeInMarket } from 'modules/account/selectors/has-stake-in-market';
import {
  MODAL_MIGRATE_MARKET,
  MODAL_REPORTING,
} from 'modules/common/constants';
import { marketLinkCopied } from 'services/analytics/helpers';
import { AppStatus } from 'modules/app/store/app-status';

const mapStateToProps = (state, ownProps) => {
  const { marketId } = ownProps.market;
  const {
    accountPositions: positions,
    pendingLiquidityOrders,
    favorites,
    orderBooks,
  } = state;
  const hasStaked = hasStakeInMarket(state, marketId);
  const { loginAccount: { address }, universe: { forkingInfo, disputeWindow }} = AppStatus.get();

  return {
    hasPosition: !!positions[marketId],
    orderBook: orderBooks[marketId]?.orderBook,
    isForking: !!forkingInfo,
    pendingLiquidityOrders,
    disputingWindowEndTime: disputeWindow?.endTime || 0,
    address,
    isFavorite: !!favorites[marketId],
    hasStaked,
    forkingMarket: forkingInfo?.forkingMarket,
    forkingEndTime: forkingInfo?.forkEndTime,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { setModal } = AppStatus.actions;
  return {
    toggleFavorite: marketId => dispatch(toggleFavorite(marketId)),
    dispute: (selectedOutcome: string, isInvalid: boolean) =>
      setModal({
        type: MODAL_REPORTING,
        market: ownProps.market,
        selectedOutcome,
        isInvalid,
      }),
    migrateMarketModal: () =>
      setModal({
        type: MODAL_MIGRATE_MARKET,
        market: ownProps.market,
      }),
    marketLinkCopied: (marketId, location) =>
      dispatch(marketLinkCopied(marketId, location)),
  };
};

const MarketCardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketCard)
);

export default MarketCardContainer;
