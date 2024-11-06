from django.shortcuts import render
from rest_framework.response import Response
from .import models
from .serializers import *
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated 
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.pagination import PageNumberPagination
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count, Sum
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 8

class BloodList(generics.ListCreateAPIView):
    queryset = models.Blood.objects.all()
    serializer_class = BloodSerializer

class UserList(generics.ListCreateAPIView):
    queryset = models.RegisteredUser.objects.all()
    serializer_class = UserSerializer

class AdminList(generics.ListCreateAPIView):
    queryset = models.AdminDetails.objects.all()
    serializer_class = AdminSerializer

@csrf_exempt
def user_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        userData = models.RegisteredUser.objects.get(email=email, password=password)
    except  models.RegisteredUser.DoesNotExist:
        userData=None
    if userData:
        return JsonResponse({'bool':True,'user_id':userData.id})
    else:
        return JsonResponse({'bool':False})
    
@csrf_exempt
def hospital_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        userData = models.AdminDetails.objects.get(email=email, password=password)
    except  models.AdminDetails.DoesNotExist:
        userData=None
    if userData:
        return JsonResponse({'bool':True,'hospital_id':userData.id})
    else:
        return JsonResponse({'bool':False})

class DonorList(generics.ListCreateAPIView):
    queryset = models.Donor.objects.all()
    serializer_class = DonorSerializer

class CollectionList(generics.ListCreateAPIView):
    queryset = models.BloodCollection.objects.all()
    serializer_class = CollectionSerializer

class RequestList(generics.ListCreateAPIView):
    queryset = models.BloodRequest.objects.all()
    serializer_class = RequestSerializer

class DonationListView(generics.ListCreateAPIView):
    queryset = models.DonationList.objects.all()
    serializer_class = DonationSerializer

    def create(self, request, *args, **kwargs):
        requested_by_id = request.data.get('requested_by')
        donated_by_id = request.data.get('donated_by')
        units_received = request.data.get('units_recieved')

        # Ensure required fields are provided
        if not requested_by_id or not donated_by_id or units_received is None:
            return Response(
                {"error": "requested_by, donated_by, and units_recieved are required fields"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Fetch the BloodRequest instance
            blood_request = models.BloodRequest.objects.get(id=requested_by_id)
        except models.BloodRequest.DoesNotExist:
            return Response({"error": "Blood request not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Fetch the AdminDetails instance
            admin = models.AdminDetails.objects.get(id=donated_by_id)
        except models.AdminDetails.DoesNotExist:
            return Response({"error": "Admin details not found"}, status=status.HTTP_404_NOT_FOUND)

        # Calculate remaining units needed
        total_units_needed = blood_request.units
        total_units_donated = sum(donation.units_recieved for donation in blood_request.donationlist_set.all())
        units_remaining = total_units_needed - total_units_donated

        # Check if donated units exceed remaining required units
        if int(units_received) > units_remaining:
            return Response(
                {"error": f"Cannot donate more than remaining units needed ({units_remaining})"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create the donation record
        donation = models.DonationList.objects.create(
            requested_by=blood_request,
            donated_by=admin,
            units_recieved=units_received,
            total_units=total_units_needed
        )

        # Update BloodRequest if fully fulfilled
        if units_remaining == int(units_received):
            blood_request.hasRecived = True
            blood_request.save()

        return Response(
            {"message": "Donation recorded successfully"},
            status=status.HTTP_201_CREATED
        )
def BloodGroupCount(request, hospitalId):
    hospital = models.AdminDetails.objects.filter(id=hospitalId).first()
    if not hospital:
        return JsonResponse({' ': 'Hospital not found'}, status=404)
    
    blood_group_count = models.BloodCollection.objects.filter(created_by=hospital).values('blood__name').annotate(
        count=Count('blood'), total_units=Sum('units')
    )
    
    total_donors = models.BloodCollection.objects.filter(created_by=hospital).values('user').distinct().count()
    
    data = {
        'blood_group_count': list(blood_group_count),
        'total_donors': total_donors,
    }
    return JsonResponse(data)    

def donate_blood():
    pass

class HomeView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        content = {'message': 'Welcome to JWT Authenctication page using React JS and Django!'}
        return Response(content)

class LogoutView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token =  RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        