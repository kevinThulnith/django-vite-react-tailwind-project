from django.contrib.auth.models import User
from django.db import models

# Porduct model.
class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    price = models.FloatField()
    description = models.TextField()
    ammount = models.IntegerField()
    is_active = models.BooleanField(default=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.name

class sale(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sales')
    ammount = models.IntegerField()
    total = models.FloatField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sales')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name