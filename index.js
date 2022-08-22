import express from 'express';
import bodyParser from 'body-parser';
import requestify from 'requestify'; 


const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.get('/cuvant', (req, res) => { res.send('Cuvantul zilei') });
app.get('/cuvinte', (req, res) => { 
    // let cuvinte = fetch('https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/cuvantulzilei/cuvintePostate').then(res => res.json());
    let cuvinte, postate = [];
    requestify.get('https://api.sheety.co/06def408e74850aef0fbd22a79539f9f/cuvantulzilei/cuvintePostate').then(function(response) {
        cuvinte = response.getBody();
        postate = cuvinte.cuvintePostate;
        
        if(cuvinte && postate) {
            res.send(cuvinte.cuvintePostate) 
        }
    });
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})