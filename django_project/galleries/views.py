from .serializers import GallerySerializer, ImageSerializer, MainSiteGallerySerializer
from .models import Gallery, Image
from .pagination import GalleryPagination
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.db import transaction


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
@transaction.atomic
def create_or_update_gallery(request):
    data = request.data.copy()
    id_exists = data.get("id", None)

    # Error checking
    if "name" not in data or "description" not in data or "layout" not in data:
        return JsonResponse({"response": "Name, description, or layout does not exist."}, status=400)
    if "images" not in data:
        return JsonResponse({"response": "Images does not exist."}, status=400)
    for index, image in enumerate(data["images"]):
        if "caption" not in image or "url" not in image or "credits" not in image:
            return JsonResponse({"response": "Caption or image url does not exist."}, status=400)

    gallery_serializer = None
    if id_exists is None:
        gallery_serializer = GallerySerializer(data={"name": data["name"], "description": data["description"], "layout": data["layout"]})
    else:
        # check if gallery actually exists
        id = id_exists
        referenced_gallery = Gallery.objects.filter(id=id)
        if len(referenced_gallery) == 0:
            return JsonResponse({"response": "Gallery does not exist."}, status=400)

        # delete old images
        actual_gallery_obj = Gallery.objects.get(id=id)
        actual_gallery_obj.images.all().delete()

        # make serializer for updating existing gallery
        gallery_serializer = GallerySerializer(actual_gallery_obj, data={"name": data["name"], "description": data["description"], "layout": data["layout"]})
    
    # save gallery (or update gallery if it already exists)
    if gallery_serializer.is_valid():
        gallery = gallery_serializer.save()
    else:
        return JsonResponse(gallery_serializer.errors, status=400)
    id = gallery.id

    # create images. If gallery alraedy existed, then the images were deleted earlier
    for index, image in enumerate(data["images"]):
        image.update({"gallery": id, "index": index})
        image["img_url"] = image.pop("url")
        image["description"] = image.pop("caption")
        image_serializer_class = ImageSerializer(data=image)
        if image_serializer_class.is_valid():
            image_serializer_class.save()
        else:
            return JsonResponse(image_serializer_class.errors, status=400)
    return JsonResponse(data)
        # {
        #     name:
        #     description:
        #     alt..
        #     images: []
        # }
        # create gallery first, get id, then create many image objects with that gallery object id
        # 
