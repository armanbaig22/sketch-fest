from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from .serializers import PlaySerializer

class PlayView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PlaySerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            avatar = serializer.validated_data['avatar']
            print("called", username,avatar)
            # assign the room to user and return it(first check if any room has less than 6 players and if no such room is found then assign new room)
            # add the user to that room in database
            return Response({},status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)