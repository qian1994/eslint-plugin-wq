const RuleTester = require("eslint").RuleTester
const disAllowMagicNumber = require("../../lib/rules/disAllowMagicNumber")
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6
  }
})

ruleTester.run("test disAllowMagicNumber file name", disAllowMagicNumber, {
  valid: [
    {
      filename: "const.js",
      code: `var a ={}; a.b = 2`
    }
  ],
  invalid: [
    {
      filename: "test.js",
      code: 'var a ={}; a.b = 2',
      errors: [{message: "'var a ={}; a.b = 2' disallow magic number in test.js at line 1"}]
    }
  ]
})

ruleTester.run("test disAllowMagicNumber VariableDeclaration magic number", disAllowMagicNumber, {
  valid: [
    {
      filename: "test.js",
      code: `var c = b`
    }
  ],
  invalid: [
    {
      filename: "test.js",
      code: `var c = 0`,
      errors: [{message: "'var c = 0' disallow magic number in test.js at line 1"}]
    }
  ]
})

ruleTester.run("test disAllowMagicNumber ExpressionStatement magic number", disAllowMagicNumber, {
  valid: [
    {
      filename: "test.js",
      code: `var c = b;
              `
    }
  ],
  invalid: [
    {
      filename: "test.js",
      code: `var c = null; c = 10`,
      errors: [{message: "'var c = null; c = 10' disallow magic number in test.js at line 1"}]
    }
  ]
})

ruleTester.run("test disAllowMagicNumber propoty magic number", disAllowMagicNumber, {
  valid: [
    {
      filename: "test.js",
      code: `var c = {a:dd}`
    }
  ],
  invalid: [
    {
      filename: "test.js",
      code: `var c = {c : 10}`,
      errors: [{message: "'var c = {c : 10}' disallow magic number in test.js at line 1"}]
    }
  ]
})
