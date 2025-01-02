# japanese-address-parser-nodejs

[![npmjs](https://img.shields.io/npm/v/%40toriyama/japanese-address-parser-nodejs)](https://www.npmjs.com/package/@toriyama/japanese-address-parser-nodejs)
[![install size](https://packagephobia.com/badge?p=@toriyama/japanese-address-parser-nodejs)](https://packagephobia.com/result?p=@toriyama/japanese-address-parser-nodejs)
[![downloads](https://img.shields.io/npm/dm/@toriyama/japanese-address-parser-nodejs.svg)](https://npmcharts.com/compare/@toriyama/japanese-address-parser-nodejs?minimal=true)

A Node.js binding for `japanese-address-parser` written in Rust.

## Install

```bash
npm i @toriyama/japanese-address-parser-nodejs
```

## Usage

### Construct parser

```typescript
import {Parser} from "@toriyama/japanese-address-parser-nodejs";

const parser = new Parser();
parser.parse("東京都中央区日本橋室町１丁目１").then(result => {
    console.log(result.prefecture); // 東京都
    console.log(result.city); // 中央区
    console.log(result.town); // 日本橋室町一丁目
    console.log(result.rest); // 1
    console.log(result.metadata); // { depth: 3 }
});
```

### Construct parser with options

```typescript
import {Parser, ParserOptions} from "@toriyama/japanese-address-parser-nodejs";

const options: ParserOptions = {
    dataSource: "ChimeiRuiju",
    correctIncompleteCityNames: false,
    verbose: false,
}
const parser = Parser.initWithOptions(options)
parser.parse("東京都中央区日本橋室町１丁目１").then(result => {
    console.log(result.prefecture); // 東京都
    console.log(result.city); // 中央区
    console.log(result.town); // 日本橋室町一丁目
    console.log(result.rest); // 1
    console.log(result.metadata); // { latitude: 35.68540495238095, longitude: 139.7749854761905, depth: 3 }
});
```
