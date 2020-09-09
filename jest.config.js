/**
 * Created by gaoguoqing on 2019/6/20.
 *
 */
module.exports = {
    testMatch: [
        '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],
    'moduleNameMapper': {
        '^@/(.*)$': '<rootDir>/libs/components/$1',
        '^~/(.*)$': '<rootDir>/libs/$1'
    },
    moduleFileExtensions: [
        'js',
        'json',
        'jsx'
    ]
}
