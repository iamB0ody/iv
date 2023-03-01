import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './@core/auth/guards/authorized.guard';
import { UnauthenticatedGuard } from './@core/auth/guards/unauthenticated-guard.guard';
import { LoginComponent } from './@pages/account-pages/login/login.component';
import { NotFoundComponent } from './@pages/not-found/not-found.component';
import { UserRequestsComponent } from './@shared/components/requests-components/user-requests/user-requests.component';
import { ReportResultComComponent } from './@shared/components/reports-components/report-result-com/report-result-com.component';
import { FavoriteReportsComComponent } from './@shared/components/reports-components/favorite-reports-com/favorite-reports-com.component';
import { AllReportsComComponent } from './@shared/components/reports-components/all-reports-com/all-reports-com.component';
import { SelectionCriteriaComComponent } from './@shared/components/reports-components/selection-criteria-com/selection-criteria-com.component';
import { EditProfileComponent } from './@shared/components/user/edit-profile/edit-profile.component';
import { UserInfoComponent } from './@shared/components/user/user-info/user-info.component';
import { AdminRequestsComponent } from './@shared/components/requests-components/admin-requests/admin-requests.component';
import { UserAskAuthorizeComponent } from './@shared/components/requests-components/user-ask-authorize/user-ask-authorize.component';
import { AdminRespondAuthorizeComponent } from './@shared/components/requests-components/admin-respond-authorize/admin-respond-authorize.component';
import { AddUserComponent } from './@shared/components/user/add-user/add-user.component';
import { AllUsersComponent } from './@shared/components/user/all-users/all-users.component';
import { NotificationsComponent } from './@shared/components/layout-components/notifications/notifications.component';
import { SelectedNotificationComponent } from './@shared/components/layout-components/selected-notification/selected-notification.component';
import { AdminAddAuthorizeComponent } from './@shared/components/requests-components/admin-add-authorize/admin-add-authorize.component';
import { AdminRemoveAuthorizeComponent } from './@shared/components/requests-components/admin-remove-authorize/admin-remove-authorize.component';
import { ZfrActComponent } from './@shared/components/reports-components/spcial-reports/zfr-act/zfr-act.component';

const routes: Routes = [
  { path: 'login', canActivate: [UnauthenticatedGuard], component: LoginComponent },
  { path: '', redirectTo: '/favorite-reports', pathMatch: 'full' },
  { path: 'favorite-reports', canActivate: [AuthorizedGuard], component: FavoriteReportsComComponent },
  { path: 'all-reports', canActivate: [AuthorizedGuard], component: AllReportsComComponent },
  { path: 'selection-criteria/:id', canActivate: [AuthorizedGuard], component: SelectionCriteriaComComponent },
  { path: 'user-requests', canActivate: [AuthorizedGuard], component: UserRequestsComponent },
  { path: 'admin-requests', canActivate: [AuthorizedGuard], component: AdminRequestsComponent },
  { path: 'result/:id', canActivate: [AuthorizedGuard], component: ReportResultComComponent },
  { path: 'edit-profile', canActivate: [AuthorizedGuard], component: EditProfileComponent },
  { path: 'user-info', canActivate: [AuthorizedGuard], component: UserInfoComponent },
  { path: 'add-user', canActivate: [AuthorizedGuard], component: AddUserComponent },
  { path: 'all-users', canActivate: [AuthorizedGuard], component: AllUsersComponent },
  { path: 'ask-authorize', canActivate: [AuthorizedGuard], component: UserAskAuthorizeComponent },
  { path: 'add-authorize', canActivate: [AuthorizedGuard], component: AdminAddAuthorizeComponent },
  { path: 'edit-authorize', canActivate: [AuthorizedGuard], component: AdminRemoveAuthorizeComponent },
  { path: 'respond-authorize', canActivate: [AuthorizedGuard], component: AdminRespondAuthorizeComponent },
  { path: 'notifications', canActivate: [AuthorizedGuard], component: NotificationsComponent },
  { path: 'ZFR_ACT_STMT', canActivate: [AuthorizedGuard], component:ZfrActComponent },
  { path: 'notification/:id', canActivate: [AuthorizedGuard], component: SelectedNotificationComponent },
  { path: '**', component: NotFoundComponent },



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
