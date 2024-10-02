import { EnumVariant } from "@alan404/enum";
import { NBTDocument, Field, NBTTag, NBTCompound, NBTDeserializedFrom, NBTCompoundFields } from "@alan404/nbt";

export class Sponge1Metadata extends NBTDocument {
    @Field("String") Name: string = "";
    @Field("String") Author: string = "";
    @Field("Long") Date: number = 0;
    @Field("List", ["String"]) RequiredMods: string[] = [];
}

export class Sponge1Palette extends NBTDocument {
    palette: Record<string, number> = {};

    deserializeFromTag(tag: NBTCompound): this {
        this.palette = Object.fromEntries(Object.entries(tag.data).map(
            ([k, v]) => [k, (v as EnumVariant<NBTTag, "Int">).data]
        ));

        return this;
    }
}

export class Sponge1TileEntity extends NBTDocument {
    @Field("Int") ContentVersion: number = 0;
    @Field("List", ["Int"]) Pos: [number, number, number] = [0,0,0];
    @Field("String") Id: string = "";

    get Extra() {
        return Object.fromEntries(Object.entries(this[NBTDeserializedFrom].data).filter(
            ([k]) => !this[NBTCompoundFields][k]
        ));
    }

    get Data() {
        return this.Extra;
    }
}

export class Sponge1Schematic extends NBTDocument {
    static FormatVersion = 1;

    @Field("Int")
    Version: 1 | 2 = 1;

    @Field("Compound", Sponge1Metadata)
    Metadata: Sponge1Metadata;

    @Field("Short") Width: number = 0;
    @Field("Short") Height: number = 0;
    @Field("Short") Length: number = 0;

    @Field("IntArray") Offset: [number, number, number] = [0,0,0];
    @Field("Int") PaletteMax: number = 0;

    @Field("Compound", Sponge1Palette)
    Palette: Sponge1Palette;

    @Field("ByteArray")
    BlockData: number[] = [];

    @Field("List", ["Compound", Sponge1TileEntity])
    TileEntities: Sponge1TileEntity[];
}


