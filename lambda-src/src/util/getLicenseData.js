const licenseOptions = require("../../../licenseOptions");

module.exports = (slug) => {
    return licenseOptions.find(option => {
        return option.slug === slug;
    });
}
