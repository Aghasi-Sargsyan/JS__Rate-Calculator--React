import React, {Component} from 'react';
import './App.css';
import Calculator from "./components/calculator/Calculator";
import BitcoinRate from "./components/bitcoinRate/BitcoinRate";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBcRateVisible: false,
        };

        this.showBcRate = this.showBcRate.bind(this)

    }

    showBcRate() {
        this.setState({
            isBcRateVisible: !this.state.isBcRateVisible
        });
    }

    changeBtnTxt() {
        return this.state.isBcRateVisible ?
            "Hide Bitcoin rate" :
            "Show Bitcoin rate";
    }

    render() {
        return (
            <div className="App">
                <h1>Rate calculator</h1>
                <Calculator/>
                <button
                    onClick={this.showBcRate}
                    className="App__show-hide-btn"
                    type="button">
                    {this.changeBtnTxt()}
                </button>
                {this.state.isBcRateVisible && <BitcoinRate/>}
            </div>
        );
    }
}

export default App;
