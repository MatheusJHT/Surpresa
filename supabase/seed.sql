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
  (1, 'O começo de tudo', crypt('2609', gen_salt('bf')), 'Qual foi o primeiro lugar onde nós saímos juntos?', crypt('praca', gen_salt('bf')), 'Todo começo fica ainda mais bonito quando lembro que foi com você.', 'Procure onde nossas memórias costumam ficar guardadas.', 'Pense em um lugar cheio de lembranças.'),
  (2, 'Uma canção nossa', crypt('lua', gen_salt('bf')), 'Qual foi a primeira música que marcou nossa história?', crypt('lua', gen_salt('bf')), 'Algumas músicas conseguem guardar um momento inteiro dentro delas.', 'O próximo presente está perto de algo que conta histórias sem falar.', 'Procure perto de livros ou cartas.'),
  (3, 'Um nome só nosso', crypt('sete', gen_salt('bf')), 'Qual foi o primeiro apelido carinhoso que eu te dei?', crypt('sete', gen_salt('bf')), 'Gosto dos nomes que só fazem sentido quando somos nós dois.', 'Vá até onde uma pausa tranquila costuma acontecer.', 'Um cantinho confortável pode ajudar.'),
  (4, 'Pequenos detalhes', crypt('janela', gen_salt('bf')), 'Qual detalhe meu sempre faz você sorrir?', crypt('sorriso', gen_salt('bf')), 'É nos pequenos detalhes que o amor aprende a morar.', 'Procure perto de onde a luz entra pela manhã.', 'Olhe perto de uma janela.'),
  (5, 'Nosso primeiro registro', crypt('foto', gen_salt('bf')), 'O que aparece na nossa primeira foto juntos?', crypt('sorriso', gen_salt('bf')), 'Cada foto nossa parece dizer que aquele instante valeu a pena.', 'O próximo capítulo está perto de imagens que guardam o tempo.', 'Pense em fotografias.'),
  (6, 'Um dia especial', crypt('domingo', gen_salt('bf')), 'Qual era o dia da semana do nosso primeiro passeio?', crypt('domingo', gen_salt('bf')), 'Até os dias comuns ficam especiais quando divididos com você.', 'Procure onde costumamos escolher o que assistir.', 'Perto da televisão pode haver uma pista.'),
  (7, 'Nosso lugar', crypt('cafe', gen_salt('bf')), 'Qual bebida lembra uma das nossas conversas mais longas?', crypt('cafe', gen_salt('bf')), 'Eu repetiria cada conversa, até as que terminaram tarde demais.', 'O próximo presente está onde as manhãs começam.', 'Procure na cozinha.'),
  (8, 'Uma promessa', crypt('sempre', gen_salt('bf')), 'Qual palavra resume o que eu quero viver ao seu lado?', crypt('sempre', gen_salt('bf')), 'A melhor parte do futuro é imaginar todos os dias que ainda teremos.', 'Vá até onde guardamos coisas para sair.', 'Procure perto de bolsas ou chaves.'),
  (9, 'Entre risos', crypt('riso', gen_salt('bf')), 'O que nunca falta quando estamos juntos?', crypt('risada', gen_salt('bf')), 'Seu riso é uma das minhas formas favoritas de casa.', 'A próxima surpresa está perto de algo que também faz barulho.', 'Pense em música.'),
  (10, 'Metade do caminho', crypt('dez', gen_salt('bf')), 'Quantos presentes já foram descobertos antes deste?', crypt('nove', gen_salt('bf')), 'Chegar até aqui com você já é uma história linda por si só.', 'Procure no lugar onde o dia termina devagar.', 'O quarto pode esconder o próximo capítulo.'),
  (11, 'Uma memória favorita', crypt('mar', gen_salt('bf')), 'Qual cenário combina com uma das nossas melhores memórias?', crypt('mar', gen_salt('bf')), 'Algumas lembranças têm cheiro de liberdade e vontade de ficar.', 'A pista está perto de algo azul.', 'Procure um objeto azul.'),
  (12, 'Nosso jeito', crypt('abraco', gen_salt('bf')), 'Qual gesto meu faz você se sentir protegida?', crypt('abraco', gen_salt('bf')), 'Se eu pudesse, transformaria cada abraço em morada.', 'Vá até onde descansamos depois de um dia cheio.', 'Procure perto de almofadas.'),
  (13, 'Uma escolha', crypt('juntos', gen_salt('bf')), 'Qual é a coisa que sempre fazemos melhor juntos?', crypt('rir', gen_salt('bf')), 'A vida fica mais leve quando a gente escolhe o mesmo lado.', 'O próximo presente está perto de algo que usamos para escolher caminhos.', 'Pense em um mapa ou agenda.'),
  (14, 'A nossa calma', crypt('chuva', gen_salt('bf')), 'Qual som combina com uma tarde tranquila ao seu lado?', crypt('chuva', gen_salt('bf')), 'Mesmo no silêncio, eu gosto da companhia que existe entre nós.', 'Procure onde ficam as coisas que aquecem.', 'Olhe perto de cobertores.'),
  (15, 'Quase lá', crypt('quinze', gen_salt('bf')), 'Qual número representa este capítulo da jornada?', crypt('quinze', gen_salt('bf')), 'Cada passo trouxe uma nova razão para agradecer por nós.', 'A próxima pista está onde contamos os dias.', 'Procure perto de um calendário.'),
  (16, 'O que permanece', crypt('cuidado', gen_salt('bf')), 'O que nunca pode faltar em uma história de amor?', crypt('cuidado', gen_salt('bf')), 'Amar você também é prestar atenção, todos os dias.', 'Vá até onde ficam objetos que usamos para nos cuidar.', 'Procure no banheiro.'),
  (17, 'Planos', crypt('viagem', gen_salt('bf')), 'Qual sonho você gostaria de realizar comigo?', crypt('viagem', gen_salt('bf')), 'Ainda temos muitos lugares para conhecer e histórias para inventar.', 'A próxima surpresa está perto de algo que acompanha partidas.', 'Procure perto de malas ou mochilas.'),
  (18, 'A última pista', crypt('amor', gen_salt('bf')), 'Qual palavra você escolheria para definir nossa história?', crypt('amor', gen_salt('bf')), 'Chegamos quase ao fim, mas o que sentimos não cabe em uma contagem.', 'O último presente está perto de onde guardamos o que é mais precioso.', 'Procure em um lugar especial para nós.'),
  (19, 'O presente final', crypt('final', gen_salt('bf')), 'Qual é uma coisa que você sempre quer viver ao meu lado?', crypt('vida', gen_salt('bf')), 'Se eu pudesse escolher um único presente, seria continuar vivendo nossa história ao seu lado.', 'Você chegou ao fim da jornada. Agora abra a carta final.', 'A última surpresa está junto da mensagem final.')
on conflict (day_number) do update set
  updated_at = now();

update public.presents as presents
set
  password_hash = crypt(contents.password, gen_salt('bf')),
  question = '',
  answer_hash = crypt('', gen_salt('bf')),
  success_message = contents.success_message,
  hint = contents.hint,
  riddle = contents.riddle,
  updated_at = now()
from (
  values
    (1, '1110', $$Quando penso em tudo que já vivemos juntos, percebo o quanto você transformou a minha vida em algo muito mais bonito.$$, $$1 — Q$$, $$Amanhã você receberá algo pequeno, quase invisível para os outros, mas que existe para cuidar de cada detalhe. Assim como eu gostaria de cuidar de você todos os dias$$),
    (2, '2610', $$Um dos maiores presentes que a vida poderia ter me dado foi ter colocado você no meu caminho.$$, $$2 — U$$, $$Amanhã será um momento de descanso. Algo feito para renovar, hidratar e lembrar que até quem cuida de todo mundo também merece ser cuidada$$),
    (3, '0811', $$Eu amo cada detalhe seu, até aqueles pequenos que talvez você nem perceba, mas que fazem você ser exatamente quem é.$$, $$3 — E$$, $$Amanhã o presente não será apenas visto. Será sentido sempre que um perfume trouxer boas lembranças$$),
    (4, '1908', $$Realmente, se eu pudesse voltar no tempo, escolheria viver cada momento novamente, desde o dia em que te conheci.$$, $$4 — R$$, $$Amanhã você receberá algo que cuida dos fios, mas que me fez pensar em como o amor também mora nos pequenos detalhes$$),
    (5, '2608', $$Cada lembrança nossa mora em um cantinho especial do meu coração, e eu quero continuar criando milhares delas ao seu lado.$$, $$5 — C$$, $$Amanhã será um presente para colocar tudo no lugar... menos as emoções que você desperta em mim$$),
    (6, '0310', $$Ao seu lado eu aprendi que amar não é apenas sentir, mas escolher a mesma pessoa todos os dias.$$, $$6 — A$$, $$Amanhã começa uma nova etapa. Um presente que mostra que descansar também é uma forma de se amar$$),
    (7, '1110', $$Sei que ainda temos muitos sonhos para realizar, muitos lugares para conhecer e muitas histórias para escrever.$$, $$7 — S$$, $$Amanhã você vai descobrir que as melhores mudanças não acontecem de uma vez. Elas começam com um pequeno passo... e continuam todos os dias$$),
    (8, '2023', $$Ainda quero acordar ao seu lado, dividir uma casa, construir nossa família e viver aquelas coisas simples que sempre sonhamos.$$, $$8 — A$$, $$Amanhã começa uma nova rotina. Pequenos gestos que, repetidos todos os dias, fazem toda a diferença$$),
    (9, '2024', $$Rindo, chorando, comemorando ou enfrentando dias difíceis, eu quero que você continue sendo minha companheira em todos eles.$$, $$9 — R$$, $$Amanhã você receberá a continuação dessa rotina. Porque as melhores mudanças acontecem com constância$$),
    (10, '2025', $$Com você, eu não penso apenas no presente; quando imagino o futuro, é você quem eu vejo nele.$$, $$10 — C$$, $$Amanhã vem um presente divertido, doce e que combina perfeitamente com o seu sorriso$$),
    (11, '2026', $$O meu coração encontrou em você um lugar onde quer permanecer para sempre.$$, $$11 — O$$, $$Amanhã uma personagem muito especial vai aparecer por aqui... e ela tem algo em comum com você$$),
    (12, '1437', $$Meu maior desejo é continuar segurando sua mão enquanto a nossa história passa de capítulo em capítulo.$$, $$12 — M$$, $$Amanhã será um pequeno brilho que representa alguém que ilumina os meus dias$$),
    (13, '2222', $$Imagino nossos próximos anos juntos e fico feliz pensando em tudo que ainda vamos construir.$$, $$13 — I$$, $$Amanhã você receberá um símbolo que representa algo que eu gostaria que nunca tivesse fim$$),
    (14, '1212', $$Guardar nossas lembranças é especial, mas poder criar novas memórias com você pelo resto da vida seria ainda mais.$$, $$14 — G$$, $$Amanhã será um presente para que você carregue sempre um pedacinho de mim$$),
    (15, '0909', $$O amor que sinto por você cresceu junto com a nossa história, e hoje eu tenho certeza de que quero continuar escrevendo essa história com você.$$, $$15 — O$$, $$Amanhã começa o último cuidado com o seu cabelo... antes dos dois últimos capítulos da nossa história$$),
    (16, '2006', $$A verdade é que, entre tantas pessoas no mundo, foi você quem fez meu coração ter certeza de onde queria estar.$$, $$16 — A$$, $$Amanhã você receberá a continuação desse cuidado. Porque algumas coisas ficam ainda melhores quando estão completas$$),
    (17, '2007', $$Mais do que minha namorada, você se tornou minha melhor amiga, minha companheira e a pessoa com quem eu quero dividir a vida.$$, $$17 — M$$, $$Amanhã você receberá algo que vai te acompanhar em muitos momentos... mas o verdadeiro motivo dele só fará sentido um dia depois$$),
    (18, '2019', $$O que eu mais quero é que esse “nós” continue existindo daqui a muitos e muitos anos.$$, $$18 — O$$, $$Amanhã você receberá um presente diferente de todos os outros. Não tenha pressa. Aproveite cada página. A verdadeira surpresa não estará apenas dentro dele$$),
    (19, '9999', $$Realmente, eu não consigo imaginar um futuro em que você não esteja ao meu lado. Por isso, hoje eu quero te fazer a pergunta mais importante da minha vida...$$, $$19 — R$$, $$Chegamos ao último capítulo desta brincadeira. Há algumas semanas você começou a receber presentes. Mas, sem perceber, também começou a percorrer uma história. Agora eu só tenho um pedido: leia este livro até a última página. Quando terminar... apenas olhe para mim. ❤️$$)
) as contents(day_number, password, success_message, hint, riddle)
where presents.day_number = contents.day_number;