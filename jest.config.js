module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        ".(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/_mocks_/fileMock.ts",
        '.(css|scss|sass)$': '<rootDir>/_mocks_/styleMock.ts'
    },
};