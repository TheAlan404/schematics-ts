import { Schematic } from ".";
import { Sponge2Schematic, Sponge3Schematic, StructureSchematic } from "../formats";
import { iterVec3, parseVarintArray } from "../utils";
import { parseSpongePalette, SchematicBlock } from "./block";

const deserializeSpongeCommon = (schem: Schematic, s: Sponge2Schematic | Sponge3Schematic) => {
    schem.dimensions = {
        x: s.Width,
        y: s.Height,
        z: s.Length,
    };

    schem.metadata = {
        name: s.Metadata.Name,
        author: s.Metadata.Author,
        date: new Date(s.Metadata.Date),
        mods: s.Metadata.RequiredMods,
    };
};

export const deserializeSponge2 = (s: Sponge2Schematic): Schematic => {
    let schem = new Schematic();

    deserializeSpongeCommon(schem, s);

    let blocksPalette = parseSpongePalette(s.Palette);
    let spongeBlocks = parseVarintArray(s.BlockData);
    for(let pos of iterVec3(schem.dimensions)) {
        const index = pos.x + pos.z * schem.dimensions.x + pos.y * schem.dimensions.x * schem.dimensions.z;
        let block = blocksPalette.get(spongeBlocks[index]);
        schem.setBlock(pos, block);
    }

    return schem;
};

export const deserializeSponge3 = (s: Sponge3Schematic): Schematic => {
    let schem = new Schematic();
    
    deserializeSpongeCommon(schem, s);

    let blocksPalette = parseSpongePalette(s.Blocks.Palette);
    let spongeBlocks = parseVarintArray(s.Blocks.Data);
    for(let pos of iterVec3(schem.dimensions)) {
        const index = pos.x + pos.z * schem.dimensions.x + pos.y * schem.dimensions.x * schem.dimensions.z;
        let block = blocksPalette.get(spongeBlocks[index]);
        schem.setBlock(pos, block);
    }

    return schem;
};

export const deserializeStructure = (s: StructureSchematic): Schematic => {
    let schem = new Schematic();
    
    schem.dimensions = {
        x: s.size[0],
        y: s.size[1],
        z: s.size[2],
    };

    for(let { state, pos: [x, y, z], nbt } of s.blocks) {
        let block: SchematicBlock = {
            id: s.palette[state].Name,
            state: Object.fromEntries(Object.entries(s.palette[state].Properties).map(
                ([k,v]) => [k,v.data]
            )),
            nbt,
        };

        schem.setBlock({ x, y, z }, block);
    }

    return schem;
}
