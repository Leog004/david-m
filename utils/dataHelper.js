exports.convertToMultipleParagraphs = (data) => {
    let newData = data[0].split('\n');
    // if newData is not greater than 1 then return data with one paragraph
    if(newData.length <= 1){
        return `<p>${data}</p>`;
    }

    let returnData = '';
    for(let i = 0; i < newData.length; i++){
        returnData += `<p>${newData[i]}</p>`;
    }

    return returnData;
}