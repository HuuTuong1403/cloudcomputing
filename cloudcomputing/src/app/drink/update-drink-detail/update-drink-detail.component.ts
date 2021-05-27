import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrinkService } from '../../service/drink.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AbstractControl, ValidationErrors, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-drink-detail',
  templateUrl: './update-drink-detail.component.html',
  styleUrls: ['./update-drink-detail.component.scss']
})
export class UpdateDrinkDetailComponent implements OnInit {

  drink!: any;
  upDateDrinkForm!: FormGroup;
  @ViewChild('ImageDrinkUpload') ImageDrinkUpload!: ElementRef;

  active = true;
  isLoading = false;
  Image!: File;

  constructor(private route: ActivatedRoute,
    private drinkService: DrinkService,
    private notify: NzNotificationService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getDrink();
    this.upDateDrinkForm =  this.fb.group({
      DrinkName: ["", Validators.required],
      Description: ["", Validators.required],
      Price: ["", [Validators.required, Validators.pattern(/[0-9]/), Validators.minLength(4)]],
      DrinkType: ["", Validators.required],
      Image: ["", [Validators.required ,RxwebValidators.extension({extensions:["jpeg", "png", "jpg"]})]]
    });
    this.getDrinkType();
  }

  turnBack(): void{
    this.router.navigate(['/drink/update-drink']);
  }

  getDrink(): void{
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.drinkService.getDrinkByDrinkName(name).subscribe(
      (res) =>{
        this.drink = res[0];
        this.upDateDrinkForm.patchValue({
          DrinkName: this.drink.DrinkName,
          Description: this.drink.Description,
          Price: this.drink.Price,
          DrinkType: this.drink.DrinkType,
          Image: this.drink.Image,
        })
        this.active = false;
      },
      (err) => {
        this.createNotify('error', 'Đã xảy ra lỗi trong quá trinh sửa');
      }
    )
  }

  onFileChangedoc(e: any) {
    this.isClear = true;
    this.Image = e.target.files[0];
    console.log(this.Image);
  }

  isClear = false;
  resetImage(){
    this.isClear = !this.isClear;
    this.ImageDrinkUpload.nativeElement.value = "";
    this.upDateDrinkForm.controls['Image'].setValue("");
  }

  typeDrink: any[] = [];
  getDrinkType(): void{
    this.drinkService.getDrinkType().subscribe(
      (res) => {
        this.typeDrink = res;
      },
      (err) => {
        this.createNotify('error', 'Đã xảy ra lỗi trong quá trinh sửa');
      }
    )
  }

  uploadFile(){
    let input = new FormData();
    input.append('upload_preset', 'coffee-aws');
    input.append('file', this.Image);
    this.drinkService.uploadFile(input).subscribe(
      (res) => {
        console.log(res.secure_url);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  createFormData(): any{

  }

  onSubmitForm(){
    if(this.upDateDrinkForm.valid){
      this.isLoading = true;
      let uploadFile = new FormData();
      uploadFile.append('upload_preset', 'coffee-aws');
      if(this.Image != null){
        uploadFile.append('file', this.Image);
      }
      else{
        uploadFile.append('file', this.drink.Image);
      }
      this.drinkService.uploadFile(uploadFile).subscribe(
        (res) => {
          let formUpdate = new FormData();
          formUpdate.append("DrinkName", this.upDateDrinkForm.get('DrinkName')?.value);
          formUpdate.append("Description", this.upDateDrinkForm.controls['Description'].value);
          formUpdate.append("DrinkType", this.upDateDrinkForm.controls['DrinkType'].value);
          formUpdate.append("Price", this.upDateDrinkForm.controls['Price'].value);
          formUpdate.append('Image', res.secure_url);
          this.drinkService.updateDrink(formUpdate, this.drink.DrinkName).subscribe(
            (res) => {
              this.createNotify('success', 'Chỉnh sửa thực đơn thành công');
              this.isLoading = false;
            },
            (err) => {
              this.createNotify('error', 'Đã xảy ra lỗi trong quá trinh sửa');
            })
        },
        (err) => {
          console.log(err);
        }
      )
    }
    else{
      for(const i in this.upDateDrinkForm.controls){
        this.upDateDrinkForm.controls[i].markAsDirty();
        this.upDateDrinkForm.controls[i].updateValueAndValidity();
      }
    }
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
