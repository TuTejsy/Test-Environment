/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Label from './src/containers/LabelContainer';

import {DB} from './database';

const obj = {
  _id: 'id1',
  count: 1,
};

class App extends Component {
  componentDidMount() {
    if (DB.objects().length === 0) {
      DB.upsert(obj);
    }
  }

  componentWillUnmount() {
    if (DB !== null && !DB.isClosed) {
      DB.close();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Label />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontWeight: '800',
    color: '#000000',
    fontSize: 30,
  },
});

export default App;
