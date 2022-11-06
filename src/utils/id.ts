import Util from ".";

export default class Id {
    /**
     * (U or B)_0000000000000000
     *
     *           ^           ^  ^
     *           1           2  3
     *
     * Time created is the first 13 numbers. The date is in unix time (1 -> 2)
     * There is 3 random numbers at the end (2 -> 3)
     *
     * @param isBot Is the user a bot
     * @returns A user or bot id
     */
    static UserID(isBot = false){
        return `${(isBot)? "B_" : "U_"}${Date.now().toString()}${Util.randomInt(0,9)}${Util.randomInt(0,9)}${Util.randomInt(0,9)}`;
    }
    static ChannelID(){
        return `C_${Date.now().toString()}${Util.randomInt(0,9)}${Util.randomInt(0,9)}${Util.randomInt(0,9)}`;
    }
    static MessageID(){
        return `M_${Date.now().toString()}${Util.randomInt(0,9)}${Util.randomInt(0,9)}${Util.randomInt(0,9)}`;
    }
}