import { EnumVariant } from "@alan404/enum";
import { Field, NBTDocument, NBTTag } from "@alan404/nbt";

export class StructurePaletteBlock extends NBTDocument {
    @Field("String") Name: string = "";
    @Field("Compound") Properties: Record<string, EnumVariant<NBTTag, "String">> = {};
};

export class StructureBlock extends NBTDocument {
    @Field("Int") state: number = 0;
    @Field("List", ["Int"]) pos: [number, number, number] = [0,0,0];
    @Field("Compound") nbt: Record<string, NBTTag> = {};
};

export class StructureEntity extends NBTDocument {
    @Field("List", ["Double"]) pos: [number, number, number] = [0,0,0];
    @Field("List", ["Int"]) blockPos: [number, number, number] = [0,0,0];
    @Field("Compound") nbt: Record<string, NBTTag> = {};
};

export class StructureSchematic extends NBTDocument {
    @Field("Int") DataVersion: number = 0;
    @Field("List", ["Int"]) size: [number, number, number] = [0,0,0];
    @Field("List", ["Compound", StructurePaletteBlock]) palette: StructurePaletteBlock[] = [];
    @Field("List", ["List", ["Compound", StructurePaletteBlock]]) palettes: StructurePaletteBlock[][] = [];
    @Field("List", ["Compound", StructureBlock]) blocks: StructureBlock[] = [];
    @Field("List", ["Compound", StructureEntity]) entities: StructureEntity[] = [];
};
