import { Injectable } from "@nestjs/common";
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ValidationsService {


    constructor(private prismaService: PrismaService){

    }


    parseIntParams(value: string, defectValue: number): number {
        const convertedValue = parseInt(value, 10);
        return isNaN(convertedValue) ? defectValue : convertedValue;
    }


    async isAnExistingPostId(id: string){

        const results = await this.prismaService.post.findUnique({
            where: {
                id: id
            }
        })

        console.log(results)

        return results ? true: false;
    }

}