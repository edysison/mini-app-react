import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  Button,
  TextInput 
} from "react-native";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      refreshing: false,
    };
  }

    makeAddRequest = () => {
      const url = `http://mini-portal.test/api/add`;
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

  
  render() {
    return (
      <View >
        <View style={styles.container}>
        <Text>Title</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 2}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Text>Description</Text>
      <TextInput
        style={{paddingTop: 92, height: 300, borderColor: 'gray', borderWidth: 2}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Button
        title="save"
        onPress={() => this.makeAddRequest()}
      />
      </View>
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
