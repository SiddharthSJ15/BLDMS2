from django.contrib import admin
from .import models
# Register your models here.
admin.site.register(models.Blood),
# admin.site.register(models.LoginData),
admin.site.register(models.RegisteredUser),
admin.site.register(models.AdminDetails),
admin.site.register(models.BloodCollection),
admin.site.register(models.BloodRequest),
