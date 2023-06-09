import { Builders } from "../builders.schema";

export interface FindBuilderByCommandIdDtoOuput {
  _id: string;
}
export interface FindBuilderByIdDtoOuput
  extends Omit<Builders, "createdAt" | "updatedAt" | "guildId"> {
  _id: string;
}
