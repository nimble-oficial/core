import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CommandsDocument = HydratedDocument<Commands>;

class CommandOptions {
  @Prop({ default: "This command is not enabled." })
  notEnabledMessage: string;

  @Prop({ default: true })
  canSendNotEnabledMessage: boolean;
}

@Schema()
export class Commands {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  guildId: string;

  @Prop()
  createdAt: Date;

  @Prop({ default: true })
  enabled: boolean;

  @Prop()
  builderId: string;

  @Prop()
  options: CommandOptions;

  @Prop()
  updatedAt: Date;

  @Prop()
  allowedChannel: string;

  @Prop()
  allowedRole: string;
}

export const CommandsSchema = SchemaFactory.createForClass(Commands);
