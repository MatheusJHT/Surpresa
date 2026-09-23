insert into public.site_settings (site_title, site_subtitle, intro_message, final_message)
values (
  '19 Anos, 19 Dias, 19 Presentes',
  'Uma pequena jornada de amor',
  'Cada presente guarda uma pequena parte da nossa história.',
  '19 anos, 19 dias, 19 presentes. E eu escolheria continuar vivendo nossa história ao seu lado.'
)
on conflict do nothing;

insert into public.presents (
  day_number, title, password_hash, question, answer_hash, success_message, riddle, hint
)
values
  (1, 'O começo de tudo', crypt('2609', gen_salt('bf')), 'Qual foi o primeiro lugar onde nós saímos juntos?', crypt('praça', gen_salt('bf')), 'Todo começo fica ainda mais bonito quando lembro que foi com você.', 'Procure onde nossas memórias costumam ficar guardadas.', 'Pense em um lugar cheio de lembranças.'),
  (2, 'Uma canção nossa', crypt('lua', gen_salt('bf')), 'Qual foi a primeira música que marcou nossa história?', crypt('lua', gen_salt('bf')), 'Algumas músicas conseguem guardar um momento inteiro dentro delas.', 'O próximo presente está perto de algo que conta histórias sem falar.', 'Procure perto de livros ou cartas.'),
  (3, 'Um nome só nosso', crypt('sete', gen_salt('bf')), 'Qual foi o primeiro apelido carinhoso que eu te dei?', crypt('sete', gen_salt('bf')), 'Gosto dos nomes que só fazem sentido quando somos nós dois.', 'Vá até onde uma pausa tranquila costuma acontecer.', 'Um cantinho confortável pode ajudar.'),
  (4, 'Pequenos detalhes', crypt('janela', gen_salt('bf')), 'Qual detalhe meu sempre faz você sorrir?', crypt('sorriso', gen_salt('bf')), 'É nos pequenos detalhes que o amor aprende a morar.', 'Procure perto de onde a luz entra pela manhã.', 'Olhe perto de uma janela.'),
  (5, 'Nosso primeiro registro', crypt('foto', gen_salt('bf')), 'O que aparece na nossa primeira foto juntos?', crypt('sorriso', gen_salt('bf')), 'Cada foto nossa parece dizer que aquele instante valeu a pena.', 'O próximo capítulo está perto de imagens que guardam o tempo.', 'Pense em fotografias.'),
  (6, 'Um dia especial', crypt('domingo', gen_salt('bf')), 'Qual era o dia da semana do nosso primeiro passeio?', crypt('domingo', gen_salt('bf')), 'Até os dias comuns ficam especiais quando divididos com você.', 'Procure onde costumamos escolher o que assistir.', 'Perto da televisão pode haver uma pista.'),
  (7, 'Nosso lugar', crypt('cafe', gen_salt('bf')), 'Qual bebida lembra uma das nossas conversas mais longas?', crypt('café', gen_salt('bf')), 'Eu repetiria cada conversa, até as que terminaram tarde demais.', 'O próximo presente está onde as manhãs começam.', 'Procure na cozinha.'),
  (8, 'Uma promessa', crypt('sempre', gen_salt('bf')), 'Qual palavra resume o que eu quero viver ao seu lado?', crypt('sempre', gen_salt('bf')), 'A melhor parte do futuro é imaginar todos os dias que ainda teremos.', 'Vá até onde guardamos coisas para sair.', 'Procure perto de bolsas ou chaves.'),
  (9, 'Entre risos', crypt('riso', gen_salt('bf')), 'O que nunca falta quando estamos juntos?', crypt('risada', gen_salt('bf')), 'Seu riso é uma das minhas formas favoritas de casa.', 'A próxima surpresa está perto de algo que também faz barulho.', 'Pense em música.'),
  (10, 'Metade do caminho', crypt('dez', gen_salt('bf')), 'Quantos presentes já foram descobertos antes deste?', crypt('nove', gen_salt('bf')), 'Chegar até aqui com você já é uma história linda por si só.', 'Procure no lugar onde o dia termina devagar.', 'O quarto pode esconder o próximo capítulo.'),
  (11, 'Uma memória favorita', crypt('mar', gen_salt('bf')), 'Qual cenário combina com uma das nossas melhores memórias?', crypt('mar', gen_salt('bf')), 'Algumas lembranças têm cheiro de liberdade e vontade de ficar.', 'A pista está perto de algo azul.', 'Procure um objeto azul.'),
  (12, 'Nosso jeito', crypt('abraco', gen_salt('bf')), 'Qual gesto meu faz você se sentir protegida?', crypt('abraço', gen_salt('bf')), 'Se eu pudesse, transformaria cada abraço em morada.', 'Vá até onde descansamos depois de um dia cheio.', 'Procure perto de almofadas.'),
  (13, 'Uma escolha', crypt('juntos', gen_salt('bf')), 'Qual é a coisa que sempre fazemos melhor juntos?', crypt('rir', gen_salt('bf')), 'A vida fica mais leve quando a gente escolhe o mesmo lado.', 'O próximo presente está perto de algo que usamos para escolher caminhos.', 'Pense em um mapa ou agenda.'),
  (14, 'A nossa calma', crypt('chuva', gen_salt('bf')), 'Qual som combina com uma tarde tranquila ao seu lado?', crypt('chuva', gen_salt('bf')), 'Mesmo no silêncio, eu gosto da companhia que existe entre nós.', 'Procure onde ficam as coisas que aquecem.', 'Olhe perto de cobertores.'),
  (15, 'Quase lá', crypt('quinze', gen_salt('bf')), 'Qual número representa este capítulo da jornada?', crypt('quinze', gen_salt('bf')), 'Cada passo trouxe uma nova razão para agradecer por nós.', 'A próxima pista está onde contamos os dias.', 'Procure perto de um calendário.'),
  (16, 'O que permanece', crypt('cuidado', gen_salt('bf')), 'O que nunca pode faltar em uma história de amor?', crypt('cuidado', gen_salt('bf')), 'Amar você também é prestar atenção, todos os dias.', 'Vá até onde ficam objetos que usamos para nos cuidar.', 'Procure no banheiro.'),
  (17, 'Planos', crypt('viagem', gen_salt('bf')), 'Qual sonho você gostaria de realizar comigo?', crypt('viagem', gen_salt('bf')), 'Ainda temos muitos lugares para conhecer e histórias para inventar.', 'A próxima surpresa está perto de algo que acompanha partidas.', 'Procure perto de malas ou mochilas.'),
  (18, 'A última pista', crypt('amor', gen_salt('bf')), 'Qual palavra você escolheria para definir nossa história?', crypt('amor', gen_salt('bf')), 'Chegamos quase ao fim, mas o que sentimos não cabe em uma contagem.', 'O último presente está perto de onde guardamos o que é mais precioso.', 'Procure em um lugar especial para nós.'),
  (19, 'O presente final', crypt('final', gen_salt('bf')), 'Qual é uma coisa que você sempre quer viver ao meu lado?', crypt('vida', gen_salt('bf')), 'Se eu pudesse escolher um único presente, seria continuar vivendo nossa história ao seu lado.', 'Você chegou ao fim da jornada. Agora abra a carta final.', 'A última surpresa está junto da mensagem final.')
on conflict (day_number) do update set
  title = excluded.title,
  question = excluded.question,
  success_message = excluded.success_message,
  riddle = excluded.riddle,
  hint = excluded.hint,
  updated_at = now();