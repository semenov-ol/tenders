import React, { Component } from 'react';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';

export default class ErrorBoundry extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Flex
          alignment={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          <Text variant="h5">Something goes wrong, please try again</Text>
        </Flex>
      );
    }

    return this.props.children;
  }
}
