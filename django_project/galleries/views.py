from .serializers import GallerySerializer, ImageSerializer
from .models import Gallery, Image
from .pagination import GalleryPagination
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    pagination_class = GalleryPagination
    #permission_classes = [IsAuthenticated]

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    #permission_classes = [IsAuthenticated]

