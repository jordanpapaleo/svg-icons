'use strict'

import React from 'react'
import { render } from 'react-dom'
import CompIcon from './CompIcon'

const domNode = document.createElement('div')
domNode.id = 'application'
document.body.appendChild(domNode)

render(
  <div>
    <h1>React Example</h1>
    <CompIcon type="SALE" value="1" />
    <CompIcon type="SALEAPPRAISAL" value="13" />
    <CompIcon type="LISTING" value="100" />
    <CompIcon type="LISTINGAPPRAISAL" value="10" />
    <CompIcon type="VALUE_CONCLUSION" />
  </div>
, domNode)
