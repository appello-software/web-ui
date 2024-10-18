/** @type {import("eslint").Config} */
module.exports = {
  extends: ["@appello/eslint-config"],
  rules: {
    "import/no-extraneous-dependencies": "off",
    "react/no-unused-prop-types": "off",
    "import/no-default-export": "off"
  }
}
