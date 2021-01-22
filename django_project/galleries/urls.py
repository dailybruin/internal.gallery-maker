from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register("image", views.ImageViewSet)
router.register("", views.GalleryViewSet)

urlpatterns = [
    path("", include(router.urls)),
]