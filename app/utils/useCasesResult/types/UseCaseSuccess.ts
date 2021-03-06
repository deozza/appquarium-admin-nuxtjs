import type UseCaseResultTypeInterface from "./UseCaseResultTypeInterface";

export default class UseCaseSuccess implements UseCaseResultTypeInterface {
  code: number;
  type: string;

  constructor(type: string, code: number) {
    this.type = type
    this.code = code
  }

}
