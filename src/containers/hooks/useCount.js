import {useState, useEffect} from 'react';

import {DB} from '../../../database';

const id = 'id1';

function useCount() {
  const [countObj, setCountObj] = useState(DB.object(id));

  useEffect(() => {
    const countObj = DB.object(id);

    if (countObj) {
      setCountObj(countObj);

      const listener = (nextCountObj, {changedProperties, deleted}) => {
        const isAnythingChanged = deleted || changedProperties.length;
        if (isAnythingChanged) {
          // !!!!!!!!!
          // It triggers rerender in DEBUG mode, but in RELEASE mode we forced to use  setCountObj({...nextCountObj});
          setCountObj(nextCountObj);
        }
      };

      countObj.addListener(listener);

      return () => {
        countObj.removeListener(listener);
      };
    }
  }, []);

  return countObj;
}

export default useCount;
