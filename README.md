# SMS GATEWAY
## For Globe at Home Router

##To Get Started 

Make sure to have axios npm installed

To test, you need to connect to globe at home wifi

and run this code after importing everything


    (async () => {

        //login
        const login = new LoginRouter('user', '@l03e1t3') //default password works!
        const responseLogin = await login.initLogin();

        //send sms
        const sms = new Sendmsg('09000000123', 'Hello user');
        const smsReponse = await sms.sendSms();
        console.log(smsReponse)
        
     })()
