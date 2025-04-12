from django.urls import path
from . import views

urlpatterns = [
    # Main pages
    path('', views.index, name='index'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
    
    # Destination management
    path('destinations/add/', views.add_destination, name='add_destination'),
    path('destinations/', views.list_destinations, name='list_destinations'),
    path('destinations/<int:pk>/', views.destination_detail, name='destination_detail'),
    path('destinations/<int:pk>/edit/', views.edit_destination, name='edit_destination'),
    path('destinations/<int:pk>/delete/', views.delete_destination, name='delete_destination'),
    path('destinations/package1', views.colombo_city_tour, name='colombo_city_tour'),
    path('destinations/package2', views.colombo_night_vibes, name='colombo_night_vibes'),
]
