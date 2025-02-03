from django.urls import path
from . import views

urlpatterns = [
  path('products/', views.ProductCreateView.as_view(), name='product-list'),
  path('products/all/', views.ProductListView .as_view(), name='product-all'),
  path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
  path('products/update/<int:pk>/', views.ProductUpdateView.as_view(), name='product-update'),
  path('products/delete/<int:pk>/', views.ProdctDeleteView.as_view(), name='product-delete'),
]