import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CommandsDocument = HydratedDocument<Commands>;

@Schema()
class CommandAllowedOptions {
  @Prop()
  id: string;

  @Prop()
  name: string;
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
  updatedAt: Date;

  @Prop({ type: CommandAllowedOptions })
  allowedChannel: {
    id: string;
    name: string;
  };

  @Prop({ type: CommandAllowedOptions })
  allowedRole: {
    id: string;
    name: string;
  };

  @Prop({ default: true })
  sendCommandNotEnabledMessage: boolean;

  @Prop({ default: "Command is not enabled." })
  commandNotEnabledMessage: string;
}

export const CommandsSchema = SchemaFactory.createForClass(Commands);
