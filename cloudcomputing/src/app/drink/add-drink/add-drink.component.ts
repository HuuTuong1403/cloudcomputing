import { Component, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DrinkService } from '../../service/drink.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-add-drink',
  templateUrl: './add-drink.component.html',
  styleUrls: ['./add-drink.component.scss']
})
export class AddDrinkComponent implements OnInit {
  addDrinkForm!: FormGroup;
  @ViewChild('ImageDrinkUpload') ImageDrinkUpload!: ElementRef;
  Image!: File;
  isLoading = false;
  active = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private drinkService: DrinkService,
              private notify: NzNotificationService) { }


  ngOnInit(): void {
    this.addDrinkForm = this.fb.group({
      DrinkName: ["", Validators.required],
      Description: ["", Validators.required],
      Price: ["", [Validators.required, Validators.pattern(/[0-9]/), Validators.minLength(4)]],
      DrinkType: ["", Validators.required],
      Image: ["", [Validators.required ,RxwebValidators.extension({extensions:["jpeg", "png", "jpg"]})]]
    })
    this.getDrinkType();
    setTimeout(() => {
      this.active = false;
    }, 1000);
  }

  typeDrink: any[] = [];

  getDrinkType(){
    this.drinkService.getDrinkType().subscribe(
      (res) => {
        this.typeDrink = res;
      },
      (err) => {
        this.createNotify('error', 'Đã xảy ra lỗi');
      }
    )
  }

  turnBack(): void{
    this.router.navigate(['/drink']);
  }

  onFileChangedoc(e: any) {
    this.isClear = true;
    this.Image = e.target.files[0];
  }

  isClear = false;
  resetImage(){
    this.isClear = !this.isClear;
    this.ImageDrinkUpload.nativeElement.value = "";
    this.addDrinkForm.controls['Image'].setValue("");
  }

  createFormData(): any{
    let input = new FormData();
    input.append("DrinkName", this.addDrinkForm.get('DrinkName')?.value);
    input.append("Description", this.addDrinkForm.controls['Description'].value);
    input.append("Image", this.Image, this.Image.name);
    input.append("DrinkType", this.addDrinkForm.controls['DrinkType'].value);
    input.append("Price", this.addDrinkForm.controls['Price'].value);
    return input
  }

  onSubmitForm(){
    if(this.addDrinkForm.valid){
      this.isLoading = true;
      this.drinkService.addDrinkAWWS(this.createFormData()).subscribe(
        (res) => {
          this.createNotify('success', 'Thêm thực đơn thành công');
          this.addDrinkForm.reset();
          this.resetImage();
          this.isLoading = false;
        },
        (err) => {
          this.createNotify('error', 'Đã xảy ra lỗi trong quá trinh thêm');
        })
    }
    else{
      for(const i in this.addDrinkForm.controls){
        this.addDrinkForm.controls[i].markAsDirty();
        this.addDrinkForm.controls[i].updateValueAndValidity();
      }
    }
  }

  cancelForm(): void{
    this.addDrinkForm.reset();
  }

  createNotify(type: string, content: string): void{
    if(type === 'success'){
      this.notify.create(
        type,
        'Thông báo',
        content,
        {
          nzStyle: {'background-color': '#DFFFD7'}
        }
      );
    }
    else{
      this.notify.create(
        type,
        'Thông báo',
        content,
        {
          nzStyle: {'background-color': '#FFCCCC'}
        }
      );
    }
  }
}
