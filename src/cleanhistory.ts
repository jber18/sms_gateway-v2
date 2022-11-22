import axios from "axios";
import { Buffer } from 'node:buffer';
import { ExitStatus } from "typescript";

export class GetmessageId {

    public async getMessageId() {
        var msgid:string = '';
        // var len:number = 0;

        //Declaring headers

        const header:object = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-US,en;q=0.9",
            "Connection": "keep-alive",
            "Cookie": "pageForward=home",
            "DNT": "1",
            "Host": "192.168.254.254",
            "Referer": "http://192.168.254.254/index.html?t=",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
        }
        const url:string = "http://192.168.254.254/goform/goform_get_cmd_process?isTest=false&cmd=sms_data_total&page=0&data_per_page=500&mem_store=1&tags=10&order_by=order+by+id+desc&_=1668786454530";

        await axios({
            method:"get",
            url: url,
            headers: header
        }).then(async function (response){
                var idData = await response.data;
                const idLen = response.data.messages.length;
                
                //Further improvements for this part
                //Problem: If message is less then 5, the content length won't calculated correctly so i had
                //to end the process;
                if (idLen < 5) process.exit(0);

                for(let i = 0; i<idData.messages.length; i++){
                    msgid += `${idData.messages[i].id};`;
                    
                }
            
        })
        return msgid;
    }
}

export class Deletehistory{
    id: string;

    constructor(messageId: string){
        this.id = messageId;
    }
    
    public async deleteMessage(){
        const getContent_length:number = Buffer.byteLength(this.id, 'utf-8');
        const contentValue:number = (getContent_length + 64);
        console.log(contentValue)

        const HEADER:object = {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-US,en;q=0.9",
            "Connection": "keep-alive",
            "Content-Length": contentValue,
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Cookie": "pageForward=home",
            "DNT": "1",
            "Host": "192.168.254.254",
            "Origin": "http://192.168.254.254",
            "Referer": "http://192.168.254.254/index.html?t=",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
        };
        const URL:string = "http://192.168.254.254/goform/goform_set_cmd_process";

        const BODY:any = {
            "isTest":"false",
            "goformId":"DELETE_SMS",
            "msg_id": this.id,
            "notCallback":"true"
        }


        await axios({
            method:'post',
            url: URL,
            headers: HEADER,
            data: new URLSearchParams(await BODY),

        }).then(async function (response){
            console.log(response.data)
        });

         
    }
}