let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;
const indexedDB = window.indexedDB;

export enum Stores {
  Commit = 'commit',
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
      if (!db.objectStoreNames.contains(Stores.Commit)) {
        console.log('Creating Commit store');
        db.createObjectStore(Stores.Commit, { keyPath: 'id', autoIncrement: true });
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
      console.log(storeName)
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


export const getStoreData = <T>(storeName: string): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open('Integrations');

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = (event) => {
        console.log(res.result)
        resolve(res.result);
      };
      res.onerror = () => {
        console.log("An error occurred")
      }
    };
  });
};


export const addDataToCommitDB = <T>(data: T): Promise<T|string|null> => {
  return new Promise((resolve) => {
    request = indexedDB.open('Integrations', version);

    request.onsuccess = (event) => {
      console.log('request.onsuccess - addData', data);
      db = (event.target as IDBOpenDBRequest).result;
      console.log(Stores.Commit)
      const tx = db.transaction(Stores.Commit, 'readwrite');
      const store = tx.objectStore(Stores.Commit);
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

export const deleteAllDataFromStore = (storeName: string): Promise<boolean> => {
  return new Promise((resolve) => {
    request = indexedDB.open('Integrations', version);

    request.onsuccess = (event) => {
      console.log('request.onsuccess - deleteData from ', storeName);
      db = (event.target as IDBOpenDBRequest).result;
      console.log(storeName)
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.clear()
      resolve(true);
    };

    request.onerror = () => {
      const error = request.error?.message
      resolve(false);
    };
  })
}