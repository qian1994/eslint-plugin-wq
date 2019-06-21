module.exports = (node, type) => {
  if(node.type === type ) {
    return true
  }
  if(node.parent) {
    checkParentsType(node, type)
  }else {
    return false
  }
}
