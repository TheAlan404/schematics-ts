import { Vec3 } from "./types";

export function* iterVec3(max: Vec3) {
    for (let x = 0; x < max.x; x++) {
        for (let y = 0; y < max.y; y++) {
            for (let z = 0; z < max.z; z++) {
                yield { x, y, z } as Vec3;
            }
        }
    }
};

export const parseVarintArray = (arr: number[]): number[] => {
    let result = [];

    let i = 0;
    while (i < arr.length) {
        let value = 0;
        let varintLength = 0;

        while (true) {
            value |= (arr[i] & 127) << (varintLength++ * 7);
            if (varintLength > 5) {
                throw new Error('VarInt too big');
            }
            if ((arr[i] & 128) != 128) {
                i++;
                break;
            }
            i++;
        }

        result.push(value);
    }
    
    return result;
};
