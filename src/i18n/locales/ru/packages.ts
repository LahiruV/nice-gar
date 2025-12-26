export const packages = {
  title: 'Исследуйте наши туры',
  subtitle: 'Откройте для себя тщательно подобранные туры для незабываемого путешествия по Шри-Ланке',
  items: {
    culturalHeritage: {
      title: "Тур по культурному наследию",
      description: "Исследуйте древние храмы, исторические места и традиционные деревни.",
      image: "https://images.pexels.com/photos/19759365/pexels-photo-19759365/free-photo-of-buddha-statues-at-gangaramaya-temple-in-colombo-sri-lanka.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1299,
      duration: "6 дней",
      groupSize: "Максимум 12 человек",
      startDate: "Круглый год"
    },
    beachParadise: {
      title: "Пляжный рай",
      description: "Отдохните на нетронутых пляжах и насладитесь водными видами спорта.",
      image: "https://images.pexels.com/photos/5549239/pexels-photo-5549239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 999,
      duration: "5 дней",
      groupSize: "Максимум 10 человек",
      startDate: "Круглый год"
    },
    wildlifeSafari: {
      title: "Сафари приключение",
      description: "Встретьтесь со слонами, леопардами и экзотическими птицами в их естественной среде обитания.",
      image: "https://images.pexels.com/photos/17281950/pexels-photo-17281950/free-photo-of-elephants-among-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1499,
      duration: "7 дней",
      groupSize: "Максимум 8 человек",
      startDate: "Круглый год"
    }
  },
  filters: {
    duration: {
      label: 'Продолжительность',
      all: 'Все длительности',
      short: '1-3 дня',
      medium: '4-7 дней',
      long: '8+ дней'
    },
    price: {
      label: 'Ценовой диапазон',
      all: 'Все цены',
      budget: '$0 - $1,000',
      standard: '$1,000 - $2,000',
      luxury: '$2,000+'
    }
  },
  booking: {
    title: 'Забронировать тур',
    form: {
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email',
      phone: 'Телефон',
      travelDate: 'Дата путешествия',
      adults: 'Количество взрослых',
      children: 'Количество детей',
      services: {
        title: 'Дополнительные услуги',
        meals: 'Включить питание',
        transport: 'Включить транспорт',
        accommodation: 'Включить проживание'
      },
      specialRequests: {
        label: 'Особые пожелания',
        placeholder: 'Опционально: Любые диетические требования или особые условия размещения'
      },
      submit: 'Забронировать',
      perPerson: '/человек'
    }
  }
};