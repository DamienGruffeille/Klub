import { AppDataSource } from "../init/data-source";
import { NextFunction, Request, Response } from "express";
import { AppUser } from "../entities/AppUser";

export class UserController {
  private userRepository = AppDataSource.getRepository(AppUser);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOneBy({
      id: parseInt(request.params.id),
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await this.userRepository.findOneBy({
      id: parseInt(request.params.id),
    });
    await this.userRepository.remove(userToRemove);
  }
}
