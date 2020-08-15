import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import * as moment from 'moment'
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit, OnDestroy {
  paymentForm: FormGroup;
  _unsubscribeAll;
  paymentFormErrors;
  isLoading: boolean = false;
  months: number[];
  years: number[] = [];
  currentYear: number;
  currentMonth: number;
  selectedYear: number;
  selectedMonth: number;
  dateErrorMsg: string;
  successMessage: string;

  constructor(private _formBuilder: FormBuilder,
              private dataService: DataService) {
    this._unsubscribeAll = new Subject();
    this.currentYear = +moment().format('YYYY');
    for (let i = this.currentYear; i < this.currentYear + 10; i++) {
      this.years.push(i)
    }
    this.months = Array(12).fill(1).map((x, i) => i + 1);
  }

  ngOnInit(): void {
    this.paymentForm = this._formBuilder.group({
      creditCardNumber: ['', [Validators.required, Validators.minLength(12), Validators.pattern("^[0-9]*$")]],
      cardHolder: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      securityCode: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(3)]],
      amount: ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]]
    });

    this.paymentForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onPaymentFormValuesChanged();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /**
   * On form values changed
   */
  onPaymentFormValuesChanged(): void {
    for (const field in this.paymentFormErrors) {
      if (!this.paymentFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.paymentFormErrors[field] = {};
      // Get the control
      const control = this.paymentForm.get(field);
      if (control && control.dirty && !control.valid) {
        this.paymentFormErrors[field] = control.errors;
      }
    }
  }

  pay(form): void {
    this.paymentForm.controls['expirationDate'].setValue(this.selectedMonth + '/' + this.selectedYear);
    // validating expiration date
    this.currentYear = +moment().format('YYYY');
    this.currentMonth = +moment().format('M');
    if (this.selectedMonth == undefined || this.selectedYear == undefined) {
      this.dateErrorMsg = 'Expiration month and year required.';
    } else if (this.selectedYear > this.currentYear
      || (this.selectedYear == this.currentYear && this.selectedMonth >= this.currentMonth)) {
      this.dateErrorMsg = '';
      if (form.status == "VALID") {
        this.dataService.pay(form.value).then(result => {
          // reseting form inputs and errors
          this.selectedMonth = null;
          this.selectedYear = null;
          this.paymentForm.markAsUntouched()
          this.successMessage = 'The payment has been registered.'
          form.reset();
          form.get('creditCardNumber').setErrors(null);
          form.get('cardHolder').setErrors(null);
          form.get('securityCode').setErrors(null);
          form.get('amount').setErrors(null);
        }).catch(error => error);
      }
      else {
      }
    } else {
      this.dateErrorMsg = 'Invalid card expiration date.'
    }
  }
}
