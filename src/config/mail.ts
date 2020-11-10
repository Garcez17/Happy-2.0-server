interface IMailDriver {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'happy@valepremier.com.br',
      name: 'Happy',
    },
  },
} as IMailDriver;
