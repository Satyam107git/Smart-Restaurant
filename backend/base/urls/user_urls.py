from django.urls import path

from base.views import user_views as views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#
# )

urlpatterns=[
    # path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('',views.getRoutes, name="routes"),
    path('profile/', views.getUserProfile, name="users-profile"),
    path('register/',views.registerUser,name='register'),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),

    path('', views.getUsers, name="users"),

    path('<str:pk>/', views.getUserById, name='user'),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
    path('update/<str:pk>/', views.updateUser, name='user-update'),

]