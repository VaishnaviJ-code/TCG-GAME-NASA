from django.contrib import admin

from .models import UserProfile,UserCard
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(UserCard)