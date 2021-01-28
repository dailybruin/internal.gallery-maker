from rest_framework import serializers
from .models import Gallery, Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['img_url', 'description', 'credits', 'index', 'gallery', 'id']

class GallerySerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    class Meta:
        model = Gallery
        fields = ['layout', 'images', 'id']