# lezer-promql

[![CircleCI](https://circleci.com/gh/promlabs/lezer-promql.svg?style=shield)](https://circleci.com/gh/promlabs/lezer-promql) [![NPM version](https://img.shields.io/npm/v/lezer-promql.svg)](https://www.npmjs.org/package/lezer-promql)

## Overview

This is a PromQL grammar for the [lezer](https://lezer.codemirror.net/) parser system. It is inspired from the initial
grammar coming from [Prometheus](https://github.com/prometheus/prometheus/blob/master/promql/parser/generated_parser.y)
written in yacc.

This library is stable but doesn't provide any guideline of how to use it as it has been integrated
into [codemirror-promql](https://github.com/prometheus-community/codemirror-promql). If you want to use this library,
you perhaps want to use actually **codemirror-promql** instead.

**Note**: This library is following the as closed as possible the changes of the vanilla grammar (i.e. coming from Prometheus)

## Installation

This package is available as a npm package:

```bash
npm install --save lezer-promql
```

**Note**: you will have to manually install the dependency `lezer` as it is a peer dependency to this package.

```bash
npm install --save lezer
```

**Note 2**: In case you are using at the same time [Codemirror.next](https://codemirror.net/6/), you won't have to
install the deps **lezer** since it's already a dependency of Codemirror.next.

## Development

### Building

    npm i
    npm run build

### Testing

    npm run test

## License

The code is licensed under an [Apache 2.0](./LICENSE) license.
