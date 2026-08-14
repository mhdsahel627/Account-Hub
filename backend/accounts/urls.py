from django.urls import path
from . import views

urlpatterns = [
    path(
        'register/',
        views.RegisterView.as_view(),
        name='register'
    ),

    path(
        'profile/',
        views.ProfileView.as_view(),
        name='profile'
    ),

    path(
        'admin/login/',
        views.AdminLoginView.as_view()
    ),

    path(
        'admin/users/',
        views.AdminUserListView.as_view()
    ),

    path(
        'admin/users/add/',
        views.AdminCreateUserView.as_view()
    ),

    path(
        'admin/users/<int:id>/',
        views.AdminUserDetailView.as_view(),
        name='admin-user-detail'
    ),

    path(
        'change-password/',
        views.ChangePasswordView.as_view(),
        name='change-password'
    ),

]