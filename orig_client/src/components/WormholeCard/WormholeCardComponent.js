import React, {
  Text,
  View,
  ScrollView,
  Component,
  TouchableHighlight,
} from 'react-native';
import {styles} from './WormholeCardStyles';

class WormholeCard extends React.Component{
  render() {
    var { item, key, viewRequest } = this.props;
    return (
      <View>
          <TouchableHighlight
            style = {styles.loginButton}
            onPress = {viewRequest(key)}
            underlayColor = 'purple'
          >
            <View>
              <Text style = {styles.buttonText}> Request: {key} </Text>
              <Text > {item.title} - {item.status} </Text>
            </View>
          </TouchableHighlight> 
      </View>
    );
  }

};

export default WormholeCard;
