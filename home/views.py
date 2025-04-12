from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Destination
from .forms import DestinationForm

def index(request):
    return render(request, 'home/index.html')

@login_required
def admin_dashboard(request):
    return render(request, 'home/admin.html')

@login_required
def add_destination(request):
    if request.method == 'POST':
        form = DestinationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Destination added successfully!')
            return redirect('list_destinations')
    else:
        form = DestinationForm()
    return render(request, 'home/add_destination.html', {'form': form})

@login_required
def list_destinations(request):
    destinations = Destination.objects.all()
    return render(request, 'home/list_destinations.html', {'destinations': destinations})

@login_required
def destination_detail(request, pk):
    destination = get_object_or_404(Destination, pk=pk)
    return render(request, 'home/destination_detail.html', {'destination': destination})

@login_required
def edit_destination(request, pk):
    destination = get_object_or_404(Destination, pk=pk)
    if request.method == 'POST':
        form = DestinationForm(request.POST, request.FILES, instance=destination)
        if form.is_valid():
            form.save()
            messages.success(request, 'Destination updated successfully!')
            return redirect('list_destinations')
    else:
        form = DestinationForm(instance=destination)
    return render(request, 'home/edit_destination.html', {'form': form, 'destination': destination})

@login_required
def delete_destination(request, pk):
    destination = get_object_or_404(Destination, pk=pk)
    if request.method == 'POST':
        destination.delete()
        messages.success(request, 'Destination deleted successfully!')
        return redirect('list_destinations')
    return render(request, 'home/delete_destination.html', {'destination': destination})

def colombo_city_tour(request):
    return render(request, 'home/destinations/colombo_city_tour.html')

def colombo_night_vibes(request):
    return render(request, 'home/destinations/colombo_night_vibes.html')