// Api Service
//
// import:  import apiService from '../../services/apiService';
// usage:   apiService.functionName()

export default new class {


    fetchApiGet(url: string, onSuccess: Function, onError?: Function) {
        let fetchData = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }
        fetch(url, fetchData)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status.toString());
                }
                else return response.json();
            })
            .then(data => onSuccess(data))
            .catch(error => {
                console.error("Fetch Api,", error);
                return onError ? onError(error) : undefined;
            })
    }


    // fetch Api for HttpGet with parameters
    // params need to be an object with parameters, eg. params = [['lat', '35.696233'], ['long', '139.570431']]
    // NB: new URL does not work without the host, so here the window.location.origin is added
    fetchApiGetParams(url: string, params: string[][], onSuccess: Function, onError?: Function) {
        let fetchData = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        }
        let fullUrl = new URL(window.location.origin + url);
        fullUrl.search = new URLSearchParams(params).toString();

        fetch(fullUrl.href, fetchData)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status.toString());
                }
                else return response.json();
            })
            .then(data => onSuccess(data))
            .catch(error => {
                console.error("Fetch Api,", error);
                return onError ? onError(error) : undefined;
            })
    }




    fetchApiPost(url: string, data: Object, onSuccess: Function, onInvalid?: Function, onError?: Function) {
        let fetchData = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(url, fetchData)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => onSuccess(data))
                }
                else if (response.status === 422) {
                    if (onInvalid) {
                        response.json().then(data => onInvalid(data))
                    }
                    else {
                        return undefined;
                    }
                }
                else throw new Error(response.status.toString());
            })
            .catch(error => {
                console.error("Fetch Api,", error);
                return onError ? onError(error) : undefined;
            })
    }

}
