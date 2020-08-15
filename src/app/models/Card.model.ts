export class Card {
  private _creditCardNumber: string;
  private _cardHolder: string;
  private _expirationDate: Date;
  private _securityCode: string;
  private _amount: number;

  get creditCardNumber(): string {
    return this._creditCardNumber;
  }

  set creditCardNumber(value: string) {
    this._creditCardNumber = value;
  }

  get cardHolder(): string {
    return this._cardHolder;
  }

  set cardHolder(value: string) {
    this._cardHolder = value;
  }

  get expirationDate(): Date {
    return this._expirationDate;
  }

  set expirationDate(value: Date) {
    this._expirationDate = value;
  }

  get securityCode(): string {
    return this._securityCode;
  }

  set securityCode(value: string) {
    this._securityCode = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

}
