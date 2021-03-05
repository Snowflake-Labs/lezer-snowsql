#!/bin/bash

# Copyright 2021 PromLabs GmbH
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

lezer-generator src/promql.grammar -o src/parser

cat src/parser.terms.js >> src/parser.js

bash ./generate-types.sh

rollup -c

# Finally copy some useful file for documentation purpose
cp ./README.md ./dist/README.md
cp ./CHANGELOG.md ./dist/CHANGELOG.md
cp ./LICENSE ./dist/LICENSE
cp ./package.json ./dist/package.json
