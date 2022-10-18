// Querystring Service
//
// import:  import queryStringService from '../../services/queryStringService';
// usage:   queryStringService.functionName()


export default new class {

    getQueryStringParameter(parameter: string) {
        let result = null,
            tmp = [];
        let items = location.search.substr(1).split("&");
        for (let index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameter) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }
}