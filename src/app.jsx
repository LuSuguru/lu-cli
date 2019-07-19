import React, { PureComponent } from 'react'


export default class extends PureComponent {
  state = {
    ceshi: '1'
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
