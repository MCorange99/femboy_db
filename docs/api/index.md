# Api

## Routes

### V1

#### Auth

[Login](./auth/login.md) - Gives the user info and token with the right credentials
[Register](./auth/register.md) - Makes a new account and gives the user info and token with the right credentials

#### Channel

[createChannel](./channel/create.md) - Makes a new channel in a guild

#### Guild

[createGuild](./guild/create.md) 
[getGuild](./guild/get.md)

#### Message

<!-- [createGuild](./guild/create.md) 
[getGuild](./guild/get.md) -->

#### Resource

An endpoint to get resources.
Currently used by [Login](./auth/login.md) and [Register](./auth/register.md)

More info [here](./resource/index.md)

#### User

[getInfo](./user/getInfo.md)