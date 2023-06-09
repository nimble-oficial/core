import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export class BuilderViewPort {
  @Prop()
  x: number;

  @Prop()
  y: number;

  @Prop({ default: 1 })
  zoom: number;
}

export class BuilderNodeData {
  @Prop({ required: false })
  content: string;

  @Prop({ required: false })
  replyContent: string;

  @Prop()
  description: string;

  @Prop()
  key: string;

  @Prop()
  label: string;

  @Prop({ default: true })
  enabled: boolean;
}

export type BuildersDocument = HydratedDocument<Builders>;

@Schema()
export class Builders {
  @Prop({ isRequired: false })
  nodes: Array<{ data: BuilderNodeData }>;

  @Prop({ isRequired: false })
  edges: any[];

  @Prop()
  viewport: BuilderViewPort;

  @Prop({ isRequired: true })
  guildId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BuildersSchema = SchemaFactory.createForClass(Builders);
