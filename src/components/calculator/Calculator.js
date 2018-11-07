import React from 'react';
import "./Calculator.css";
import LoadingDots from "../loading-dots/LoadingDots";

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.loader = <div className="loader"/>;

        this.state = {
            currency: "USD",
            exchangeRate: this.loader,
            inputValue: ""
        };

        this.selectChangeHandler = this.selectChangeHandler.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.rendSum = this.rendSum.bind(this);
    }

    selectChangeHandler(e) {
        let value = e.target.value;
        this.setState({
            currency: value,
            exchangeRate: this.loader
        });
        this.fetchExchangeRate(value)
            .then(data => {
                this.setState({exchangeRate: Object.values(data)[0]})
            })
    }

    inputChangeHandler(e) {
        this.setState({inputValue: e.target.value});
    }

    rendSum() {
        if ((this.state.inputValue / this.state.exchangeRate) > 0) {
            return (this.state.inputValue / this.state.exchangeRate).toFixed(3)
        }
        return <LoadingDots/>;
    }

    componentDidMount() {
        this.fetchExchangeRate(this.state.currency)
            .then(data => {
                this.setState({exchangeRate: Object.values(data)[0]})
            })
    }

    fetchExchangeRate(currency) {
        let path = "http://cb.am/latest.json.php?currency=" + currency;
        return fetch(path).then(response => response.json());
    }


    render() {
        return (
            <div>
                <div className="select-block">
                    <span className="select-block__title">Convert AMD to:</span>
                    <div className="select-block__choose-block">
                        <select onChange={this.selectChangeHandler}
                                className="select-block__selector"
                                id="select-block__selector">
                            <option>USD</option>
                            <option>EUR</option>
                            <option>RUB</option>
                            <option>GBP</option>
                        </select>
                        <span
                            className="select-block__calc"> (1 {`${this.state.currency}`} = {this.state.exchangeRate} AMD)</span>
                    </div>
                </div>
                <div className="input-block">
                    <div className="input-block__container">
                        <input type="number"
                               className="input-block__input"
                               id="input-block__input"
                               placeholder="enter AMD amount"
                               onChange={this.inputChangeHandler}/>
                    </div>
                    <span className="input-block__sum">AMD = {this.rendSum()} {this.state.currency}</span>
                </div>
            </div>
        );
    }


}