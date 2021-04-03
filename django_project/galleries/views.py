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
    data = request.data.copy()
    id_exists = data.get("id", None)
    if id_exists is None:
        if "name" not in data or "description" not in data or "layout" not in data:
            return JsonResponse({"response": "Name, description, or layout does not exist."}, status=400)
        gallery_serializer_class = GallerySerializer(data={"name": data["name"], "description": data["description"], "layout": data["layout"]})
        if gallery_serializer_class.is_valid():
            gallery = gallery_serializer_class.save()
        else:
            return JsonResponse(gallery_serializer_class.errors)
        id = gallery.id
    else:
        id = id_exists
        referenced_gallery = Gallery.objects.filter(id=id)
        if len(referenced_gallery) == 0:
            return JsonResponse({"response": "Gallery does not exist."}, status=400)
        Gallery.objects.get(id=id).images.all().delete()
    if "images" not in data:
        return JsonResponse({"response": "Images does not exist."}, status=400) 
    for index, image in enumerate(data["images"]):
        if "caption" not in image or "url" not in image:
            return JsonResponse({"response": "Caption or image url does not exist."}, status=400)
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
