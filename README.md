https://faber-house.ru/
структура проекта
1) Фронт(Nextjs useSwr ts tailwindcss)
  
2) Backend(Nestjs typeorm ts winston elasticSearch) он делится на 3 сервиса
   1) cdn  для хранения и обработки изображений
   2) mail - для отправки писем(https://github.com/arseni2/mailService)
   3) api - главный сервис с которым взаимодействует фронт
