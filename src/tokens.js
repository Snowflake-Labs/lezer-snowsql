import {Bool, Ignoring, On, GroupLeft, GroupRight, Offset, Avg, Bottomk, Count, CountValues, Group, Max, Min, Quantile, Stddev, Stdvar, Sum, Topk, By, Without, And, Or, Unless} from './parser.terms.js';

const keywordTokens = {
  bool: Bool,
  ignoring: Ignoring,
  on: On,
  group_left: GroupLeft,
  group_right: GroupRight,
  offset: Offset,
}

export const specializeIdentifier = (value, stack) => {
  return keywordTokens[value.toLowerCase()] || -1;
}

const contextualKeywordTokens = {
  avg: Avg,
  bottomk: Bottomk,
  count: Count,
  count_values: CountValues,
  group: Group,
  max: Max,
  min: Min,
  quantile: Quantile,
  stddev: Stddev,
  stdvar: Stdvar,
  sum: Sum,
  topk: Topk,
  by: By,
  without: Without,
  and: And,
  or: Or,
  unless: Unless,
}

export const extendIdentifier = (value, stack) => {
  return contextualKeywordTokens[value.toLowerCase()] || -1;
}
