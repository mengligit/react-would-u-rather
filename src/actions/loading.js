export const SET_LOADING = 'SET_LOADING';

//status true: finished
export function setLoading (status) {
    return {
       type: SET_LOADING,
       status,
    }
}