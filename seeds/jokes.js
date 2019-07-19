exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jokes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('jokes').insert([
        {
          joke_text:
            'My wife is really mad at the fact that I have no sense of direction. So I packed up my stuff and right.',
          user_id: 32,
          private: true,
          public: true
        },
        {
          joke_text:
            'How do you make holy water? You boil the hell out of it.',
          user_id: 33,
          private: false,
          public: true
        },
        {
          joke_text:
            'I bought some shoes from a drug dealer. I don\'t know what he laced them with, but I was tripping all day!',
          user_id: 34,
          private: true,
          public: true
        },
        {
          joke_text:
            'Did you know the first French fries weren\'t actually cooked in France? They were cooked in Greece.',
          user_id: 32,
          private: true,
          public: true
        },
        {
          joke_text:
            'If a child refuses to sleep during nap time, are they guilty of resisting a rest?',
          user_id: 33,
          private: true,
          public: false
        },
        {
          joke_text:
            'I\'m reading a book about anti-gravity. It\'s impossible to put down!',
          user_id: 34,
          private: false,
          public: true
        },
        {
          joke_text:
            'What do you call someone with no body and no nose? Nobody knows.',
          user_id: 32,
          private: true,
          public: true
        },
        {
          joke_text:
            'I ordered a chicken and an egg from Amazon. I’ll let you know',
          user_id: 33,
          private: true,
          public: true
        },
        {
          joke_text:
            'What is the least spoken language in the world? Sign language',
          user_id: 34,
          private: true,
          public: false
        },
        {
          joke_text:
            'My daughter screeched, "Daaaaaad, you haven\'t listened to one word I\'ve said, have you!?" What a strange way to start a conversation with me...',
          user_id: 32,
          private: true,
          public: false
        }
      ]);
    });
};
