export enum ENVIRONMENT {
  LOCAL = 'LOCAL',
  DEVELOPMENT = 'DEV',
  PRODUCTION = 'PROD',
}

export enum LOG_LEVEL {
  DEBUG = 'debug',
  ERROR = 'error',
  LOG = 'log',
  VERBOSE = 'verbose',
  WARN = 'warn',
}

export enum SORT_TYPE {
  ASC = 1,
  DESC = 2,
}

export enum SORT_TYPE_STR {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ACCOUNT_TYPE {
  DEMO = 1,
  LIVE = 2,
  AFFILIATE = 3,
}

export enum Role {
  ADMIN = 1,
  USER = 2,
}

export enum ORDER_TYPE {
  BUY = 1,
  SELL = 2,
}

export enum OPTION_TYPE {
  END_TIME = 1,
  COUNT_DOWN = 2,
}

export enum TRADE_STATUS {
  OPEN = 1,
  FILLED = 2,
  SETTLEMENT = 3,
  ERROR = 4,
}

export enum TRADE_PUBLIC_STATUS {
  OPEN = 1,
  CLOSE = 2,
}

export enum TRADE_RESULT {
  WIN = 1,
  LOSE = 2,
  DRAW = 3,
}

export enum SYMBOL_STATUS {
  ACTIVE = 1,
  INACTIVE = 2,
}

export enum SYMBOL_TYPE {
  CRYPTO = 1,
  FOREX = 2,
}

export enum ACC_HISTORY_TYPE {
  TRADE = 1,
  WITHDRAWAL = 2,
  DEPOSIT = 3,
  COMMISSION = 4,
  WITHDRAWAL_ROLLBACK = 5,
  ADMIN_CHANGE = 6,
  DEPOSIT_BONUS = 7,
  ACCOUNT_TRANSFER = 8,
  AFFILIATE_SETTLEMENT = 9,
  ACCOUNT_TRANSFER_ROLLBACK = 10,
  CASHBACK = 11,
  BONUS_RECALL = 12,
}

export enum ACC_HISTORY_REF_TYPE {
  TRADE = 1,
  TRANSACTION = 2,
  COMMISSION = 3,
  ADMIN = 4,
  ACCOUNT = 5,
  CASHBACK = 6,
}

export enum ACC_HISTORY_ADJUST_TYPE {
  PLUS = 1,
  MINUS = 2,
}

export enum KYC_STATUS {
  SUBMITTED = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export enum KYC_DOCUMENT_TYPE {
  ID_CARD = 'id_card',
  PASSPORT = 'passport',
  DRIVING_LICENSE = 'driving_license',
  RESIDENT_PERMIT = 'resident_permit',
}

export enum PAYMENT_SERVICE {
  BLOCK_BEE = 'block_bee',
  PERFECT_MONEY = 'perfect_money',
  PAYPORT = 'payport',
}

export enum TRANSACTION_STATUS {
  WAITING_APPROVE = 1,
  PENDING = 2,
  SUCCESS = 3,
  FAIL = 4,
  EXPIRED = 5,
  REJECTED = 6,
}

export enum TRANSACTION_TYPE {
  WITHDRAW = 1,
  DEPOSIT = 2,
}

export enum TRANSACTION_CURRENCY {
  USD = 'usd',
}

export enum SUPPORT_TICKET_STATUS {
  OPEN = 1,
  IN_PROGRESS = 2,
  CLOSED = 3,
}

export enum GATEWAY_EVENT {
  TRADE = 'trade',
  GET_TICKER = 'get_ticker',
}

export enum FAQ_CATEGORY {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  ACCOUNT = 'account',
  TRADING = 'trading',
  AFFILIATE = 'affiliate',
}

export enum ADMIN_ROLE {
  ROOT_ADMIN = 'root_admin',
  STAFF = 'staff',
}

export enum ADMIN_PERMISSION {
  SUPPORT_TICKET = 'support_ticket',
  FINANCE_MANAGEMENT = 'finance_management',
  PAYMENT_MANAGEMENT = 'payment_management',
  USER_MANAGEMENT = 'user_management',
  REWARD_MANAGEMENT = 'reward_management',
  MARKET_MANAGEMENT = 'market_management',
  SECURITY_MANAGEMENT = 'security_management',
  COMMON_SETTING = 'common_setting',
}

export enum CHAMPION_STATUS {
  ACTIVE = 1,
  INACTIVE = 2,
  COMPLETED = 3,
}

export enum COMPETITOR_STATUS {
  ACTIVE = 1,
  WIN = 2,
  LOSE = 3,
}

export enum CHAMPION_PUBLIC_STATUS {
  UPCOMING = 1,
  ONGOING = 2,
  END = 3,
}

export enum COUNTRY_STATUS {
  ACTIVE = 1,
  RESTRICTED = 2,
}

export enum DELAY_TRADING_STATUS {
  ACTIVE = 1,
  INACTIVE = 2,
}

export enum PROMO_CODE_STATUS {
  ACTIVE = 1,
  INACTIVE = 2,
}

export enum ACCOUNT_TRANSFER_STATUS {
  PENDING = 1,
  SUCCESS = 2,
  REJECT = 3,
  FAILED = 4,
}

export enum COMMISSION_HISTORY_REF_TYPE {
  TRADE = 1,
}

export enum SNAPSHOT_PRICE_TYPE {
  BEFORE = 1,
  AFTER = 2,
}

export enum BONUS_TYPE {
  FIRST_DEPOSIT_BONUS = 1,
  PROMO_CODE_BONUS = 2,
}

export enum SIGNAL_NAVIGATOR_STATUS {
  ACTIVE = 1,
  INACTIVE = 2,
  COMPLETED = 3,
}

export enum ADMIN_STATUS {
  ACTIVE = 1,
  BANNED = 2,
}

export enum SEARCH_BY {
  ALL = 1,
  NICKNAME = 2,
  EMAIL = 3,
  NAME = 4,
  ID = 5,
}

export enum RDM_STATUS {
  ACTIVE = 1,
  WAITING_SETTLEMENT = 2,
  CANCEL = 3,
}
