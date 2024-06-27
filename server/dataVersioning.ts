// dataVersioning.ts
interface DataVersion {
    timestamp: number;
    fileVersion: string;
  }
  
  class DataVersioning {
    versions: { [key: string]: DataVersion[] };
  
    constructor() {
      this.versions = {};
    }
  
    saveVersion(userId: string): string {
        const timestamp = (new Date()).getTime()
        const fileVersion = 'version_'+timestamp
      const version: DataVersion = {
        timestamp,
        fileVersion
      };
      if (!this.versions[userId]) {
        this.versions[userId] = [];
      }
      this.versions[userId].push(version);
      return fileVersion
    }
  
    getLatestVersion(userId: string): string | null {
        if(this.versions[userId]?.length) {
            const sortedVersions = this.versions[userId]?.sort((a, b) => a.timestamp - b.timestamp)
            if(sortedVersions) {
                return sortedVersions[sortedVersions.length-1].fileVersion
            }
        }
        return null
    }
  }
  
  export default DataVersioning;
  