const bodyParser = require('body-parser');
const express = require('express');
const { uuid } = require('uuidv4');
const app = express();

const port = process.env.PORT || 3000;

let id = 0;

const dataTeman = []
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(dataTeman);
});

app.post('/', (req, res) => {
    const data = req.body
    console.log(data);
    dataTeman.push({id: uuid(), ...data});
    res.send("Berhasil nge-post");
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;

    const data = dataTeman.find(data => data.id == id)
    if (data) {
        dataTeman.splice(dataTeman.indexOf(data), 1);
    }

    console.log(dataTeman);

    res.send('Berhasil hapus data dengan id ${id}');
});

app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { nama } = req.body;
    const data = dataTeman.find((data) => data.id == id);
    if (nama) data.nama = nama;

    console.log('dataTeman', dataTeman);

    res.send('Berhasil Update data dengan id ${id}');
})

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);

});