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