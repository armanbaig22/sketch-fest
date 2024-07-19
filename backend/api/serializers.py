from rest_framework import serializers

class PlaySerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    avatar = serializers.CharField()