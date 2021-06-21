set -ex

lezer-generator src/snowsql.grammar -o src/parser

cat src/parser.terms.js >> src/parser.js

bash ./generate-types.sh

rollup -c

# Finally, copy some useful files into the distribution folder for documentation purposes.
cp ./README.md ./dist/README.md
cp ./CHANGELOG.md ./dist/CHANGELOG.md
cp ./LICENSE ./dist/LICENSE
cp ./package.json ./dist/package.json
