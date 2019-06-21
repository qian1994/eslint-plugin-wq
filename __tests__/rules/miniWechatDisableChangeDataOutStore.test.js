const RuleTester = require("eslint").RuleTester
const miniWechatDisableChangeDataOutStore = require("../../lib/rules/miniWechatDisableChangeDataOutStore")
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6
  }
})

ruleTester.run('test miniWechatDisableChangeDataOutStore file name', miniWechatDisableChangeDataOutStore, {
  valid: [
    {
      filename: 'astore.js',
      code: 'this.props.a = 1'
    }
  ],
  invalid: [
    {
      filename: 'test.js',
      code: 'this.props.a = 1',
      errors: [{message: "'this.props.a = 1' this.props change only happen in *store.js in test.js at line 1"}]
    }
  ]
})