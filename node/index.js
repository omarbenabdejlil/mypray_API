const express = require("express");
const request = require("request");
const cors = require("cors");


const app = express();
app.use(cors())
/**
 * this function to get data from meteo website and return the content when no error else, 
 * return an error message
 */

function httpgetContent(callback) {
    try {
        request({
            //rejectUnauthorized: false,
            headers: {
                'Content-Type': 'application/json',
            },
            uri: 'https://prieres.date/tunis',
            method: 'GET'
            //anonymous function 3 params error si on a un error, res : all contents. , body : html content.
        }, function (err, res, body) {
            if (!err) {
                //console.log(res)
                callback({
                    success: true,
                    response: body
                })
            } else {
                console.log(err)
                callback({
                    success: false,
                    response: "we have an error when getting data from source content"
                })
            }
        }
        )
    } catch (err) {
        callback({
            success: false,
            response: "connexion error " + err
        })
    }
}


function customRegexp(data, pattern) {
    try {
        let regexp = new RegExp(pattern);
        let matches = data.match(regexp);
        let matched = matches[1];
        return matched
    } catch (e) {
        null
    }
}

app.get('/api/athen', function(req, res) {
    try {
        const abc = httpgetContent(data => {
            let body_content = data.response
            let imsak = customRegexp(body_content, /(\d+:\d+\ )\(Imsak\)/);
            let fajr = customRegexp(body_content, /(\d+:\d+\ )\(Fejr\)/);
            let sunrise = customRegexp(body_content, /(\d+:\d+\ )\(Sunrise\)/);
            let duhr = customRegexp(body_content, /(\d+:\d+\ )\(Dhuhr\),/);
            let asser = customRegexp(body_content, /(\d+:\d+\ )\(Asser\),/);
            let maghreb = customRegexp(body_content, /(\d+:\d+\ )\(Maghreb\),/);
            let icha = customRegexp(body_content, /(\d+:\d+\ )\(Icha\)/);
    
            var response = {
                imsak: imsak,
                fajr: fajr,
                sunrise: sunrise,
                duhr: duhr,
                asser: asser,
                maghreb: maghreb,
                Icha: icha
            }
            return res.status(200).json({
                response
            })
        })
    }catch(err){
        return res.status(400).json({
            data : parsingPray()
        })
    }
})

app.listen(3000, ()=>{
    console.log("server listening in port 3000")
});
