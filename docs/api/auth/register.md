# /auth/register

Its a *POST* request

## Props (post data)
 - Email
 - Password
 - Username

## Returns 
Location header and body has location of the created resource. For more info on resources go [here](../resource/index.md)
Resource has to be gotten by the same ip and is one time use

Returned body looks like this:

```json
{
    "Location": "/resource/some-random-id"
}
```
