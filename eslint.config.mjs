import { sharedConfigs } from '@nodescript/eslint-config';

export default [
    ...sharedConfigs,
    {
        ignores: [
            '.dev/',
            '**/dist/',
            '**/public/',
            '**/out/',
        ]
    }
];
