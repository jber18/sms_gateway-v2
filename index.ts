import { LoginRouter } from './src/login';
import { Sendmsg } from './src/send';



(async () => {

    //login
    const login = new LoginRouter('user', '@l03e1t3')
    const responseLogin = await login.initLogin();
    console.log(responseLogin)//Reponds boolean if login success

    //send sms
    const sms = new Sendmsg('09000000123', 'Hi World again!'); // (Mobile number , MessageBody)
    const smsReponse = await sms.sendSms();
    console.log(smsReponse)


})()
