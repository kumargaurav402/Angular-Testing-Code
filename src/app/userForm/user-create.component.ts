import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../userForm/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { User } from './user.model';
import { DomSanitizer } from '@angular/platform-browser'
@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.css']
})
export class UserComponent implements OnInit {
    UserForm: FormGroup;
    //user: string;
    attachments: any;
    attachmentContent: any
    isNumber: boolean = false;
    public loading = false;
    constructor(private fb: FormBuilder,
        public toastr: ToastrManager,
        private router: Router,
        private domSanitizer: DomSanitizer,
        private userService: UserService) { }
    ngOnInit() {
        this.UserForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.maxLength(10)]],
            address: ['', [Validators.required, Validators.minLength(100)]],
            gender: ['', [Validators.required]]
            // image: ['', [Validators.required]]
        })
        this.UserForm.get('phone').valueChanges.subscribe(result => {
            if (String(result).length > 10) {
                this.isNumber = true;
            } else {
                this.isNumber = false;
            }
        });

        // this.UserForm.get('image').valueChanges.subscribe(result => {
        //     this.onFileChange(result);
        // })
    }
    onSubmit() {
        this.loading = true;
        if (this.UserForm.valid) {
            this.userService.createUser(this.UserForm.value)
                .subscribe(result => {
                    this.loading = false;
                    this.router.navigate(['/list']);
                    this.toastr.successToastr('Saved Successfully.', 'Success!');
                }, error => {
                    this.loading = false;
                    this.toastr.errorToastr('Something went wrong.', 'Oops!');
                })
        } else {
            this.toastr.warningToastr('Please fill all the field with valid value', 'Alert!');
        }

    }
    // onFileChange(event) {

    //     let reader = new FileReader();
    //     if (event.target.files && event.target.files.length > 0) {

    //         let file = event.target.files[0];

    //         reader.readAsDataURL(file);

    //         reader.onload = (e) => {
    //             this.attachments.file_data = reader.result;
    //             this.attachmentContent = this.domSanitizer.bypassSecurityTrustResourceUrl(this.attachments.file_data);
    //         };

    //         this.attachments.file_name = file.name;
    //         this.attachments.file_type = file.type;
    //         // this.file_size_value = file.size;
    //         this.attachments.file_size = file.size.toString();

    //     }
    // }

    reset() {
        this.UserForm.reset();
    }
}