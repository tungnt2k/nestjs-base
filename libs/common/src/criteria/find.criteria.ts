import { BadRequestException } from '@nestjs/common';
import { uniq } from 'lodash';
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

import { CommonFilter, PaginationQueryDto } from '../base-dto/common-filter.dto';
import { SORT_TYPE, SORT_TYPE_STR } from '../enums/enum';
import { NumberUtil } from '../utils/number.util';

export class FindCriteria<T> {
  private _findOptions: FindOptionsWhere<T>;

  private _sortOptions: FindOptionsOrder<T>;

  private _skip: number;

  private _take: number;

  constructor() {
    this._findOptions = {} as FindOptionsWhere<T>;
    this._sortOptions = {} as FindOptionsOrder<T>;
  }

  addSortOptions({ sortBy, sortType }: Pick<CommonFilter, 'sortType' | 'sortBy'>, defaultsSortBy?: keyof T) {
    if (!sortType) sortType = SORT_TYPE.DESC;

    if (sortBy) {
      this._sortOptions = {
        ...this._sortOptions,
        [sortBy]: sortType === SORT_TYPE.DESC ? SORT_TYPE_STR.DESC : SORT_TYPE_STR.ASC,
      };
    } else if (defaultsSortBy) {
      this._sortOptions = {
        ...this._sortOptions,
        [defaultsSortBy]: sortType === SORT_TYPE.DESC ? SORT_TYPE_STR.DESC : SORT_TYPE_STR.ASC,
      };
    }
    return this;
  }

  get searchOptions() {
    return this._findOptions;
  }

  get sortOptions() {
    return this._sortOptions;
  }

  get sortOptionsArr(): Array<{ sortBy: string; sortType: SORT_TYPE }> {
    const sortOptions = [];
    for (const sortOptionKey of Object.keys(this._sortOptions)) {
      sortOptions.push({
        sortBy: sortOptionKey,
        sortType: this._sortOptions[sortOptionKey],
      });
    }
    return sortOptions;
  }

  findByFieldEquals(searchField: keyof T, searchValue: number | string, findNull: boolean = false) {
    if (searchValue && !findNull) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: String(searchValue),
      };
    } else if (findNull) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: searchValue ? String(searchValue) : IsNull(),
      };
    }

    return this;
  }

  findByTime(filed: keyof T, { fromDate, toDate }: Pick<CommonFilter, 'fromDate' | 'toDate'>) {
    if (fromDate) {
      this._findOptions = {
        ...this._findOptions,
        [filed]: MoreThanOrEqual(fromDate),
      };
    }
    if (toDate) {
      this._findOptions = {
        ...this._findOptions,
        [filed]: LessThanOrEqual(toDate),
      };
    }
    if (fromDate && toDate) {
      if (NumberUtil.gte(fromDate, toDate)) {
        throw new BadRequestException('search request from must be less than to');
      }
      this._findOptions = {
        ...this._findOptions,
        [filed]: Between(fromDate, toDate),
      };
    }
    return this;
  }

  findByFieldIn(searchField: keyof T, searchValue: Array<number | string>) {
    if (searchValue && searchValue.length > 0) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: In(uniq(searchValue.filter(Boolean))),
      };
    }
    return this;
  }

  findByFieldNot(searchField: keyof T, searchValue: number | string) {
    if (searchValue) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: Not(searchValue),
      };
    }
    return this;
  }

  findByFieldNotIn(searchField: keyof T, searchValue: Array<number | string>) {
    if (searchValue && searchValue.length > 0) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: Not(In(uniq(searchValue.filter(Boolean)))),
      };
    }
    return this;
  }

  findByFieldLike(searchField: keyof T, searchValue: string) {
    if (searchValue) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: Like(`%${searchValue}%`),
      };
    }
    return this;
  }

  findByFieldILike(searchField: keyof T, searchValue: string) {
    if (searchValue) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: ILike(`%${searchValue}%`),
      };
    }
    return this;
  }

  findByFieldGte(searchField: keyof T, searchValue: number | string) {
    if (searchValue) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: MoreThanOrEqual(searchValue),
      };
    }
    return this;
  }

  findByFieldLte(searchField: keyof T, searchValue: number | string) {
    if (searchValue) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: LessThanOrEqual(searchValue),
      };
    }
    return this;
  }

  findByFieldGt(searchField: keyof T, searchValue: number | string) {
    if (searchValue) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: MoreThan(searchValue),
      };
    }
    return this;
  }

  findByFieldLt(searchField: keyof T, searchValue: number | string) {
    if (searchValue) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: LessThan(searchValue),
      };
    }
    return this;
  }

  findByBetween(searchField: keyof T, from: number | string, to: number | string) {
    if (from && to) {
      this._findOptions = {
        ...this._findOptions,
        [searchField]: Between(from, to),
      };
    }
    return this;
  }

  addPagination(params: PaginationQueryDto) {
    if (!params) {
      return this;
    }

    const { page, limit } = params;

    if (page && limit) {
      this._skip = (page - 1) * limit;
    }

    if (limit) {
      this._take = limit;
    }

    return this;
  }

  getPagination() {
    return {
      skip: this._skip,
      take: this._take,
    };
  }
}
