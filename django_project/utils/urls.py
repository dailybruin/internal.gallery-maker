from django.urls import path,re_path
from . import views
"""
	TODO: 
	1. Add URL subpaths here.
	2. Write functions in views.py to handle the various subpaths that you added.
"""
urlpatterns = [
    re_path('.*', views.base_page, name='basePage'),
    path('post/<int:post_id>', views.post_page, name='posts'),
    path('data/<user>/<date>', views.data_page, name='data'),
]