import Realm from 'realm';

class RealmDB {
  constructor(makeConfig, objectName) {
    this.objectName = objectName;
    this.realmConfig = makeConfig(objectName);
    // this.resetDatabase();
    this.instance = new Realm(this.realmConfig);
  }

  fetch = input => {
    const results = [];
    const notFoundObjects = [];

    input.forEach(id => {
      const object = this.object(id);

      if (object) {
        results.push(object);
      } else {
        notFoundObjects.push(id);
      }
    });

    return [results, notFoundObjects];
  };

  object = id => this.instance.objectForPrimaryKey(this.objectName, id);

  subObject = (subObjectName, id) =>
    this.instance.objectForPrimaryKey(subObjectName, id);

  objects = () => this.instance.objects(this.objectName);

  upsert = input => {
    this.instance.write(() => {
      if (Array.isArray(input)) {
        input.forEach(object => {
          this.instance.create(this.objectName, object, true);
        });
      } else {
        this.instance.create(this.objectName, input, true);
      }
    });
  };

  delete = input => {
    if (!input) {
      return;
    }

    return this.instance.write(() => {
      if (Array.isArray(input)) {
        input.forEach(data => {
          const object = typeof data === 'string' ? this.object(data) : data;

          this.instance.delete(object);
        });
      } else {
        const object = typeof input === 'string' ? this.object(input) : input;

        this.instance.delete(object);
      }
    });
  };

  modify = callback => {
    this.instance.write(callback);
  };

  resetDatabase = () => {
    this.close();
    Realm.deleteFile(this.realmConfig);
    this.instance = new Realm(this.realmConfig);
  };

  dropDatabase = () =>
    this.instance.write(() => {
      this.instance.deleteAll();
    });

  close = () => {
    if (this.instance && !this.instance.isClosed) {
      this.instance.close();
    }
  };
}

export default RealmDB;
