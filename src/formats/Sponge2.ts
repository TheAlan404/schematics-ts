import { Field, NBTCompoundFields, NBTDeserializedFrom, NBTDocument } from "@alan404/nbt";
import { Sponge1Metadata, Sponge1Palette, Sponge1Schematic, Sponge1TileEntity } from "./Sponge1";

export class Sponge2Metadata extends Sponge1Metadata {};
export class Sponge2BlockEntity extends Sponge1TileEntity {};
export class Sponge2Palette extends Sponge1Palette {};

export class Sponge2Entity extends NBTDocument {
    @Field("List", ["Double"]) Pos: [number, number, number] = [0,0,0];
    @Field("String") Id: string = "";

    get Extra() {
        return Object.fromEntries(Object.entries(this[NBTDeserializedFrom].data).filter(
            ([k]) => !this[NBTCompoundFields][k]
        ));
    }
}

export class Sponge2Schematic extends Sponge1Schematic {
    static FormatVersion = 2;

    @Field("Int")
    DataVersion: number = 0;

    @Field("Compound", Sponge2Metadata)
    Metadata: Sponge2Metadata;

    @Field("List", ["Compound", Sponge2Entity])
    Entities: Sponge2Entity[] = [];

    @Field("List", ["Compound", Sponge2BlockEntity])
    BlockEntities: Sponge2BlockEntity[] = [];

    @Field("Int")
    BiomePaletteMax: number = 0;

    @Field("Compound", Sponge2Palette)
    BiomePalette: Sponge2Palette;

    @Field("ByteArray")
    BiomeData: number[] = [];
}
