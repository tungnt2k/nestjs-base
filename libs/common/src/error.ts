import { HttpException } from '@nestjs/common';

export const UserError = {
  PASSWORD_MUST_FOLLOWING_CONDITION: {
    message: 'password_must_following_condition',
    errorCode: 400,
  },
  VERIFY_PASSWORD_NOT_SAME: {
    message: 'verify_password_not_same',
    errorCode: 400,
  },
  NEW_PASSWORD_SAME: {
    message: 'new_password_same',
    errorCode: 400,
  },
  KYC_EXIST: {
    message: 'kyc_exist',
    errorCode: 400,
  },
  ALREADY_KYC: {
    message: 'already_kyc',
    errorCode: 400,
  },
  WRONG_OLD_PASSWORD: {
    message: 'wrong_old_password',
    errorCode: 400,
  },
  WRONG_PASSWORD: {
    message: 'wrong_password',
    errorCode: 400,
  },
  USER_ALREADY_VIP: {
    message: 'already_vip',
    errorCode: 400,
  },
  USER_ALREADY_VERIFY: {
    message: 'already_verify',
    errorCode: 400,
  },
  WRONG_VERIFY_TOKEN: {
    message: 'wrong_verify_token',
    errorCode: 400,
  },
  WRONG_VERIFY_CODE: {
    message: 'wrong_verify_code',
    errorCode: 400,
  },
  WRONG_2FA_CODE: {
    message: 'wrong_2fa_code',
    errorCode: 400,
  },
  INVALID_INPUT_PARAMS: {
    message: 'invalid_input_params',
    errorCode: 400,
  },
  UNKNOWN_ERROR: {
    message: 'unknown_error',
    errorCode: 500,
  },
  USER_NOT_FOUND: {
    message: 'user_not_found',
    errorCode: 400,
  },
  USER_BANNED: {
    message: 'user_banned',
    errorCode: 403,
  },
  LOGIN_WRONG_PASSWORD: {
    message: 'login_wrong_password',
    errorCode: 400,
  },
  USER_EXISTING: {
    message: 'user_existing',
    errorCode: 400,
  },
  NICK_NAME_EXISTING: {
    message: 'nick_name_existing',
    errorCode: 400,
  },
  EMAIL_FORMAT: {
    message: 'email_format',
    errorCode: 400,
  },
  LOGIN_SNS_VERIFY_EMAIL: {
    message: 'login_sns_verify_email',
    errorCode: 405,
  },
  TOKEN_EXPIRED: {
    message: 'token_expired',
    errorCode: 400,
  },
  TOKEN_NOT_FOUND: {
    message: 'token_not_found',
    errorCode: 400,
  },
  ACCOUNT_DELETE: {
    message: 'account_delete',
    errorCode: 400,
  },
  ENABLE_2FA_FIRST: {
    message: 'enable_2fa_first',
    errorCode: 400,
  },
  KYC_NOT_FOUND: {
    message: 'kyc_not_found',
    errorCode: 400,
  },
  MUST_BE_VERIFIED: {
    message: 'must_be_verified',
    errorCode: 400,
  },
};

export const AuthError = {
  TOKEN_NOT_FOUND: {
    message: 'token_not_found',
    errorCode: 400,
  },
  TOKEN_INVALID: {
    message: 'token_invalid',
    errorCode: 400,
  },
  TOKEN_EXPIRED: {
    message: 'token_expired',
    errorCode: 401,
  },
  ROLE_INVALID: {
    message: 'role_invalid',
    errorCode: 400,
  },
  REFRESH_TOKEN_NOT_FOUND: {
    message: 'refresh_token_not_found',
    errorCode: 403,
  },
  REFRESH_TOKEN_INVALID: {
    message: 'refresh_token_invalid',
    errorCode: 403,
  },
};

export const CommonError = {
  INVALID_INPUT_PARAMS: {
    message: 'invalid_input_params',
    errorCode: 400,
  },
  GET_ERROR: {
    message: 'get_error',
    errorCode: 400,
  },
  NOT_FOUND_ERROR: {
    message: 'not_found',
    errorCode: 400,
  },
  UNKNOWN_ERROR: {
    message: 'unknown_error',
    errorCode: 500,
  },
};

export const AccountError = {
  NOT_ENOUGH_BALANCE: {
    message: 'not_enough_balance',
    errorCode: 400,
  },
  ACCOUNT_NOT_FOUND: {
    message: 'account_not_found',
    errorCode: 400,
  },
  ALREADY_BLOCK_WITHDRAWAL: {
    message: 'already_block_withdrawal',
    errorCode: 400,
  },
  TRANSFER_NOT_ACCEPT: {
    message: 'transfer_not_accept',
    errorCode: 400,
  },
  TRANSFER_NOT_FOUND: {
    message: 'transfer_not_found',
    errorCode: 400,
  },
};

export const SystemConfigError = {
  SYSTEM_CONFIG_NOT_FOUND: {
    message: 'system_config_not_found',
    errorCode: 400,
  },
};

export const TradeError = {
  BALANCES_NOT_ENOUGH: {
    message: 'balances_not_enough',
    errorCode: 400,
  },
  INVALID_AMOUNT: {
    message: 'invalid_amount',
    errorCode: 400,
  },
  BLOCK_TIME: {
    message: 'block_time',
    errorCode: 402,
  },
  INVALID_SYMBOL: {
    message: 'invalid_symbol',
    errorCode: 400,
  },
  INVALID_TIME: {
    message: 'invalid_time',
    errorCode: 400,
  },
};

export const TransactionError = {
  NOT_ENOUGH_BALANCE: {
    message: 'not_enough_balance',
    errorCode: 400,
  },
  AMOUNT_INVALID: {
    message: 'amount_invalid',
    errorCode: 400,
  },
  AMOUNT_IS_OVER_MAX: {
    message: 'amount_is_over_max_value',
    errorCode: 400,
  },
  AMOUNT_IS_UNDER_MIN: {
    message: 'amount_is_under_min_value',
    errorCode: 400,
  },
  TRANSACTION_NOT_FOUND: {
    message: 'transaction_not_found',
    errorCode: 400,
  },
  TRANSACTION_NOT_IN_RANGE: {
    message: 'transaction_not_in_range',
    errorCode: 400,
  },
  TRANSACTION_DENY: {
    message: 'transaction_deny',
    errorCode: 400,
  },
  EXT_SVC_INVALID: {
    message: 'ext_svc_invalid',
    errorCode: 400,
  },
  NETWORK_IS_NOT_SUPPORTED: {
    message: 'network_is_not_supported',
    errorCode: 400,
  },
  INVALID_2FA_CODE: {
    message: 'invalid_2fa_code',
    errorCode: 400,
  },
  SCALE_INVALID: {
    message: 'scale_invalid',
    errorCode: 400,
  },
};

export const PaymentConfigError = {
  VALUE_MUST_BE_GREATER_THAN_OR_EQUAL_ZERO: {
    message: 'value_must_be_greater_than_or_equal_zero',
    errorCode: 400,
  },
  MIN_MUST_BE_LESS_THAN_OR_EQUAL_MAX: {
    message: 'min_must_be_less_than_or_equal_max',
    errorCode: 400,
  },
};

export const TournamentError = {
  TOURNAMENT_NOT_FOUND: {
    message: 'tournament_not_found',
    errorCode: 400,
  },
  TOURNAMENT_STATUS_UPDATE_ERROR: {
    message: 'tournament_status_update_error',
    errorCode: 400,
  },
  TOURNAMENT_REWARD_UPDATE_ERROR: {
    message: 'tournament_reward_update_error',
    errorCode: 400,
  },
};

export const AdminError = {
  EMAIL_EXISTING: {
    message: 'email_existing',
    errorCode: 400,
  },
  TYPE_INVALID: {
    message: 'type_invalid',
    errorCode: 400,
  },
  PASSWORD_INVALID: {
    message: 'password_invalid',
    errorCode: 400,
  },
  UNKNOWN_ERROR: {
    message: 'unknown_error',
    errorCode: 500,
  },
  ADMIN_NOT_FOUND: {
    message: 'admin_not_found',
    errorCode: 400,
  },
  ADMIN_HAS_BEEN_BANNED: {
    message: 'admin_has_been_banned',
    errorCode: 403,
  },
};

export const WalletError = {
  NOT_FOUND: {
    message: 'wallet_not_found',
    errorCode: 400,
  },
};

export const SymbolSettingError = {
  SYMBOL_NOT_FOUND: {
    message: 'symbol_not_found',
    errorCode: 400,
  },
};

export const TickerError = {
  RESOLUTION_NOT_FOUND: {
    message: 'resolution_not_found',
    errorCode: 400,
  },
  INVALID_TIME_RANGE: {
    message: 'invalid_time_range',
    errorCode: 400,
  },
};

export const SupportTicketError = {
  NOT_FOUND: {
    message: 'support_ticket_notfound',
    errorCode: 400,
  },
  ALREADY_CLOSED: {
    message: 'support_ticket_already_closed',
    errorCode: 400,
  },
  CANNOT_BE_SENT_CONSECUTIVELY: {
    message: 'cannot_be_sent_consecutively',
    errorCode: 400,
  },
  OVER_LIMIT_OPEN_TICKET: {
    message: 'over_limit_open_ticket',
    errorCode: 400,
  },
};

export const ChampionError = {
  CHAMPION_NOT_FOUND: {
    message: 'champion_not_found',
    errorCode: 400,
  },
  USER_ALREADY_JOIN_CHAMPION: {
    message: 'user_already_join_champion',
    errorCode: 400,
  },
  USER_NOT_JOIN_CHAMPION: {
    message: 'user_not_join_champion',
    errorCode: 400,
  },
  EXCEED_MAX_COMPETITOR: {
    message: 'exceed_max_competitor',
    errorCode: 400,
  },
  INVALID_NUMBER_OF_WINNER: {
    message: 'invalid_number_of_winner',
    errorCode: 400,
  },
  NOT_ABLE_TO_PICK_WINNER: {
    message: 'not_able_to_pick_winner',
    errorCode: 400,
  },
  INVALID_WINNER: {
    message: 'invalid_winner',
    errorCode: 400,
  },
  PRIZE_MUST_BE_POSITIVE: {
    message: 'prize_must_be_positive',
    errorCode: 400,
  },
};

export const RestrictedGatewayError = {
  NOT_FOUND: {
    message: 'restricted_gateway_not_found',
    errorCode: 400,
  },
  ALREADY_EXIST: {
    message: 'restricted_gateway_already_exist',
    errorCode: 400,
  },
};

export const CountryError = {
  NOT_FOUND: {
    message: 'country_not_found',
    errorCode: 400,
  },
};

export const DelayTradingError = {
  GROUP_NOT_FOUND: {
    message: 'group_not_found',
    errorCode: 400,
  },
  MEMBER_ALREADY_EXIST_IN_ANOTHER_GROUP: {
    message: 'member_already_exist_in_another_group',
    errorCode: 400,
  },
};

export const PromoCodeError = {
  PROMO_CODE_NOT_FOUND: {
    message: 'promo_code_not_found',
    errorCode: 400,
  },
  PROMO_CODE_EXISTING: {
    message: 'promo_code_existing',
    errorCode: 400,
  },
  PROMO_CODE_INACTIVE: {
    message: 'promo_code_inactive',
    errorCode: 400,
  },
  PROMO_CODE_USED: {
    message: 'promo_code_used',
    errorCode: 400,
  },
  PROMO_CODE_CONDITION_REQUIRED: {
    message: 'promo_code_condition_required',
    errorCode: 400,
  },
  REQUIRED_AMOUNT_MUST_BE_POSITIVE: {
    message: 'required_amount_must_be_positive',
    errorCode: 400,
  },
  BONUS_PERCENT_MUST_BE_POSITIVE: {
    message: 'bonus_percent_must_be_positive',
    errorCode: 400,
  },
};

export const SignalNavigatorError = {
  NOT_FOUND: {
    message: 'signal_navigator_not_found',
    errorCode: 400,
  },
};

export class ApiException extends HttpException {
  constructor(customErr: { message: string; errorCode: number }) {
    super(customErr.message, customErr.errorCode);
  }
}

export class GqlException extends HttpException {
  constructor(customErr: { message: string; errorCode: number }) {
    super(customErr.message, customErr.errorCode);
  }
}
