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
      <Text style={styles.description}>
        Counter increase in DEBUG mode but it doesn't increase in RELEASE mode
      </Text>
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
    borderRadius: 5,
    backgroundColor: '#27AE60',
  },
  btnText: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 40,
  },
  description: {
    marginTop: 50,
    fontWeight: '400',
    paddingHorizontal: 25,
    textAlign: 'center',
    color: '#EB5757',
    fontSize: 18,
  },
});

export default LabelContainer;
