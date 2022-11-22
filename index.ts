import { LoginRouter } from './src/login';
import { Sendmsg } from './src/send';
import { GetmessageId, Deletehistory } from './src/cleanhistory';


(async () => {

    //login
    const login = new LoginRouter('user', '@l03e1t3')
    const responseLogin = await login.initLogin();
    console.log(responseLogin)//Reponds boolean if login success

    // send sms
    const sms = new Sendmsg('09000001234', 'Working!'); // (Mobile number , MessageBody)
    const smsReponse = await sms.sendSms();
    console.log(smsReponse)


    //Get Message ID
    const getMsgID = new GetmessageId();
    const responseData = await getMsgID.getMessageId();
    //Delete Message
    const cleanMsgHistory = new Deletehistory(responseData);
    cleanMsgHistory.deleteMessage();

})()
