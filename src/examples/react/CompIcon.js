import React, { Component, PropTypes } from 'react'
import svgService from './svgService'

export default class CompIcon extends Component {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.any
  }

  state = {
    svgTemplate: svgService.getTemplate(this.props.type, this.props.value)
  }

  render () {
    return <span dangerouslySetInnerHTML={{ __html: this.state.svgTemplate }}></span>
  }
}
