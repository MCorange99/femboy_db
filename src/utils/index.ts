import Id from "./id";
import permissions from "./permissions";

export default class Util {
    
    static randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export {
    permissions,
    Id
};