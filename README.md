# kafkajs-snappy-typescript

This little codec allows you to compress and decompress kafka records in snappy for kafkajs.

## Motivation

I developped this little package to add strict typing compatibility to Tulio's kafkajs-snappy library (link in the credits section) for people who needs only use typescript.

## Installation

```javascript
npm i kafkajs-snappy-typescript
```
## How to use ?

```typescript
import { SnappyCodec } from "kafkajs-snappy-typescript";

CompressionCodecs[CompressionTypes.Snappy] = new SnappyCodec().codec;
```

## Credits

Inspired by [Tulio's](https://github.com/tulios) [kafkajs-snappy](https://github.com/tulios/kafkajs-snappy) realization and using [Brooooooklyn's](https://github.com/Brooooooklyn) [snappy nodejs compression library](https://github.com/Brooooooklyn/snappy) for compression and decompression

## License

See [LICENSE](https://github.com/declerckt/kafkajs-snappy-typescript/blob/main/LICENSE) for more details.