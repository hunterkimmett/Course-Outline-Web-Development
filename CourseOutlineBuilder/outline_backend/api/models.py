from django.db import models

class Outline(models.Model):
    faculty = models.CharField(max_length=100, default="", blank=True)
    number = models.CharField(max_length=100, default="", blank=True)
    term = models.CharField(max_length=100, default="", blank=True)
    section = models.CharField(max_length=100, default="", blank=True)
    description = models.CharField(max_length=50, default="", blank=True)
    date_created = models.CharField(max_length=50, default="", blank=True)

    def __str__(self):
        return self.faculty + self.number + self.term + self.section

class CalendarInformation(models.Model):
    outline = models.ForeignKey(Outline, on_delete=models.CASCADE)
    description = models.CharField(max_length=500, default="", blank=True)
    hours = models.CharField(max_length=50, default="", blank=True)
    credit = models.CharField(max_length=50, default="", blank=True)
    calendar_reference = models.CharField(max_length=50, default="", blank=True)

class LearningOutcome(models.Model):
    outline = models.ForeignKey(Outline, on_delete=models.CASCADE)
    number = models.CharField(max_length=50, default="", blank=True)
    outcome = models.CharField(max_length=50, default="", blank=True)
    attribute = models.CharField(max_length=50, default="", blank=True)
    level = models.CharField(max_length=50, default="", blank=True)

class Timetable(models.Model):
    outline = models.ForeignKey(Outline, on_delete=models.CASCADE)
    section = models.CharField(max_length=50, default="", blank=True)
    days = models.CharField(max_length=50, default="", blank=True)
    time = models.CharField(max_length=50, default="", blank=True)
    location = models.CharField(max_length=50, default="", blank=True)

class Instructor(models.Model):
    outline = models.ForeignKey(Outline, on_delete=models.CASCADE)
    section = models.CharField(max_length=50, default="", blank=True)
    first_name = models.CharField(max_length=50, default="", blank=True)
    last_name = models.CharField(max_length=50, default="", blank=True)
    phone = models.CharField(max_length=50, default="", blank=True)
    office = models.CharField(max_length=50, default="", blank=True)
    email = models.CharField(max_length=50, default="", blank=True)

class Examinations(models.Model):
    outline = models.ForeignKey(Outline, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000, default="", blank=True)

class Calculator(models.Model):
    outline = models.ForeignKey(Outline, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000, default="", blank=True)

class FinalGradeComponent(models.Model):
    outline = models.ForeignKey(Outline, on_delete=models.CASCADE)
    component = models.CharField(max_length=50, default="", blank=True)
    outcomes = models.CharField(max_length=50, default="", blank=True)
    weight = models.CharField(max_length=50, default="", blank=True)

class Textbook(models.Model):
    outline = models.ForeignKey(Outline, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, default="", blank=True)
    author = models.CharField(max_length=50, default="", blank=True)
    year = models.CharField(max_length=50, default="", blank=True)
    publisher = models.CharField(max_length=50, default="", blank=True)
    requirement = models.CharField(max_length=50, default="", blank=True)

class Policy(models.Model):
    outline = models.ForeignKey(Outline, on_delete=models.CASCADE)
    policy = models.CharField(max_length=50, default="", blank=True)