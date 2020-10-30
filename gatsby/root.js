import 'typeface-reenie-beanie';
import 'typeface-assistant';

import { css, Global } from '@emotion/core';
import PropTypes from 'prop-types';
import React from 'react';

import Modal from '../src/components/Modal';

export const wrapRootElement = ({ element }) => (
  <>
    <Global
      styles={css`
        :root {
          scroll-behavior: smooth;
          min-width: 320px;
        }
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
        }
      `}
    />
    {element}
    <Modal portal />
  </>
);

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};