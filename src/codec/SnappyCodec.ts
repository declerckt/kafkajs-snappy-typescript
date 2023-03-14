import { compress, uncompress } from "snappy";

export class SnappyCodec {

    private static XERIAL_HEADER = Buffer.from([130, 83, 78, 65, 80, 80, 89, 0])
    private static SIZE_BYTES = 4
    private static SIZE_OFFSET = 16


    public SnappyCode(){
    }

    private static isFrameFormat(buffer: Buffer): boolean{
        return buffer.subarray(0, 8).equals(SnappyCodec.XERIAL_HEADER)
    }

    private async compress(msg: string): Promise<Buffer> {
        return compress(msg);
    }

    private async decompress(buffer: Buffer): Promise<string | Buffer> {
        if (!SnappyCodec.isFrameFormat(buffer)) {
            return uncompress(buffer).then(res => {
                if(typeof res == "string")
                    return Buffer.from(res, 'utf-8');
                return res;
             });
        }else{
            const encoded: Buffer[] = []
            const maxBytes = Buffer.byteLength(buffer);
            let offset = SnappyCodec.SIZE_OFFSET;
            while (offset + SnappyCodec.SIZE_BYTES <= maxBytes) {
              const size = buffer.readUInt32BE(offset)
              offset += SnappyCodec.SIZE_BYTES
              encoded.push(buffer.subarray(offset, offset + size))
              offset += size
            }
            let doubleTypedArray: (string|Buffer)[] = [];

            for(const buf of encoded){
                let uncompressed = await uncompress(buf);
                doubleTypedArray.push(uncompressed);
            }

            let resultArray :Buffer[] = [];
            for(const item of doubleTypedArray){
                if(typeof item != 'string')
                    resultArray.push(item);

            }
            return Buffer.concat(resultArray);
        }
    }

    public codec = () => {
        return {
            compress: this.compress,
            decompress: this.decompress
        }
    }
}
