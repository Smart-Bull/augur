import newMarket from 'modules/markets/reducers/new-market';
import analytics from 'modules/app/reducers/analytics';
import drafts from 'modules/create-market/reducers/drafts';
import marketsList from 'modules/markets-list/reducers/markets-list';
import initialized3box from 'modules/global-chat/reducers/initialized-3box'
import {
  NewMarket,
  Drafts,
  MarketsList,
  Analytics,
  Initialized3box
} from 'modules/types';
import { Getters } from '@augurproject/sdk';
import { SDKConfiguration } from '@augurproject/artifacts';

export function createReducer() {
  return {
    newMarket,
    drafts,
    marketsList,
    analytics,
    initialized3box
  };
}

// TODO: couldn't use concreat type form `createReducer` so hardcoding structure here
// keeping with reducers for easier maintenance.
export interface AppStateInterface {
  config: SDKConfiguration;
  newMarket: NewMarket;
  drafts: Drafts;
  marketsList: MarketsList;
  analytics: Analytics;
  initialized3box: Initialized3box;
}
