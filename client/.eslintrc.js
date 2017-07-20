'use strict';

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  rules: {
    "id-length": 0,
    "comma-dangle": 0,
    "indent": [2, 4, {"SwitchCase": 1}],
    "no-console": 1,
    "no-underscore-dangle": 0,
    "max-len": [2, { code: 120, ignoreComments: true }],
    "new-cap": 0, // for tcomb types

    // REACT RULES
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4]
  }
};
