from .import models
from rest_framework import serializers

class BloodSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Blood
        fields = ['id','name']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RegisteredUser
        fields = ['id','email','contact','password','first_name','middle_name','last_name','age','location','blood']
    def create(self, validated_data):
        password = validated_data.pop("password")
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AdminDetails
        fields = ['id', 'email','contact','password', 'name','location']
    def create(self, validated_data):
        password = validated_data.pop("password")
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Donor
        fields = ['id','name','contact','dob','blood']
    def __init__(self, *args, **kwargs): 
        super(DonorSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BloodCollection
        fields = ['id','blood','user','collected_date','units','created_by']
    def __init__(self, *args, **kwargs): 
        super(CollectionSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
            
class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BloodRequest
        fields = ['id','user','blood','created_date','units', 'contact','required_on','age','created_by']
    def __init__(self, *args, **kwargs): 
        super(RequestSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.DonationList
        fields = ['requested_by', 'donated_by', 'units_recieved', 'total_units']

    def validate(self, data):
        # Check that units received does not exceed total units in request
        blood_request = data['requested_by']
        units_remaining = blood_request.units - sum(
            donation.units_recieved for donation in blood_request.donationlist_set.all()
        )
        
        if data['units_recieved'] > units_remaining:
            raise serializers.ValidationError(
                f"Cannot donate more than remaining units needed ({units_remaining})"
            )
        
        return data

