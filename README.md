# SMS GATEWAY
## For Globe at Home Router

Exact model (ZLT S10G)

![download](https://user-images.githubusercontent.com/46442119/200166720-1779f886-9e47-406c-997b-6fb972b0d812.jpg)


## To Get Started 

Make sure to have axios npm installed

To test, you need to connect to globe at home wifi

and run this code after importing everything

```js
    (async () => {

        //login
        const login = new LoginRouter('user', '@l03e1t3') //default password works!
        const responseLogin = await login.initLogin();

        //send sms
        const sms = new Sendmsg('09000000123', 'Hello user');
        const smsReponse = await sms.sendSms();
        console.log(smsReponse)

    })()
```

```
    Problem: When sms reaches the router's limit, all incoming messages or sending messages will be ignored by the system
    Status:(Solved)
```


The purpose of this is to initially create an SMS GATEWAY for making api using only Globe at Home modem without spending much more expensive equipment for sending sms
