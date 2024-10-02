import { createFactory, Enum, match } from "@alan404/enum";
import { Sponge1Schematic, Sponge2Schematic, Sponge3Schematic, StructureSchematic } from "../formats";
import { Vec3 } from "../types";
import { NBTCompound, NBTTag } from "@alan404/nbt";
import { SchematicBlock } from "./block";
import { SchematicMetadata } from "./metadata";
import { deserializeSponge2, deserializeSponge3, deserializeStructure } from "./serde";

export class Schematic {
    dimensions: Vec3 = { x:0, y:0, z:0 };
    blocks: Record<string, SchematicBlock> = {};
    metadata: SchematicMetadata = {};

    index({ x, y, z }: Vec3) {
        return `${x},${y},${z}`;
    }

    setBlock(pos: Vec3, block: SchematicBlock) {
        this.blocks[this.index(pos)] = block;
    }

    getBlock(pos: Vec3) {
        return this.blocks[this.index(pos)];
    }

    deserializeFromTag(tag: NBTCompound) {
        if(tag.data[""]) tag = tag.data[""] as NBTCompound;
        
        if (tag.data["Schematic"].data["Blocks"] && tag.data["Schematic"].data["Version"].data == 3) {
            return deserializeSponge3(Sponge3Schematic.deserializeFromTag(tag));
        } else if(tag.data["BlockData"]) {
            return deserializeSponge2(Sponge2Schematic.deserializeFromTag(tag));
        } else if(tag.data["Materials"]) {
            // mcedit
        } else if(tag.data["blocks"]) {
            return deserializeStructure(StructureSchematic.deserializeFromTag(tag));
        } else {
            throw new Error("Can't tell which format this tag is");
        }
    }
}
