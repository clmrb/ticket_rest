module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 8
    },
    "rules": {
        "indent": ["error", 4],
        "semi": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "space-before-blocks": ["error", {
            "functions": "always",
            "keywords": "always",
            "classes": "always"
        }]
    }
};
