from rest_framework import generics
from .models import Book
from .serializers import BookSerializer
from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return HttpResponse("Welcome to the homepage!")

class BookListCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
