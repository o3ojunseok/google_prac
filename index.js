 const express = require('express');
 const {google} = require('googleapis');
const { appsactivity } = require('googleapis/build/src/apis/appsactivity');


 const app = express();

 app.set('view engine','ejs');
 app.use(express.urlencoded({ extended: true}));

// google sheet
app.get ('/', (req, res) => {
    res.render("index")
})


 app.post('/', async (req, res) => {

    const { request, name } = req.body;

    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',

    });


    // create client instance of auth
    const client = await auth.getClient();

    // instance of Google Spread Shhets API
    const googleSheets = google.sheets({ version: 'v4', auth: client})

    const spreadSheetId = '1T4EQDSO5JCBQHN1gNvW78dYvb2ZmeyFDPNOmEZ6-Rgk'; 

    // Get metaData about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadSheetId,

    })

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadSheetId,
        range: 'Sheet1',
        valueInputOption: "RAW"


    })

    // Write row to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadSheetId,
        range: "Sheet1",
        valueInputOption: "USER_ENTERD",
        resource: {
            values: [
                [ request, name]
            ]
        }
    })




    res.send("success submit")
 });

 app.listen(1337,(req , res) => {
    console.log('running')
 })
