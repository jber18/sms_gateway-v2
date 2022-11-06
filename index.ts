import { Buffer } from 'node:buffer';
import axios from 'axios';
import querystring from 'node:querystring';
import { LoginRouter } from './src/login';
import { Sendmsg } from './src/send';
// loginRouter("dXNlcg==", "QGwwM2UxdDM=")



(async () => {

    //login
    const login = new LoginRouter('user', '@l03e1t3')
    const responseLogin = await login.initLogin();

    //send sms
    const sms = new Sendmsg('09073248135', 'Hello Jeb');
    const smsReponse = await sms.sendSms();
    console.log(smsReponse)

    // if (responseLogin) {

    // }


})()
