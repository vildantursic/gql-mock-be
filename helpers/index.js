function generateData(limit, skip, model) {
    return Array.apply(null, {length: limit || 5}).map((el) => {
        return model
    }).slice(0, skip);
}
module.exports = {
    generateData
}