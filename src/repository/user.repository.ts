import User from "../models/user.model";
import BaseRepository from "./base.repository";

export default class UserRepo extends BaseRepository<User> {
    constructor() {
        super(User.name);
    }
}
