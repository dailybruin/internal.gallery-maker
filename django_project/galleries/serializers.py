from rest_framework import serializers
from .models import Gallery, Image
from .constants import galleryOptions

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['img_url', 'description', 'credits', 'index', 'gallery', 'id', 'type']

    def validate(self, data):
        if data['type'] not in galleryOptions[data['gallery'].layout]:
            raise serializers.ValidationError('A gallery of layout type {} cannot contain an image of type {}'.format(data['gallery'].layout, data['type']))
        return data

class GallerySerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    class Meta:
        model = Gallery
        fields = ['layout', 'images', 'id', 'name', 'description']


class MainSiteImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['img_url', 'description', 'credits', 'type']

class MainSiteGallerySerializer(serializers.ModelSerializer):
    data = serializers.SerializerMethodField('get_images_as_data')
    layout = serializers.SerializerMethodField()

    def get_images_as_data(self, obj):
        return MainSiteImageSerializer(obj.images.all(), many=True).data

    def get_layout(self,obj):
        return obj.get_layout_display()

    class Meta:
        model = Gallery
        fields = ['data', 'layout']

