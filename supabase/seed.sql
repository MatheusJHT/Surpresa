insert into public.site_settings (site_title, site_subtitle, intro_message, final_message)
values (
  '19 Anos, 19 Dias, 19 Presentes',
  'Uma pequena jornada de amor',
  'Cada presente guarda uma pequena parte da nossa histÃ³ria.',
  '19 anos, 19 dias, 19 presentes. E eu escolheria continuar vivendo nossa histÃ³ria ao seu lado.'
)
on conflict do nothing;

insert into public.presents (
  day_number, title, password_hash, question, answer_hash, success_message, riddle, hint
)
values
  (1, 'O comeÃ§o de tudo', extensions.crypt('2609', extensions.gen_salt('bf')), 'Qual foi o primeiro lugar onde nÃ³s saÃ­mos juntos?', extensions.crypt('praca', extensions.gen_salt('bf')), 'Todo comeÃ§o fica ainda mais bonito quando lembro que foi com vocÃª.', 'Procure onde nossas memÃ³rias costumam ficar guardadas.', 'Pense em um lugar cheio de lembranÃ§as.'),
  (2, 'Uma canÃ§Ã£o nossa', extensions.crypt('lua', extensions.gen_salt('bf')), 'Qual foi a primeira mÃºsica que marcou nossa histÃ³ria?', extensions.crypt('lua', extensions.gen_salt('bf')), 'Algumas mÃºsicas conseguem guardar um momento inteiro dentro delas.', 'O prÃ³ximo presente estÃ¡ perto de algo que conta histÃ³rias sem falar.', 'Procure perto de livros ou cartas.'),
  (3, 'Um nome sÃ³ nosso', extensions.crypt('sete', extensions.gen_salt('bf')), 'Qual foi o primeiro apelido carinhoso que eu te dei?', extensions.crypt('sete', extensions.gen_salt('bf')), 'Gosto dos nomes que sÃ³ fazem sentido quando somos nÃ³s dois.', 'VÃ¡ atÃ© onde uma pausa tranquila costuma acontecer.', 'Um cantinho confortÃ¡vel pode ajudar.'),
  (4, 'Pequenos detalhes', extensions.crypt('janela', extensions.gen_salt('bf')), 'Qual detalhe meu sempre faz vocÃª sorrir?', extensions.crypt('sorriso', extensions.gen_salt('bf')), 'Ã‰ nos pequenos detalhes que o amor aprende a morar.', 'Procure perto de onde a luz entra pela manhÃ£.', 'Olhe perto de uma janela.'),
  (5, 'Nosso primeiro registro', extensions.crypt('foto', extensions.gen_salt('bf')), 'O que aparece na nossa primeira foto juntos?', extensions.crypt('sorriso', extensions.gen_salt('bf')), 'Cada foto nossa parece dizer que aquele instante valeu a pena.', 'O prÃ³ximo capÃ­tulo estÃ¡ perto de imagens que guardam o tempo.', 'Pense em fotografias.'),
  (6, 'Um dia especial', extensions.crypt('domingo', extensions.gen_salt('bf')), 'Qual era o dia da semana do nosso primeiro passeio?', extensions.crypt('domingo', extensions.gen_salt('bf')), 'AtÃ© os dias comuns ficam especiais quando divididos com vocÃª.', 'Procure onde costumamos escolher o que assistir.', 'Perto da televisÃ£o pode haver uma pista.'),
  (7, 'Nosso lugar', extensions.crypt('cafe', extensions.gen_salt('bf')), 'Qual bebida lembra uma das nossas conversas mais longas?', extensions.crypt('cafe', extensions.gen_salt('bf')), 'Eu repetiria cada conversa, atÃ© as que terminaram tarde demais.', 'O prÃ³ximo presente estÃ¡ onde as manhÃ£s comeÃ§am.', 'Procure na cozinha.'),
  (8, 'Uma promessa', extensions.crypt('sempre', extensions.gen_salt('bf')), 'Qual palavra resume o que eu quero viver ao seu lado?', extensions.crypt('sempre', extensions.gen_salt('bf')), 'A melhor parte do futuro Ã© imaginar todos os dias que ainda teremos.', 'VÃ¡ atÃ© onde guardamos coisas para sair.', 'Procure perto de bolsas ou chaves.'),
  (9, 'Entre risos', extensions.crypt('riso', extensions.gen_salt('bf')), 'O que nunca falta quando estamos juntos?', extensions.crypt('risada', extensions.gen_salt('bf')), 'Seu riso Ã© uma das minhas formas favoritas de casa.', 'A prÃ³xima surpresa estÃ¡ perto de algo que tambÃ©m faz barulho.', 'Pense em mÃºsica.'),
  (10, 'Metade do caminho', extensions.crypt('dez', extensions.gen_salt('bf')), 'Quantos presentes jÃ¡ foram descobertos antes deste?', extensions.crypt('nove', extensions.gen_salt('bf')), 'Chegar atÃ© aqui com vocÃª jÃ¡ Ã© uma histÃ³ria linda por si sÃ³.', 'Procure no lugar onde o dia termina devagar.', 'O quarto pode esconder o prÃ³ximo capÃ­tulo.'),
  (11, 'Uma memÃ³ria favorita', extensions.crypt('mar', extensions.gen_salt('bf')), 'Qual cenÃ¡rio combina com uma das nossas melhores memÃ³rias?', extensions.crypt('mar', extensions.gen_salt('bf')), 'Algumas lembranÃ§as tÃªm cheiro de liberdade e vontade de ficar.', 'A pista estÃ¡ perto de algo azul.', 'Procure um objeto azul.'),
  (12, 'Nosso jeito', extensions.crypt('abraco', extensions.gen_salt('bf')), 'Qual gesto meu faz vocÃª se sentir protegida?', extensions.crypt('abraco', extensions.gen_salt('bf')), 'Se eu pudesse, transformaria cada abraÃ§o em morada.', 'VÃ¡ atÃ© onde descansamos depois de um dia cheio.', 'Procure perto de almofadas.'),
  (13, 'Uma escolha', extensions.crypt('juntos', extensions.gen_salt('bf')), 'Qual Ã© a coisa que sempre fazemos melhor juntos?', extensions.crypt('rir', extensions.gen_salt('bf')), 'A vida fica mais leve quando a gente escolhe o mesmo lado.', 'O prÃ³ximo presente estÃ¡ perto de algo que usamos para escolher caminhos.', 'Pense em um mapa ou agenda.'),
  (14, 'A nossa calma', extensions.crypt('chuva', extensions.gen_salt('bf')), 'Qual som combina com uma tarde tranquila ao seu lado?', extensions.crypt('chuva', extensions.gen_salt('bf')), 'Mesmo no silÃªncio, eu gosto da companhia que existe entre nÃ³s.', 'Procure onde ficam as coisas que aquecem.', 'Olhe perto de cobertores.'),
  (15, 'Quase lÃ¡', extensions.crypt('quinze', extensions.gen_salt('bf')), 'Qual nÃºmero representa este capÃ­tulo da jornada?', extensions.crypt('quinze', extensions.gen_salt('bf')), 'Cada passo trouxe uma nova razÃ£o para agradecer por nÃ³s.', 'A prÃ³xima pista estÃ¡ onde contamos os dias.', 'Procure perto de um calendÃ¡rio.'),
  (16, 'O que permanece', extensions.crypt('cuidado', extensions.gen_salt('bf')), 'O que nunca pode faltar em uma histÃ³ria de amor?', extensions.crypt('cuidado', extensions.gen_salt('bf')), 'Amar vocÃª tambÃ©m Ã© prestar atenÃ§Ã£o, todos os dias.', 'VÃ¡ atÃ© onde ficam objetos que usamos para nos cuidar.', 'Procure no banheiro.'),
  (17, 'Planos', extensions.crypt('viagem', extensions.gen_salt('bf')), 'Qual sonho vocÃª gostaria de realizar comigo?', extensions.crypt('viagem', extensions.gen_salt('bf')), 'Ainda temos muitos lugares para conhecer e histÃ³rias para inventar.', 'A prÃ³xima surpresa estÃ¡ perto de algo que acompanha partidas.', 'Procure perto de malas ou mochilas.'),
  (18, 'A Ãºltima pista', extensions.crypt('amor', extensions.gen_salt('bf')), 'Qual palavra vocÃª escolheria para definir nossa histÃ³ria?', extensions.crypt('amor', extensions.gen_salt('bf')), 'Chegamos quase ao fim, mas o que sentimos nÃ£o cabe em uma contagem.', 'O Ãºltimo presente estÃ¡ perto de onde guardamos o que Ã© mais precioso.', 'Procure em um lugar especial para nÃ³s.'),
  (19, 'O presente final', extensions.crypt('final', extensions.gen_salt('bf')), 'Qual Ã© uma coisa que vocÃª sempre quer viver ao meu lado?', extensions.crypt('vida', extensions.gen_salt('bf')), 'Se eu pudesse escolher um Ãºnico presente, seria continuar vivendo nossa histÃ³ria ao seu lado.', 'VocÃª chegou ao fim da jornada. Agora abra a carta final.', 'A Ãºltima surpresa estÃ¡ junto da mensagem final.')
on conflict (day_number) do update set
  updated_at = now();

update public.presents as presents
set
  password_hash = extensions.crypt(contents.password, extensions.gen_salt('bf')),
  question = '',
  answer_hash = extensions.crypt('', extensions.gen_salt('bf')),
  success_message = contents.success_message,
  hint = contents.hint,
  riddle = contents.riddle,
  updated_at = now()
from (
  values
    (1, '1110', $$Quando penso em tudo que jÃ¡ vivemos juntos, percebo o quanto vocÃª transformou a minha vida em algo muito mais bonito.$$, $$1 â€” Q$$, $$AmanhÃ£ vocÃª receberÃ¡ algo pequeno, quase invisÃ­vel para os outros, mas que existe para cuidar de cada detalhe. Assim como eu gostaria de cuidar de vocÃª todos os dias$$),
    (2, '2610', $$Um dos maiores presentes que a vida poderia ter me dado foi ter colocado vocÃª no meu caminho.$$, $$2 â€” U$$, $$AmanhÃ£ serÃ¡ um momento de descanso. Algo feito para renovar, hidratar e lembrar que atÃ© quem cuida de todo mundo tambÃ©m merece ser cuidada$$),
    (3, '0811', $$Eu amo cada detalhe seu, atÃ© aqueles pequenos que talvez vocÃª nem perceba, mas que fazem vocÃª ser exatamente quem Ã©.$$, $$3 â€” E$$, $$AmanhÃ£ o presente nÃ£o serÃ¡ apenas visto. SerÃ¡ sentido sempre que um perfume trouxer boas lembranÃ§as$$),
    (4, '1908', $$Realmente, se eu pudesse voltar no tempo, escolheria viver cada momento novamente, desde o dia em que te conheci.$$, $$4 â€” R$$, $$AmanhÃ£ vocÃª receberÃ¡ algo que cuida dos fios, mas que me fez pensar em como o amor tambÃ©m mora nos pequenos detalhes$$),
    (5, '2608', $$Cada lembranÃ§a nossa mora em um cantinho especial do meu coraÃ§Ã£o, e eu quero continuar criando milhares delas ao seu lado.$$, $$5 â€” C$$, $$AmanhÃ£ serÃ¡ um presente para colocar tudo no lugar... menos as emoÃ§Ãµes que vocÃª desperta em mim$$),
    (6, '0310', $$Ao seu lado eu aprendi que amar nÃ£o Ã© apenas sentir, mas escolher a mesma pessoa todos os dias.$$, $$6 â€” A$$, $$AmanhÃ£ comeÃ§a uma nova etapa. Um presente que mostra que descansar tambÃ©m Ã© uma forma de se amar$$),
    (7, '1110', $$Sei que ainda temos muitos sonhos para realizar, muitos lugares para conhecer e muitas histÃ³rias para escrever.$$, $$7 â€” S$$, $$AmanhÃ£ vocÃª vai descobrir que as melhores mudanÃ§as nÃ£o acontecem de uma vez. Elas comeÃ§am com um pequeno passo... e continuam todos os dias$$),
    (8, '2023', $$Ainda quero acordar ao seu lado, dividir uma casa, construir nossa famÃ­lia e viver aquelas coisas simples que sempre sonhamos.$$, $$8 â€” A$$, $$AmanhÃ£ comeÃ§a uma nova rotina. Pequenos gestos que, repetidos todos os dias, fazem toda a diferenÃ§a$$),
    (9, '2024', $$Rindo, chorando, comemorando ou enfrentando dias difÃ­ceis, eu quero que vocÃª continue sendo minha companheira em todos eles.$$, $$9 â€” R$$, $$AmanhÃ£ vocÃª receberÃ¡ a continuaÃ§Ã£o dessa rotina. Porque as melhores mudanÃ§as acontecem com constÃ¢ncia$$),
    (10, '2025', $$Com vocÃª, eu nÃ£o penso apenas no presente; quando imagino o futuro, Ã© vocÃª quem eu vejo nele.$$, $$10 â€” C$$, $$AmanhÃ£ vem um presente divertido, doce e que combina perfeitamente com o seu sorriso$$),
    (11, '2026', $$O meu coraÃ§Ã£o encontrou em vocÃª um lugar onde quer permanecer para sempre.$$, $$11 â€” O$$, $$AmanhÃ£ uma personagem muito especial vai aparecer por aqui... e ela tem algo em comum com vocÃª$$),
    (12, '1437', $$Meu maior desejo Ã© continuar segurando sua mÃ£o enquanto a nossa histÃ³ria passa de capÃ­tulo em capÃ­tulo.$$, $$12 â€” M$$, $$AmanhÃ£ serÃ¡ um pequeno brilho que representa alguÃ©m que ilumina os meus dias$$),
    (13, '2222', $$Imagino nossos prÃ³ximos anos juntos e fico feliz pensando em tudo que ainda vamos construir.$$, $$13 â€” I$$, $$AmanhÃ£ vocÃª receberÃ¡ um sÃ­mbolo que representa algo que eu gostaria que nunca tivesse fim$$),
    (14, '1212', $$Guardar nossas lembranÃ§as Ã© especial, mas poder criar novas memÃ³rias com vocÃª pelo resto da vida seria ainda mais.$$, $$14 â€” G$$, $$AmanhÃ£ serÃ¡ um presente para que vocÃª carregue sempre um pedacinho de mim$$),
    (15, '0909', $$O amor que sinto por vocÃª cresceu junto com a nossa histÃ³ria, e hoje eu tenho certeza de que quero continuar escrevendo essa histÃ³ria com vocÃª.$$, $$15 â€” O$$, $$AmanhÃ£ comeÃ§a o Ãºltimo cuidado com o seu cabelo... antes dos dois Ãºltimos capÃ­tulos da nossa histÃ³ria$$),
    (16, '2006', $$A verdade Ã© que, entre tantas pessoas no mundo, foi vocÃª quem fez meu coraÃ§Ã£o ter certeza de onde queria estar.$$, $$16 â€” A$$, $$AmanhÃ£ vocÃª receberÃ¡ a continuaÃ§Ã£o desse cuidado. Porque algumas coisas ficam ainda melhores quando estÃ£o completas$$),
    (17, '2007', $$Mais do que minha namorada, vocÃª se tornou minha melhor amiga, minha companheira e a pessoa com quem eu quero dividir a vida.$$, $$17 â€” M$$, $$AmanhÃ£ vocÃª receberÃ¡ algo que vai te acompanhar em muitos momentos... mas o verdadeiro motivo dele sÃ³ farÃ¡ sentido um dia depois$$),
    (18, '2019', $$O que eu mais quero Ã© que esse â€œnÃ³sâ€ continue existindo daqui a muitos e muitos anos.$$, $$18 â€” O$$, $$AmanhÃ£ vocÃª receberÃ¡ um presente diferente de todos os outros. NÃ£o tenha pressa. Aproveite cada pÃ¡gina. A verdadeira surpresa nÃ£o estarÃ¡ apenas dentro dele$$),
    (19, '9999', $$Realmente, eu nÃ£o consigo imaginar um futuro em que vocÃª nÃ£o esteja ao meu lado. Por isso, hoje eu quero te fazer a pergunta mais importante da minha vida...$$, $$19 â€” R$$, $$Chegamos ao Ãºltimo capÃ­tulo desta brincadeira. HÃ¡ algumas semanas vocÃª comeÃ§ou a receber presentes. Mas, sem perceber, tambÃ©m comeÃ§ou a percorrer uma histÃ³ria. Agora eu sÃ³ tenho um pedido: leia este livro atÃ© a Ãºltima pÃ¡gina. Quando terminar... apenas olhe para mim. â¤ï¸$$)
) as contents(day_number, password, success_message, hint, riddle)
where presents.day_number = contents.day_number;