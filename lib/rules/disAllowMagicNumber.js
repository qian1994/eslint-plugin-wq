
const get = require('lodash/get')
const checkParentsType = require('../utils/checkParentsType')
module.exports = {
  meta: {
    docs: {
      description: '禁止使用魔法数字',
      category: 'disallow-magic-number',
    }
  },
  create(context) {
    const fileName = context.getFilename()
    const reg = new RegExp(/^[0-9]+$/)

    return {
      Property(node) {
        
        const line = node.loc.start.line
        let name = context.getSourceLines()[line-1].replace(/(^\s*)|(\s*$)/g,"")
        if(reg.test(node.value.value)
          && fileName.indexOf('const.js') < 0) {
          context.report({
            node,
            message: `'{{name}}' disallow magic number in {{fileName}} at line {{line}}`,
            data: {
              name,
              line,
              fileName
            }
          })
        }
      },
      VariableDeclarator(node) {
        const line = node.loc.start.line
        let name = context.getSourceLines()[line-1].replace(/(^\s*)|(\s*$)/g,"")
        if(
          // get(node, 'parent.parent.type', '') !== 'BlockStatement'
        get(node, 'parent.parent.type', '') !== 'ForStatement'
        && reg.test(get(node, 'init.value', ''))
        && fileName.indexOf('const.js') < 0){
          context.report({
            node,
            message: `'{{name}}' disallow magic number in {{fileName}} at line {{line}}`,
            data: {
              name,
              line,
              fileName
            }
          })
        }
      },
      AssignmentExpression(node) {
        const line = node.loc.start.line
        let name = context.getSourceLines()[line-1].replace(/(^\s*)|(\s*$)/g,"")
        if(
          // get(node, 'parent.parent.type', '') !== 'BlockStatement' 
        node.operator === '='
        && reg.test(node.right.value)
        && fileName.indexOf('const.js') < 0) {
          context.report({
            node,
            message: `'{{name}}' disallow magic number in {{fileName}} at line {{line}}`,
            data: {
              name,
              line,
              fileName
            }
          })
        }
      }
    }
  }
}