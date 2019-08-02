import React, {Component} from 'react'
import axios from 'axios'

export class UserHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      circulation: 100,
      price: 0,
      marketCap: 0,
      reward: 3
    }
  }

  async componentDidMount() {
    try {
      let result = await axios.get('/api/monero')
      let lastReward = await axios.get('/api/monero/reward')
      let data = result.data.data.XMR

      lastReward = lastReward.data.last_reward
      lastReward = lastReward.toString()
      lastReward = lastReward[0] + '.' + lastReward.slice(1)
      lastReward = Number(lastReward)
      lastReward *= 262800
      lastReward = lastReward.toFixed(3)

      this.setState({
        circulation: data.circulating_supply,
        price: data.quote.USD.price,
        marketCap: data.quote.USD.market_cap,
        reward: lastReward
      })
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    let inflation = this.state.reward / this.state.circulation
    inflation = 100 * inflation

    return (
      <div align="center">
        <div>
          <img src="/monero.png" height="25%" width="25%" />
        </div>
        <div id="textInfo">
          <h2>Price : ${this.state.price.toFixed(7)}</h2>
          <h2>Inflation Rate: {inflation.toFixed(2)}%</h2>
          <h2>
            Market Cap: ${this.state.marketCap
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </h2>
        </div>
      </div>
    )
  }
}

export default UserHome
