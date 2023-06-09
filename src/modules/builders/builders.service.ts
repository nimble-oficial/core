import { HttpStatus, Injectable } from "@nestjs/common";
import { BuildersRepository } from "./builders.repository";
import {
  CreateBuilderDto,
  createBuilderDtoSchema,
} from "./dto/create-builder.dto";
import { SaveBuilderDto, saveBuilderSchema } from "./dto/save-builder.dto";

import { HttpException } from "src/shared/exceptions";
import { Zod } from "src/shared/helpers/zod/validator";
import { FindBuilderByIdDtoOuput } from "./dto/find-builder.dto";

@Injectable()
export class BuildersService {
  constructor(private buildersRepository: BuildersRepository) {}

  async save(saveBuilderDto: SaveBuilderDto): Promise<void> {
    Zod.parseAndValidate(saveBuilderSchema, saveBuilderDto);

    await this.buildersRepository.save(saveBuilderDto);
  }

  async findBy(id: string): Promise<Omit<FindBuilderByIdDtoOuput, "_id">> {
    const builder = await this.buildersRepository.findById(id);

    if (!builder) {
      throw new HttpException("Builder not found", HttpStatus.NOT_FOUND);
    }

    const { nodes, viewport, edges } = builder;

    return { nodes, viewport, edges };
  }

  async create(createBuilderDto: CreateBuilderDto): Promise<void> {
    const payload = Zod.parseAndValidate(
      createBuilderDtoSchema,
      createBuilderDto,
    );

    await this.buildersRepository.create(payload);
  }
}
