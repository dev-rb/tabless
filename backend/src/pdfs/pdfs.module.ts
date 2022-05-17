import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PdfsController } from './pdfs.controller';
import { PdfsService } from './pdfs.service';

@Module({
  controllers: [PdfsController],
  providers: [PdfsService, PrismaService]
})
export class PdfsModule { }
