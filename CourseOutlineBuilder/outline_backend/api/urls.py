from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'outlines', views.OutlineViewSet)
router.register(r'calendarinformation', views.CalendarInformationViewSet)
router.register(r'learningoutcomes', views.LearningOutcomeViewSet)
router.register(r'timetables', views.TimetableViewSet)
router.register(r'instructors', views.InstructorViewSet)
router.register(r'examinations', views.ExaminationsViewSet)
router.register(r'calculators', views.CalculatorViewSet)
router.register(r'finalgradecomponents', views.FinalGradeComponentViewSet)
router.register(r'textbooks', views.TextbookViewSet)
router.register(r'policies', views.PolicyViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api/', include('rest_framework.urls', namespace='rest_framework'))
]