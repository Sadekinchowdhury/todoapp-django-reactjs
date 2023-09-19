
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todoapp.views import TodoViewSet
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

route = routers.DefaultRouter()
route.register('', TodoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls))
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
