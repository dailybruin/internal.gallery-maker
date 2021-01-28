from rest_framework.pagination import LimitOffsetPagination

DEFAULT_PAGE_SIZE = 10

class GalleryPagination(LimitOffsetPagination):
    default_limit = DEFAULT_PAGE_SIZE
