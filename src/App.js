import React, { Component } from "react"
import Clock from "./Clock"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: null,
      error: null,
      date: new Date(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      icon: 'sun.svg'
    }
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ latitude: position.coords.latitude }),
      (error) => this.setState({ error: error.message })
    )

    this.timerId = setInterval(() => {
      this.setState({ date: new Date() })
    }, 1000)
  }

  componentDidUpdate(_prevProps, prevState) {
    if(this.state.date !== prevState.date) {
      let hours = this.state.date.getHours()
      this.setState({ icon: hours > 18 || hours < 4 ? 'snowflake.svg' : 'sun.svg' })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  render() {
    return (
      <div>
        {this.state.error ? (
          <p style={{ color: 'red' }}>{this.state.error}</p>
        ) : (
          <>
            <h4>{this.state.latitude}</h4>
            <Clock
              icon={this.state.icon}
              timezone={this.state.timezone}
              date={this.state.date}
            />
          </>
        )}
      </div>
    )
  }
}
