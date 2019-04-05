from django.shortcuts import render, redirect

def play_snake(request, **kwargs):
    #if kwargs.get('user'):
    return render(request, 'snake/snake.html',)
    #else:
     #   redirect('login')

def show_leaderboard(request, **kwargs):
    pass

def show_settings(request, **kwargs):
    pass
