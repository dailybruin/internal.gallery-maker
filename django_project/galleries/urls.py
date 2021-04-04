from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register("image", views.ImageViewSet)
router.register("", views.GalleryViewSet)
 

urlpatterns = [
    path("create_or_update_gallery", views.create_or_update_gallery),
    path("", include(router.urls)),
]