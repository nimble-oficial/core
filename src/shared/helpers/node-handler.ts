import { BuilderNodeData } from "src/modules/builders/builders.schema";
import { CommandsRepository } from "src/modules/commands/commands.repository";
import { DiscordMessageDto } from "src/modules/discord/dto/discord-message.dto";

export class NodeHandler {
  constructor(private commandsRepository: CommandsRepository) {}

  async execute(data: BuilderNodeData, message: DiscordMessageDto) {
    if (!data.enabled) {
      console.log(`Node ${data.key} is disabled. Ignoring...`);
      return;
    }
    // TODO: add as config option
    await this.commandsRepository.showTyping(message);

    // TODO: add timeout

    switch (data?.key) {
      case "send-message":
        await this.commandsRepository.sendMessage(data?.content, message);
        break;
      case "reply-message":
        await this.commandsRepository.replyMessage(data?.replyContent, message);
        break;
    }
  }
}
