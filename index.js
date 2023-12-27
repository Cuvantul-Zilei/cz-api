import express from 'express';
import bodyParser from 'body-parser';
import requestify from 'requestify'; 

const INTERNAL_API_URL = "https://script.google.com/macros/s/AKfycbyk69E5TaJRlam2OD4VBF5WBNc6oP8GSdbzTr_42KUdruPpmx_1e5XvsE1cnxEEnPsR/exec?path=cuvinte"
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.get('/cuvant', (req, res) => { res.send('Cuvantul zilei') });
app.get('/cuvinte', (req, res) => { 
    let cuvinte, postate = [];
    requestify.get(INTERNAL_API_URL).then(function(response) {
        cuvinte = response.getBody();
        
        if(cuvinte && postate) {
            res.send(cuvinte) 
        }
    });
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})