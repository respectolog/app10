import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './data.json';
import Modal from 'react-modal';





const todata = data.data;
const list = todata.cheques;

var newmassiv=[];
for(let i=0; i<list.length; i++){
  newmassiv.push(

      {
        "dataReg": list[i].dateReg,
        "num": list[i].num,
        "kioskName": list[i].kioskName,
        "chequeType": list[i].chequeType,
        "pays": list[i].pays,
        "sum": list[i].sum,
        "positions": list[i].positions,
      }

);
}

function Tempsum(props) {
    let tempsum = props.pays;
    let x = 0;
    for (let i = 0; i < tempsum.length; i++) {
      x = x + tempsum[i].sum;
    }
    return(
      x
    );
}
function Tovari(props) {
    let temppos = props.names;
    let poslist = [];
    for (let i = 0; i < temppos.length; i++) {
      poslist.push(
        temppos[i].name + ', '
      );
    }
    return(
      poslist
    );
}
function Quantity(props) {
    let temppos = props.position;
    let x = 0;
    for (let i = 0; i < temppos.length; i++) {
    x = x + temppos[i].quantity;
    }
    return(
      x
    );
}
function Payornot(props) {
    let pays = props.pays;
    let sum = props.sum;
    let x = 0;
    let status = '';
    for (let i = 0; i < pays.length; i++) {
    x = x + pays[i].sum;
    }
    if (x === sum){
      status = 'Оплачено';
    }else if(sum === 0){
      status = 'Нет оплаты';
    }else {
      status = 'Недоплата';
    }
    return(
      status
    );
}

var prodlist = [];

class Table extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    list: newmassiv,

    };

  this.addString = this.addString.bind(this);
}

deleteString(i) {
  let arr = this.state.list;
  arr.splice(i, 1);
  this.setState({ list: arr });
}



addString = (value) => {
  console.log(value);
  let arr = this.state.list;
  arr.push(
    {
      "dataReg": value.bayDate,
      "num": value.numId,
     "kioskName": value.kioskName,
     "chequeType": value.typePay,
      "pays": [{sum: parseInt(value.payDone), payType: parseInt(value.payStatus)}],
      "sum": parseInt(value.paySum),
      "positions": [{name: value.namesList, quantity: parseInt(value.quantity),}],
    }
  );
  this.setState({ list: arr });
}

render(){
  prodlist= [];
  for (let i=0;i < this.state.list.length; i++){

    prodlist.push(
       <tr key={this.state.list[i].num}>
        <td>{this.state.list[i].dataReg}</td>
        <td>{this.state.list[i].kioskName}</td>
        <td>{this.state.list[i].chequeType === 0 ? 'Продажа' : 'Возврат'}</td>
        <td><Payornot pays={this.state.list[i].pays} sum={this.state.list[i].sum} /></td>
        <td><Tempsum pays={this.state.list[i].pays} /></td>
        <td>{this.state.list[i].sum}</td>
        <td><Quantity position={this.state.list[i].positions} /></td>
        <td><Tovari names={this.state.list[i].positions} /></td>
        <td>

          <button onClick={this.deleteString.bind(this, i)} className="delButton">
            Удалить
          </button>
        </td>
        </tr>
    );
    }
  return(
    <div className="Container">
    <table>
      <thead>
          <tr>
            <th>Дата покупки</th>
            <th>Киоск</th>
            <th>Тип</th>
            <th>Статус оплаты</th>
            <th>Оплата</th>
            <th>Сумма</th>
            <th>Кол-во товара</th>
            <th>Товары</th>
          </tr>
      </thead>
      <tbody>

        {prodlist}

      </tbody>
    </table>
      <ExampleApp state={this.state} addString={this.addString}/>
    </div>
  );
}
}

Modal.setAppElement('#root');

class ExampleApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      bayDate: '',
      kioskName: 'Киоск № 11',
      typePay: 0,
      payStatus:0,
      payDone:0,
      paySum:0,
      quantity:  0,
      namesList: '',
      numId:0
    };
    console.log(this.state);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }
  handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
      console.log(this.state);
  }

  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal} className="AddButton">Добавить +</button>

        <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
        <form >

            <label>
              <span>Дата покупки:</span>
              <input
                name="bayDate"
                type="datetime-local"
                value={this.state.bayDate}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              <span>Киоск:</span>
              <input
                name="kioskName"
                type="text"
                value={this.state.kioskName}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              <span>Тип:</span>
              <select name="typePay" value={this.state.typePay} onChange={this.handleInputChange}>
                <option value="0">Продажа</option>
                <option value="1">Возврат</option>
              </select>


            </label>
            <br />
            <label>
              <span>Оплата:</span>
              <input
                name="payDone"
                type="number"
                value={this.state.payDone}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              <span>Сумма:</span>
              <input
                name="paySum"
                type="number"
                value={this.state.paySum}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              <span>Кол-во товара:</span>
              <input
                name="quantity"
                type="number"
                value={this.state.quantity}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              <span>Товары:</span>
              <input
                name="namesList"
                type="text"
                value={this.state.namesList}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              <span>Артикул:</span>
              <input
                name="numId"
                type="text"
                value={this.state.numId}
                onChange={this.handleInputChange}/>
            </label>

          </form>
          <button onClick={() => { this.props.addString(this.state)}} className="AddButton">
            Добавить
          </button>
          <button onClick={this.handleCloseModal} className="closeButton">Закрыть</button>
        </Modal>
      </div>
    );
  }
}




ReactDOM.render(
  <Table  />,
  document.getElementById('root')
);
