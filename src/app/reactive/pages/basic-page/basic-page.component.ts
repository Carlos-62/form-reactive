import { Component, OnInit } from '@angular/core';
import { Reactive } from '@angular/core/primitives/signals';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms'

const rx90 ={
  name: 'rx90',
  price: 2500,
  inStorage: 0
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles:[],
  standalone:false

})
export class BasicPageComponent implements OnInit { 

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
   //this.myForm.reset(rx90);  
  }

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(3)],[]],
    price: [0,[Validators.required, Validators.min(0)],[]],
    inStorage: [0,[Validators.required, Validators.min(0)],[]]

  })

  //public myForm : FormGroup = new FormGroup({
  //  name: new FormControl('',[],[]),
  //  price: new FormControl(0,[],[]),
  //  inStorage: new FormControl(0,[],[])
  //})

  isValidField (field:string) : boolean | null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }

  getFieldError(field:string) : string | null{
    
    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field] || {};

    for (const key of Object.keys(errors)) {
     switch (key) {
      case 'required':
        return 'Este campo es requerido';

   
     } 
    }

    return null;

  }

  onSave():void{

    if(this.myForm.invalid) {
      //valida el envio de campos requeridos, cuando hago guardar.
      this.myForm.markAllAsTouched;
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({price: 10, inStorage: 0});
  }
}
