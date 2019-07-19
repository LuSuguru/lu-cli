import React, { PureComponent } from 'react'

import './style.less'
import './styles/reset.css'

export default class extends PureComponent {
  state = {
    ceshi: ''
  }

  componentDidMount() {

  }

  render() {
    const { ceshi } = this.state
    return (
      <div>{ceshi}</div>
    )
  }
}
