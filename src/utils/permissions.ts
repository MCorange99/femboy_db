
const RolePermissions = {
    none:               0,
    readMessages:       2, //* read messages in channels
    sendMessages:       4, //* send messages in channels
    manageServer:       8, //* manage server settings
    banMembers:        16, //* ban other users
    kickMembers:       32, //* kick other users
    changeNickname:    64, //* change own nick name
    manageNicknames:  128, //* change other users and own username
    manageChannels:   256, //* create/delete/change channels
    Administrator:    512, //* full access to all settings, and is able to do anything on that server
};



module.exports = {
    RolePermissions
};