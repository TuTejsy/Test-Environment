import {default as RealmDB} from './Realm';

const makeConfigWithPath = config => objectName => ({
  ...config,
  path: `Realm-${objectName}.realm`,
});

const DBConfig = {
  schemaVersion: 3,
  migration: (oldRealm, newRealm) => {
    newRealm.deleteAll();
  },
  schema: [
    {
      name: 'DB',
      primaryKey: '_id',
      properties: {
        _id: {type: 'string'},
        count: {type: 'int'},
      },
    },
  ],
};

const DB = new RealmDB(makeConfigWithPath(DBConfig), 'DB');
let a = 1;
export {DB};
