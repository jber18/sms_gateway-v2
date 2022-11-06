import axios from "axios";
import { Buffer } from 'node:buffer';

export class Sendmsg {
    mobile: string;
    msgBody: string;

    constructor(mobileNumber: string, msg: string) {
        this.mobile = mobileNumber;
        this.msgBody = msg;
    }
    async sendSms() {
        var resultData:any;
        //converting utf8 to utf16
        const msgContent = Buffer.from(this.msgBody, 'utf16le').toString('hex');
        const _msgContent = msgContent.length > 0 ? `00${msgContent.slice(0, msgContent.length - 2)}` : ''

        //Creating timestamp
        const dateNow:Date = new Date();
        const year:number = dateNow.getFullYear();
        const day:number = dateNow.getDate();
        const month:number = dateNow.getMonth();
        const hour:number = dateNow.getHours();
        const minute:number = dateNow.getMinutes();
        const seconds:number = dateNow.getSeconds();
        //year;month;day;hour;minute;seconds
        const timestamp: string = `${year.toString().slice(2)};${month < 10 ? `0${month + 1}` : month + 1};${day < 10 ? `0${day}` : day};${hour < 10 ? `0${hour}` : hour};${minute < 10 ? `0${minute}` : minute};${seconds < 10 ? `0${seconds}` : seconds};+8`


        const bodyData = {
            isTest: "false",
            goformId: "SEND_SMS",
            notCallback: "true",
            Number: this.mobile,
            sms_time: timestamp,//"22;11;05;19;02;22;+8",//year;month;day;hour;minute;seconds
            MessageBody: _msgContent,
            ID: "-1",
            encode_type: "GSM7_default"
        }

        //getting bytesize for content length
        const mobileByteSize:number = Buffer.byteLength(this.mobile, 'utf8')
        const bodyByteSize:number = Buffer.byteLength(_msgContent, 'utf8')
        // console.log((mobileByteSize + bodyByteSize + 231) - 88)
        const getContent_length = (mobileByteSize + bodyByteSize + 231) - 88

        await axios({
            method: 'post',
            url: 'http://192.168.254.254/goform/goform_set_cmd_process',
            data: new URLSearchParams(bodyData),
            headers: {
                "Host": "192.168.254.254",
                "Proxy-Connection": "keep-alive",
                "Content-Length": getContent_length,
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "DNT": "1",
                "X-Requested-With": "XMLHttpRequest",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "http://192.168.254.254",
                "Referer": "http://192.168.254.254/index.html?=t",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "en-US,en;q=0.9",
                "Cookie": "pageForward=home"
            }
        })
            .then(function (response) {
                // console.log(response.data.result);
                resultData = {
                    result: response.data.result
                }
            });

            return resultData;

    }
}