import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";


const prismaDbErrors = {
  'P2002': (entity: string) => { throw new HttpException(`${entity} already exists`, HttpStatus.BAD_REQUEST); },
  'P2025': (entity: string) => { throw new HttpException(`${entity} not found`, HttpStatus.NOT_FOUND); },
  'P2016': (entity: string) => { throw new HttpException(`Related ${entity} not found`, HttpStatus.NOT_FOUND); },
  'P2000': () => { throw new HttpException('Value too large for column', HttpStatus.BAD_REQUEST); },
  'P2003': () => { throw new HttpException('Foreign key constraint failed', HttpStatus.BAD_REQUEST); },
  'P2006': () => { throw new HttpException('Invalid value for column type', HttpStatus.BAD_REQUEST); },
  'P2024': () => { throw new HttpException('Operation timed out', HttpStatus.REQUEST_TIMEOUT); },
  'P2019': () => { throw new HttpException('Table or dataset not found', HttpStatus.NOT_FOUND); },
  'P1001': () => { throw new HttpException('Unable to connect to the database', HttpStatus.SERVICE_UNAVAILABLE); },
  'P2010': () => { throw new HttpException('Database connection error', HttpStatus.SERVICE_UNAVAILABLE); },
  'DEFAULT': () => { throw new HttpException('Internal Server Error!', HttpStatus.INTERNAL_SERVER_ERROR); },
};


@Injectable()
export class ErrorUUtilsService {
  handleDBPrismError(error: any, entity: string) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Error ${error.code} in ${entity}: ${error.message}`);

      const handleError = prismaDbErrors[error.code] || prismaDbErrors['DEFAULT'];
      return handleError(entity);
    }

    throw new HttpException('Unknown database error', HttpStatus.INTERNAL_SERVER_ERROR);
  }

}