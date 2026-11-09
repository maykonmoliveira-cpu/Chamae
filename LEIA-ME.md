# Chamaê — versão Web e Android

Este pacote contém a versão Web do MVP e a configuração para empacotamento como aplicativo Android usando Capacitor. A configuração iOS foi removida deste pacote.

## Conteúdo
- `www/`: aplicação web, manifesto PWA, service worker e ícones.
- `capacitor.config.ts`: configuração inicial do aplicativo Android.
- `package.json`: dependências e comandos Web/Android.

## Estado funcional e limitações
O conteúdo é um MVP demonstrativo baseado no código recebido. Profissionais e dados podem ser exemplos; favoritos, histórico e mensagens podem ficar apenas no armazenamento local. Este pacote não comprova autenticação real, conexão com o Supabase original, chat entre usuários reais, notificações push ou pagamentos reais. Nenhuma transação financeira é executada.

## Testar a versão Web
Requer Node.js 20 ou superior. Na pasta do projeto, execute:

```bash
npm install
npm run web
```

Para publicar, hospede o conteúdo de `www/` em um serviço HTTPS. No Android e iPhone, a versão web também pode ser acessada pelo navegador. Em navegadores compatíveis, a PWA pode ser adicionada à tela inicial.

## Preparar o aplicativo Android
A compilação nativa requer Android Studio e um ambiente Android SDK configurado. Na pasta do projeto, execute:

```bash
npm install
npx cap add android   # executar somente na primeira configuração
npx cap sync android
npx cap open android
```

No Android Studio, configure a assinatura, teste em emulador/aparelho e gere o pacote AAB para publicação na Google Play. A publicação exige uma conta Google Play Console.

## Supabase e preservação dos dados
Nenhum projeto Supabase foi conectado ou alterado nesta preparação. Antes de integrar, confirme o projeto original, faça backup e revise tabelas e políticas RLS. Nunca inclua a chave `service_role` no aplicativo; utilize somente a chave publicável/anon com políticas adequadas.

## Próxima etapa técnica
Auditar o código e conectar autenticação, perfis, catálogo, pedidos, chat e pagamentos ao Supabase em ambiente de teste, sem modificar o banco original até confirmar backup e esquema.
