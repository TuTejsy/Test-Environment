import React, {useCallback} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {DB} from '../../database/index';

import useCount from './hooks/useCount';

function LabelContainer() {
  const countObj = useCount();

  const onBtnPress = useCallback(() => {
    const obj = DB.object('id1');
    DB.modify(() => {
      obj.count = obj.count + 1;
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{countObj?.count}</Text>
      <TouchableOpacity style={styles.btn} onPress={onBtnPress}>
        <Text style={styles.btnText}>Increase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '800',
    color: '#000000',
    fontSize: 50,
  },
  btn: {
    width: 300,
    height: 50,
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: 'green',
  },
  btnText: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 40,
  },
});

export default LabelContainer;
