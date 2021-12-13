import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme';
import PropTypes from 'prop-types';
import { images } from '../images';

const IconButton = ({ type, onPressOut, id }) => {
  const _onPressOut = () => {
    onPressOut(id);
  };

  return (
    <TouchableOpacity onPressOut={_onPressOut}>
      <Image source={type} style={iconStyle.icon} />
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  onPressOut: () => {},
};

const iconStyle = StyleSheet.create({
  icon: {
    tintColor: theme.text,
    width: 30,
    height: 30,
    margin: 10,
  },
});

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.string,
};

export default IconButton;
