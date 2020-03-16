module.exports = {
    prepareForArrayInsert: function(array) {
        let newArray = array.join(',');
        newArray = newArray.replace("'", '');
        newArray = newArray.replace('"', '');
        let returnedArray = '{' + newArray + '}';
        //req.body.technologies = inputTechnologies;

        return returnedArray;
    }
}