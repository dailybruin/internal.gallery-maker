from .serializers import GallerySerializer, ImageSerializer, MainSiteGallerySerializer
from .models import Gallery, Image
from .pagination import GalleryPagination
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# from os import getenv
from base64 import b64encode
import os
# import base64
import requests
from django_project.settings import WP_USERNAME
from django_project.settings import WP_PWD
from django_project.settings import WP_URL
# from django.template import RequestContext




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
@csrf_exempt
def uploadToWordPress(request):
    user = WP_USERNAME
    pw = WP_PWD
    auth_string = f"{user}:{pw}"
    auth_data = auth_string.encode("utf-8")
    url = WP_URL
    file_type = request.FILES['image'].content_type
    basic_auth_header = {
        'content-Type': str(file_type),
        'Authorization': "Basic " + b64encode(auth_data).decode("utf-8")
    }
    file_extension = (file_type.split('/'))[1]
    # print(file_extension)
    file_name = str(request.POST['title']) + '.' + file_extension
    image = request.FILES['image']
    headers = basic_auth_header
    headers["Content-Disposition"] = f"attachment; filename={file_name}"
    data=image.open('rb').read()
    wp_res = ""
    wp_res = requests.post(f"{url}/wp-json/wp/v2/media", headers=headers, data=data)
    # print(wp_res.text)
    if wp_res.ok:
        res_json = wp_res.json()
        # print(f"Successfully uploaded image {file_name} to WordPress")
        return JsonResponse({"ok" : "true"});
    else:
        err_message = f"Unable to upload image {file_name} to WordPress"
        # print("Fail")
        # raise PublishError(err_message)
        return JsonResponse({"ok" : "false",
                             "message": err_message});
       

@api_view(["POST"])
def create_or_update_gallery(request):
    data = request.data.copy()
    id_exists = data.get("id", None)

    if "name" not in data or "description" not in data or "layout" not in data:
        return JsonResponse({"response": "Name, description, or layout does not exist."}, status=400)

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
    if "images" not in data:
        return JsonResponse({"response": "Images does not exist."}, status=400) 
    for index, image in enumerate(data["images"]):
        if "caption" not in image or "url" not in image or "credits" not in image:
            return JsonResponse({"response": "Caption or image url does not exist."}, status=400)
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
    