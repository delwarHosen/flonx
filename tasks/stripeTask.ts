import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// Task define করো
TaskManager.defineTask('StripeKeepJsAwakeTask', async () => {
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

// Task register করো
BackgroundFetch.registerTaskAsync('StripeKeepJsAwakeTask', {
    minimumInterval: 60,
    stopOnTerminate: false,
    startOnBoot: true,
}).catch(() => {
    // Already registered — ignore
});