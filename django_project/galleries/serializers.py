from rest_framework import serializers

from .models import Gallery, Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['img_url', 'description', 'credits', 'index', 'gallery', 'id', 'type']

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

