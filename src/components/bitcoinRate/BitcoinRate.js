import React from "react";
import "./BitcoinRate.css"

export default class BitcoinRate extends React.Component {
    constructor(props) {
        super(props);

        this.loader = <div className="loader"/>;
        this.state = {
            bitcoinRate: this.loader
        };

        this.refreshBitcoinRate = this.refreshBitcoinRate.bind(this);
        this.setBitcoinRate = this.setBitcoinRate.bind(this);
    }

    componentDidMount() {
        this.setBitcoinRate();
        this.timer = setInterval(this.setBitcoinRate, 180000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.bitcoinRate !== nextState.bitcoinRate);
    }

    fetchBitcoinRate() {
        return fetch("http://cb.am/latest.json.php?coins&currency=BTC")
            .then(response => response.json());
    }

    setBitcoinRate() {
        this.fetchBitcoinRate()
            .then(data => {
                this.setState({bitcoinRate: Object.values(data)[0]})
            })
    }

    refreshBitcoinRate() {
        this.setState({
            bitcoinRate: this.loader
        });
        this.setBitcoinRate();
    }

    render() {
        return (
            <div className="bitcoin-block">
                <div>
                    <span className="bitcoin-block__current-txt">Current Bitcoin rate: </span>
                    <span className="bitcoin-block__rate">{this.state.bitcoinRate}</span>
                    <button className="bitcoin-block__refresh-btn"
                            type="button"
                            onClick={this.refreshBitcoinRate}>
                        Refresh
                    </button>
                    <p className="bitcoin-block__update-txt">(BTC rate automatically will be updated every 3
                        minutes)</p>
                </div>
            </div>
        );
    }
}