/**
 * @author appleex
 * @date 2024-08-25 16:47
 */
module.exports = {
    "roots": [
        "<rootDir>/tests"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "coverageThreshold": {
        "global": {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100
        }
    }
}
