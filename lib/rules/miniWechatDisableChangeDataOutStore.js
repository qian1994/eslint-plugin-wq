const get = require('lodash/get')
module.exports = {
  meta: {
    docs: {
      description: '禁止在store外改变data的值',
      category: 'mini-wechat-disable-change-data-out-store',
    }
  },
  create(context) {
    const fileName = context.getFilename()

    return {
      ThisExpression : function (node) {
        const line = node.loc.start.line
        const name = context.getSourceLines()[line-1]
        if(get(node, 'parent.property.name', '') === 'props'
        && context.getAncestors('AssignmentExpression')[2].operator === '='
        && fileName.indexOf('store.js') < 0) {
          context.report({
            node,
            message: `'{{name}}' this.props change only happen in *store.js in {{fileName}} at line {{line}}`,
            data: {
              name,
              line: node.loc.start.line,
              fileName
            }
          })
        }
      }
    }
  }
}