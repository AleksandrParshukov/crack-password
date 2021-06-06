import React from "react";

const BUTTONS = [1, 2, 3, "c", 4, 5, 6, 0, 7, 8, 9, "ok"];
const LOG_ROWS = 9;

function randomPassword() {
  let array = [0, 1,2,3,4,5,6,7,8,9];
  var i = array.length,
    j = 0,
    temp;

  while (i--) {

    j = Math.floor(Math.random() * (i+1));

    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array.slice(0, 4);
}


function checkPassword (current, right) {
  let result = "";
  console.log(current)
  for (let i = 0; i < current.length; i++) {
    if (current[i] === right[i]) {
      result += "A";
    } else if (right.includes(current[i])) {
      result += "B";
    }
  }

  while (result.length < right.length) {
    result += "C";
  }

  return result.split('').sort().join('');;

}

function updateLog (log, message) {
  if(log.includes(null)) {
    log[log.indexOf(null)] = message;
  } else {
    log = log.slice(1);
    log.push(message);
  }

  return log;
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.onClick(this.props.text);
  }

  render() {
    return (
      <button className="button" type="button" onClick={this.handleClick} value={this.props.text}>{this.props.text}</button>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNumBtnClick = this.handleNumBtnClick.bind(this);
    this.handleClearBtnClick = this.handleClearBtnClick.bind(this);
    this.handleOkBtnClick = this.handleOkBtnClick.bind(this);
    this.state = {
      rightPassword: randomPassword(),
      currentPassword: [null, null, null, null],
      log: new Array(LOG_ROWS).fill(null)
    }
  }

  handleNumBtnClick(num) {
    let pass = this.state.currentPassword;
    pass[pass.indexOf(null)] = num;

    this.setState({
      currentPassword: pass
    });
  }

  handleClearBtnClick() {
    this.setState({
      currentPassword: [null, null, null, null]
    });
  }  
  
  handleOkBtnClick() {
    let curPass = this.state.currentPassword;
    const result = checkPassword(curPass, this.state.rightPassword);
    let currentLog = this.state.log;

    console.log(result);

    if (result === "AAAA") {
      currentLog = updateLog(currentLog, "Well Done!");

      this.setState({
        rightPassword: randomPassword()
      })
    } else {
      currentLog = updateLog(currentLog, curPass.join("")+ ":   " + result);
    }

    this.setState({
      currentPassword: [null, null, null, null],
      log: currentLog
    })

  }

  render() {
    return(
      <main className="page-main">
        <section className="input">
        {this.state.currentPassword.map((value) => {
            return (
              <div className="input-number">
                {value}
              </div>
            )

          })}
        </section>

        <section className="numpad">
          {BUTTONS.map((value) => {
            let handler;
            if (value === "c") {
              handler = this.handleClearBtnClick;
            } else if (value === "ok") {
              handler = this.handleOkBtnClick;
            } else {
              handler = this.handleNumBtnClick;
            }

            return (
              <Button text={value} onClick={handler}/>
            )

          })}
        </section>

        <section className="log">
        {this.state.log.map((value) => {
            return (
              <p className="log-row">
                {value}
              </p>
            )

          })}
        </section>
      </main>
    );

  }
}

export default App;
