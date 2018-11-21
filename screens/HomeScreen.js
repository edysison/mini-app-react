import React from 'react';
import { 
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }
  makeRemoteRequest = () => {
    const url = `http://mini-portal.test/api/list`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
    };

    componentDidMount() {
      this.makeRemoteRequest();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.email}
          renderItem={({item}) => <Text style={styles.item}>{item.title}</Text>}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
