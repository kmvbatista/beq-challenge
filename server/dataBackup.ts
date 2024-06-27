// dataBackup.ts
import fs from 'fs-extra';
import path from 'path';


class DataBackup {
  backupDir: string;

  constructor(backupDir: string) {
    this.backupDir = backupDir;
  }

  async backupData(data: string, version: string): Promise<void> {
    const fileName = `backup_${version}.zip`
    fs.ensureDirSync(this.backupDir)
    const tempFilePath = path.join(this.backupDir, fileName);
    await fs.writeFile(tempFilePath, data);
  }

  async restoreData(version: string): Promise<string> {
    const fileName = `backup_${version}.zip`
    const tempFilePath = path.join(this.backupDir, fileName);
    const restoredData = await fs.readFile(tempFilePath, 'utf-8');
    return restoredData
  }
}

export default DataBackup;
