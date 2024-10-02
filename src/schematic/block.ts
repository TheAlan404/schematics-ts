import { NBTTag } from "@alan404/nbt";
import { Sponge1Palette } from "../formats";

export type SchematicBlock = {
    id: string;
    state?: Record<string, string>;
    nbt?: Record<string, NBTTag>;
};

export const parseBlock = (s: string): SchematicBlock => {
    let [id, sp] = s.split("[");
    sp = sp.slice(0, sp.length - 1);
    let state = Object.fromEntries(
        sp.split(",").map(x => x.split("="))
    );

    return { id, state };
};

export const parseSpongePalette = (palette: Sponge1Palette) => {
    let map = new Map<number, SchematicBlock>();

    for(let [str, id] of Object.entries(palette.palette)) {
        map.set(id, parseBlock(str));
    }

    return map;
};
