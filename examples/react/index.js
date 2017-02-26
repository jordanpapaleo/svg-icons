'use strict'

require('react')
const render = require('react-dom')
const CompIcon  = require('CompIcon')

const domNode = document.createElement('div')
domNode.id = 'application'
document.body.appendChild(domNode)

render(<CompIcon type="" value="" />, domNode)
