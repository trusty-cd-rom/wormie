var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get('window');

var {
  StyleSheet,
  View,
  Animated,
  Image,
  TouchableWithoutFeedback
} = React;

var ANIMATION_END_Y = Math.ceil(deviceHeight * .5);
var NEGATIVE_END_Y = ANIMATION_END_Y * -1;
var startCount = 1;


function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


var Heart = React.createClass({

  // NEED TO PASS IN THE CURRENT USER HEART PIECE AND THE CURRENT SUBMISSION HEART PIECE
  // GOING TO HARD CODE FOR NOW

  render: function() {
    return (
      <View {...this.props} style={[this.props.style]}>
        <View style={styles.littleHeartRow}>
          <Image 
                style = {styles.heart}
                source = {{uri: "http://52.53.249.61/static/left/008080.png" }}
              />
          <Image 
                style = {styles.heart}
                source = {{uri: "http://52.53.249.61/static/right/ff7c23.png" }}
              />
        </View>
      </View>
    )
  }
});

var AnimatedHeart = React.createClass({

  getDefaultProps: function() {
      return {
          onComplete: function() {}  
      };
  },

  getInitialState: function() {
      return {
          position: new Animated.Value(0)  
      };
  },

  componentWillMount: function() {
      this._yAnimation = this.state.position.interpolate({
        inputRange: [NEGATIVE_END_Y, 0],
        outputRange: [ANIMATION_END_Y, 0]
      });

      this._opacityAnimation = this._yAnimation.interpolate({
        inputRange: [0, ANIMATION_END_Y],
        outputRange: [1, 0]
      });

      this._scaleAnimation = this._yAnimation.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 1.2, 1],
        extrapolate: 'clamp'
      });

      this._xAnimation = this._yAnimation.interpolate({
        inputRange: [0, ANIMATION_END_Y/2, ANIMATION_END_Y],
        outputRange: [0, 15, 0]
      });

      this._rotateAnimation = this._yAnimation.interpolate({
        inputRange: [0, ANIMATION_END_Y/4, ANIMATION_END_Y/3, ANIMATION_END_Y/2, ANIMATION_END_Y ],
        outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg']
      });
  },

  componentDidMount: function() {
      Animated.timing(this.state.position, {
        duration: 2000,
        toValue: NEGATIVE_END_Y
      }).start(this.props.onComplete);
  },

  getHeartAnimationStyle: function() {
    return {
      transform: [
        {translateY: this.state.position},
        {translateX: this._xAnimation},
        {scale: this._scaleAnimation},
        {rotate: this._rotateAnimation}
      ],
      opacity: this._opacityAnimation
    }
  },

  render: function() {
    return (
      <Animated.View style={[styles.heartWrap, this.getHeartAnimationStyle(), this.props.style]}>
        <Heart />
      </Animated.View>
    )
  }
});

var HeartFloater = React.createClass({
  getInitialState: function() {
      return {
        hearts: []  
      };
  },

  addHeart: function() {
    startCount += 1;
    this.state.hearts.push({
      id: startCount,
      right: getRandomNumber(50, 150)
    });
    this.setState(this.state);
  },

  removeHeart: function(v) {
    var index = this.state.hearts.findIndex(function(heart) {
      return heart.id === v;
    });
    this.state.hearts.splice(index, 1);
    this.setState(this.state);
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.container} onPress={this.addHeart}>
          <View style={styles.container}>
            {
              this.state.hearts.map(function (v, i) {
                return (
                  <AnimatedHeart
                    key={v.id}
                    onComplete={this.removeHeart.bind(this, v.id)}
                    style={{right: this.state.hearts[i].right}}
                  />
                )
              }, this)
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  littleHeartRow: {
    flexDirection: 'row',
    height: 170,
  },
  heartWrap: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'transparent'
  },
  heart: {
    height: 28,
    width: 18,
  },
});

module.exports = HeartFloater;
