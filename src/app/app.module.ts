import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './@shared/components/layout-components/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './@shared/components/layout-components/sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './@pages/account-pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './@pages/not-found/not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { FavoriteReportsComComponent } from './@shared/components/reports-components/favorite-reports-com/favorite-reports-com.component';
import { AllReportsComComponent } from './@shared/components/reports-components/all-reports-com/all-reports-com.component';
import { SelectionCriteriaComComponent } from './@shared/components/reports-components/selection-criteria-com/selection-criteria-com.component';
import { UserRequestsComponent } from './@shared/components/requests-components/user-requests/user-requests.component';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxScrollViewModule, DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { DxTreeViewModule, DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { DxButtonModule } from 'devextreme-angular';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule, DxFormModule, DxLoadIndicatorModule
} from 'devextreme-angular';
import { ReportResultComComponent } from './@shared/components/reports-components/report-result-com/report-result-com.component';
import { HomeComponent } from './@pages/home/home.component';
import { EditProfileComponent } from './@shared/components/user/edit-profile/edit-profile.component';
import { UserInfoComponent } from './@shared/components/user/user-info/user-info.component';
import { AdminRequestsComponent } from './@shared/components/requests-components/admin-requests/admin-requests.component';
import { UserAskAuthorizeComponent } from './@shared/components/requests-components/user-ask-authorize/user-ask-authorize.component';
import { AdminRespondAuthorizeComponent } from './@shared/components/requests-components/admin-respond-authorize/admin-respond-authorize.component';
import { AddUserComponent } from './@shared/components/user/add-user/add-user.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserAskDialogComponent } from './@shared/components/requests-components/user-ask-dialog/user-ask-dialog.component';
import { AdminRespondDialogComponent } from './@shared/components/requests-components/admin-respond-dialog/admin-respond-dialog.component';
import { AllUsersComponent } from './@shared/components/user/all-users/all-users.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ResetUserPasswordComponent } from './@shared/components/user/reset-user-password/reset-user-password.component';
import { ConfirmationDialogComponent } from './@shared/components/layout-components/confirmation-dialog/confirmation-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { NotificationsComponent } from './@shared/components/layout-components/notifications/notifications.component';
import { SelectedNotificationComponent } from './@shared/components/layout-components/selected-notification/selected-notification.component';
import { AdminReasonDialogComponent } from './@shared/components/requests-components/admin-reason-dialog/admin-reason-dialog.component';
import { AdminAddAuthorizeComponent } from './@shared/components/requests-components/admin-add-authorize/admin-add-authorize.component';
import { AdminNotesDialogComponent } from './@shared/components/requests-components/admin-notes-dialog/admin-notes-dialog.component';
import { AdAddAuthorizeDialogComponent } from './@shared/components/requests-components/ad-add-authorize-dialog/ad-add-authorize-dialog.component';
import { AdminRemoveAuthorizeComponent } from './@shared/components/requests-components/admin-remove-authorize/admin-remove-authorize.component';
import { AdRemoveAuthorizeDialogComponent } from './@shared/components/requests-components/ad-remove-authorize-dialog/ad-remove-authorize-dialog.component';

// matrial 
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// primng
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { HelperDialogComponent } from './@shared/components/helper-dialog/helper-dialog.component';
import { PaginatorModule } from 'primeng/paginator';
import { ClipboardModule } from 'ngx-clipboard';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MultipleHelperDialogComponent } from './@shared/components/multiple-helper-dialog/multiple-helper-dialog.component';
import { TabViewModule } from 'primeng/tabview';
import { MultipleSingleValuesComponent } from './@shared/components/multiple-helper-components/multiple-single-values/multiple-single-values.component';
import { MultipleRangesComponent } from './@shared/components/multiple-helper-components/multiple-ranges/multiple-ranges.component';
import { ExecludeRangesComponent } from './@shared/components/multiple-helper-components/execlude-ranges/execlude-ranges.component';
import { ExecludeSingleValuesComponent } from './@shared/components/multiple-helper-components/execlude-single-values/execlude-single-values.component';
import { ZfrActComponent } from './@shared/components/reports-components/spcial-reports/zfr-act/zfr-act.component';
import { ChangeLayoutDialogComponent } from './@shared/components/reports-components/change-layout-dialog/change-layout-dialog.component';

// import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [AdminAddAuthorizeComponent,
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    NotFoundComponent,
    FavoriteReportsComComponent,
    AllReportsComComponent,
    SelectionCriteriaComComponent,
    UserRequestsComponent,
    ReportResultComComponent,
    HomeComponent,
    EditProfileComponent,
    UserInfoComponent,
    AdminRequestsComponent,
    UserAskAuthorizeComponent,
    AdminRespondAuthorizeComponent,
    AddUserComponent,
    UserAskDialogComponent,
    AdminRespondDialogComponent,
    AllUsersComponent,
    ResetUserPasswordComponent,
    ConfirmationDialogComponent,
    NotificationsComponent,
    SelectedNotificationComponent, AdRemoveAuthorizeDialogComponent,
    AdminReasonDialogComponent, AdminRemoveAuthorizeComponent,
    HelperDialogComponent, AdminNotesDialogComponent, AdAddAuthorizeDialogComponent, MultipleHelperDialogComponent, MultipleSingleValuesComponent, MultipleRangesComponent, ExecludeRangesComponent, ExecludeSingleValuesComponent, ZfrActComponent, ChangeLayoutDialogComponent

  ],
  imports: [TabViewModule,MatNativeDateModule,ClipboardModule,MatInputModule, MatSelectModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, MatDialogModule, MatListModule, MatSidenavModule, MatIconModule, ReactiveFormsModule, DxLoadIndicatorModule,
    BrowserModule,
    AppRoutingModule, MatMenuModule, NoopAnimationsModule, MatProgressSpinnerModule, HttpClientModule
    , DxDrawerModule, DxScrollViewModule, DxTreeViewModule, DxButtonModule, DxDataGridModule,
    DxBulletModule,
    DxTemplateModule, DxFormModule,
    MatAutocompleteModule, AccordionModule,
    TableModule,
    BrowserAnimationsModule,
    ToastModule,
    FormsModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    MatInputModule, MatSelectModule, MatPaginatorModule, MatTableModule, MatFormFieldModule, MatDialogModule, MatListModule, MatSidenavModule, MatIconModule, ReactiveFormsModule, DxLoadIndicatorModule,
    BrowserModule,
    AppRoutingModule, MatMenuModule, NoopAnimationsModule, MatProgressSpinnerModule, HttpClientModule,
    DxDrawerModule, DxScrollViewModule, DxTreeViewModule, DxButtonModule, DxDataGridModule,
    DxBulletModule,
    DxTemplateModule, DxFormModule,
    MatAutocompleteModule, AccordionModule,
    TableModule,
    BrowserAnimationsModule,
    ToastModule,
    FormsModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    PaginatorModule,MatDatepickerModule,



  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    // DialogService
  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
  exports: [
    HelperDialogComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
