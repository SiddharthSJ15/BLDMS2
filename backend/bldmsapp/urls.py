from django.urls import path, include
from .import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
urlpatterns = [
    path('home/', views.HomeView.as_view(), name ='home'),
    path('user-login/',views.user_login),
    path('hospital-login/',views.hospital_login),
    path('blood-request/',views.RequestList.as_view()),
    path('blood-request/<int:userId>',views.RequestList.as_view()),
    path('donate-blood/', views.DonationListView.as_view()),

    path('add-donor/',views.DonorList.as_view()),
    path('blood-collection/',views.CollectionList.as_view()),
    path('blood-collection/<int:hospitalId>',views.BloodGroupCount),

    path('logout/',views.LogoutView.as_view(),name='logout'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    path('blood-group/',views.BloodList.as_view()),
    path('user-list/',views.UserList.as_view()),
    path('admin-list/',views.AdminList.as_view()),
]