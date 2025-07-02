from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, ProductSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import generics
from .models import Product

# Create your views here.

# TODO: Create a view for creating a new user
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
# TODO: Create a view for getting all products | creating a new product 
class ProductCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated] # !Only authenticated users can access this view
    
    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():   
            serializer.save(author=self.request.user)
        else :
            print(serializer.errors)

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated] # !Only authenticated users can access this view
    
    def get_queryset(self):
        user = self.request.user
        return Product.objects.all()

# TODO: Create a view for updating a product | getting a product | deleting a product
class ProductUpdateView(generics.UpdateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated] # !Only authenticated users can access this view

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(author=user)
    
class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated] # !Only authenticated users can access this view

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(author=user)
            
class ProductDeleteView(generics.DestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated] # !Only authenticated users can access this view
    
    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(author=user)
    
# TODO: To send user credentials to the frontend
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated] # !Only authenticated users can access this view
    serializer_class = UserSerializer
    
    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email
        })