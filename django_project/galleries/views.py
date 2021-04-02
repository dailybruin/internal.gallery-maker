from .serializers import GallerySerializer, ImageSerializer, MainSiteGallerySerializer
from .models import Gallery, Image
from .pagination import GalleryPagination
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.http import JsonResponse






class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer
    pagination_class = GalleryPagination
    #permission_classes = [IsAuthenticated]

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    #permission_classes = [IsAuthenticated]

class GalleryRetrieve(generics.RetrieveAPIView):
    queryset = Gallery.objects.all()
    serializer_class = MainSiteGallerySerializer

@api_view(["POST"])
def create_or_update_gallery(request):
    print('request', request)
    print('request data', request.data)
    data = request.data.copy()
    print('data', data)
    id_exists = data.get("id", None)
    if id_exists is None:
        gallery_serializer_class = GallerySerializer(data={"name": data["name"], "description": data["description"], "layout": data["layout"]})
        if gallery_serializer_class.is_valid():
            gallery = gallery_serializer_class.save()
        else:
            return JsonResponse(gallery_serializer_class.errors)
        id = gallery.id
    else:
        id = id_exists
        Gallery.objects.get(id = id).images.all().delete()
    for index, image in enumerate(data["images"]):
        image.update({"gallery": id, "index": index})
        image["img_url"] = image.pop("url")
        image_serializer_class = ImageSerializer(data=image)
        if image_serializer_class.is_valid():
            image_serializer_class.save()
        else:
            return JsonResponse(image_serializer_class.errors)
    return JsonResponse(data)
        # {
        #     name:
        #     description:
        #     alt..
        #     images: []
        # }
        # create gallery first, get id, then create many image objects with that gallery object id
        # 
