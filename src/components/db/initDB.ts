let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;
const indexedDB = window.indexedDB;

export enum Stores {
  Integration = 'integrations',
  GithubRepositories = 'github-repo',
  GithubStarred = 'github-starred',
  JiraIssue = 'jira-issue',
  JiraProject = 'jira-project',
}

export const initDB = (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    // open the connection
    request = indexedDB.open('Integrations');

    request.onupgradeneeded = (event) => {
      db =  (event.target as IDBOpenDBRequest).result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Integration)) {
        console.log('Creating users store');
        db.createObjectStore(Stores.Integration, { keyPath: 'id', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains(Stores.GithubRepositories)) {
        console.log('Creating GithubRepositories store');
        db.createObjectStore(Stores.GithubRepositories, { keyPath: 'id', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains(Stores.GithubStarred)) {
        console.log('Creating GithubStarred store');
        db.createObjectStore(Stores.GithubStarred, { keyPath: 'id', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains(Stores.JiraIssue)) {
        console.log('Creating JiraIssue store');
        db.createObjectStore(Stores.JiraIssue, { keyPath: 'id', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains(Stores.JiraProject)) {
        console.log('Creating JiraProject store');
        db.createObjectStore(Stores.JiraProject, { keyPath: 'id', autoIncrement: true });
      }
      // no need to resolve here
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      version = db.version;
      console.log('request.onsuccess - initDB', version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};


export const addData = <T>(storeName: string, data: T): Promise<T|string|null> => {
  return new Promise((resolve) => {
    request = indexedDB.open('Integrations', version);

    request.onsuccess = (event) => {
      console.log('request.onsuccess - addData', data);
      db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};