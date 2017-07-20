export default function asyncActionCreator(options) {
    const [
        TASK_START,
        TASK_SUCCESS,
        TASK_FAIL
    ] = options.actions;

    const argumentsToMeta = options.meta || [];

    const task = options.task;

    return (...args) => async (dispatch, getState) => {
        const meta = argumentsToMeta.reduce((sum, key, i) => {
            // eslint-disable-next-line no-param-reassign
            sum[key] = args[i];
            return sum;
        }, {});

        dispatch({
            type: TASK_START,
            meta
        });

        try {
            const result = await task(...args, dispatch, getState);

            dispatch({
                type: TASK_SUCCESS,
                payload: result,
                meta
            });
        } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(e.stack);
            }
            dispatch({
                type: TASK_FAIL,
                payload: e,
                meta
            });
        }
    };
}
