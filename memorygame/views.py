from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Partida
from django.utils import timezone
from datetime import datetime

# Create your views here.
def index(request):
    return render(request,'index.html')

def partidas(request):
    # Obtém o parâmetro 'order' da query string (com padrão 'time')
    order = request.GET.get('order', 'time')
    
    # Ordena com base no parâmetro
    if order == 'attempts':
        partidas = Partida.objects.all().order_by('attempts')  # Ordenar por menos tentativas
    elif order == 'time':
        partidas = Partida.objects.all().order_by('time')  # Ordenar por menos tempo
    else:
        partidas = Partida.objects.all().order_by('time')  # Valor padrão
    
    # Formata o campo 'time' com milissegundos
    for partida in partidas:
        partida.formatted_time = partida.time.strftime('%H:%M:%S.%f')[:-3]  # Remover os últimos 3 dígitos
    
    # Passa o parâmetro atual para o contexto
    context = {
        'partidas': partidas,
        'current_order': order
    }
    return render(request, 'laderboards.html', context)

@csrf_exempt
def savePartida(request):
    if request.method == 'POST':
        nome = request.POST.get('player_name')
        tentativas = request.POST.get('game_attempts')
        tempo_str = request.POST.get('game_time')  # Pega o tempo no formato HH:MM:SS.MS

        # Converte a string do tempo em um objeto time
        try:
            tempo = datetime.strptime(tempo_str, '%H:%M:%S.%f').time()
        except ValueError:
            return JsonResponse({'status': 'error', 'message': 'Invalid time format'}, status=400)

        # Criar o objeto Partida e salvar no banco de dados
        partida = Partida(
            name=nome,
            attempts=tentativas,
            time=tempo,  # Salvar o tempo com precisão de milissegundos
            datetime=timezone.now()
        )
        partida.save()

        return JsonResponse({'status': 'success'}, status=200)

    return JsonResponse({'status': 'invalid request'}, status=400)