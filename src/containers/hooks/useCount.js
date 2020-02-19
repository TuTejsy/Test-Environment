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
          // TODO: https://app.clubhouse.io/sharekey/story/7703/create-issue-in-realm-github-about-mutating-objects
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
