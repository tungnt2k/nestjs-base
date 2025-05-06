export const PAGINATION_TAKEN = 10;
export const MAX_PAGINATION_TAKEN = 1000;
export const MIN_PAGINATION_TAKEN = 1;

export const ONE_SECOND_MILLISECONDS = '1000';
export const ONE_DAY_MILLISECONDS = '86400000'; // 60 * 60 * 24 * 1000
export const ONE_HOUR_MILLISECONDS = '3600000';
export const ONE_WEEK_MILLISECONDS = '604800000';
export const ONE_DAY_HOURS = '24';

export const DEFAULT_RETRY_THRESH_HOLD = 1000;

export const DEFAULT_PAGE = 0;
export const DEFAULT_PER_PAGE = 10;

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const MIN_ORDER_TIME = 10 * 1000; // 10 seconds
export const MAX_ORDER_TIME = 12 * 60 * 60 * 1000; // 12 hours

export const FEE_SCALE = 4;

export const DEPOSIT_AMOUNT_SCALE = 2;
export const WITHDRAW_AMOUNT_SCALE = 2;

export const QUEUE_JOB = {
  MAIL: {
    name: 'mail_queue',
    concurrency: 5,
  },
  PRICE: {
    name: 'price_queue',
    concurrency: 10,
  },
  ACCOUNT_HISTORY: {
    name: 'account_history',
    concurrency: 5,
  },
  BLOCKBEE_DEPOSIT_TRANSACTION: {
    name: 'blockbee_deposit_transaction',
    concurrency: 5,
  },
  PERFECT_MONEY_DEPOSIT_TRANSACTION: {
    name: 'perfect_money_deposit_transaction',
    concurrency: 5,
  },
  PAYPORT_DEPOSIT_TRANSACTION: {
    name: 'payport_deposit_transaction',
    concurrency: 5,
  },
  FETCH_TICKER: {
    name: 'fetch_ticker',
    concurrency: 5,
  },
  SNAPSHOT_PRICE_TRADE: {
    name: 'snapshot_price_trade',
    concurrency: 20,
  },
};
