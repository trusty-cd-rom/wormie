/************ FEED *************/
import React, {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Component
} from 'react-native';
// import Navbar from './Navbar';

var styles = StyleSheet.create({
  container:{
    marginTop: 20,
    flex: 1,
    backgroundColor: 'red'
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class FeedList extends React.Component{
  render() {
    return (
      //use {} for anything that is not html or text. this allows you to run JS in JSX
      <View style={styles.container}> 
        <Text style={styles.buttonText}> BUTTS</Text>    
      </View>
    );
  }
};

export default FeedList;