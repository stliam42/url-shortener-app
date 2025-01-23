import {
  ConflictException,
  GoneException,
  NotFoundException,
} from '@nestjs/common';

export class UrlNotFoundException extends NotFoundException {
  constructor(url: string) {
    super(`URL '${url}' not found`);
  }
}

export class UrlExpiredException extends GoneException {
  constructor(url: string) {
    super(`URL '${url}' expired`);
  }
}

export class AliasAlreadyExistsException extends ConflictException {
  constructor(alias: string) {
    super(`Alias '${alias}' already exists`);
  }
}
