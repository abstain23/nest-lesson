import { Controller, SetMetadata, applyDecorators } from '@nestjs/common';

export const Ddd = (path: string, metadata) => {
  return applyDecorators(Controller(path), SetMetadata('ddd', metadata));
};
