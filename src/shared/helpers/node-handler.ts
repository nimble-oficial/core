import { BuilderNodeData } from "src/modules/builders/builders.schema";
import { CommandsRepository } from "src/modules/commands/commands.repository";
import { DiscordMessageDto } from "src/modules/discord/dto/discord-message.dto";

export class NodeHandler {
  constructor(private commandsRepository: CommandsRepository) {}

  async execute(data: BuilderNodeData, message: DiscordMessageDto) {
    const { content, key, replyContent } = data;

    // TODO: add as config option
    await this.commandsRepository.showTyping(message);

    switch (key) {
      case "send-message":
        await this.commandsRepository.sendMessage(content, message);
        break;
      case "send-message-with-mention-owner":
        await this.commandsRepository.mentionMessageOwner(content, message);
        break;
      case "reply-message":
        await this.commandsRepository.replyMessage(replyContent, message);
        break;
      case "reply-with-chat-gpt":
        await this.commandsRepository.replyWithChatGpt(message);
        break;
    }
  }
}
