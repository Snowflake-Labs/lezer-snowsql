// Copyright 2021 PromLabs GmbH
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Bool, Allowed, IP ,Account,
  Name,
  Password,
  Email,
  Admin,
  Edition,
  Standard,
  Enterprise,
  Business,
  Critical,
  First,
  Role,
  Last,
  Must,
  Change,
  True ,
  False, File, Format, List, Restrict, Cascade, Schema, DropExpr, Drop, Task, Warehouse, CreateExpr,Stage, Type, Columns, Describe, View, User, Table, Desc, Create, Policy,Network, Allowed_IP_Policy, Blocked_IP_Policy, DescribeExpr, whitespace, SelectExpr, Ignoring, On, Count, CountValues, Group, By, And, Or, Select, From, Where} from './parser.terms.js';

const keywordTokens = {


  
  account: Account,
  name: Name,
  password: Password,
   email :Email,
   admin: Admin,
   edition: Edition,
   standard: Standard,
   file: File,
   format : Format,
   schema : Schema,
   task: Task,
   warehouse : Warehouse,
  list: List,
   enterprise: Enterprise,
  business: Business,
  critical: Critical,
  first: First,
  last: Last,
  must: Must,
  change:  Change,
  true: True ,
  false: False,
  allowed: Allowed,
  ip: IP,
  bool: Bool,
  ignoring: Ignoring,
  on: On,
  selectExpr: SelectExpr,
  describeExpr: DescribeExpr,
  view : View,
  user : User,
  describe: Describe,
  desc : Desc,
  from : From,
  columns: Columns,
  select: Select,
  stage: Stage,
  type: Type,
  where : Where,
  table: Table,
  dropExpr: DropExpr,

  creatExpr:CreateExpr,
  drop :Drop,
  cascade : Cascade,
  restrict : Restrict,
  role: Role,
  create: Create, policy: Policy, network: Network, allowd_ip_policy: Allowed_IP_Policy,  Blocked_IP_Policy

}

export const specializeIdentifier = (value, stack) => {
  return keywordTokens[value.toLowerCase()] || -1;
}

const contextualKeywordTokens = {
  count: Count,
  group: Group,
  by: By,
  and: And,
  or: Or,
}

export const extendIdentifier = (value, stack) => {
  return contextualKeywordTokens[value.toLowerCase()] || -1;
}
