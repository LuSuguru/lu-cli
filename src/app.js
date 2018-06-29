import React, { PureComponent } from 'react'
import './main.scss'
import './main.css'

export default class extends PureComponent {
  state = {
    num: 2
  }

  click = () => {
    this.setState({ num: 2 })
  }

  render() {
    const { num } = this.state
    return (
      <div onClick={this.click}>
        {num}
      </div>
    )
  }
}