import React from 'react';
import Flex from 'ustudio-ui/components/Flex';
import Text from 'ustudio-ui/components/Text';
import { css } from 'styled-components';

const ErrorIndicator = () => {
  return (
    <Flex
      direction="column"
      alignment={{
        horizontal: 'center',
        vertical: 'end',
      }}
    >
      <img
        src="https://cdn3.iconfinder.com/data/icons/car-indicators/512/car-shock-electric-mode-error-indicator-512.png"
        alt="Error icon"
        width="11%"
      />
      <Text
        styled={{
          Text: css`
            color: #e3871a;
            font-size: 25px;
          `,
        }}
      >
        Something goes wrong, but we already send droids to fix it
      </Text>
    </Flex>
  );
};

export default ErrorIndicator;
