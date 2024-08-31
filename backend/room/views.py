from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Room

class DoesExist(APIView):
    def post(self, request, *args, **kwargs):
        room_id = request.data.get('room_id')
        if room_id:
            exists = Room.objects.filter(id=room_id).exists()
            return Response({'exists': exists}, status=status.HTTP_200_OK)
        return Response({'exists': False}, status=status.HTTP_400_BAD_REQUEST)
  