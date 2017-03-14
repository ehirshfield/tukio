import axios from 'axios';

export function commitToBuyRequest(data) {
    return dispatch => {
        return axios.post('/api/commits', data);
    }
}

