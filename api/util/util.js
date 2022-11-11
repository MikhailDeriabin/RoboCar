/**
 * The method checks does given array contains any nulls or not
 * @param {Array} arr array to be checked
 * @returns {boolean} does array contains any nulls or not
 */
exports.containNoNullArr = (arr) => {
    if(arr != null){
        for(let i=0; i<arr.length; i++){
            if(arr[i] === null || arr[i] === undefined)
                return false;
        }

        return true;
    } else{
        return false;
    }
}