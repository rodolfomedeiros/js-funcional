export class Maybe {

  constructor(value){
    this._value = value;
  }

  static of(value){
    return new Maybe(value);
  }

  isNothing(){
    return this._value === null || this._value === undefined;
  }

  getOrElse(value){
    return this.isNothing() ? value : this._value;
  }

  map(fn){
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value));
  }
}