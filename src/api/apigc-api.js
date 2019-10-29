import axios from 'axios'

const API_URL = 'http://localhost:3053/api/';

export default class apigcAPI {

    /**
     * Axios request will fetch a json object which contains the ids
     * @returns {Promise<AxiosResponse<T> | never>}
     */
    setUpDB = () => {
        return axios.get(API_URL  + 'setUp', {
        }).then(
            result => {
                console.log(result)
                return result
            }).catch(e => {
                console.log('ERROR WITH SETUP', e)
            })
    };

    /**
     * Axios request will fetch a json object which contains the ids
     * @returns {Promise<AxiosResponse<T> | never>}
     */
    updateDomColor = () => {
        return axios.get(API_URL  + 'updateDomColor', {
        }).then(
            result => {
                return result
            }).catch(e => {
            console.log('ERROR UPDATE DOMINANT COLOR', e)
        })
    };

    /**
     * Axios request will fetch a json object which contains the ids
     * @returns {Promise<AxiosResponse<T> | never>}
     */
    fetchMatches = (id) => {
        return axios.get(API_URL  + 'products/' + id, {
        }).then(
            result => {
                if (Array.isArray(result.data)){
                    return result
                }else{
                    return false
                }

            }).catch(e => {
            console.log('ERROR FETCH MATCHES', e)
        })
    };
}
