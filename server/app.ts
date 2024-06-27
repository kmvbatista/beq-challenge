import express from "express";
import cors from "cors";
import DataStorage from "./dataStorage";
import DataVersioning from "./dataVersioning";
import DataBackup from "./dataBackup";

const PORT = 8080;
const app = express();
const backupDir = 'backup'
const dataStorage = new DataStorage()
const dataVersioning = new DataVersioning()
const dataBackup = new DataBackup(backupDir);

app.use(cors());
app.use(express.json());

// Routes

app.get("/", (req, res) => {
  const data  = dataStorage.getData('any')
  res.json({data});
});

app.get("/recover", async (req, res) => {
  const latestVersion = dataVersioning.getLatestVersion('any')
  if(latestVersion) {
    const recoveredData = await dataBackup.restoreData(latestVersion)
    return res.json(recoveredData);
  }
  res.status(404).send({message: 'No data saved'})
});

app.post("/", (req, res) => {
  const newData = req.body.data || '';
  dataStorage.storeData('any', newData)
  const newVersion = dataVersioning.saveVersion('any')
  dataBackup.backupData(newData, newVersion)
  res.sendStatus(200);
});

app.post("/verify", (req, res) => {
  const data = req.body.data || '';
  const latestVersion = dataVersioning.getLatestVersion('any')
  if(latestVersion) {
    const isDataValid = dataStorage.verifyData('any', data)
    if(isDataValid) {
      return res.json({message: 'Data is valid'})
    }
    return res.status(400).json({message: 'Data is not valid, please recover'})
  }
  res.status(404).json({message: 'No data saved'})
});



app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

