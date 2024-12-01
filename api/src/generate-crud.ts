import * as path from 'path';
import * as fs from 'fs';

// Lấy các tham số từ dòng lệnh
const entityName = process.argv[2];
const entity = process.argv[3];
const moduleName = process.argv[4] || entityName;
const additionalProperty = process.argv[5] || 'defaultValue';

// Xác định đường dẫn đến các thư mục và file
const entityDir = path.join('src', 'entities');
const moduleDir = path.join('src', 'modules');
const moduleSubDir = path.join(moduleDir, moduleName.toLowerCase()); // Thư mục con cho module
const serviceDir = path.join(moduleSubDir, 'services');
const controllerDir = path.join(moduleSubDir, 'controllers');
const repositoryDir = path.join(moduleSubDir, 'repositories');
const dtoDir = path.join(moduleSubDir, 'dto');

const entityFile = path.join(
  entityDir,
  `${entityName.toLowerCase()}.entity.ts`,
);
console.log({ entityFile });

const indexFile = path.join(entityDir, 'index.ts');
const serviceFile = path.join(
  serviceDir,
  `${entityName.toLowerCase()}.service.ts`,
);
const controllerFile = path.join(
  controllerDir,
  `${entityName.toLowerCase()}.controller.ts`,
);
const repositoryFile = path.join(
  repositoryDir,
  `${entityName.toLowerCase()}.repository.ts`,
);
const dtoCreateFile = path.join(
  dtoDir,
  `${entityName.toLowerCase()}-create.dto.ts`,
);
const dtoUpdateFile = path.join(
  dtoDir,
  `${entityName.toLowerCase()}-update.dto.ts`,
);
const dtoDetailFile = path.join(
  dtoDir,
  `${entityName.toLowerCase()}-detail.dto.ts`,
);
const dtoListFile = path.join(
  dtoDir,
  `${entityName.toLowerCase()}-list.dto.ts`,
);

const moduleFile = path.join(
  moduleSubDir,
  `${moduleName.toLowerCase()}.module.ts`,
);

// Kiểm tra và tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(moduleDir)) {
  fs.mkdirSync(moduleDir, { recursive: true });
}
if (!fs.existsSync(moduleSubDir)) {
  fs.mkdirSync(moduleSubDir, { recursive: true });
}
if (!fs.existsSync(serviceDir)) {
  fs.mkdirSync(serviceDir, { recursive: true });
}
if (!fs.existsSync(controllerDir)) {
  fs.mkdirSync(controllerDir, { recursive: true });
}
if (!fs.existsSync(repositoryDir)) {
  fs.mkdirSync(repositoryDir, { recursive: true });
}
if (!fs.existsSync(dtoDir)) {
  fs.mkdirSync(dtoDir, { recursive: true });
}

// Định nghĩa các template cho entity, service, controller, repository, dto và module
const entityTemplate = `import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/modules/crud/entities/base.entity';

@Entity('${entity}')
export class ${entityName} extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ name: 'codeName', type: 'varchar', length: 100, nullable: true })
  codeName: string;

  @Column({ name: 'status', type: 'boolean', nullable: false, default: true })
  status: boolean;
}
`;

const serviceTemplate = `
import { ${entityName} } from 'src/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from 'src/modules/crud/crud.service';

@Injectable()
export class ${entityName}Service  extends CrudService<${entityName}>{
  constructor(
    @InjectRepository(${entityName}) private readonly ${entityName.toLowerCase()}Repository: Repository<${entityName}>,
  ) {
      super(${entityName.toLowerCase()}Repository);}
}
`;

const controllerTemplate = `
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ${entityName}Service } from '../services/${entityName.toLowerCase()}.service';
import { ${entityName}CreateDto } from '../dto/${entityName.toLowerCase()}-create.dto';
import { ${entityName}UpdateDto } from '../dto/${entityName.toLowerCase()}-update.dto';

@Controller('api/${entity}')
export class ${entityName}Controller {
  constructor(private readonly ${entityName.toLowerCase()}Service: ${entityName}Service) {}

  @Get()
  findAll() {
    return this.${entityName.toLowerCase()}Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.${entityName.toLowerCase()}Service.findById(id);
  }

  @Post()
  create(@Body() createDto: ${entityName}CreateDto) {
    return this.${entityName.toLowerCase()}Service.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: ${entityName}UpdateDto) {
    return this.${entityName.toLowerCase()}Service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.${entityName.toLowerCase()}Service.delete(id);
  }
}
`;

const repositoryTemplate = `
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseRepository } from "../../crud/repository/base.repository";
import { ${entityName} } from "src/entities";

@Injectable()
export class ${entityName}Repository extends BaseRepository<${entityName}> {
  constructor(@InjectRepository(${entityName}) private readonly ${entityName.toLowerCase()}Repository: Repository<${entityName}>) {
    super(${entityName.toLowerCase()}Repository);
  }
}
`;

const dtoCreateTemplate = `
import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class ${entityName}CreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  codeName?: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
`;

const dtoUpdateTemplate = `
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class ${entityName}UpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  codeName?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
`;

const dtoDetailTemplate = `
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class ${entityName}Dto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  codeName?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;


}
`;

const dtoListTemplate = `
export class ${entityName}ListDto {
  id: number;
  name: string;
  codeName?: string;
  status: boolean;
}
`;
const moduleTemplate = `
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${entityName} } from 'src/entities';
import { ${entityName}Service } from './services/${entityName.toLowerCase()}.service';
import { ${entityName}Controller } from './controllers/${entityName.toLowerCase()}.controller';
import { ${entityName}Repository } from './repositories/${entityName.toLowerCase()}.repository';

@Module({
  imports: [TypeOrmModule.forFeature([${entityName}])],
  providers: [${entityName}Service, ${entityName}Repository],
  controllers: [${entityName}Controller],
   exports: [${entityName}Service],
})
export class ${moduleName}Module {}
`;

// Tạo các file với nội dung từ các template
fs.writeFileSync(entityFile, entityTemplate);
fs.writeFileSync(serviceFile, serviceTemplate);
fs.writeFileSync(controllerFile, controllerTemplate);
fs.writeFileSync(repositoryFile, repositoryTemplate);
fs.writeFileSync(dtoCreateFile, dtoCreateTemplate);
fs.writeFileSync(dtoUpdateFile, dtoUpdateTemplate);
fs.writeFileSync(dtoDetailFile, dtoDetailTemplate);
fs.writeFileSync(dtoListFile, dtoListTemplate);
fs.writeFileSync(moduleFile, moduleTemplate);

// Cập nhật file index.ts để bao gồm entity mới
const indexContent = fs.existsSync(indexFile)
  ? fs.readFileSync(indexFile, 'utf8')
  : '';

const importStatement = `export * from './${entityName.toLowerCase()}.entity';\n`;
if (!indexContent.includes(importStatement)) {
  fs.writeFileSync(indexFile, indexContent + importStatement);
}

console.log(
  `CRUD files for ${entityName} created with additional property: ${additionalProperty}.`,
);
