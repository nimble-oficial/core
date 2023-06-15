import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SaveBuilderDto } from "./dto/save-builder.dto";

import mongoose, { Model } from "mongoose";
import { HttpException } from "src/shared/exceptions";
import { initialBuilderNode } from "src/shared/mocks/nodes/initial-node";
import { Builders } from "./builders.schema";
import {
  CreateBuilderDto,
  CreateBuilderDtoOutput,
} from "./dto/create-builder.dto";
import { FindBuilderByIdDtoOuput } from "./dto/find-builder.dto";

@Injectable()
export class BuildersRepository {
  constructor(
    @InjectModel(Builders.name) private buildersModel: Model<Builders>,
  ) {}

  private hasRootNode(nodes: any[]): boolean {
    return nodes.find(
      (node) => node.isRoot && node.data.key === initialBuilderNode.data.key,
    );
  }

  async save(saveBuilderDto: SaveBuilderDto): Promise<void> {
    const hasRootNode = this.hasRootNode(saveBuilderDto.nodes);

    if (!hasRootNode) {
      throw new HttpException(
        "The builder must have a root node",
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.buildersModel.findByIdAndUpdate(saveBuilderDto.builderId, {
      ...saveBuilderDto,
      updatedAt: new Date(),
    });
  }

  async create(
    createBuilderDto: CreateBuilderDto,
  ): Promise<CreateBuilderDtoOutput> {
    const createdId = new mongoose.Types.ObjectId().toString();

    await this.buildersModel.create({
      _id: createdId,
      commandName: createBuilderDto.commandName,
      edges: [],
      guildId: createBuilderDto.guildId,
      nodes: [initialBuilderNode],
      zoom: 2,
      createdAt: new Date(),
    });

    return { _id: createdId };
  }

  async delete(builderId: string): Promise<void> {
    await this.buildersModel.findByIdAndDelete(builderId);
  }

  async findById(id: string): Promise<FindBuilderByIdDtoOuput> {
    return this.buildersModel.findOne({
      _id: id,
    });
  }
}
