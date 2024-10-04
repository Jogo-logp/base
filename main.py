import pygame
import random
import math
import sys
from PIL import Image

# Inicializando o Pygame
pygame.init()

# Definindo cores
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Definindo dimensões da tela
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))

# Carregar a imagem do fantasma
ghost_image = pygame.image.load('ghost.png')  # Substitua 'ghost.png' pelo caminho correto do seu arquivo de imagem
ghost_image = pygame.transform.scale(ghost_image, (80, 80))  # Redimensione conforme necessário
background_image = pygame.image.load('background_image.png')
background_image = pygame.transform.scale(background_image, (SCREEN_WIDTH, SCREEN_HEIGHT))

# Definindo o relógio para controlar o FPS
clock = pygame.time.Clock()

# Função para carregar GIFs e converter em uma lista de frames
def load_gif(filename):
    im = Image.open(filename)
    frames = []
    try:
        while True:
            frame = pygame.image.fromstring(im.tobytes(), im.size, im.mode)
            frames.append(pygame.transform.scale(frame, (100, 100)))  # Redimensione conforme necessário
            im.seek(len(frames))  # Pular para o próximo frame
    except EOFError:
        pass
    return frames

# Carregando as animações do gato
cat_normal_frames = load_gif('cat_normal.gif')
cat_damage_frames = load_gif('cat_damage.gif')
cat_win_frames = load_gif('cat_win.gif')
cat_game_over_frames = load_gif('cat_game_over.gif')

# Variáveis do gato
cat_frames = cat_normal_frames
cat_frame_index = 0
cat_frame_timer = 0

# Posição inicial do gato
cat_x = SCREEN_WIDTH // 2 - 50
cat_y = SCREEN_HEIGHT // 2 - 50

# Variáveis do cálculo
math_problem = None
answer_input = ''
correct_answer = None
game_over = False
problem_active = False
score = 0

# Função para criar um fantasma na parte superior
def create_ghost():
    x = random.randint(0, SCREEN_WIDTH - 80)
    problem, answer = generate_math_problem()  # Gerar o problema matemático ao criar o fantasma
    return [x, 0, problem, answer]  # Adicionar o problema e a resposta ao fantasma

# Função para mover o fantasma em direção ao gato
def move_ghost(ghost_pos, cat_x, cat_y):
    ghost_x, ghost_y, problem, answer = ghost_pos  # Desempacotar os valores do fantasma
    direction_x = cat_x - ghost_x
    direction_y = cat_y - ghost_y
    distance = math.hypot(direction_x, direction_y)

    if distance == 0:
        return ghost_pos

    direction_x /= distance
    direction_y /= distance

    ghost_x += direction_x * 1.5  # Aumente a velocidade do fantasma
    ghost_y += direction_y * 1.5

    return [ghost_x, ghost_y, problem, answer]  # Retornar o fantasma com o problema

# Função para verificar colisão
def check_collision(cat_x, cat_y, ghost_x, ghost_y):
    return (cat_x < ghost_x + 80 and
            cat_x + 100 > ghost_x and
            cat_y < ghost_y + 80 and
            cat_y + 100 > ghost_y)

# Função para gerar um problema matemático simples
def generate_math_problem():
    num1 = random.randint(1, 10)
    num2 = random.randint(1, 10)
    operation = random.choice(['+', '-', '*', '/'])
    if operation == '+':
        correct_answer = num1 + num2
    elif operation == '-':
        correct_answer = num1 - num2
    elif operation == '*':
        correct_answer = num1 * num2
    else:
        if num2 == 0:
            num2 = 1
        correct_answer = num1 // num2

    problem = f'{num1} {operation} {num2} = ?'
    return problem, correct_answer

# Função para exibir o cálculo e pegar a resposta do jogador
def handle_math_problem():
    global answer_input, correct_answer

    font = pygame.font.Font(None, 74)
    problem_surface = font.render(math_problem, True, WHITE)
    input_surface = font.render(answer_input, True, WHITE)

    # Preencher a tela com o fundo
    screen.blit(background_image, (0, 0))  # Redesenhar o fundo
    screen.blit(problem_surface, (SCREEN_WIDTH // 2 - problem_surface.get_width() // 2, 100))
    screen.blit(input_surface, (SCREEN_WIDTH // 2 - input_surface.get_width() // 2, 200))
    pygame.display.flip()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_RETURN:
                if answer_input == str(correct_answer):
                    return True
                else:
                    return False
            elif event.key == pygame.K_BACKSPACE:
                answer_input = answer_input[:-1]
            else:
                answer_input += event.unicode

    return None

# Função principal do jogo
def game_loop():
    global cat_x, cat_y, math_problem, correct_answer, answer_input, game_over, problem_active, score
    global cat_frames, cat_frame_index, cat_frame_timer

    running = True
    ghost = create_ghost()  # Criando o primeiro fantasma

    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        # Limpa a tela com o fundo
        screen.blit(background_image, (0, 0))

        # Atualizar frames do gato (sempre atualizando a animação)
        cat_frame_timer += 1
        if cat_frame_timer >= 5:  # Mudar de frame a cada 5 ticks
            cat_frame_index = (cat_frame_index + 1) % len(cat_frames)
            cat_frame_timer = 0
        
        # Desenhar o gato com a animação atual
        screen.blit(cat_frames[cat_frame_index], (cat_x, cat_y))

        # Mover o fantasma e desenhar o problema acima dele
        ghost = move_ghost(ghost, cat_x, cat_y)
        
        # Desenhar o fantasma
        screen.blit(ghost_image, (ghost[0], ghost[1]))

        # Desenhar o problema matemático acima do fantasma
        font = pygame.font.Font(None, 36)
        problem_surface = font.render(ghost[2], True, WHITE)  # Usar o problema do fantasma
        screen.blit(problem_surface, (ghost[0], ghost[1] - 30))  # Posicionar acima do fantasma

        # Verificando colisão entre o gato e o fantasma
        if check_collision(cat_x, cat_y, ghost[0], ghost[1]):
            # Gerar um novo problema matemático ao colidir
            if not problem_active:
                math_problem, correct_answer = ghost[2], ghost[3]  # Usar o problema e a resposta do fantasma
                problem_active = True  # Ativar o problema matemático
                answer_input = ''
                # Não é necessário redesenhar o fundo aqui, pois já está desenhado no início do loop
                # screen.blit(background_image, (0, 0))
            else:  # Se o problema já estiver ativo, mudar para animação de dano
                cat_frames = cat_damage_frames  # Mudar para a animação de dano
                cat_frame_index = 0
                cat_frame_timer = 0

        # Se o problema matemático estiver ativo, lidar com ele
        if problem_active:
            result = handle_math_problem()
            if result is not None:
                if result:  # Resposta correta
                    score += 1
                    ghost = create_ghost()  # Criar um novo fantasma
                    problem_active = False  # Desativar o problema matemático
                    answer_input = ''
                    cat_frames = cat_normal_frames  # Retornar para a animação normal
                else:  # Resposta incorreta
                    game_over = True

        # Tela de Game Over
        if game_over:
            screen.fill(BLACK)  # Preencher a tela com preto
            font = pygame.font.Font(None, 74)
            game_over_surface = font.render("Game Over", True, WHITE)
            screen.blit(game_over_surface, (SCREEN_WIDTH // 2 - game_over_surface.get_width() // 2, SCREEN_HEIGHT // 2 - 100))
            restart_surface = font.render("Press R to Restart", True, WHITE)
            screen.blit(restart_surface, (SCREEN_WIDTH // 2 - restart_surface.get_width() // 2, SCREEN_HEIGHT // 2))
            pygame.display.flip()

            # Esperar pelo input para reiniciar ou sair
            while game_over:
                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                        pygame.quit()
                        sys.exit()
                    if event.type == pygame.KEYDOWN:
                        if event.key == pygame.K_r:  # Reiniciar
                            game_over = False
                            cat_frames = cat_normal_frames
                            cat_frame_index = 0
                            cat_frame_timer = 0
                            cat_x = SCREEN_WIDTH // 2 - 50
                            cat_y = SCREEN_HEIGHT // 2 - 50
                            score = 0
                            ghost = create_ghost()  # Criar um novo fantasma
                            answer_input = ''
                            problem_active = False

        pygame.display.flip()
        clock.tick(60)

    pygame.quit()

# Iniciando o jogo
game_loop()
