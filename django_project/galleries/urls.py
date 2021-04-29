from django.urls import path, include
from . import views
from rest_framework import routers


from django.conf.urls import url
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')


router = routers.SimpleRouter()
router.register("image", views.ImageViewSet)
router.register("", views.GalleryViewSet)
 



urlpatterns = [
    path("create_or_update_gallery", views.create_or_update_gallery),
    path("", include(router.urls)),

    url(r'^apiview$', schema_view)
]