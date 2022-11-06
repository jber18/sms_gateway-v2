import axios from "axios";
import { Buffer } from 'node:buffer';


export class LoginRouter {
    username: string;
    password: string;

    constructor(user: string, pass: string) {
        this.username = user;
        this.password = pass;
    }

    async initLogin() {
        var responseData;
        const user = Buffer.from(this.username, 'utf8').toString('base64');
        const pass = Buffer.from(this.password, 'utf8').toString('base64');

        //declare headers and paramters
        const headers: object = {
            "Host": "192.168.254.254",
            "Proxy-Connection": "keep-alive",
            "Content-Length": "73",
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

        const parameter: any = {
            "isTest": "false",
            "goformId": "LOGIN",
            "username": user,
            "password": pass
        }

        //sending request to login
        await axios({
            method: "post",
            url: 'http://192.168.254.254/goform/goform_set_cmd_process',
            data: new URLSearchParams(parameter),
            headers: headers
        }
        ).then(function (response) {
            //console.log(response.data) 
            responseData = response.data.result == 0 ? true : false;
            //console.log(response.data)
        })

        return responseData;
    }
}