from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ProfileSerializer
from .pagination import AdminUserPagination
from rest_framework.views import APIView
from .models import User
from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    AdminLoginSerializer,
)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        return self.request.user


class AdminLoginView(generics.GenericAPIView):
    serializer_class = AdminLoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": ProfileSerializer(user).data,
        })

class AdminUserListView(generics.ListAPIView):
   
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAdminUser]
    
    
    def get_queryset(self):
        queryset = User.objects.all().order_by('-id')
        
        search = self.request.query_params.get('search')
        
        if search:
            queryset = queryset.filter(
                username__icontains = search
            )
        
        
        return queryset
    
class AdminCreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.IsAdminUser]
    

class AdminUpdateUserView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'id'
    
class AdminDeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAdminUser]
    
class AdminUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = "id"

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user

        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not old_password or not new_password:
            return Response(
                {"detail": "Both old and new passwords are required."},
                status=400
            )

        if not user.check_password(old_password):
            return Response(
                {"detail": "Old password is incorrect."},
                status=400
            )

        if len(new_password) < 8:
            return Response(
                {"detail": "New password must be at least 8 characters."},
                status=400
            )

        user.set_password(new_password)
        user.save()

        return Response(
            {"detail": "Password changed successfully."},
            status=200
        )
