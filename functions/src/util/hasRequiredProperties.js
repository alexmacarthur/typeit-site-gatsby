const REQUIRED_PROPERTIES = [
  "emailAddress",
  "source",
  "idempotencyKey",
  "slug",
];

/**
 * Given an object, ensure that every required key exists on it.
 *
 * @param {object} data
 * @return {boolean}
 */
module.exports = (data) => {
  return REQUIRED_PROPERTIES.every((property) => {
    return data[property] !== undefined;
  });
};
