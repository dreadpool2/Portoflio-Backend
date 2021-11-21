import express from 'express'
import cors from "cors";

const app = express()

let global = false;

app.use(cors());
app.use(express.json());

app.route('/waitfordata').get(async (req, res) => {
 
    res.send("done")
})

app.route('/change').get(async (req, res) => {
    global = !global;
    res.send(global)
})

const timer = (t) => new Promise((rs, rej) => {
    setTimeout(rs, t)
})  

const valid = () => new Promise(async (resolve, reject) => {
    if(global){
        console.log('valid true')
        resolve()
    }
    else{
        console.log('valid false')
        await timer().then(() => {
            valid()
        })
    }
})

const responder = () => new Promise(async (resolve, reject) => {
    console.log('responder started')
    await valid().then(() => {
        resolve('responder done')
    })
})

let port = '5101'

app.listen(port, function () {
  console.log(`express server is running on port ${port}`);
})