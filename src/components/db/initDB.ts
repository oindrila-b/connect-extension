
let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;


export enum Storages {
    Integration = 'integration',
    GithubRepositories = 'github-repositories',
    GithubStarredRepositories = 'github-starred-repositories',
    JiraIssues = 'jira-issues',
    JiraProjects = 'jira-projects',
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    request = indexedDB.open('Integrations');

    request.onupgradeneeded = () => {
      db = request.result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Storages.Integration)) {
        console.log('Creating integration store');
        db.createObjectStore(Storages.Integration, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(Storages.GithubRepositories)) {
        console.log('Creating GithubRepositories store');
        db.createObjectStore(Storages.GithubRepositories, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(Storages.GithubStarredRepositories)) {
        console.log('Creating GithubStarredRepositories store');
        db.createObjectStore(Storages.GithubStarredRepositories, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(Storages.JiraIssues)) {
        console.log('Creating JiraIssues store');
        db.createObjectStore(Storages.JiraIssues, { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains(Storages.JiraProjects)) {
        console.log('Creating JiraProjects store');
        db.createObjectStore(Storages.JiraProjects, { keyPath: 'id' });
      }

      // no need to resolve here
    };

    request.onsuccess = () => {
      try{
        db = request.result;
        version = db.version;
        console.log('request.onsuccess - initDB', version);
        resolve(true);
      }catch(err){
       console.log("An error occurred: " + err)
      }
     
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};