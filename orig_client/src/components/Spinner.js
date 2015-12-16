import React, {
  View,
  StyleSheet,
  ScrollView,
  Component,
  ActivityIndicatorIOS,
} from 'react-native';

var styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    marginTop: 10,
  },
});

class Spinner extends Component{

  setToggleTimeout() {
    let { isAnimating } = this.props;
    setTimeout(
      () => {
        this.setState({animating: !isAnimating});
        this.setToggleTimeout();
      },
      1200
    );
  }

  spinner() {
    let { isAnimating } = this.props;
    if (isAnimating) {
      return (
        <ActivityIndicatorIOS
          animating={isAnimating}
          style={styles.centering}
          size="small"
        />
      );
    }
  }

  render() {
    return (
      <View>
        {this.spinner()}
      </View>
    );
  }
};

export default Spinner;
