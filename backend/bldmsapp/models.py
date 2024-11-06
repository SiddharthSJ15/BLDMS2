from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

# Create your models here.

class Blood(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

# class LoginData(models.Model):
#     email = models.EmailField(max_length=100, unique=True)
#     contact = models.CharField(max_length=20)
#     password = models.CharField(max_length=100, null=True, blank=True)
#     isAdmin = models.BooleanField(default=False)

#     def __str__(self):
#         return self.email


# Registered user model
class RegisteredUser(models.Model):
    email = models.EmailField(max_length=100, null=True,unique=True)
    contact = models.CharField(max_length=20,null=True,blank=True)
    password = models.CharField(max_length=100, null=True, blank=True)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100,null=True,blank=True)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField() 
    location = models.CharField(max_length=225)
    blood = models.ForeignKey(Blood, on_delete=models.CASCADE)
    class Meta:
        ordering = ['first_name','middle_name','last_name']
    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"

class AdminDetails(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100,null=True, unique=True)
    contact = models.CharField(max_length=20,null=True,blank=True)
    password = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=225)
    class Meta: 
        ordering=['name']
    def __str__(self):
        return f"{self.name} - {self.email}"

class Donor(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=20,unique=True)
    dob = models.IntegerField()
    blood = models.ForeignKey(Blood, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.name} - {self.contact} - {self.blood}"

class BloodCollection(models.Model):
    created_by = models.ForeignKey(AdminDetails,on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(Donor, on_delete=models.CASCADE, related_name='donor_details')
    blood = models.ForeignKey(Blood,on_delete=models.CASCADE,null=True)
    collected_date = models.DateTimeField(auto_now_add=True)
    units = models.IntegerField(null=True)
    def __str__(self):
        return f"{self.user} - Units: {self.units}"

class BloodRequest(models.Model):
    user = models.CharField(max_length=100)
    blood = models.ForeignKey(Blood, on_delete=models.CASCADE)
    created_date = models.DateField(auto_now_add=True)
    units = models.IntegerField()
    age = models.IntegerField(null=True)
    contact = models.CharField(max_length=20,unique=True,null=True)
    required_on = models.DateField(auto_now_add=False)
    created_by = models.ForeignKey(RegisteredUser,on_delete=models.CASCADE, null=True)
    # hasRecived = models.BooleanField(default=False)
    # donor_detail = models.ForeignKey(BloodCollection, on_delete=models.CASCADE,null= True)
    # received_from  = models.ForeignKey(AdminDetails,on_delete=models.CASCADE,null=True)
    def __str__(self):
        return f"{self.user} - {self.blood} - Units: {self.created_date}"

class DonationList(models.Model):
    requested_by = models.ForeignKey(BloodRequest, on_delete=models.CASCADE)
    donated_by = models.ForeignKey(AdminDetails, on_delete=models.CASCADE,null=True)
    units_recieved = models.IntegerField(null=True  )
    total_units = models.IntegerField()
