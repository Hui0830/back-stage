module.exports = {
    "parser": "babel-eslint",
    "plugins": [
        "babel"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "classProperties": true
        }
    },
    "extends": "airbnb",
    "rules": {
        "react/no-did-mount-set-state": 0,
        "no-nested-ternary": 0,
        "react/no-array-index-key": 0,
        "eqeqeq": "off",
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1,
                "flatTernaryExpressions": true
            }
        ],
        "no-plusplus": [
            "error",
            {
                "allowForLoopAfterthoughts": true
            }
        ],
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
        "react/prop-types": [0],
        "no-underscore-dangle": [0],
        "class-methods-use-this": [0],
        "react/jsx-indent": [4, 4],
        "react/jsx-indent-props": [4, 4],
        "jsx-a11y/alt-text": [0],
        "jsx-a11y/label-has-for": [0],
        "jsx-a11y/anchor-is-valid": [0],
        "jsx-a11y/click-events-have-key-events": [0],
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "jsx-a11y/no-static-element-interactions": [0],
        "no-script-url": [0],
        "max-len": ["error", {"code": 120}],
        "no-param-reassign": 0,
        "no-unused-expressions": 0,
        "react/forbid-prop-types": 0,
        "eqeqeq": 0,
        "react/react-in-jsx-scope":0,
        "prefer-destructuring": 0,
        "react/no-array-index-key": 0,
        "no-mixed-operators": 0,
        "consistent-return": 0,
        "no-case-declarations": 0,
        "react/sort-comp": 0,
        "react/no-did-mount-set-state": 0,
        "react/no-multi-comp": [0, { "ignoreStateless": true }],
        "no-shadow": 0,
        "max-len": 0,
        "brace-style": 0,
        "one-var": 0
    },
};
