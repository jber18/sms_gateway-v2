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
    const sms = new Sendmsg('09000000123', 'Hello World'); // (Mobile number , MessageBody)
    const smsReponse = await sms.sendSms();
    console.log(smsReponse)


})()
