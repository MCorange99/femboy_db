// import Database from "../index";
import UserActions from "./user";
import GuildActions from "./guild";

export default class Actions{
    user: UserActions;
    guild: GuildActions;

    constructor(){
        this.user = new UserActions();
        this.guild = new GuildActions();
    }

}
