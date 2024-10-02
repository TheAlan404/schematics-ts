import { Field, NBTDocument } from "@alan404/nbt";
import { Sponge2BlockEntity, Sponge2Entity, Sponge2Metadata, Sponge2Palette } from "./Sponge2";

export class Sponge3Entity extends Sponge2Entity {};
export class Sponge3BlockEntity extends Sponge2BlockEntity {};
export class Sponge3Palette extends Sponge2Palette {};
export class Sponge3Metadata extends Sponge2Metadata {};

export class Sponge3BlockContainer extends NBTDocument {
    @Field("Compound", Sponge3Palette) Palette: Sponge3Palette;
    @Field("ByteArray") Data: number[] = [];
    @Field("List", ["Compound", Sponge3BlockEntity]) BlockEntities: Sponge3BlockEntity[] = [];
};

export class Sponge3BiomeContainer extends NBTDocument {
    @Field("Compound", Sponge3Palette) Palette: Sponge3Palette;
    @Field("ByteArray") Data: number[] = [];
};

export class Sponge3Schematic extends NBTDocument {
    static FormatVersion = 3;
    
    @Field("Int") Version: number = 0;
    @Field("Int") DataVersion: number = 0;

    @Field("Compound", Sponge3Metadata)
    Metadata: Sponge3Metadata;

    @Field("Short") Width: number = 0;
    @Field("Short") Height: number = 0;
    @Field("Short") Length: number = 0;

    @Field("IntArray") Offset: [number, number, number] = [0,0,0];
    @Field("Compound", Sponge3BlockContainer) Blocks: Sponge3BlockContainer;
    @Field("Compound", Sponge3BiomeContainer) Biomes: Sponge3BiomeContainer;
    @Field("List", ["Compound", Sponge3Entity]) Entities: Sponge3Entity[] = [];
};
