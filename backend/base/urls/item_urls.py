from django.urls import path

from base.views import item_views as views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#
# )

urlpatterns=[
    # path('',views.getRoutes, name="routes"),
    path('', views.getItems, name="items"),

# isko upar rakhna str:pk wali se  so that dynamic value se pehle hardcoded wale ko read kre
    path('create/', views.createItem, name="product-create"),


    path('upload/', views.uploadImage, name="image-upload"),



    path('<str:pk>/', views.getItem, name="item"),

    path('update/<str:pk>/', views.updateItem, name="item-update"),
    path('delete/<str:pk>/', views.deleteItem, name="item-delete"),
]