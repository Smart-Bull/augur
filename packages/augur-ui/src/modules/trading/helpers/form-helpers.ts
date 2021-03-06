import {
  SCALAR,
  INVALID_OUTCOME_ID,
  BUY,
  SELL,
  ONE,
  UPPER_FIXED_PRECISION_BOUND,
  MIN_ORDER_LIFESPAN,
} from 'modules/common/constants';
import { FORM_INPUT_TYPES as INPUT_TYPES } from 'modules/trading/store/constants';
import { createBigNumber, BigNumber } from 'utils/create-big-number';
import { calcPercentageFromPrice } from 'utils/format-number';
import getPrecision from 'utils/get-number-precision';
import {
  convertDisplayAmountToOnChainAmount,
  tickSizeToNumTickWithDisplayPrices,
  getTradeInterval,
  QUINTILLION,
  Getters
} from '@augurproject/sdk';
import { MarketData } from 'modules/types';

export const DEFAULT_TRADE_INTERVAL = new BigNumber(10 ** 17);

interface TestResults {
  isOrderValid: boolean;
  errors: object;
  errorCount: number;
}

interface Props {
  market: MarketData;
  maxPrice: BigNumber;
  minPrice: BigNumber;
  selectedNav: string;
  selectedOutcome: Getters.Markets.MarketInfoOutcome;
  currentTimestamp: number;
  orderBook: Getters.Markets.OutcomeOrderBook;
  initialLiquidity?: Boolean;
}

export const testPrice = (
  value,
  errors: object,
  isOrderValid: boolean,
  props: Props
): TestResults => {
  const {
    maxPrice,
    minPrice,
    market,
    initialLiquidity,
    selectedNav,
    orderBook,
    selectedOutcome,
  } = props;
  const isScalar: boolean = market.marketType === SCALAR;
  const usePercent = isScalar && selectedOutcome.id === INVALID_OUTCOME_ID;
  const tickSize = createBigNumber(market.tickSize);
  let errorCount = 0;
  let passedTest = !!isOrderValid;

  if (!BigNumber.isBigNumber(value)) {
    return { isOrderValid: false, errors, errorCount };
  }

  if (value && (value.lte(minPrice) || value.gte(maxPrice))) {
    errorCount += 1;
    passedTest = false;
    if (usePercent) {
      errors[INPUT_TYPES.PRICE].push(`Enter a valid percentage`);
    } else {
      errors[INPUT_TYPES.PRICE].push(
        `Price must be above ${minPrice} and below ${maxPrice}`
      );
    }
  }
  if (
    value &&
    value
      .minus(minPrice)
      .mod(tickSize)
      .gt('0')
  ) {
    errorCount += 1;
    passedTest = false;
    errors[INPUT_TYPES.PRICE].push(`Price must be a multiple of ${tickSize}`);
  }
  if (
    initialLiquidity &&
    selectedNav === BUY &&
    orderBook.asks &&
    orderBook.asks.length &&
    value.gte(orderBook.asks[0].price)
  ) {
    const message = usePercent
      ? `Percent must be less than best ask of ${calcPercentageFromPrice(
          orderBook.asks[0].price,
          minPrice,
          maxPrice
        )}`
      : `Price must be less than best ask of ${orderBook.asks[0].price}`;
    errorCount += 1;
    passedTest = false;
    errors[INPUT_TYPES.PRICE].push(message);
  } else if (
    initialLiquidity &&
    selectedNav === SELL &&
    orderBook.bids &&
    orderBook.bids.length &&
    value.lte(orderBook.bids[0].price)
  ) {
    const message = usePercent
      ? `Percent must be more than best bid of ${calcPercentageFromPrice(
          orderBook.bids[0].price,
          minPrice,
          maxPrice
        )}`
      : `Price must be more than best bid of ${orderBook.bids[0].price}`;
    errorCount += 1;
    passedTest = false;
    errors[INPUT_TYPES.PRICE].push(message);
  }
  return { isOrderValid: passedTest, errors, errorCount };
};

export const testTotal = (
  value,
  errors,
  isOrderValid,
  price,
  quantity
): TestResults => {
  let errorCount = 0;
  let passedTest = !!isOrderValid;
  if (value === '' && price && !!!quantity) {
    return { isOrderValid: false, errors, errorCount };
  }
  if (value && createBigNumber(value).lt(0)) {
    errorCount += 1;
    passedTest = false;
    errors[INPUT_TYPES.EST_DAI].push(
      'Total Order Value must be greater than 0'
    );
  }
  return { isOrderValid: passedTest, errors, errorCount };
};

export const testPropertyCombo = (
  quantity: string,
  price: string,
  estEth: string,
  changedProperty: string | undefined,
  errors: object
): TestResults => {
  let errorCount = 0;
  if (quantity && estEth && !price) {
    errorCount += 1;
    errors[INPUT_TYPES.PRICE].push(
      'Price is needed with Quantity or Total Value'
    );
  }
  if (
    changedProperty === INPUT_TYPES.QUANTITY &&
    createBigNumber(quantity).lte(0)
  ) {
    errorCount += 1;
    errors[INPUT_TYPES.QUANTITY].push('Quantity must be greater than 0');
  }
  if (
    changedProperty === INPUT_TYPES.EST_DAI &&
    createBigNumber(estEth).lte(0)
  ) {
    errorCount += 1;
    errors[INPUT_TYPES.EST_DAI].push(
      'Total Order Value must be greater than 0'
    );
  }

  return { isOrderValid: errorCount === 0, errors, errorCount };
};

export const findMultipleOf = market => {
  let tradeInterval = DEFAULT_TRADE_INTERVAL;
  const numTicks = market.numTicks
    ? createBigNumber(market.numTicks)
    : tickSizeToNumTickWithDisplayPrices(
        createBigNumber(market.tickSize),
        createBigNumber(market.minPrice),
        createBigNumber(market.maxPrice)
      );

  if (market.marketType == SCALAR) {
    tradeInterval = getTradeInterval(
      createBigNumber(market.minPrice).times(QUINTILLION),
      createBigNumber(market.maxPrice).times(QUINTILLION),
      numTicks
    );
  }

  return tradeInterval.dividedBy(market.tickSize).dividedBy(10 ** 18);
};

export const findNearestValues = (value, market) => {
  const valueBn = createBigNumber(value);
  const multipleOf = findMultipleOf(market);

  let firstValue = valueBn.minus(valueBn.mod(multipleOf));
  let secondValue = valueBn.plus(multipleOf).minus(valueBn.mod(multipleOf));
  if (firstValue.lt(ONE)) {
    firstValue = secondValue;
    secondValue = valueBn
      .plus(multipleOf)
      .plus(multipleOf)
      .minus(valueBn.mod(multipleOf));
  }

  return [firstValue, secondValue];
};

export const testQuantityAndExpiry = (
  value,
  errors: object,
  isOrderValid: boolean,
  fromExternal: boolean,
  props: Props,
  expiration?,
  confirmationTimeEstimation?
): TestResults => {
  const { market, currentTimestamp } = props;
  const isScalar: boolean = market.marketType === SCALAR;
  let errorCount = 0;
  let passedTest = !!isOrderValid;
  const precision = getPrecision(value, 0);

  if (!BigNumber.isBigNumber(value)) {
    return { isOrderValid: false, errors, errorCount };
  }

  if (value && value.lte(0)) {
    errorCount += 1;
    passedTest = false;
    errors[INPUT_TYPES.QUANTITY].push('Quantity must be greater than 0');
  }
  if (value && value.lt(0.000000001) && !value.eq(0) && !fromExternal) {
    errorCount += 1;
    passedTest = false;
    errors[INPUT_TYPES.QUANTITY].push(
      'Quantity must be greater than 0.000000001'
    );
  }
  if (
    !isScalar &&
    value &&
    precision > UPPER_FIXED_PRECISION_BOUND &&
    !fromExternal
  ) {
    errorCount += 1;
    passedTest = false;
    errors[INPUT_TYPES.QUANTITY].push(
      `Precision must be ${UPPER_FIXED_PRECISION_BOUND} decimals or less`
    );
  }

  const numTicks = market.numTicks
    ? createBigNumber(market.numTicks)
    : tickSizeToNumTickWithDisplayPrices(
        createBigNumber(market.tickSize),
        createBigNumber(market.minPrice),
        createBigNumber(market.maxPrice)
      );

  let tradeInterval = DEFAULT_TRADE_INTERVAL;
  if (market.marketType == SCALAR) {
    tradeInterval = getTradeInterval(
      createBigNumber(market.minPrice).times(QUINTILLION),
      createBigNumber(market.maxPrice).times(QUINTILLION),
      numTicks
    );
  }

  if (
    !convertDisplayAmountToOnChainAmount(value, market.tickSize)
      .mod(tradeInterval)
      .isEqualTo(0)
  ) {
    errorCount += 1;
    passedTest = false;
    const multipleOf = findMultipleOf(market);
    let firstValue = value.minus(value.mod(multipleOf));
    let secondValue = value.plus(multipleOf).minus(value.mod(multipleOf));
    if (firstValue.lt(ONE)) {
      firstValue = secondValue;
      secondValue = value
        .plus(multipleOf)
        .plus(multipleOf)
        .minus(value.mod(multipleOf));
    }
    errors[INPUT_TYPES.MULTIPLE_QUANTITY].push(
      `Quantity needs to be a multiple of ${multipleOf}`
    );
  }

  // Check to ensure orders don't expiry within 70s
  // Also consider getGasConfirmEstimate * 1.5 seconds
  const gasConfirmEstimate = confirmationTimeEstimation
    ? confirmationTimeEstimation * 1.5
    : 0; // In Seconds
  const earliestExp = Math.ceil((MIN_ORDER_LIFESPAN + gasConfirmEstimate) / 60);
  const expiryTime = expiration - gasConfirmEstimate - currentTimestamp;
  if (expiration && expiryTime < MIN_ORDER_LIFESPAN) {
    errorCount += 1;
    passedTest = false;
    errors[INPUT_TYPES.EXPIRATION_DATE].push(
      `Order expires to soon! Earilest expiration is ${earliestExp} minutes`
    );
  }
  return { isOrderValid: passedTest, errors, errorCount };
};

export const orderValidation = (
  order,
  changedProperty?: string,
  nextProps?: Props,
  confirmationTimeEstimation?,
  fromExternal = false
): TestResults => {
  let errors = {
    [INPUT_TYPES.MULTIPLE_QUANTITY]: [],
    [INPUT_TYPES.QUANTITY]: [],
    [INPUT_TYPES.PRICE]: [],
    [INPUT_TYPES.EST_DAI]: [],
    [INPUT_TYPES.EXPIRATION_DATE]: [],
  };
  let isOrderValid = true;
  let errorCount = 0;

  const price =
    order[INPUT_TYPES.PRICE] && createBigNumber(order[INPUT_TYPES.PRICE]);

  const quantity =
    order[INPUT_TYPES.QUANTITY] && createBigNumber(order[INPUT_TYPES.QUANTITY]);

  const total =
    order[INPUT_TYPES.EST_DAI] && createBigNumber(order[INPUT_TYPES.EST_DAI]);

  let expiration = null;
  if (order[INPUT_TYPES.EXPIRATION_DATE]) {
    expiration = order[INPUT_TYPES.EXPIRATION_DATE];
  }

  const {
    isOrderValid: priceValid,
    errors: priceErrors,
    errorCount: priceErrorCount,
  } = testPrice(price, errors, isOrderValid, nextProps);

  errorCount += priceErrorCount;
  errors = { ...errors, ...priceErrors };

  let quantityValid = true;

  if (changedProperty !== INPUT_TYPES.EST_DAI) {
    const {
      isOrderValid: isThisOrderValid,
      errors: quantityErrors,
      errorCount: quantityErrorCount,
    } = testQuantityAndExpiry(
      quantity,
      errors,
      isOrderValid,
      fromExternal,
      nextProps,
      expiration,
      confirmationTimeEstimation
    );

    quantityValid = isThisOrderValid;
    errorCount += quantityErrorCount;
    errors = { ...errors, ...quantityErrors };
  }

  const {
    isOrderValid: totalValid,
    errors: totalErrors,
    errorCount: totalErrorCount,
  } = testTotal(total, errors, isOrderValid, price, quantity);

  errorCount += totalErrorCount;
  errors = { ...errors, ...totalErrors };

  const {
    isOrderValid: comboValid,
    errors: comboErrors,
    errorCount: comboErrorCount,
  } = testPropertyCombo(
    order[INPUT_TYPES.QUANTITY],
    order[INPUT_TYPES.PRICE],
    order[INPUT_TYPES.EST_DAI],
    changedProperty,
    errors
  );

  errors = { ...errors, ...comboErrors };
  errorCount += comboErrorCount;

  isOrderValid =
    ((quantityValid && priceValid) || (priceValid && totalValid)) && comboValid;
  return { isOrderValid, errors, errorCount };
};
