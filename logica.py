#O jogo começa com o levi na aula de matemática básica, o coitado cai no sono e quando vê ao seu redor, está num pesadelo

import random
vida = 3
sequence = 0
max = 0

num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for count in range (10):
    x = random.choice(num)
    y = random.choice(num)
    print (x, '+', y) #Conta aparece na tela
    #Temporizador de 4s para responder
    #Gif Levi_ataque segura o último frame até o input
    response = int(input())
    if response == x+y: 
        #A conta cai
        sequence = sequence+1
        if sequence%10==0 and vida<3:
            vida = vida+1
        if sequence>max:
            max = sequence
    else: #Fim do timer ou resposta errada
        #Gif Marcelo ataque
        #Gif Levi_dano
        #Se usarmos som, som que de "errado"
        vida = vida-1
        sequence = 0
        if vida==0:
            #Marcelo ataque supremo
            #Game over (Levi morrendo)
            print ("Game Over")
            #Final: Levi acorda no meio da aula de matemática e recebe sua prova, quando vê, sua nota foi 0
            break

for count in range (10): #Mesmas anotações do bloco acima
    x = random.choice(num)
    y = random.choice(num)
    print (x, '-', y)
    response = int(input())
    if response == x-y:
        sequence = sequence+1
        if sequence%10==0 and vida<3:
            vida = vida+1
        if sequence>max:
            max = sequence
    else:
        vida = vida-1
        sequence = 0
        if vida==0:
            print ("Game Over")
            #Final: Levi acorda no meio da aula de matemática e recebe sua prova, quando vê, sua nota foi 2
            break

#Tempo de 3s para a onda seguinte

num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for count in range (10):
    x = random.choice(num)
    y = random.choice(num)
    print (x, '+', y)
    response = int(input())
    if response == x+y:
        sequence = sequence+1
        if sequence%10==0 and vida<3:
            vida = vida+1
        if sequence>max:
            max = sequence
    else:
        vida = vida-1
        sequence = 0
        if vida==0:
            print ("Game Over")
            #Final: Levi acorda no meio da aula de matemática e recebe sua prova, quando vê, sua nota foi 4
            break

for count in range (10):
    x = random.choice(num)
    y = random.choice(num)
    print (x, '-', y)
    response = int(input())
    if response == x-y:
        sequence = sequence+1
        if sequence%10==0 and vida<3:
            vida = vida+1
        if sequence>max:
            max = sequence
    else:
        vida = vida-1
        sequence = 0
        if vida==0:
            print ("Game Over")
            #Final: Levi acorda no meio da aula de matemática e recebe sua prova, quando vê, sua nota foi 6
            break
        
for count in range (10):
    x = random.choice(num)
    y = random.choice(num)
    print (x, 'x', y)
    response = int(input())
    if response == x*y:
        sequence = sequence+1
        if sequence%10==0 and vida<3:
            vida = vida+1
        if sequence>max:
            max = sequence
    else:
        vida = vida-1
        sequence = 0
        if vida==0:
            print ("Game Over")
            #Final: Levi acorda no meio da aula de matemática e recebe sua prova, quando vê, sua nota foi 8
            break

for count in range (10):
    x = random.choice(num)
    y = random.choice(num)
    d = x*y
    print (d, '÷', x)
    response = int(input())
    if response == y:
        sequence = sequence+1
        if sequence%10==0 and vida<3:
            vida = vida+1
        if sequence>max:
            max = sequence
    else:
        vida = vida-1
        sequence = 0
        if vida==0:
            print ("Game Over")
            #Final: Levi acorda no meio da aula de matemática e recebe sua prova, quando vê, sua nota foi 8
            break
#Final: Levi acorda no meio da aula de matemática e recebe sua prova, quando vê, sua nota foi 10        
print ("Sequência máxima: ", max)
print ("Vidas: ", vida)

#perguntar para monitoria como ignorar um data type inválido