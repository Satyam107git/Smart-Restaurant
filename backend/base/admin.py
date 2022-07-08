
from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Item)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(CurrentOrder)
# admin.site.register(Current)
admin.site.register(OrderItem)
admin.site.register(TableInfo)
