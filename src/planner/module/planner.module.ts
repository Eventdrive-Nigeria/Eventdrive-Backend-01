import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Planner, PlannerSchema } from '../schemas/planner.schema';
import { PlannerService } from '../service/planner.service';
import { PlannerController } from '../controller/planner.controller';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    OtpModule,
    MongooseModule.forFeature([
      {
        name: Planner.name,
        schema: PlannerSchema,
      },
    ]),
  ],
  controllers: [PlannerController],
  providers: [PlannerService],
  exports: [PlannerService],
})
export class PlannerModule {}
